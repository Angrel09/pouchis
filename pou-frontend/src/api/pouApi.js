import axios from 'axios';

const api = axios.create({
  baseURL: '/api' 
});
 

// Mascotas
export const getPets = () => api.get('/pets');
export const getPet = (id) => api.get(`/pets/${id}`);
export const createPet = (name) => api.post('/pets', { name });
export const feedPet = (petId, purchaseId) => api.patch(`/pets/${petId}/feed`, { purchaseId });
export const equipPetItem = (petId, purchaseId) => api.patch(`/pets/${petId}/equip`, { purchaseId });
export const playWithPet = (petId) => api.patch(`/pets/${petId}/play`);

// Tienda
export const getShopItems = (category) => 
  api.get('/items', { params: category ? { category } : {} });

export const getShopInfo = () => api.get('/shop');

export const buyItem = (petId, itemId) => 
  api.post('/shop/buy', { petId, itemId });

// Actividades
export const getActivities = () => api.get('/activities');
export const getActivity = (id) => api.get(`/activities/${id}`);
export const playActivity = (activityId, petId) => 
  api.post(`/activities/${activityId}/play`, { petId });

export default api;
