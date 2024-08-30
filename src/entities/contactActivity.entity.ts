import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';
import type { Person } from '.';

export enum ContactActivityType {
  CALL = 'call',
  MEETING = 'meeting',
  EMAIL = 'email',
}

@Entity({ name: 'ContactActivity' })
export class ContactActivity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'simple-enum',
    enum: ContactActivityType,
  })
  activityType: ContactActivityType;

  @Column('text')
  activityDate: string;

  @Column('text', { nullable: true })
  description?: string;

  @ManyToMany('Person', 'contactActivities', {
    cascade: true,
    eager: true,
  })
  @JoinTable()
  persons: Person[];
}
