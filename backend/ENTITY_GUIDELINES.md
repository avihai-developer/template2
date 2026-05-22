# Native MongoDB Entity Creation Guidelines

This document details the standard blueprint for adding new database entities to the Node.js Express + TypeScript backend. Every new entity must implement standard controllers, services, and routes containing exactly 9 essential operations using the raw MongoDB driver (without Mongoose).

---

## 📂 Folder Structure

When adding a new entity (e.g., `<name>`), create the following files:

```
backend/src/
├── types/
│   └── <name>.types.ts        # Interfaces and types
├── services/
│   └── <name>.service.ts       # MongoDB Native queries & business logic
├── controllers/
│   └── <name>.controller.ts    # HTTP request and response handler
└── routes/
    └── <name>.routes.ts        # Route endpoints
```

---

## 🛠️ The 9 Required CRUD Operations

Every entity must support these 9 operations:

| # | Operation | HTTP Method | Endpoint | Service Implementation |
|---|---|---|---|---|
| 1 | **Create One** | `POST` | `/api/<entity>` | `collection.insertOne()` |
| 2 | **Create Many** | `POST` | `/api/<entity>/bulk` | `collection.insertMany()` |
| 3 | **Get One** | `GET` | `/api/<entity>/:id` | `collection.findOne()` |
| 4 | **Get Many** | `GET` | `/api/<entity>` | `collection.find().toArray()` |
| 5 | **Update One** | `PUT` | `/api/<entity>/:id` | `collection.updateOne()` |
| 6 | **Update Many (Same Value)** | `PUT` | `/api/<entity>/bulk-same` | `collection.updateMany()` |
| 7 | **Update Many (Different Values)** | `PATCH` | `/api/<entity>/bulk-diff` | `collection.bulkWrite()` |
| 8 | **Delete One** | `DELETE` | `/api/<entity>/:id` | `collection.deleteOne()` |
| 9 | **Delete Many** | `DELETE` | `/api/<entity>/bulk` | `collection.deleteMany()` |

---

## 📝 Code Templates

