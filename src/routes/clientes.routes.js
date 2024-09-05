import {Router} from 'express';
import ClienteController from '../controllers/cliente.controller.js';

const router = Router();

router.get('/add', ClienteController.showForm);
router.post('/add', ClienteController.addCliente);
router.get('/list', ClienteController.listClientes);
router.get('/edit/:Cedula', ClienteController.showEditForm);
router.post('/edit/:Cedula', ClienteController.editCliente);
router.get('/delete/:Cedula', ClienteController.deleteCliente);

export default router;
