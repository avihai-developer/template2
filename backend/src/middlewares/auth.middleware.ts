import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/auth.utils.js';
import { UserService } from '../services/user.service.js';
import { IUser } from '../types/user.types.js';

// Extend Express Request interface to include req.user
declare global {
  namespace Express {
    interface Request {
      user?: Omit<IUser, 'password'>;
    }
  }
}

/**
 * Middleware to protect routes and verify JWT tokens.
 */
export async function protect(req: Request, res: Response, next: NextFunction): Promise<void> {
  let token: string | undefined;

  // Check if Bearer token is provided in the Authorization header
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Extract the token
      token = req.headers.authorization.split(' ')[1];

      // Decode/Verify token
      const decoded = verifyToken(token);

      if (!decoded || !decoded.id) {
        res.status(401).json({ success: false, error: 'Not authorized, invalid token payload' });
        return;
      }

      // Fetch user from database
      const user = await UserService.getOne(decoded.id);

      if (!user) {
        res.status(401).json({ success: false, error: 'Not authorized, user no longer exists' });
        return;
      }

      // Attach user details to request object, omitting password
      const { password, ...userWithoutPassword } = user;
      req.user = userWithoutPassword;

      next();
    } catch (error) {
      res.status(401).json({ success: false, error: 'Not authorized, token verification failed' });
    }
  } else {
    res.status(401).json({ success: false, error: 'Not authorized, no token provided' });
  }
}
