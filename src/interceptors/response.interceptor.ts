import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from "@nestjs/common";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { HttpStatus } from "@nestjs/common";
import { QueryFailedError } from "typeorm";

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const method = request.method.toUpperCase();

    return next.handle().pipe(
      map((data) => {
        if (
          method === "GET" &&
          (data?.data === null ||
            data?.data === undefined ||
            (Array.isArray(data?.data) && data.data.length === 0))
        ) {
          return {
            status: HttpStatus.NOT_FOUND,
            message: "No data found",
            data: null,
            metadata: {
              request_time: new Date().toISOString(),
              api_version: "v1",
            },
          };
        }

        if (data && data.status) {
          const response: any = {
            status: HttpStatus.OK,
            message: data.message || this.getDefaultMessage(method),
            data: data.data || null,
            error: null,
            metadata: {
              request_time: new Date().toISOString(),
              api_version: "v1",
            },
          };

          // Only include pagination for GET requests with pagination data
          if (method === "GET" && data.pagination) {
            response.pagination = data.pagination;
          }

          return response;
        }

        // Handle error responses
        return this.handleError(data);
      })
    );
  }

  private getDefaultMessage(method: string): string {
    switch (method) {
      case "GET":
        return "Data retrieved successfully";
      case "POST":
        return "Data created successfully";
      case "PATCH":
        return "Data updated successfully";
      case "PUT":
        return "Data replaced successfully";
      case "DELETE":
        return "Data deleted successfully";
      default:
        return "Request successful";
    }
  }

  // Handle different types of errors
  private handleError(error: any) {
    if (error instanceof QueryFailedError) {
      const driverError = error.driverError as any; // Accessing the underlying database error
      // Check for specific database errors (e.g., column not found, constraint violations)
      if (driverError.code === "42703") {
        // Code for undefined column (column does not exist)
        return {
          status: HttpStatus.BAD_REQUEST,
          message: "Database Error: Invalid column name",
          data: null,
          error: `Column "${driverError.column}" of relation "${driverError.table}" does not exist`,
          pagination: null,
          metadata: {
            request_time: new Date().toISOString(),
            api_version: "v1",
          },
        };
      } else if (driverError.code === "23505") {
        // Code for unique constraint violation (e.g., duplicate entry)
        return {
          status: HttpStatus.BAD_REQUEST,
          message: "Database Error: Constraint violation",
          data: null,
          error: `Duplicate value in column "${driverError.constraint}"`,
          pagination: null,
          metadata: {
            request_time: new Date().toISOString(),
            api_version: "v1",
          },
        };
      }
    }

    // General error handling
    return {
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      message: "Internal Server Error",
      data: null,
      error: error?.message || "An unexpected error occurred",
      pagination: null,
      metadata: {
        request_time: new Date().toISOString(),
        api_version: "v1",
      },
    };
  }
}
