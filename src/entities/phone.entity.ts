import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import type { Person, PhoneType } from '.';

@Entity({ name: 'Phone' })
export class Phone {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text', {
    unique: true,
  })
  number: string;

  @ManyToOne('Person', 'phone', { onDelete: 'CASCADE', nullable: false })
  person: Person;

  @ManyToOne('PhoneType', 'phone', {
    cascade: true,
    eager: true,
    nullable: false,
  })
  phoneType: PhoneType;
}
