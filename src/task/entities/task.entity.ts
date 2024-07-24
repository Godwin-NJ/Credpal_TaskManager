import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import {
  Contains,
  IsInt,
  Length,
  IsEmail,
  IsFQDN,
  IsDate,
  Min,
  Max,
} from 'class-validator';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsInt()
  userId: number;

  @Column()
  title: string;

  @Column()
  task: string;

  @Column()
  assignedTo: string; //name of user to manage task

  @IsDate()
  createDate: Date;
}
