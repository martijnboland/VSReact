import axios from 'axios';

// __API_URL_ comes from webpack DefinePlugin
declare const __API_URL__: string;
const apiUrl: string = __API_URL__;

const handleErrors = err => {
  console.error(err);
  throw err;
};

const responseData = res => res.data;

const requests = {
  get: (url: string) => axios.get(`${apiUrl}${url}`)
    .then(responseData)
    .catch(handleErrors),
  post: (url: string, data: any) => axios.post(`${apiUrl}${url}`, data)
    .then(responseData)
    .catch(handleErrors),
  put: (url: string, data: any) => axios.put(`${apiUrl}${url}`, data)
    .then(responseData)
    .catch(handleErrors),
  patch: (url: string, data: any) => axios.patch(`${apiUrl}${url}`, data)
    .then(responseData)
    .catch(handleErrors),
  del: (url: string) => axios.delete(`${apiUrl}${url}`)
    .then(responseData)
    .catch(handleErrors)
};

export const TodosApi = {
  getAll: () => requests.get('/todo'),
  add: (todo: any) => requests.post('/todo', todo),
  remove: (id: number) => requests.del(`/todo/${id}`),
  patch: (id: number, todo: any) => requests.patch(`/todo/${id}`, todo)
}