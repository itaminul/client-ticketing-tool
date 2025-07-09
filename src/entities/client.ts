import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Projects } from "./projects";
import { GenerateTicket } from "./generate-tickets";

@Entity("client")
export class Client {
  @PrimaryGeneratedColumn()
  id: bigint;
  @Column()
  clientName: string;
  @Column({ nullable: true })
  clientDescripton: string;
  @Column()
  address: string;
  @Column()
  contactNo: string;
  @Column({ nullable: true })
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

  @OneToMany(() => Projects, (project) => project.client)
  projects: Projects[];

  @OneToMany(() => GenerateTicket, (generateTicket) => generateTicket.clients)
  generateTicket: GenerateTicket;
}
