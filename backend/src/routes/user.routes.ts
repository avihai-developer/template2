import { Router } from 'express';
import { UserController } from '../controllers/user.controller.js';

const router = Router();

// Bulk and specific route patterns must be registered FIRST
router.post('/bulk', UserController.createMany);
router.put('/bulk-same', UserController.updateManySameValue);
router.patch('/bulk-diff', UserController.updateManyDifferentValues);
router.delete('/bulk', UserController.deleteMany);

// Dynamic/Standard paths
router.post('/', UserController.createOne);
router.get('/', UserController.getMany);
router.get('/:id', UserController.getOne);
router.put('/:id', UserController.updateOne);
router.delete('/:id', UserController.deleteOne);

export default router;
