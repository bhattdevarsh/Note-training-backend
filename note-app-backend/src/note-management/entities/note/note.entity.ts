import { Column, ObjectIdColumn, ObjectID, Entity, BaseEntity } from 'typeorm';

@Entity()
export class Note extends BaseEntity {
  @ObjectIdColumn()
  _id: ObjectID;

  @Column()
  uuid: string;

  @Column()
  title: string;

  @Column()
  description: string;

  constructor() {
    super();
  }
}
