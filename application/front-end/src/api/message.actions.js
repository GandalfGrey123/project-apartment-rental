import axios from "axios";
import api_config from './config/api.config';

// endpoint returns javascript chatObject
// chatObject.chatId <-- reference to chat table row
// chatObject.listing  <--- reference to listing table row
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
   	 handleResponse(res.data);
   });
};

//messagePacket has multiple fields
// messagePacket.chatId
// messagePacket.senderEmail
// messagePacket.message

export const sendMessage = (token,messagePacket, handleResponse) => {
   axios({
      method: 'post',
      url: `http://${api_config.environment}/messages/send`,
      data:{
         'messagePacket': messagePacket,
      },
      headers:{
         'sessionToken': token,
      },
   
   }).then((res) => {
       //http response returns array of json chat objects
       handleResponse(res.data);
   });
};

export const sendNewMessage = (token,messagePacket, handleResponse) => {
   axios({
      method: 'post',
      url: `http://${api_config.environment}/messages/new`,
      data:{
         'messagePacket': messagePacket,
      },
      headers:{
         'sessionToken': token,
      },
   }).then((res) => {
       //http response returns array of json chat objects
       handleResponse(res.data);
   });
};
