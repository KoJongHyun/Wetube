import express from 'express';
import routes from '../routes';
import { user, userDetail, editProfile, changePassword } from '../controllers/userController';
import { onlyPrivate } from '../middlewares';
const userRouter = express.Router();

userRouter.get("/", user);
userRouter.get(routes.editProfile, onlyPrivate, editProfile);
userRouter.get(routes.changePassword, onlyPrivate, changePassword);
userRouter.get(routes.userDetail(), onlyPrivate, userDetail);

export default userRouter;