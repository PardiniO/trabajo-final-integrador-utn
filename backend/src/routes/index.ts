import { Router } from "express";
import usuarioRoutes from "./usuario.routes";
import archivoRoutes from "./archivo.routes";

const router = Router();

router.use('/usuarios', usuarioRoutes);
router.use('/archivos', archivoRoutes);

export default router;