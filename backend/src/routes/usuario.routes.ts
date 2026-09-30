import { Router } from "express";
import * as usuarioController from "../controllers/usuario.controller";

const router = Router();

router.get('/', usuarioController.getAll);
router.get('/:id', usuarioController.getById);
router.post('/', usuarioController.create);
router.put('/', usuarioController.update);
router.delete('/', usuarioController.remove);

export default router;