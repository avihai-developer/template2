import { ObjectId } from 'mongodb';

export interface IUser {
  _id?: ObjectId;
  fullName: string;
  email: string;
  password?: string;
  role: string;
  status: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export type IUserCreate = Omit<IUser, '_id' | 'createdAt' | 'updatedAt'>;
export type IUserUpdate = Partial<IUserCreate>;
