import app from './app';
import 'dotenv/config';
import path from 'path';
import { dbConnect } from './src/storage/storage.config';
import { log } from 'console';

const PORT = process.env.PORT || 3000;

const FRONTEND_INDEX = path.join(__dirname, '../frontend/dist/index.html');
log({ FRONTEND_INDEX });

app.get('*', (_, res) => {
  res.sendFile(FRONTEND_INDEX);
});

app.listen(PORT, () => {
  dbConnect();
  console.log('✅ express server on port', PORT);
});
