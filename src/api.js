const prismic = require("@prismicio/client");
const dotenv = require("dotenv");

dotenv.config();

const endpoint = process.env.PRISMIC_API_URL;
const accessToken = process.env.PRISMIC_ACCESS_TOKEN;

if (!endpoint) {
  throw new Error("PRISMIC_API_URL is not defined in environment variables.");
}

const client = prismic.createClient(endpoint, { accessToken });

module.exports.client = client;

/**
 * Busca todos os documentos ou apenas um, se o UID for informado
 * @param {string|null} uid - UID do documento (opcional)
 * @returns {Promise<object|object[]>} Documento único ou lista de documentos
 */
module.exports.fetchPrismicDocuments = async function (uid = null) {
  if (uid) {
    // Busca apenas um documento específico (tipo 'post')
    const document = await client.getByUID("post_details", uid);
    return document;
  }

  // Busca todos os documentos do tipo 'post'
  const documents = await client.getAllByType("post");
  return documents;
};
