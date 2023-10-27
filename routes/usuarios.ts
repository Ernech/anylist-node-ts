import {Router} from 'express'
import { deleteUsuario, getUsuarioPorId, getUsuarios, postUsuario, putUsuario } from '../controller/usuarios';
import { validateFields } from '../middlewares/validate-fields';
import { check } from 'express-validator';

const router = Router();


router.get('/',getUsuarios)

router.get('/:id',getUsuarioPorId)

router.post('/',[check('name').notEmpty(),
    check('email').isEmail(),
    check('password'),
    check('roles').notEmpty()
,validateFields],postUsuario)

router.put('/:id',putUsuario)

router.delete('/:id',deleteUsuario)



export default router