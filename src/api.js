import axios from 'axios';

const BASE_URL = `https://htmlacademy-react-3.appspot.com/six-cities`;
const ErrorsTypes = {
  UNAUTHORIZED: 401,
};

const createAPI = (onUnauthorized) => {
  const api = axios.create({
    baseURL: BASE_URL,
    timeout: 5000,
    withCredentials: true,
  });

  const onSuccess = (response) => response;
  const onFail = (error) => {
    const {response} = error;

    if (response && response.status === ErrorsTypes.UNAUTHORIZED) {
      onUnauthorized();

      // Бросаем ошибку, т.к. необходимо прервать цепочку Promise после запроса авторизации.
      // Запрос авторизации является особым случаем и важно дать понять приложению, что запрос был неудачным.
      throw error;
    }

    throw error;
  };

  api.interceptors.response.use(onSuccess, onFail);

  return api;
};

export {createAPI};
