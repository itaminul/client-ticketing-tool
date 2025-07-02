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
import { TicketAttachments } from "./tickets-attachements";
import { Projects } from "./projects";
import { Employees } from "./employees";

@Entity("generateTicket")
export class GenerateTicket {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  titile: string;
  @Column({ nullable: true })
  descripton: string;
  @Column()
  ticketStartDate: Date;
  @Column({ nullable: true })
  ticketEndDate: Date;
  @Column({ default: 0 })
  ticketStatus: number;
  @Column({ nullable: true })
  ticketFeedback: string;
  @Column({ nullable: true })
  remarks: string;
  @Column({ default: 1 })
  orgId: number;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
  @Column({ default: 1 })
  active_status: number;
  @ManyToOne(() => Client, (clint) => clint.projects)
  client: Client;
  @ManyToOne(() => Projects, (pro) => pro.generateTicket)
  project: Projects[];
  @ManyToOne(() => Client, (pro) => pro.generateTicket)
  clients: Client[];
  @Column({ nullable: true })
  ticketTypeId: number;
  @Column({ nullable: true })
  ticketAssigned: number;
  @Column({ nullable: true })
  ticketAssignedTo: number;
  @OneToMany(() => TicketAttachments, (tiAttach) => tiAttach.generateTicket)
  tiAttachments: TicketAttachments[];
  @OneToMany(() => Employees, (emp) => emp.generateTicket)
  employees: Employees[];
}
