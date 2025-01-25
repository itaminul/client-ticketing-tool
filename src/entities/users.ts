import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("users")
export class Users {
  @PrimaryGeneratedColumn()
  id: bigint;
  @Column({ default: 1 })
  old_new_status: number;
  @Column()
  name: string;
  @Column()
  email: string;
  @Column()
  email_address: string;
  @Column()
  email_verified_at: Date;
  @Column()
  password: string;
  @Column()
  image: string;
  @Column()
  signature: string;
  @Column()
  address: string;
  @Column()
  phase_no: number;
  @Column({ default: 1 })
  doctorId: number;
  @Column({ default: 1 })
  org_id: number;
  @Column()
  course_type: number;
  @Column()
  course_name: number;
  @Column()
  contact_no: string;
  @Column()
  department_id: number;
  @Column()
  batch_id: number;
  @Column()
  student_id: number;
  @Column()
  student_type: number;
  @Column()
  usergrp_id: number;
  @Column()
  userlevel_id: number;
  @Column()
  designation: number;
  @Column()
  roll_id: number;
  @Column()
  remember_token: string;
  @Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
  created_at: Date;
  @Column({ type: "datetime", nullable: true })
  updated_at: Date;
  @Column({ default: 1 })
  active_status: number;
  @Column({ default: 0 })
  is_admin: number;
  @Column()
  last_login: string;
}
