import mongoose from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  avatarUrl: String,
  facebookID: Number,
  githubId: Number
})

UserSchema.plugin(passportLocalMongoose, { usernameField: 'name' });

const model = mongoose.model('User', UserSchema);

export default model;