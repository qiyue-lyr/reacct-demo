import axios from 'axios';

function addUserStatus(values){

    return dispatch=>{
        return axios.post('/api/checkUser',values).then(res=>{
            if(res.data.status){// 后台处理成功 true|false
                dispatch({
                    type:'ADD_USER_STATUS',
                    payload: {uid:res.data.uid, username:values.username}
                })
            }
            return Promise.resolve();
        })
    }
}

function delUserStatus(){

    return dispatch=>{
        return axios.get('/api/loginout').then(res=>{
            if(res.data.status){// 后台处理成功 true|false
                dispatch({
                    type:'DEL_USER_STATUS',
                    payload: {uid:0,username:''}
                })
            }
            // return Promise.resolve(res.data);
        })
    }
}
export {addUserStatus, delUserStatus}

