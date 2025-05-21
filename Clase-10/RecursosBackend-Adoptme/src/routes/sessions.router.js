import { Router } from 'express';
import sessionsController from '../controllers/sessions.controller.js';

const router = Router();


/**
 * @swagger
 * /api/sessions/register:
 *   post:
 *     summary: Registrar un nuevo usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               first_name:
 *                 type: string
 *               last_name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuario registrado
 */
router.post('/register',sessionsController.register);


router.post('/login',sessionsController.login);
router.get('/current',sessionsController.current);
router.get('/unprotectedLogin',sessionsController.unprotectedLogin);
router.get('/unprotectedCurrent',sessionsController.unprotectedCurrent);

export default router;