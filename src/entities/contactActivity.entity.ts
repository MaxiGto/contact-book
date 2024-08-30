import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
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

  @ManyToOne('Person', 'contactActivities', {
    cascade: true,
    eager: true,
    nullable: false,
  })
  person: Person;
}
