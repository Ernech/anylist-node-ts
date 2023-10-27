import { Router, Request } from "express";
import { completeListItem, createListItem, modifyListItem } from "../controller/listItem";
import validateToken from "../middlewares/validate-token";
import { validateFields } from "../middlewares/validate-fields";
import { check } from "express-validator";
import List from "../models/list";
import Item from "../models/items";

const router = Router();
router.post('/list/:listId/item/:itemId', [validateToken,
    check('listId').isUUID(),
    check('itemId').isUUID(),
    check('quantity').isNumeric(),
    check('itemId').custom(async(val:string, {req}) => {
        const { user } = req;
        const item = await Item.findOne({
            where: {
                id: val,
                isActive: true,
                userId: user?.id,
            },
        });
    
        if (!item) {
            throw new Error(`Item with the ID ${val} doesn't exist`);
        }
    }),
    check('listId').custom(async (val: string, { req }) => {
        const { user } = req;

        const item = await List.findOne({
            where: {
                id: val,
                status: true,
                userId: user?.id
            }
        });
        if (!item) {
            throw new Error(`List with the ${val} doesn't exits`)
        }

    }),
    validateFields],
    createListItem);

router.patch('/:id', [validateToken, check('id').isUUID(), validateFields], completeListItem);

router.put('/:id/list/:listId/item/:itemId',[validateToken,
check('id').isUUID(),
check('listId').isUUID(),
check('itemId').isUUID(),
check('quantity').isNumeric(),
check('itemId').custom(async(val:string, {req}) => {
    const { user } = req;
    const item = await Item.findOne({
        where: {
            id: val,
            isActive: true,
            userId: user?.id,
        },
    });

    if (!item) {
        throw new Error(`Item with the ID ${val} doesn't exist`);
    }
}),
check('listId').custom(async (val: string, { req }) => {
    const { user } = req;

    const item = await List.findOne({
        where: {
            id: val,
            status: true,
            userId: user?.id
        }
    });
    if (!item) {
        throw new Error(`List with the ${val} doesn't exits`)
    }

}),
validateFields], modifyListItem)



export default router;