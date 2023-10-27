import { Router } from "express";
import validateToken from "../middlewares/validate-token";
import { validateFields } from "../middlewares/validate-fields";
import { check } from "express-validator";
import { deleteList, getListByIdWithTheirItems, getLists, postList, updateList } from "../controller/list";

const router = Router();

router.post('/',[validateToken,check('name').notEmpty(),validateFields],postList);
router.get('/',[validateToken],getLists);
router.put('/:id',[validateToken,check('id').isUUID(),check('name').notEmpty(),validateFields], updateList);
router.delete('/:id',[validateToken,check('id').isUUID(), validateFields],deleteList);
router.get('/:id/items',[validateToken,check('id').isUUID(),validateFields], getListByIdWithTheirItems);
export default router;