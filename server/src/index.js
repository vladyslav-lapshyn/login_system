import dotenv from 'dotenv';
import { createServer } from './server.js';

dotenv.config();

const PORT = process.env.PORT || 5555;

createServer().listen(PORT, (error) => {
  if (error) {
    return console.log(error);
  }

  console.log(`Server is running on port http://localhost:${PORT}/`);
});
