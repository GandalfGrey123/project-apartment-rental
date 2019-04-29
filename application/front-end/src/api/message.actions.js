import axios from "axios";
import api_config from './config/api.config';

export const getChats = (userId, handleResponse) => {
  axios({
    method: 'get',
    url: `http://${api_config.environment}/messages/all`,
    params: userId
  }).then((res) => {
    handleResponse(res.data);
  });
};


export const newMessage = (formData, handleResponse) => {
  axios({
    method: 'post',
    url: `http://${api_config.environment}/messages/send`,
    data: formData
  }).then((res) => {
    handleResponse(res.data);
  });
};


export const sendMessage = (message, handleResponse) => {
  axios({
    method: 'post',
    url: `http://${api_config.environment}/messages/send`,
    data: message
  }).then((res) => {
    handleResponse(res.data);
  });
};