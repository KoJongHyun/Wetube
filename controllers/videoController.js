import routes from '../routes';
import Video from '../models/Video';

export const home = async(req, res) => {
  try {
    const videos = await Video.find({}).sort({ _id: -1 });
    res.render('home', { pageTitle: 'Home', videos });
  } catch (error) {
    res.render('home', { pageTitle: 'Home', videos: [] });
  }
}

export const search = async(req, res) => {
  const {
    query: { term: searchingBy }
  } = req;
  let videos = [];
  try {
    videos = await Video.find({ title: { $regex: searchingBy, $options: 'i' } });
  } catch (error) {
    console.log(error);
  }
  res.render('search', { pageTitle: 'Search', videos, searchingBy });
}

export const video = (req, res) => res.render('video', { pageTitle: 'Video' });

export const videoDetail = async(req, res) => {
  const {
    params: { id }
  } = req;
  try {
    const video = await Video.findById(id).populate('creator');
    res.render('videoDetail', { pageTitle: video.title, video })
  } catch (error) {
    res.redirect(routes.home);
  }
}

export const getUpload = (req, res) => {
  res.render('upload', { pageTitle: 'Upload' });
}

export const postUpload = async(req, res) => {
  const {
    body: { title, description },
    file: { path }
  } = req;
  const newVideo = await Video.create({
    fileURL: path,
    title,
    description,
    creator: req.user.id
  });
  req.user.videos.push(newVideo.id);
  req.user.save();
  res.redirect(routes.videoDetail(newVideo.id));
}

export const getEditVideo = async(req, res) => {
  const {
    params: { id }
  } = req;
  try {
    const video = await Video.findById(id);
    if (video.creator == req.user.id) {
      res.render('editVideo', { pageTitle: `Edit ${video.title}`, video });
    } else {
      throw Error();
    }
  } catch (error) {
    res.redirect(routes.home);
  }
}

export const postEditVideo = async(req, res) => {
  const {
    body: { title, description },
    params: { id }
  } = req;
  try {
    const video = await Video.findByIdAndUpdate({ _id: id }, { title, description });
    res.redirect(routes.videoDetail(video.id));
  } catch (error) {
    res.redirect(routes.home);
  }
}

export const deleteVideo = async(req, res) => {
  const {
    params: { id }
  } = req;
  try {
    const video = await Video.findById(id);
    if (video.creator == req.user.id) {
      await Video.findByIdAndRemove({ _id: id });
    } else {
      throw Error;
    }
  } catch (error) {}
  res.redirect(routes.home);
}