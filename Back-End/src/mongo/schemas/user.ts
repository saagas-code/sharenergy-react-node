import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document, SchemaTypes, Types } from 'mongoose'
import { Client } from 'src/mongo/schemas/client';

export interface UserMongo {
  _id: string;
  username: string;
  fullname: string;
  email: string;
  password: string;
  isAdmin: boolean
  created_at: Date;
  clients: Client[]
}

export type UserDocument = User & Document

@Schema({collection: 'users', versionKey: false})
export class User {
  @Prop({required: true})
  username: string;
  @Prop({required: true})
  fullname: string;
  @Prop({required: true, unique: true})
  email: string;
  @Prop({required: true})
  password: string;
  @Prop({required: true})
  isAdmin: boolean
  @Prop({required: true})
  created_at: Date;
  @Prop({
    ref: 'client',
    type: [mongoose.Types.ObjectId]
  })
  clients: Array<Client>
}

export const UserSchema = SchemaFactory.createForClass(User)