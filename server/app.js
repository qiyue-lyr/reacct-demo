const Koa = require('koa');
const KoaRouter = require('koa-router');
const koaBody = require("koa-body");

const app = new Koa();
const router = new KoaRouter();

const items = require('./datas/items.json');

const {checkUser}= require('./service.js');

app.use(koaBody({
    multipart:true // 允许上传文件
}))

router.get('/', async ctx=>{
    ctx.body = 'kaikeba'
})

router.get('/items', async ctx=>{
    ctx.body = items;
})

router.post('/checkUser', async ctx=>{

    let data = ctx.request.body;
    let result = checkUser(data); // uid|false
    let res = {}
    // console.log(data,result)
    if(result){
        // 验证通过
        let value = {uid:result, username:data.username, password:data.password}
        let options = {
            domain: 'localhost',  // 写cookie所在的域名
            path: '/',       // 写cookie所在的路径
            httpOnly: false,  // 是否只用于http请求中获取
            overwrite: true  // 是否允许重写
        }       
        if(data.remember){
            Object.assign(options,{maxAge: 1000*60*60*24*2})
        }
        
        if(!data.inCookie){
            ctx.cookies.set('isLogin',JSON.stringify(value),options)
        }
        
        

        res.status = true; 
        res.uid = result;    
    }else{
        res.status = false;
        res.uid = 0;
    }
    ctx.body = res;
})

router.get('/loginout', async ctx=>{
    ctx.cookies.set('isLogin','',{expires:new Date('1970-01-01')})
    ctx.body = {status:true}
})
 
app.use(router.routes())

app.listen(7777)