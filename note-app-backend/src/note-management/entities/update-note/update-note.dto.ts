import { IsNotEmpty } from 'class-validator';

export class UpdateNoteDto{
  @IsNotEmpty()
  uuid: string

  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;
}