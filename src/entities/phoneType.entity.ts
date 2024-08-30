import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import type { Phone } from '.';

export enum PhoneTypeEnum {
  LANDLINE = 'LANDLINE',
  MOBILE = 'MOBILE',
}

@Entity({ name: 'PhoneType' })
export class PhoneType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'simple-enum',
    enum: PhoneTypeEnum,
  })
  typeName: PhoneTypeEnum;

  @OneToMany('Phone', 'phoneType')
  phones: Phone[];
}
