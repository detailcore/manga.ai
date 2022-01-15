const Config = {
    baseUrlApi: process.env.NODE_ENV === 'production' ? 'https://api..' : 'http://api.manga.ai/api/',
    baseUrlFiles: process.env.NODE_ENV === 'production' ? 'https://files..' : 'http://api.manga.ai/uploads/',
}
  
export default Config