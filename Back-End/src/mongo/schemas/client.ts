import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose'
import {User} from './user'
import * as mongoose from "mongoose"

export interface ClientMongo {
  _id: string
  name: string
  email: string
  phone: string;
  address: string;
  cpf: string
  user_id: string
  created_at: Date
  updated_at: Date
}

export type ClientDocument = Client & Document

@Schema({collection: 'clients',versionKey: false})
export class Client {
  @Prop({required: true})
  name: string
  @Prop({required: true})
  email: string
  @Prop()
  phone: string;
  @Prop()
  address: string;
  @Prop({required: true})
  cpf: string
  @Prop({type: mongoose.Types.ObjectId, ref: 'user'})
  user_id: string
  @Prop()
  created_at: Date
  @Prop()
  updated_at: Date
  
}
export const ClientSchema = SchemaFactory.createForClass(Client)
