import axios from "axios";

// Preparandonos para el futuro... podemos definir una url varieble en funcion al entorno donde se ejecuta nuestro proyecto
const baseURL =
  process.env.NODE_ENV === "production"
    ? "/items"
    : "http://localhost:3001/api/items";

const _axios = axios.create({
  baseURL,
  // Tenemos que enviar esta configuracion si el endpoint al que accedemos utiliza la sesion del server,  o sea si vamos a usar al req.user del backend.
  withCredentials: true,
});

export const createItems = (itemsInfo) => _axios.post("/", itemsInfo);
export const updateItems = ({ id, ...resitem }) =>
  _axios.patch(`/${id}`, resitem);
export const deleteItems = (itemsId) => _axios.delete(`/${itemsId}`);
export const getItemsId = (itemsId) => _axios.get(`/${itemsId}`);
