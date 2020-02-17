import { Column, Entity, BaseEntity, ObjectIdColumn, ObjectID } from 'typeorm';

@Entity()
export class UpdateNote extends BaseEntity {
 
  @ObjectIdColumn()
  _id: ObjectID

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
