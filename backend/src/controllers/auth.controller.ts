import { Request, Response, NextFunction } from 'express';
import { UserService } from '../services/user.service.js';
import { hashPassword, comparePassword, generateToken } from '../utils/auth.utils.js';
import { IUserCreate } from '../types/user.types.js';

export class AuthController {
  /**
   * Registers a new user.
   */
  static async register(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { fullName, email, password, role, status } = req.body;

      // Basic validation
      if (!fullName || !email || !password) {
        res.status(400).json({ success: false, error: 'Please provide all required fields: fullName, email, password' });
        return;
      }

      const normalizedEmail = email.toLowerCase().trim();

      // Check if user already exists
      const existingUsers = await UserService.getMany({ email: normalizedEmail });
      if (existingUsers.length > 0) {
        res.status(400).json({ success: false, error: 'Email already in use' });
        return;
      }

      // Create new user (password will be auto-hashed in UserService, but we also ensure safe input defaults)
      const userPayload: IUserCreate = {
        fullName: fullName.trim(),
        email: normalizedEmail,
        password: password,
        role: role || 'user',
        status: status || 'active'
      };

      const newUser = await UserService.createOne(userPayload);

      // Generate JWT token
      const token = generateToken(newUser._id!.toString());

      // Omit password from response
      const { password: _, ...userWithoutPassword } = newUser;

      res.status(201).json({
        success: true,
        user: userWithoutPassword,
        token
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Log in an existing user.
   */
  static async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        res.status(400).json({ success: false, error: 'Please provide email and password' });
        return;
      }

      const normalizedEmail = email.toLowerCase().trim();

      // Find user by email
      const users = await UserService.getMany({ email: normalizedEmail });
      const user = users[0];

      if (!user || !user.password) {
        res.status(401).json({ success: false, error: 'Invalid email or password' });
        return;
      }

      // Compare password
      const isMatch = await comparePassword(password, user.password);
      if (!isMatch) {
        res.status(401).json({ success: false, error: 'Invalid email or password' });
        return;
      }

      // Generate JWT token
      const token = generateToken(user._id!.toString());

      // Omit password from response
      const { password: _, ...userWithoutPassword } = user;

      res.status(200).json({
        success: true,
        user: userWithoutPassword,
        token
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Get the current authenticated user's profile.
   */
  static async getMe(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.user) {
        res.status(401).json({ success: false, error: 'Not authenticated' });
        return;
      }

      res.status(200).json({
        success: true,
        user: req.user
      });
    } catch (error) {
      next(error);
    }
  }
}
