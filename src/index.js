const express = require('express');
const path = require('path');
const fs = require('fs');
const { fetchPrismicDocuments } = require('./api');

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
  const uid = req.query.uid;
  try {
    if (uid) {
      // Buscar apenas um documento específico
      const doc = await fetchPrismicDocuments(uid); 
      res.json(doc);
    } else {
      const docs = await fetchPrismicDocuments();
      res.json(docs);
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar dados do Prismic.' });
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});


