import { Request, Response, NextFunction } from 'express';
import { UserService } from '../services/user.service.js';

export class UserController {
  // 1. Create One
  static async createOne(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await UserService.createOne(req.body);
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
      const result = await UserService.createMany(req.body);
      res.status(201).json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  }

  // 3. Get One
  static async getOne(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const result = await UserService.getOne(id);
      if (!result) {
        res.status(404).json({ success: false, error: 'User not found' });
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
      const result = await UserService.getMany(query);
      res.status(200).json({ success: true, count: result.length, data: result });
    } catch (error) {
      next(error);
    }
  }

  // 5. Update One
  static async updateOne(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const result = await UserService.updateOne(id, req.body);
      if (!result || result.matchedCount === 0) {
        res.status(404).json({ success: false, error: 'User not found or no changes made' });
        return;
      }
      res.status(200).json({ success: true, message: 'User updated successfully', result });
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
      const result = await UserService.updateManySameValue(query, updateData);
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
      const result = await UserService.updateManyDifferentValues(updates);
      res.status(200).json({ success: true, matchedCount: result.matchedCount, modifiedCount: result.modifiedCount });
    } catch (error) {
      next(error);
    }
  }

  // 8. Delete One
  static async deleteOne(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const result = await UserService.deleteOne(id);
      if (!result || result.deletedCount === 0) {
        res.status(404).json({ success: false, error: 'User not found' });
        return;
      }
      res.status(200).json({ success: true, message: 'User deleted successfully' });
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
      const result = await UserService.deleteMany(query);
      res.status(200).json({ success: true, deletedCount: result.deletedCount });
    } catch (error) {
      next(error);
    }
  }
}
