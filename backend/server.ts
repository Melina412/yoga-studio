import app from './app';
import 'dotenv/config';
import path from 'path';
import { dbConnect } from './src/storage/storage.config';

const PORT = process.env.PORT || 3000;

// FOR PRODUCTION -------------------------------------------------------------
const FRONTEND_INDEX = path.join(__dirname, '../frontend/dist/index.html');

app.get(/(.*)/, (_, res) => {
  // '*' funktioniert in express 5 nicht mehr
  res.sendFile(FRONTEND_INDEX);
});

console.log({ FRONTEND_INDEX });
// ----------------------------------------------------------------------------

app.listen(PORT, () => {
  dbConnect();
  console.log('✅ express server on port', PORT);
});
