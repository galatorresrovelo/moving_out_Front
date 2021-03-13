import axios from "axios";

// Preparandonos para el futuro... podemos definir una url varieble en funcion al entorno donde se ejecuta nuestro proyecto
const baseURL =
  process.env.NODE_ENV === "production"
    ? "https://movingout88.herokuapp.com/api/addresses"
    : "http://localhost:3001/api/addresses";

const _axios = axios.create({
  baseURL,
  // Tenemos que enviar esta configuracion si el endpoint al que accedemos utiliza la sesion del server,  o sea si vamos a usar al req.user del backend.
  withCredentials: true,
});

export const createAddresses = (addressesInfo) =>
  _axios.post("/", addressesInfo);
export const updateAddressesInfo = ({ id, ...resaddress }) =>
  _axios.patch(`/${id}`, resaddress);
export const deleteAddresses = (addressesId) =>
  _axios.delete(`/${addressesId}`);
export const getAddressesId = (addressesId) => _axios.get(`/${addressesId}`);
