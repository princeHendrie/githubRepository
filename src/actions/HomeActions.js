import axios from 'axios';
import { 
    SEARCH_CHANGED,
    SEARCH_SUCCESS,
    SEARCH_FAIL,
    SEARCH_LOADMORE,
    SEARCH,
    SEARCH_REQUIRED
 } from '../values/types';
 import { host } from '../config/configServer';


 export const searchChanged = (text) => {
    return {
        type: SEARCH_CHANGED,
        payload: text
    };
};


function getDataFromAPI(dispatch,text, page) {
    axios.get(host+"/repos/"+text+"/commits?page="+page+"&per_page=100", 
                { 
                }).then((response) => {
                    var list = []
                    
                    for(var i=0;i<response['data'].length;i++){

                        var  msg = response['data'][i]['commit']['message'].split("\n\n")

                        var urlAuthAva = "https://github.githubassets.com/images/modules/logos_page/Octocat.png";
                        var urlComAva = "https://github.githubassets.com/images/modules/logos_page/Octocat.png";
                        if(response['data'][i]['author'] != null){
                            urlAuthAva = response['data'][i]['author']['avatar_url']
                        }
                        if(response['data'][i]['committer'] != null){
                            urlComAva = response['data'][i]['committer']['avatar_url']
                        }

                        let data  = {
                            nodeId: response['data'][i]['node_id'],
                            authorName: response['data'][i]['commit']['author']['name'],
                            committerName: response['data'][i]['commit']['committer']['name'],
                            message: msg[0],
                            avatarAuthorUrl: urlAuthAva,
                            avatarCommitterUrl: urlComAva,
                            committerDate: response['data'][i]['commit']['committer']['date'],
                            authorDate: response['data'][i]['commit']['author']['date'],
                          }
                          list.push(data)
                    }
                    
                    
                    dispatch({type: SEARCH_SUCCESS, payload: list})

                })
                .catch(err => {
                    var error = ""+err;
                    if(error.includes("status code 401")){
                        error = "Wrong password!.";
                      }else if(error.includes("status code 404")){
                        error = "Unauthorize repository, please confirm, your search repository is authorize.";
                      }else if(error.includes("status code 500") || error.includes("status code 502") || error.includes("status code 503")){
                          error = "Sorry, Service Under Maintenance, Please try again later";
                      }else if(error.includes("Network Error")){
                          error = "Please check your Internet connection.";
                      }
      
                      dispatch({type: SEARCH_FAIL, payload: error})
                }); 
};

export const loadmore = (text,page) => {
    return (dispatch) => {
        dispatch({ type: SEARCH_CHANGED, payload: text});
        dispatch({ type: SEARCH_LOADMORE });
        
        getDataFromAPI(dispatch,text,page)
    };
};

export const searchFirstTime = (text) => {
    return (dispatch) => {
        dispatch({ type: SEARCH_CHANGED, payload: text});
        dispatch({ type: SEARCH });
        
        getDataFromAPI(dispatch,text,1)
    };
};

export const searchRepository = ({ search }) => {
    return (dispatch) => {
        
        if(search != ''){
            
            dispatch({ type: SEARCH });

            
            getDataFromAPI(dispatch,search,1)


        }else{
            dispatch({ type: SEARCH_REQUIRED });
        }
    };
};

