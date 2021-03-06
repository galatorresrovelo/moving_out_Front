import axios from "axios";

// Preparandonos para el futuro... podemos definir una url varieble en funcion al entorno donde se ejecuta nuestro proyecto
const baseURL =
  process.env.NODE_ENV === "production"
    ? "https://movingout88.herokuapp.com/api/extraservices"
    : "http://localhost:3001/api/extraservices";

const _axios = axios.create({
  baseURL,
  // Tenemos que enviar esta configuracion si el endpoint al que accedemos utiliza la sesion del server,  o sea si vamos a usar al req.user del backend.
  withCredentials: true,
});

export const createExtraServices = (extraservicesInfo) =>
  _axios.post("/", extraservicesInfo);
export const updateExtraServInfo = ({ id, ...reseservice }) =>
  _axios.patch(`/${id}`, reseservice);
export const deleteExtraServ = (extraservicesId) =>
  _axios.delete(`/${extraservicesId}`);
export const getExtraServId = (extraservicesId) =>
  _axios.get(`/${extraservicesId}`);
