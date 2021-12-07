const Config = {
    baseUrlApi: process.env.NODE_ENV === 'production' ? 'https://api..' : 'http://127.0.0.1:8000/api/',
    baseUrlFiles: process.env.NODE_ENV === 'production' ? 'https://files..' : 'http://api.manga.ai/uploads/',
}
  
export default Config