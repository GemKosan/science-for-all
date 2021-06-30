import axios from 'axios';

export default axios.create({
  baseURL: 'https://eutils.ncbi.nlm.nih.gov/entrez/eutils/'
});