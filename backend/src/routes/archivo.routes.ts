import { Router } from "express";
import * as archivoController from "../controllers/archivo.controller";

const router = Router();

router.get('/', archivoController.getAll);
router.get('/nombre/:nombre', archivoController.getByName);
router.get('/carpeta/:id_carpeta', archivoController.listByFolder);
router.get('/:id', archivoController.getById);
router.post('/', archivoController.create);
router.put('/:id', archivoController.update);
router.delete('/:id', archivoController.remove);

export default router;
