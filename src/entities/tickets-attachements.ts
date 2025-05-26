import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { GenerateTicket } from "./generate-tickets";

@Entity("tiAttachments")
export class TicketAttachments {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  attachementTitile: string;
  @Column()
  attachementDscripton: string;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => GenerateTicket, (geTicket) => geTicket.tiAttachments)
  generateTicket: GenerateTicket;
}
