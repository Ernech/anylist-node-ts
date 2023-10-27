import {Router} from "express";
import { deleteItem, getItems, getItemsByListId, postItem, updateItem } from "../controller/items";
import validateToken from "../middlewares/validate-token";
import { check } from "express-validator";
import { validateFields } from "../middlewares/validate-fields";


const router  = Router();

router.post('/',[validateToken,check('name').notEmpty(), check('quantityUnits').notEmpty(),validateFields],postItem);
router.get('/',[validateToken],getItems);
router.put('/:id',[validateToken,check('id').isUUID(),check('name').notEmpty(), check('quantityUnits').notEmpty(),validateFields],updateItem);
router.delete('/:id',[validateToken,check('id').isUUID(),validateFields],deleteItem);
router.get('/list/:id',[validateToken,check('id').isUUID(),validateFields],getItemsByListId)

export default router;