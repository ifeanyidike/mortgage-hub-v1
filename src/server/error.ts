import { AxiosError, AxiosResponse } from "axios";
import { z } from "zod";

export class CustomError {
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

    const emailSchema = z.string().email({ message: "Invalid email format" });

    // Define the role schema with only "user" or "broker" as valid values
    const roleSchema = z.enum(["user", "broker"], {
      message: "Role must be either 'user' or 'broker'",
    });

    // Define the date of birth schema, ensuring it's a valid date string
    const dobSchema = z.string().refine(
      (value) => {
        const date = new Date(value);
        return date instanceof Date && !isNaN(date.getTime());
      },
      { message: "Date of birth must be a valid date" }
    );

    // Define the name schema with a minimum length requirement
    const nameSchema = z
      .string()
      .min(2, { message: "Name must be at least 2 characters long" });

    return z.object({
      email: emailSchema,
      password: passwordSchema,
      role: roleSchema,
      dob: dobSchema,
      name: nameSchema,
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

  private tryParseJSON(value: string): any {
    try {
      const parsed = JSON.parse(value);
      if (typeof parsed === "object" && parsed !== null) {
        return parsed;
      }
    } catch {}

    return value;
  }

  public serializeError(error: Error) {
    const errorMessage = this.tryParseJSON(error.message);
    console.log("error message", errorMessage, typeof errorMessage);
    if (typeof errorMessage === "string") {
      if (
        errorMessage?.includes("duplicate key value violates unique constraint")
      ) {
        return "Email already exists";
      }
    }
    if (Array.isArray(errorMessage)) {
      return errorMessage[0].message;
    }
  }

  // Utility function to serialize Axios errors
  public serializeAxiosError(error: AxiosError) {
    let errorData = "";
    let zodErrors = [];
    if (error.response) {
      if (error.response.data) {
        const { error: err } = error.response.data as AxiosResponse["data"] & {
          error: any;
        };

        if (err) {
          zodErrors = JSON.parse(err);
        }
      }

      if (
        error.response.statusText.includes(
          "duplicate key value violates unique constraint"
        )
      ) {
        errorData = "Email already exists";
      }

      let message = error.response.statusText;
      if (zodErrors.length) {
        message = zodErrors[0].message;
      } else if (errorData) {
        message = errorData;
      }

      return {
        status: error.response.status,
        statusText: error.response.statusText,
        data: error.response.data,
        errorData,
        zodErrors,
        headers: error.response.headers,
        message,
      };
    } else if (error.request) {
      // The request was made but no response was received
      return {
        message: "No response received from the server",
        request: error.request, // Provides details of the request
      };
    } else {
      // Something happened in setting up the request that triggered an Error
      return {
        message: error.message, // General error message
      };
    }
  }
}

export const customError = new CustomError();
