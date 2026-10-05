import { Router } from "express";
import * as usuarioController from "../controllers/usuario.controller";

const router = Router();

router.get('/', usuarioController.getAll);
router.get('/:id', usuarioController.getById);
router.post('/', usuarioController.create);
router.put('/:id', usuarioController.update);
router.delete('/:id', usuarioController.remove);

export default router;