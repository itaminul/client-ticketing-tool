import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Client } from "./client";
import { GenerateTicket } from "./generate-tickets";

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
  @Column({ nullable: true })
  createdBy: number;
  @UpdateDateColumn()
  updatedAt: Date;
  @Column({ nullable: true })
  updatedBy: number;
  @Column({ default: 1 })
  active_status: number;

  @ManyToOne(() => Client, (clint) => clint.projects)
  client: Client;

  @OneToMany(() => GenerateTicket, (generateTicket) => generateTicket.project)
  generateTicket: GenerateTicket;
}
