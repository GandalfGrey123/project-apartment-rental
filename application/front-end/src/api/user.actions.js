import axios from "axios";
import api_config from './config/api.config';


export const userLogin = (loginCredentials, respondToUser, onError = () => {}) => {
	axios({
		method:'post',
		url:`http://${api_config.environment}/users/login`,		
		data: loginCredentials,
	}).then((res)=>{
		respondToUser(res.data);
	}).catch(onError)
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

export const checkSession = (token, onSuccess, onError = () => {}) => {
	axios.get(`http://${api_config.environment}/users/session/${token}/validate`)
	.then(onSuccess)
	.catch(onError)
}

export const logOut = (token, onSuccess, onError = () => {}) => {
	axios.put(`http://${api_config.environment}/users/session/${token}/end`)
	.then(onSuccess)
	.catch(onError)
}