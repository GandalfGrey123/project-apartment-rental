import axios from "axios";
import api_config from './config/api.config';

export const getInbox = (token, handleResponse) => {

   axios({
      method: 'get',
      url: `http://${api_config.environment}/messages/inbox`,
      headers:{
      	'token': token
      },
   }).then((res) => {

   	 //http response returns array of json chat objects
   	 handleResponse(res.data);
   });
};
