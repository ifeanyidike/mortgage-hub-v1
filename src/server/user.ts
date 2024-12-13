import DB from "@/lib/db";
import {
  ExistingUser,
  ExistingUserWithPword,
  NewBroker,
  NewUser,
  UserProfile,
  UserUpdate,
} from "@/types/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { customError } from "./error";
import { emailService } from "./email";
import accountService from "./account";
import { supabase } from "@/lib/supabase";
import { RealtimePostgresChangesPayload } from "@supabase/supabase-js";
import Verification from "./Verification";
import { regularUserProfile } from "./user_profile";
import broker from "./broker";

class User extends DB {
  constructor() {
    super();
  }
  public async getAll() {
    return await this.db.selectFrom("users").selectAll().execute();
  }

  public async findByEmail(email: string): Promise<ExistingUser | undefined> {
    // TODO: find user by email
    const user = (await this.db
      .selectFrom("users")
      .selectAll()
      .where("email", "=", email)
      .executeTakeFirst()) as ExistingUser & { password?: string };

    if (user) delete user.password;
    return user;
  }

  public async findByEmailWithPassword(
    email: string
  ): Promise<ExistingUserWithPword | undefined> {
    // TODO: find user by email
    return await this.db
      .selectFrom("users")
      .selectAll()
      .where("email", "=", email)
      .executeTakeFirst();
  }

  public async sendVerificationEmail(
    email: string,
    user_id: string | null = null
  ) {
    let id = user_id;

    if (!id) {
      const user = await this.findByEmail(email);
      if (!user) throw new Error("User not found");
      id = user.id;
    }
    const token = jwt.sign(
      { id },
      process.env.VERIFY_EMAIL_TOKEN_SECRET as string,
      { expiresIn: "1d" }
    );
    await emailService.sendVerificationEmail(email, token);
    return true;
  }

  private async createProfile(user_id: string, role: "user" | "broker") {
    if (role === "user") {
      await regularUserProfile.createOne(user_id);
    } else if (role === "broker") {
      await broker.createOne(user_id);
    }
  }

  public async createOne(
    email: string,
    password: string,
    role: "user" | "broker" = "user",
    dob: string,
    name: string
  ) {
    const data = customError
      .registerSchema()
      .parse({ email, password, role, dob, name });
    console.log("data", data);
    const hash = await bcrypt.hash(data.password, 10);

    const [user] = await this.db
      .insertInto("users")
      .values({ email: data.email, password: hash, role, dob, name })
      .returning("id")
      .execute();

    this.createProfile(user.id, role);
    console.log("user", user);

    this.sendVerificationEmail(email, user.id);
    return user;
  }

  public async createOneNoPassword(
    email: string,
    role: "user" | "broker" = "user"
  ) {
    // console.log("email", email);
    // console.log("role", role);
    // const emailSchema = z.string().email({ message: "Invalid email format" });
    // console.log("emailSchema", emailSchema);
    // const parsed_email = emailSchema.parse({ email });
    // console.log("parsed_email", parsed_email);

    const [user] = await this.db
      .insertInto("users")
      .values({ email, role })
      .returning("id")
      .execute();
    this.createProfile(user.id, role);

    return user;
  }

  public async updateOne(data: UserUpdate, id: string) {
    const rows = await this.db
      .updateTable("users")
      .set(data)
      .where("id", "=", id)
      .execute();
    console.log("updated", rows);
  }

  public async authenticate(email: string, password: string) {
    const user = await this.findByEmailWithPassword(email);

    if (
      !user ||
      !user.password ||
      !(await bcrypt.compare(password, user.password))
    ) {
      throw new Error("Invalid email or password");
    }

    const account = await accountService.findByEmailAndProvider(
      email,
      "credentials"
    );
    let userProfile: UserProfile | undefined;
    if (user.role === "user") {
      const profileData = await regularUserProfile.getOne(user.id);
      userProfile = profileData;
    }

    const tokens = await this.generateAndSignToken(email);
    if (!account) {
      await accountService.createOne({
        user_id: user.id,
        provider: "credentials",
        email,
        ...tokens,
      });
    } else {
      await accountService.updateOne(
        {
          access_token: tokens.access_token,
          refresh_token: tokens.refresh_token,
        },
        account.id
      );
    }

    return {
      ...user,
      accessToken: tokens?.access_token || null,
      refreshToken: tokens?.refresh_token || null,
      ...(userProfile && { user_profile: userProfile }),
    };
  }

