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

@Entity("generateTicket")
export class GenerateTicket {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  titile: string;
  @Column()
  descripton: string;
  @Column()
  ticketStartDate: Date;
  @Column()
  ticketEndDate: Date;
  @Column({ default: 0 })
  ticketStatus: number;
  @Column()
  ticketFeedback: string;
  @Column()
  remarks: string;
  @Column({ default: 1 })
  org_id: number;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
  @Column({ default: 1 })
  active_status: number;

  @ManyToOne(() => Client, (clint) => clint.projects)
  client: Client;

  @Column()
  protected: number;
  @Column()
  clientId: number;

  @Column()
  ticketTypeId: number;

  @Column()
  ticketAssigned: number;

  @Column()
  ticketAssignedTo: number;

  @OneToMany(() => TicketAttachments, (tiAttach) => tiAttach.generateTicket)
  tiAttachments: TicketAttachments[];
}
