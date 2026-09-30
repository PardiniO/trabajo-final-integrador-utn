import { Router } from "express";
import usuarioRoutes from "./usuario.routes";

const router = Router();

router.use('/usuarios', usuarioRoutes);
// colocar los demas routes de las demas entidades

export default router;