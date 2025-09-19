import express from 'express';
import path from 'path';
import fs from 'fs';
import { fetchPrismicDocuments } from './api';

const app = express();
const port = 3000;

// Servir arquivos da pasta public (css/js/etc.)
app.use(express.static(path.join(__dirname, '..')));
// Servir arquivos da raiz do projeto
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

app.get('/api/prismic', async (req, res) => {
  try {
    const docs = await fetchPrismicDocuments();
    res.json(docs);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar dados do Prismic.' });
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});


