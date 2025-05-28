import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
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
  @Column({ nullable: true })
  nameBan: string;
  @Column()
  fNameEN: string;
  @Column({ nullable: true })
  fNameBan: string;
  @Column()
  mNameEN: string;
  @Column({ nullable: true })
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
  @Column({ nullable: true })
  phone: string;
  @Column()
  emailAddress: string;
  @Column({ default: 1 })
  orgId: number;
  @CreateDateColumn()
  createdAt: Date;
  @Column({ nullable: true })
  createdBy: number;
  @UpdateDateColumn()
  updatedAt: Date;
  @Column({ nullable: true })
  updatedBy: number;
  @Column({ default: 1 })
  active_status: number;
  @OneToMany(() => GenerateTicket, (genTi) => genTi.employees)
  generateTicket: GenerateTicket[];
}
