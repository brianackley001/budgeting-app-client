const apiConfig = {
  // LOCAL env will rely on .env file accessed via import.meta.env
  baseUrl: import.meta.env.VITE_API_URL || 'https://budgeting-app-express-api.azurewebsites.net/api'
};

export default apiConfig;