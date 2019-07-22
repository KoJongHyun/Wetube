import dotenv from 'dotenv';
import './db';
import app from './app';
import './models/Video';
import './models/Comment';
import './models/User';
dotenv.config();

const PORT = process.env.PORT || 4000;
const handleListening = () => console.log(`Wellcome https://localhost:${PORT}`);

app.listen(PORT, handleListening);