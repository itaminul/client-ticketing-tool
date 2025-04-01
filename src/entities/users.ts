import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Roles } from "./role";


@Entity("users")
export class Users {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ nullable: true })
  name: string;
  @Column({ nullable: false })
  username: string;
  @Column({ nullable: true })
  email: string;
  @Column()
  password: string;
  @Column({ nullable: true })
  image: string;
  @Column({ nullable: true })
  signature: string;
  @Column({ nullable: true })
  address: string;
  @Column({ default: 1 })
  org_id: number;
  @Column()
  usergrp_id: number;
  @Column()
  userlevel_id: number;
  @Column()
  roll_id: number;
  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
  @Column({ default: 1 })
  active_status: number;
  @Column({ nullable: true })
  last_login: string;
  @Column()
  userRoleName: string;
  @Column({ nullable: false })
  createdby: number;
  @Column({ nullable: true })
  updatedby: number;

  @ManyToOne(() => Roles, (role) => role.users)
  @JoinColumn({ name: "role_id" })
  role: Roles;
}
