import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateProjectsDto {
  @IsString()
  @IsNotEmpty()
  projectName: string;
  @IsOptional()
  @IsString()
  projectDescripton: string;
  @IsOptional()
  @IsString()
  address: string;
  @IsOptional()
  @IsString()
  contactNo: string;
  @IsOptional()
  @IsString()
  phone: string;
  @IsOptional()
  @IsString()
  @IsOptional()
  @IsString()
  emailAddress: string;
  @IsNotEmpty()
  @IsNumber()
  client_id: bigint;
}

export class UpdateProjectsDto {
  @IsString()
  @IsNotEmpty()
  projectName: string;
  @IsOptional()
  @IsString()
  projectDescripton: string;
  @IsOptional()
  @IsString()
  address: string;
  @IsOptional()
  @IsString()
  contactNo: string;
  @IsOptional()
  @IsString()
  phone: string;
  @IsOptional()
  @IsString()
  emailAddress: string;
  @IsNumber()
  @IsNotEmpty()
  active_status: number;
  @IsNotEmpty()
  @IsNumber()
  client_id: bigint;
}
