import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateTicketsDto {
  @IsString()
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  descripton: string;
  @IsString()
  @IsNotEmpty()
  ticketStartDate: Date;
  @IsString()
  @IsNotEmpty()
  ticketEndDate: Date;
  @IsNumber()
  @IsNotEmpty()
  ticketStatus: number;
  @IsString()
  @IsNotEmpty()
  ticketFeedback: string;
  @IsString()
  @IsNotEmpty()
  remarks: string;
  @IsNumber()
  @IsNotEmpty()
  orgId: number;
  @IsString()
  @IsOptional()
  ticketTypeId: number;
  @IsString()
  @IsNumber()
  ticketAssigned: number;
  @IsString()
  @IsNumber()
  ticketAssignedTo: number;
}

export class UpdateProjectsDto {
  @IsString()
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  descripton: string;
  @IsString()
  @IsNotEmpty()
  ticketStartDate: Date;
  @IsString()
  @IsNotEmpty()
  ticketEndDate: Date;
  @IsNumber()
  @IsNotEmpty()
  ticketStatus: number;
  @IsString()
  @IsNotEmpty()
  ticketFeedback: string;
  @IsString()
  @IsNotEmpty()
  remarks: string;
  @IsNumber()
  @IsNotEmpty()
  orgId: number;
  @IsString()
  @IsOptional()
  ticketTypeId: number;
  @IsString()
  @IsNumber()
  ticketAssigned: number;
  @IsString()
  @IsNumber()
  ticketAssignedTo: number;
  @IsNumber()
  @IsNotEmpty()
  active_status: number;
}
