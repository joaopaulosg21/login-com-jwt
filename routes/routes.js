import { Router } from "express";
import UserController from "../controllers/userController.js";
import checkToken from "../checkToken.js";
const router = Router();
const user = new UserController()

router.post('/add',user.newUser);

router.get('/',checkToken,user.viewUsers);

router.post('/login',user.login);

router.put('/update',checkToken,user.updateUser);


export default router;
