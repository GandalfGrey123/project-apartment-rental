import axios from "axios";
import api_config from './config/api.config';


export const userLogin = (loginCredentials, respondToUser) => {
	axios({
		method:'post',
		url:`http://${api_config.environment}/users/login`,		
		data: loginCredentials,
	}).then((res)=>{
		respondToUser(res.data.token);
	});
};


export const userRegister = (regFormData, respondToUser) => {
	axios({
		method:'post',
		url:`http://${api_config.environment}/users/register`,		
		data: regFormData,
	}).then((res)=>{
		respondToUser(res.data.result);
	});
};