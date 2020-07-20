import http from '../http-common';

const create = (data) => {
  return http.post('/transaction', data);
};

const getPeriod = () => {
  return http.get(`/transaction/period`);
};

const findByPeriod = (period) => {
  return http.get(`/transaction?period=${period}`);
};

const update = (id, data) => {
  return http.put(`/transaction/${id}`, data);
};

const remove = (id) => {
  return http.delete(`/transaction/${id}`);
};

export default {
  create,
  getPeriod,
  findByPeriod,
  update,
  remove,
};
