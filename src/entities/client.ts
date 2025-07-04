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
  @Column()
  clientDescripton: string;
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

  @OneToMany(() => Projects, (project) => project.client)
  projects: Projects[];

  @OneToMany(() => GenerateTicket, (generateTicket) => generateTicket.clients)
  generateTicket: GenerateTicket;
}
