import * as prismic from '@prismicio/client';
import dotenv from 'dotenv';

dotenv.config();

const endpoint = process.env.PRISMIC_API_URL;
const accessToken = process.env.PRISMIC_ACCESS_TOKEN;

if (!endpoint) {
  throw new Error('PRISMIC_API_URL is not defined in environment variables.');
}

export const client = prismic.createClient(endpoint, {
  accessToken,
});

export async function fetchPrismicDocuments() {
  // Exemplo: busca todos os documentos do tipo 'post'
  const documents = await client.getAllByType('vehicle');
  return documents;
}