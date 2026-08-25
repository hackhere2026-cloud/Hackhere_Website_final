const rawBackend = import.meta.env.VITE_BACKEND_URL;
export const BACKEND_URL = (rawBackend && rawBackend !== 'your_backend_url_here' && rawBackend.trim() !== '')
  ? rawBackend
  : 'http://localhost:3001';



