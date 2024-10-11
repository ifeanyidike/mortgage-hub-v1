import DB from "@/lib/db";
import {
  ExistingUser,
  ExistingUserWithPword,
  NewUser,
  UserUpdate,
} from "@/types/db";
import { z, ZodError } from "zod";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { zodError } from "./error";
import { emailService } from "./email";

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

  public async createOne(
    email: string,
    password: string,
    role: "user" | "broker" = "user"
  ) {
    const data = zodError.registerSchema().parse({ email, password });

    const hash = await bcrypt.hash(data.password, 10);
    const [user] = await this.db
      .insertInto("users")
      .values({ email: data.email, password: hash, role })
      .returning("id")
      .execute();

    const token = jwt.sign(
      { id: user.id },
      process.env.VERIFY_EMAIL_TOKEN_SECRET as string,
      { expiresIn: "1d" }
    );
    await emailService.sendVerificationEmail(email, token);
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

    return user;
  }

  public async updateOne(data: UserUpdate, id: string) {
    await this.db.updateTable("users").set(data).where("id", "=", id).execute();
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

    return user;
  }

  public async storeTokens(
    userId: string,
    provider: string,
    email: string,
    access_token: string,
    refresh_token: string,
    expiresAt: Date
  ) {
    await this.db
      .insertInto("accounts")
      .values({
        user_id: userId,
        provider,
        email,
        access_token,
        refresh_token,
        access_token_expires_at: expiresAt,
      })
      .execute();
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
    const account = await this.db
      .selectFrom("accounts")
      .selectAll()
      .where("email", "=", email)
      .where("provider", "=", provider)
      .executeTakeFirst();

    if (account) {
      // Update tokens if user exists
      await this.db
        .updateTable("accounts")
        .set({
          access_token,
          refresh_token,
          access_token_expires_at: new Date(expiresAt),
        })
        .where("id", "=", account.id)
        .execute();
    } else {
      console.log("email", email);
      let user = (await this.findByEmail(email)) as Pick<ExistingUser, "id">;

      if (!user) {
        if (provider === "credentials") throw new Error("Invalid user");
        user = await this.createOneNoPassword(email, role);
        console.log("returned user", user);
      }

      await this.storeTokens(
        user.id,
        provider,
        email,
        access_token,
        refresh_token,
        expiresAt
      );
    }
  }

  public async socialLogin(
    email: string,
    access_token: string,
    refresh_token: string,
    expiresAt: Date,
    provider = "google" as "google"
  ) {
    this.handleTokens(email, access_token, refresh_token, expiresAt, provider);
  }

  public async refreshToken(token: string) {
    const decoded = jwt.verify(
      token,
      process.env.REFRESH_TOKEN_SECRET as string
    ) as Record<"email", string>;

    // Find the user based on the token's user ID
    const account = await this.db
      .selectFrom("accounts")
      .selectAll()
      .where("email", "=", decoded.email)
      .executeTakeFirst();

    if (!account) {
      throw new Error("Invalid refresh token");
    }

    // Generate new access and refresh tokens
    const newAccessToken = jwt.sign(
      { email: decoded.email },
      process.env.ACCESS_TOKEN_SECRET as string,
      { expiresIn: "15m" }
    );
    const newRefreshToken = jwt.sign(
      { email: decoded.email },
      process.env.REFRESH_TOKEN_SECRET as string,
      { expiresIn: "7d" }
    );

    // Optionally, update the refresh token in the database
    await this.db
      .updateTable("accounts")
      .set({ refresh_token: newRefreshToken, access_token: newAccessToken })
      .where("id", "=", account.id)
      .execute();

    return { refreshToken: newRefreshToken, accessToken: newAccessToken };
  }
}

export default new User();
