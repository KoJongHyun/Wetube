import express from 'express';
import routes from '../routes';
import { video, videoDetail, getUpload, postUpload, getEditVideo, postEditVideo, deleteVideo } from '../controllers/videoController';
import { uploadVideo } from '../middlewares';

const videoRouter = express.Router();

videoRouter.get("/", video);

// Upload video
videoRouter.get(routes.upload, getUpload);
videoRouter.post(routes.upload, uploadVideo, postUpload);

// Edit video
videoRouter.get(routes.editVideo(), getEditVideo);
videoRouter.post(routes.editVideo(), postEditVideo);

// Delete video
videoRouter.get(routes.deleteVideo(), deleteVideo);

// Detail video
videoRouter.get(routes.videoDetail(), videoDetail);

export default videoRouter;