import { videos } from '../db';
import routes from '../routes';

export const home = (req, res) => {
  res.render('home', { pageTitle: 'Home', videos });
}

export const search = (req, res) => {
  const {
    query: { term: searchingBy }
  } = req;
  res.render('search', { pageTitle: 'Search', searchingBy, videos });
};

export const video = (req, res) => res.render('video', { pageTitle: 'Video' });

export const videoDetail = (req, res) => res.render('videoDetail', { pageTitle: 'Video Detail' });

export const getUpload = (req, res) => {
  res.render('upload', { pageTitle: 'Upload' });
}

export const postUpload = (req, res) => {
  const {
    body: { video, title, description }
  } = req;
  // To Do: Upload and save video
  res.redirect(routes.videoDetail(21383));
};

export const editVideo = (req, res) => res.render('editVideo', { pageTitle: 'Edit Video' });

export const deleteVideo = (req, res) => res.render('deleteVideo', { pageTitle: 'Delete Video' });