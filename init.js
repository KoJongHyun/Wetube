import dotenv from 'dotenv';
// import fs from 'fs';
// import https from 'https';
import './db';
import app from './app';
import './models/Video';
import './models/Comment';
import './models/User';
dotenv.config();

const PORT = process.env.PORT || 4000;
const handleListening = () => console.log(`Wellcome https://localhost:${PORT}`);


// https.createServer({
//   key: fs.readFileSync('server.key'),
//   cert: fs.readFileSync('server.cert')
// }, app).listen(PORT, handleListening);


app.listen(PORT, handleListening);