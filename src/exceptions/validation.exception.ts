import { ErrorCode, HttpException } from "./root.exception";
import { ZodError, type ZodIssue } from "zod";

// z.core.$ZodIssue from @zod/core
interface ValidationError {
  field: string;
  message: string;
}

// todo: maybe is not an exception HTTP. It's an validate a error, so it could as a middleware...
export class ValidationException extends HttpException {
  constructor(zodError: ZodError) {
    // Extract only the essential error messages from Zod's error object
    const formattedErrors: ValidationError[] = zodError.issues.map(
      (error: ZodIssue) => ({
        field: error.path.join("."),
        message: error.message,
      })
    );

    super(
      "Validation failed",
      ErrorCode.VALIDATION_ERROR,
      400,
      formattedErrors
    );
  }
}
