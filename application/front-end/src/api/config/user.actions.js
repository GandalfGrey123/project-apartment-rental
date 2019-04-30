import axios from "axios";
import api_config from './config/api.config';

export const login = (loginCredentials, handleResponse) => {
  axios({
    method: 'post',
    url: `http://${api_config.environment}/user/login`,
    data: loginCredentials
  }).then((res) => {
    if(res.status == 400){
      handleResponse("error");
    }
    
    //localSession('userName', res.data.userName);
    localSession('userToken', res.data);

    handleResponse("success!");
  });
};
