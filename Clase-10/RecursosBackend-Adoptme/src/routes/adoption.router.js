import { Router} from 'express';
import adoptionsController from '../controllers/adoptions.controller.js';

const router = Router();

router.get('/',adoptionsController.getAllAdoptions);
router.get('/:aid',adoptionsController.getAdoption);


/**
 * @swagger
 * /api/adoptions/{uid}/{pid}:
 *   post:
 *     summary: Procesar una adopción
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario
 *       - in: path
 *         name: pid
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la mascota
 *     responses:
 *       201:
 *         description: Adopción procesada
 */
router.post('/:uid/:pid',adoptionsController.createAdoption);

export default router;