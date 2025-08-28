import express from 'express';
import path from 'path';
import fs from 'fs';

const app = express();
const port = 3000;

// Servir arquivos da pasta public (css/js/etc.)
app.use('/public', express.static(path.join(__dirname, '../public')));

// Servir index.html da raiz manualmente
app.get('/', (_req, res) => {
  const filePath = path.join(__dirname, '../index.html');
  if (fs.existsSync(filePath)) {
    res.sendFile(filePath);
  } else {
    res.status(404).send('index.html não encontrado');
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});