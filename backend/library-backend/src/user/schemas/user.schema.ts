
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Role } from './users.types';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {

  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  photo:string

  @Prop({ default: Role.User })
  role: string[];
  
  @Prop({ default: Role.User })
  favorites: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);
