// Global
const HOME = '/';
const LOGIN = '/login';
const LOGOUT = '/logout';
const SEARCH = '/search';
const JOIN = '/join';

// User 
const USER = '/user';
const USER_DETAIL = '/:id';
const EDIT_PROFILE = '/edit-profile';
const CHANGE_PASSWORD = '/change-password';

// Video
const VIDEO = '/video';
const UPLOAD = '/upload';
const VIDEO_DETAIL = '/:id';
const EDIT_VIDEO = '/:id/edit';
const DELETE_VIDEO = '/:id/delete';

const routes = {
  home: HOME,
  login: LOGIN,
  logout: LOGOUT,
  search: SEARCH,
  join: JOIN,
  user: USER,
  userDetail: USER_DETAIL,
  editProfile: EDIT_PROFILE,
  changePassword: CHANGE_PASSWORD,
  video: VIDEO,
  videoDetail: VIDEO_DETAIL,
  upload: UPLOAD,
  editVideo: EDIT_VIDEO,
  deleteVideo: DELETE_VIDEO
}

export default routes;