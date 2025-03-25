import {
  Catch,
  ExceptionFilter,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
import { QueryFailedError } from "typeorm";
import { Response } from "express";
import { QueryError } from "pg"; // Import PostgreSQL error type
@Catch(QueryFailedError)
export class ExceptionFilters implements ExceptionFilter {
  catch(exception: QueryFailedError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    // Accessing the PostgreSQL driver error by type-casting
    const driverError = exception.driverError as QueryError; // Type-cast to `QueryError` from `pg`

    let errorResponse = {
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message: "Database error occurred",
      error: exception.message || "An unexpected database error occurred",
      code: driverError?.code, // PostgreSQL error code
      detail: driverError?.detail, // Additional details from PostgreSQL
    };

    
    // Handle specific error codes such as unique constraint violation (23505)
    if (driverError?.code === "23505") {
      errorResponse = {
        statusCode: HttpStatus.BAD_REQUEST,
        message: "Unique constraint violation",
        error: "A record with the same value already exists",
        code: driverError.code,
        detail: driverError.detail,
      };
    }

    // Send the error response as JSON
    response.status(errorResponse.statusCode).json(errorResponse);
  }
}
