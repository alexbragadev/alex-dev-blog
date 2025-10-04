const prismic = require('@prismicio/client');
const dotenv = require('dotenv');

dotenv.config();

const endpoint = process.env.PRISMIC_API_URL;
const accessToken = process.env.PRISMIC_ACCESS_TOKEN;

if (!endpoint) {
  throw new Error('PRISMIC_API_URL is not defined in environment variables.');
}

const client = prismic.createClient(endpoint, {
  accessToken,
});

module.exports.client = client;

module.exports.fetchPrismicDocuments = async function () {
  // Exemplo: busca todos os documentos do tipo 'post'
  const documents = await client.getAllByType('post');
  return documents;
};