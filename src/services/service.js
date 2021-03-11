import axios from "axios";

// Preparandonos para el futuro... podemos definir una url varieble en funcion al entorno donde se ejecuta nuestro proyecto
const baseURL =
  process.env.NODE_ENV === "production"
    ? "/service"
    : "http://localhost:3001/api/service";

const _axios = axios.create({
  baseURL,
  // Tenemos que enviar esta configuracion si el endpoint al que accedemos utiliza la sesion del server,  o sea si vamos a usar al req.user del backend.
  withCredentials: true,
});

export const createService = (serviceInfo) => _axios.post("/", serviceInfo);
export const updateServiceInfo = (serviceId, serviceInfo) =>
  _axios.patch(`/${serviceId}`, serviceInfo);
export const updateServiceRating = (rating, serviceId) =>
  _axios.patch(`/rating/${serviceId}`, { rating });
export const updateServiceStatus = (status, serviceId) =>
  _axios.patch(`/status/${serviceId}`, { status });
export const deleteService = (serviceId) => _axios.delete(`/${serviceId}`);
export const getMyServices = (serviceInfo) => _axios.get("/", serviceInfo);
export const getServicesbyId = (serviceId) => _axios.get(`/${serviceId}`);
