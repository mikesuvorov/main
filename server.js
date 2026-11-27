import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;
const HOST = '0.0.0.0';

const HTML_PAGES = new Set([
  'index.html',
  'energetik.html',
  'politika.html',
  'roditelyam.html',
]);

app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.get('/', (_req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/:page', (req, res, next) => {
  const page = req.params.page;
  if (HTML_PAGES.has(page)) {
    return res.sendFile(path.join(__dirname, page));
  }
  if (HTML_PAGES.has(`${page}.html`)) {
    return res.sendFile(path.join(__dirname, `${page}.html`));
  }
  return next();
});

app.use((_req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, HOST, () => {
  console.log(`Server listening on http://${HOST}:${PORT}`);
});
