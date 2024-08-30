import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import type { Person } from '.';

@Entity({ name: 'Address' })
export class Address {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne('Person', 'Address', { onDelete: 'CASCADE', nullable: false })
  person: Person;

  @Column('text')
  locality: string;

  @Column('text')
  street: string;

  @Column('integer')
  number: number;

  @Column('text', { nullable: true })
  notes?: string;
}
