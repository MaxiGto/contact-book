import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import type { Address, Phone, ContactActivity } from '.';

@Entity({ name: 'Person' })
export class Person {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  firstName: string;

  @Column('text')
  lastName: string;

  @Column({ type: 'date' })
  dateOfBirth: string;

  @Column('text', {
    unique: true,
  })
  email: string;

  @OneToMany('Phone', 'person', {
    cascade: true,
    eager: true,
  })
  phones: Phone[];

  @OneToMany('Address', 'person', {
    cascade: true,
    eager: true,
  })
  addresses: Address[];

  @OneToMany('ContactActivity', 'persons')
  contactActivities: ContactActivity[];
}
