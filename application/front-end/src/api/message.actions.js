import axios from "axios";
import api_config from './config/api.config';

// endpoint returns javascript object
// chatObject.listing
// chatObject.userOneEmail
// chatObject.userTwoEmail
// chatObject.messages

export const getInbox = (token, handleResponse) => {
   axios({
      method: 'get',
      url: `http://${api_config.environment}/messages/inbox`,
      headers:{
      	'sessionToken': token
      },
   }).then((res) => {
   	 //http response returns array of json chat objects
   	 console.log(res.data[0]);
   });
};
