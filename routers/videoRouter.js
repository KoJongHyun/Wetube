import express from 'express';
import routes from '../routes';
import { video, videoDetail, getUpload, postUpload, getEditVideo, postEditVideo, deleteVideo } from '../controllers/videoController';
import { uploadVideo, onlyPrivate } from '../middlewares';

const videoRouter = express.Router();

videoRouter.get("/", video);

// Upload video
videoRouter.get(routes.upload, onlyPrivate, getUpload);
videoRouter.post(routes.upload, onlyPrivate, uploadVideo, postUpload);

// Edit video
videoRouter.get(routes.editVideo(), onlyPrivate, getEditVideo);
videoRouter.post(routes.editVideo(), onlyPrivate, postEditVideo);

// Delete video
videoRouter.get(routes.deleteVideo(), onlyPrivate, deleteVideo);

// Detail video
videoRouter.get(routes.videoDetail(), videoDetail);

export default videoRouter;