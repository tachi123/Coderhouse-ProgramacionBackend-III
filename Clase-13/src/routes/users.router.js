import { Router } from 'express';
import usersController from '../controllers/users.controller.js';
import uploader from '../utils/uploader.js';

const router = Router();


router.get('/',usersController.getAllUsers);

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Obtiene un usuario por ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Usuario encontrado
 *       404:
 *         description: Usuario no encontrado
 */
router.get('/:uid',usersController.getUser);


router.put('/:uid',usersController.updateUser);
router.delete('/:uid',usersController.deleteUser);

router.post('/:uid/documents', uploader.array('documents'), usersController.uploadDocuments);

export default router;