import { Router } from "express";
import { login } from "../controller/auth";
import { validateFields } from "../middlewares/validate-fields";
import { check } from "express-validator";

const router = Router();

router.post('/',[check('email').isEmail(), check('password').notEmpty(), validateFields], login);


export default router;