Use the following templates as a baseline for creating the entity files (replacing `Example` and `example` with your entity's name).

### 1. Types (`src/types/example.types.ts`)

```typescript
import { ObjectId } from 'mongodb';

export interface IExample {
  _id?: ObjectId;
  name: string;
  value: number;
  status: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export type IExampleCreate = Omit<IExample, '_id' | 'createdAt' | 'updatedAt'>;
export type IExampleUpdate = Partial<IExampleCreate>;
```

### 2. Service (`src/services/example.service.ts`)

```typescript
import { ObjectId, UpdateResult, DeleteResult, BulkWriteResult } from 'mongodb';
import { getDB } from '../config/db';
import { IExample, IExampleCreate, IExampleUpdate } from '../types/example.types';

const COLLECTION_NAME = 'examples';

export class ExampleService {
  private static getCollection() {
    return getDB().collection<IExample>(COLLECTION_NAME);
  }

  // 1. Create One
  static async createOne(data: IExampleCreate): Promise<IExample> {
    const doc: IExample = {
      ...data,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    const result = await this.getCollection().insertOne(doc as any);
    return { ...doc, _id: result.insertedId };
  }

  // 2. Create Many
  static async createMany(dataArray: IExampleCreate[]): Promise<{ insertedCount: number; insertedIds: Record<number, ObjectId> }> {
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
  static async getOne(id: string): Promise<IExample | null> {
    if (!ObjectId.isValid(id)) return null;
    return await this.getCollection().findOne({ _id: new ObjectId(id) } as any);
  }

  // 4. Get Many
  static async getMany(query: Record<string, any> = {}): Promise<IExample[]> {
    return await this.getCollection().find(query).toArray();
  }

  // 5. Update One
  static async updateOne(id: string, updateData: IExampleUpdate): Promise<UpdateResult | null> {
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
  static async updateManySameValue(query: Record<string, any>, updateData: IExampleUpdate): Promise<UpdateResult> {
    const updatePayload = {
      ...updateData,
      updatedAt: new Date()
    };
    return await this.getCollection().updateMany(query, { $set: updatePayload });
  }

  // 7. Update Many (Different Values)
  static async updateManyDifferentValues(
    updates: { id: string; data: IExampleUpdate }[]
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
```

### 3. Controller (`src/controllers/example.controller.ts`)

```typescript
import { Request, Response, NextFunction } from 'express';
import { ExampleService } from '../services/example.service';

export class ExampleController {
  // 1. Create One
  static async createOne(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await ExampleService.createOne(req.body);
      res.status(201).json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  }

  // 2. Create Many
  static async createMany(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!Array.isArray(req.body)) {
        res.status(400).json({ success: false, error: 'Request body must be an array' });
        return;
      }
      const result = await ExampleService.createMany(req.body);
      res.status(201).json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  }

  // 3. Get One
  static async getOne(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const result = await ExampleService.getOne(id);
      if (!result) {
        res.status(404).json({ success: false, error: 'Document not found' });
        return;
      }
      res.status(200).json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  }

  // 4. Get Many
  static async getMany(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const query = req.query || {};
      const result = await ExampleService.getMany(query);
      res.status(200).json({ success: true, count: result.length, data: result });
    } catch (error) {
      next(error);
    }
  }

  // 5. Update One
  static async updateOne(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const result = await ExampleService.updateOne(id, req.body);
      if (!result || result.matchedCount === 0) {
        res.status(404).json({ success: false, error: 'Document not found or no changes made' });
        return;
      }
      res.status(200).json({ success: true, message: 'Document updated successfully', result });
    } catch (error) {
      next(error);
    }
  }

  // 6. Update Many (Same Value)
  static async updateManySameValue(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { query, updateData } = req.body;
      if (!query || !updateData) {
        res.status(400).json({ success: false, error: 'Both query and updateData fields are required' });
        return;
      }
      const result = await ExampleService.updateManySameValue(query, updateData);
      res.status(200).json({ success: true, modifiedCount: result.modifiedCount, result });
    } catch (error) {
      next(error);
    }
  }

  // 7. Update Many (Different Values)
  static async updateManyDifferentValues(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { updates } = req.body;
      if (!Array.isArray(updates)) {
        res.status(400).json({ success: false, error: 'Request body must contain an updates array' });
        return;
      }
      const result = await ExampleService.updateManyDifferentValues(updates);
      res.status(200).json({ success: true, matchedCount: result.matchedCount, modifiedCount: result.modifiedCount });
    } catch (error) {
      next(error);
    }
  }

  // 8. Delete One
  static async deleteOne(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const result = await ExampleService.deleteOne(id);
      if (!result || result.deletedCount === 0) {
        res.status(404).json({ success: false, error: 'Document not found' });
        return;
      }
      res.status(200).json({ success: true, message: 'Document deleted successfully' });
    } catch (error) {
      next(error);
    }
  }

  // 9. Delete Many
  static async deleteMany(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { query } = req.body;
      if (!query || Object.keys(query).length === 0) {
        res.status(400).json({ success: false, error: 'A valid query filter object is required to delete multiple records' });
        return;
      }
      const result = await ExampleService.deleteMany(query);
      res.status(200).json({ success: true, deletedCount: result.deletedCount });
    } catch (error) {
      next(error);
    }
  }
}
```

### 4. Router (`src/routes/example.routes.ts`)

```typescript
import { Router } from 'express';
import { ExampleController } from '../controllers/example.controller';

const router = Router();

// Bulk and specific route patterns must be registered FIRST
router.post('/bulk', ExampleController.createMany);
router.put('/bulk-same', ExampleController.updateManySameValue);
router.patch('/bulk-diff', ExampleController.updateManyDifferentValues);
router.delete('/bulk', ExampleController.deleteMany);

// Dynamic/Standard paths
router.post('/', ExampleController.createOne);
router.get('/', ExampleController.getMany);
router.get('/:id', ExampleController.getOne);
router.put('/:id', ExampleController.updateOne);
router.delete('/:id', ExampleController.deleteOne);

export default router;
```

---

## 🔗 Route Mounting Pattern

When integrating your router into `src/index.ts`, mount it like this:

```typescript
import exampleRoutes from './routes/example.routes';

// Mount routes
app.use('/api/examples', exampleRoutes);
```
