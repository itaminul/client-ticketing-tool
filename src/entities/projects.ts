import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Client } from "./client";

@Entity("projects")
export class Projects {
  @PrimaryGeneratedColumn()
  id: bigint;
  @Column()
  projectName: string;
  @Column()
  projectDescripton: string;
  @Column()
  address: string;
  @Column()
  contactNo: string;
  @Column()
  phone: string;
  @Column()
  emailAddress: string;
  @Column({ default: 1 })
  org_id: number;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
  @Column({ default: 1 })
  active_status: number;

  @ManyToMany(() => Client, (clint) => clint.projects)
  clients: Client;
}
