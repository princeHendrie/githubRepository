import axios from 'axios';
import { 
    USERNAME_CHANGED,
    PASSWORD_CHANGED,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAIL,
    LOGIN_USER,
    LOGIN_USERNAME_REQUIRED,
    LOGIN_PASSWORD_REQUIRED
 } from '../values/types';
 import { host } from '../config/configServer';
 import base64 from 'react-native-base64';
 import { Actions } from 'react-native-router-flux';


 export const usernameChanged = (text) => {
    return {
        type: USERNAME_CHANGED,
        payload: text
    };
};

export const passwordChanged = (text) => {
    return {
        type: PASSWORD_CHANGED,
        payload: text
    };
};


export const loginUser = ({ username,password }) => {
    return (dispatch) => {

        if(username == ''){
            dispatch({ type: LOGIN_USERNAME_REQUIRED });
        } else if(password == ''){
            dispatch({ type: LOGIN_PASSWORD_REQUIRED });
        } else  if(username != '' && password != ''){

            dispatch({ type: LOGIN_USER });

            var data = base64.encode(username+':'+password)

            axios.get(host, 
                { headers:
                    {
                        'Content-Type': 'application/json',
                        Accept: 'application/json',
                        Authorization: `Basic ${data}`
                    }
                }).then((response) => {
                    dispatch({type: LOGIN_USER_SUCCESS, payload: response})
                    Actions.home();
                })
                .catch(err => {
                    var error = ""+err;
                    if(error.includes("status code 401")){
                        error = "Wrong password!.";
                      }else if(error.includes("status code 500") || error.includes("status code 502") || error.includes("status code 503")){
                          error = "Sorry, Service Under Maintenance, Please try again later";
                      }else if(error.includes("Network Error")){
                          error = "Please check your Internet connection.";
                      }
      
                      
                      dispatch({type: LOGIN_USER_FAIL, payload: error})
                }); 

        }

    };
};