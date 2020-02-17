import { IsOptional, IsNotEmpty } from 'class-validator';

export class NoteDto {
  @IsOptional()
  uuid: string;

  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;
}