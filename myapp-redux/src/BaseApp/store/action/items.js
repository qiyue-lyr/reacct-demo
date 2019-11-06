import axios from 'axios';

export function getItems(){

    return dispatch=>{
        return axios({
            url:'/api/items'
        }).then(res=>{
            dispatch({
                type:'GET_ITEMS',
                payload: res.data
            })
            // return Promise.resolve(res.data);
        })
    }
}