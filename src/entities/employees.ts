import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { GenerateTicket } from "./generate-tickets";

@Entity("employee")
export class Employees {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  nameEN: string;
  @Column()
  nameBan: string;
  @Column()
  fNameEN: string;
  @Column()
  fNameBan: string;
  @Column()
  mNameEN: string;
  @Column()
  mNameBan: string;
  @Column()
  mobileNo: string;
  @Column()
  departmentId: number;
  @Column()
  designationId: number;
  @Column()
  presentAddress: string;
  @Column()
  permanentAddress: string;
  @Column()
  contactNo: string;
  @Column()
  phone: string;
  @Column()
  emailAddress: string;
  @Column({ default: 1 })
  orgId: number;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
  @Column({ default: 1 })
  active_status: number;
  @ManyToOne(() => GenerateTicket, (genTi) => genTi.employees)
  generateTicket: GenerateTicket;
}
