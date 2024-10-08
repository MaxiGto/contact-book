import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import type { Person } from '.';

export enum ContactActivityType {
  Call = 'call',
  Meeting = 'meeting',
  Email = 'email',
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
    onDelete: 'CASCADE',
  })
  person: Person;
}
