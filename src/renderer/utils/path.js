import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const pathUtils = {
  join: (...args) => join(...args),
  dirname: (path) => dirname(path),
  getDirname: () => __dirname
}; 