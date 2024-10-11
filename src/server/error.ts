import { z } from "zod";

export class ZodError {
  public registerSchema() {
    const passwordSchema = z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" })
      .regex(/[A-Z]/, {
        message: "Password must contain at least one uppercase letter",
      })
      .regex(/[a-z]/, {
        message: "Password must contain at least one lowercase letter",
      })
      .regex(/\d/, { message: "Password must contain at least one number" })
      .regex(/[\W_]/, {
        message: "Password must contain at least one special character",
      });

    // Define the email schema with Zod
    const emailSchema = z.string().email({ message: "Invalid email format" });

    return z.object({
      email: emailSchema,
      password: passwordSchema,
    });
  }

  private createErrorMap(error: z.ZodIssueOptionalMessage, ctx: z.ErrorMapCtx) {
    if (error.code && error.message) {
      return { message: error.message };
    }
  }

  public displayError(error: z.ZodError) {
    if (Array.isArray(error)) {
      return error[0].message;
    }
  }
}

export const zodError = new ZodError();
