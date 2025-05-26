import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateClientsDto {
  @IsString()
  @IsNotEmpty()
  clientName: string;
  @IsOptional()
  @IsString()
  clientDescripton: string;
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
}

export class UpdateClientsDto {
  @IsString()
  @IsNotEmpty()
  clientName: string;
  @IsOptional()
  @IsString()
  clientDescripton: string;
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
}

