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
