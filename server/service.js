const userData = require('./datas/users.json');

module.exports = {
    checkUser
}

// 参数 argObj : post 传递的参数
function checkUser(argObj){
    // 登录验证
    // console.log('checkUser')
    let user = userData.find((item)=> {       
        return (item.username === argObj.username && item.password === argObj.password);
    });
    // console.log(user)
    if(user){
        return user.uid;
    }
    return false;
    
}

// function getUserID(argObj){
//     return userData.find(item=>{
//         return item.username === argObj.username;
//     }).uid;
// }