import express from 'express';
import routes from '../routes';
import { user, userDetail, getEditProfile, postEditProfile, changePassword } from '../controllers/userController';
import { onlyPrivate, uploadAvatar } from '../middlewares';
const userRouter = express.Router();

userRouter.get("/", user);
userRouter.get(routes.editProfile, onlyPrivate, getEditProfile);
userRouter.post(routes.editProfile, onlyPrivate, uploadAvatar, postEditProfile);
userRouter.get(routes.changePassword, onlyPrivate, changePassword);
userRouter.get(routes.userDetail(), onlyPrivate, userDetail);

export default userRouter;