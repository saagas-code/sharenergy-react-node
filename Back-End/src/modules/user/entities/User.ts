import { v4 } from 'uuid';
import { Client } from './../../client/entities/Client';


var mongoose = require('mongoose');

export class User {
  username: string;
  fullname: string;
  email: string;
  isAdmin?: boolean;
  password: string;
  created_at?: Date;
  clients?: Client[]

  constructor() {
    if(!this.created_at) {
      this.created_at = new Date()
    }
    if(!this.isAdmin) {
      this.isAdmin = false
    }
  }
}