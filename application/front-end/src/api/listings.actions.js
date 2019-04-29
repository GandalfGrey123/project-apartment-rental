import axios from "axios";
import api_config from './config/api.config';

export const getListings = (params, handleResponse) => {
  axios({
    method: 'get',
    url: `http://${api_config.environment}/listings`,
    params: params
  }).then((res) => {
    handleResponse(res.data);
  });
};

export const getListing = (id, handleResponse) => {
  axios({
    method: 'get',
    url: `http://${api_config.environment}/listings/one/${id}`,
  }).then((res) => {
    handleResponse(res.data);
  });
};

export const getHouseTypes = (handleResponse) => {
  axios.get(`http://${api_config.environment}/listings/types`)
    .then((res) => {
      handleResponse(res.data);
    });
};

export const createPosting = (body, handleResponse) => {
  axios({
    method: 'post',
    url: `http://${api_config.environment}/listings/new`,
    data: body
  }).then((res) => {
    handleResponse();
  });
};
