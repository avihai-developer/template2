import { ObjectId, UpdateResult, DeleteResult, BulkWriteResult } from 'mongodb';
import { getDB } from '../config/db.js';
import { IUser, IUserCreate, IUserUpdate } from '../types/user.types.js';

const COLLECTION_NAME = 'users';

export class UserService {
  private static getCollection() {
    return getDB().collection<IUser>(COLLECTION_NAME);
  }

  // 1. Create One
  static async createOne(data: IUserCreate): Promise<IUser> {
    const doc: IUser = {
      ...data,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    const result = await this.getCollection().insertOne(doc as any);
    return { ...doc, _id: result.insertedId };
  }

  // 2. Create Many
  static async createMany(dataArray: IUserCreate[]): Promise<{ insertedCount: number; insertedIds: Record<number, ObjectId> }> {
    const docs = dataArray.map(data => ({
      ...data,
      createdAt: new Date(),
      updatedAt: new Date()
    }));
    const result = await this.getCollection().insertMany(docs as any);
    return {
      insertedCount: result.insertedCount,
      insertedIds: result.insertedIds
    };
  }

  // 3. Get One
  static async getOne(id: string): Promise<IUser | null> {
    if (!ObjectId.isValid(id)) return null;
    return await this.getCollection().findOne({ _id: new ObjectId(id) } as any);
  }

  // 4. Get Many
  static async getMany(query: Record<string, any> = {}): Promise<IUser[]> {
    return await this.getCollection().find(query).toArray();
  }

  // 5. Update One
  static async updateOne(id: string, updateData: IUserUpdate): Promise<UpdateResult | null> {
    if (!ObjectId.isValid(id)) return null;
    const updatePayload = {
      ...updateData,
      updatedAt: new Date()
    };
    return await this.getCollection().updateOne(
      { _id: new ObjectId(id) } as any,
      { $set: updatePayload }
    );
  }

  // 6. Update Many (Same Value)
  static async updateManySameValue(query: Record<string, any>, updateData: IUserUpdate): Promise<UpdateResult> {
    const updatePayload = {
      ...updateData,
      updatedAt: new Date()
    };
    return await this.getCollection().updateMany(query, { $set: updatePayload });
  }

  // 7. Update Many (Different Values)
  static async updateManyDifferentValues(
    updates: { id: string; data: IUserUpdate }[]
  ): Promise<BulkWriteResult> {
    const bulkOps = updates
      .filter(item => ObjectId.isValid(item.id))
      .map(item => {
        const updatePayload = {
          ...item.data,
          updatedAt: new Date()
        };
        return {
          updateOne: {
            filter: { _id: new ObjectId(item.id) },
            update: { $set: updatePayload }
          }
        };
      });

    if (bulkOps.length === 0) {
      throw new Error('No valid IDs provided for bulk update');
    }

    return await this.getCollection().bulkWrite(bulkOps as any);
  }

  // 8. Delete One
  static async deleteOne(id: string): Promise<DeleteResult | null> {
    if (!ObjectId.isValid(id)) return null;
    return await this.getCollection().deleteOne({ _id: new ObjectId(id) } as any);
  }

  // 9. Delete Many
  static async deleteMany(query: Record<string, any>): Promise<DeleteResult> {
    return await this.getCollection().deleteMany(query);
  }
}
