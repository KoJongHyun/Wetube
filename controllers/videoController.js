import routes from '../routes';
import Video from '../models/Video';
import Comment from '../models/Comment';
import moment from 'moment';

export const home = async(req, res) => {
  try {
    const videos = await Video.find({}).sort({ _id: -1 });
    res.render('home', { pageTitle: 'Home', videos });
  } catch (error) {
    res.render('home', { pageTitle: 'Home', videos: [] });
  }
}

// Search Video
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

// Video Detail
export const videoDetail = async(req, res) => {
  const {
    params: { id }
  } = req;
  try {
    const video = await Video.findById(id).populate('creator').populate('comments');
    let commentList = [];
    for (let i = 0; i < video.comments.length; i++) {
      commentList.push(await Comment.findById(video.comments[i].id).populate('creator'));
    }
    res.render('videoDetail', { pageTitle: video.title, video, commentList, moment });
  } catch (error) {
    res.redirect(routes.home);
  }
}

// Upload Video
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

// Edit Video
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

// Delete Video
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

// Register Video View
export const postRegisterView = async(req, res) => {
  const {
    params: { id }
  } = req;
  try {
    const video = await Video.findById(id);
    video.views += 1;
    video.save();
    res.status(200);
  } catch (error) {
    res.status(400);
  } finally {
    res.end();
  }
}

// Add Comment
export const postAddComment = async(req, res) => {
  const {
    params: { id },
    body: { comment },
    user
  } = req;
  try {
    const video = await Video.findById(id);
    const newComment = await Comment.create({
      text: comment,
      creator: user.id
    });
    video.comments.push(newComment.id);
    video.save();
  } catch (error) {
    res.status(400);
  } finally {
    res.end();
  }
}

// Delete Comment
export const postDeleteComment = async(req, res) => {
  const {
    params: { id }
  } = req;
  try {
    const comment = await Comment.findByIdAndDelete(id);
  } catch (error) {
    res.status(400);
  } finally {
    res.end();
  }
}