  public async handleTokens(
    email: string,
    access_token: string,
    refresh_token: string,
    expiresAt: Date,
    provider: "google" | "credentials" = "credentials",
    role: "user" | "broker" = "user"
  ) {
    console.log("handleTokens", email, access_token, refresh_token, role);
    const account = await accountService.findByEmailAndProvider(
      email,
      provider
    );

    if (account) {
      // Update tokens if user exists
      await accountService.updateOne(
        {
          access_token,
          refresh_token,
          access_token_expires_at: new Date(expiresAt),
        },
        account.id
      );
    } else {
      let user = (await this.findByEmail(email)) as Pick<ExistingUser, "id">;

      if (!user) {
        if (provider === "credentials") throw new Error("Invalid user");
        user = await this.createOneNoPassword(email, role);
      }

      await accountService.createOne({
        user_id: user.id,
        provider,
        email,
        access_token,
        refresh_token,
        access_token_expires_at: expiresAt,
      });
    }
  }

  public async socialLogin(
    email: string,
    access_token: string,
    refresh_token: string,
    expiresAt: Date,
    provider = "google" as const
  ) {
    this.handleTokens(email, access_token, refresh_token, expiresAt, provider);
  }

  private async generateAndSignToken(email: string) {
    // Generate new access and refresh tokens
    const access_token = jwt.sign(
      { email },
      process.env.ACCESS_TOKEN_SECRET as string,
      { expiresIn: "15m" }
    );
    const refresh_token = jwt.sign(
      { email },
      process.env.REFRESH_TOKEN_SECRET as string,
      { expiresIn: "7d" }
    );

    return { access_token, refresh_token };
  }

  public async refreshToken(token: string) {
    const decoded = jwt.verify(
      token,
      process.env.REFRESH_TOKEN_SECRET as string
    ) as Record<"email", string>;

    // Find the user based on the token's user ID

    const account = await accountService.findByEmail(decoded.email);

    if (!account) {
      throw new Error("Invalid refresh token");
    }

    const tokens = await this.generateAndSignToken(decoded.email);
    await accountService.updateOne({ ...tokens }, account.id);
    return {
      accessToken: tokens.access_token,
      refreshToken: tokens.refresh_token,
    };
  }

  public async bulkUploadBroker(data: (NewUser & NewBroker)[]) {
    try {
      for (const d of data) {
        const claim = Verification.generateClaimToken();
        console.log("claim", claim);
        const userInfo = {
          email: d.email,
          name: d.name,
          picture: d.picture,
          phone: d.phone,
          role: "broker" as const,
          account_status: "pending_claim" as const,
          ...claim,
        };

        const [user] = await this.db
          .insertInto("users")
          .values(userInfo)
          .returning("id")
          .execute();
        console.log("user", user);
        const brokerInfo = {
          user_id: user.id,
          company: d.company,
          title: d.title,
          lic: d.lic,
          location: d.location,
          service_areas: d.service_areas,
          description: d.description,
          fax: d.fax,
          postal_code: d.postal_code,
          website: d.website,
          social_links: d.social_links,
          broker_id: d.broker_id,
          is_company: d.is_company,
          broker_type: d.broker_type,
        } as NewBroker;
        const [broker] = await this.db
          .insertInto("brokers")
          .values(brokerInfo)
          .returning("id")
          .execute();
        console.log("broker", broker);
      }
    } catch (error) {
      console.log("error occurred", error);
    }
  }
}

export default new User();
