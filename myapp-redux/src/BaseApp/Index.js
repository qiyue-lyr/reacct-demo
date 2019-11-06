import React from 'react';
import cookie from 'react-cookies'
import { Route, Link, Switch, Redirect, withRouter } from 'react-router-dom'


import Home from './view/Home'
import List from './view/List'
import About from './view/About'
import Item from './view/Item'
import Cart from './view/Cart'
import Login from './view/Login'
import NotFound from './view/NotFound'

import { Menu, Icon, Button  } from 'antd';
import {connect} from 'react-redux'
import {getItems} from './store/action/items'
import {addUserStatus, delUserStatus} from './store/action/user'
// import axios from 'axios';


let values = cookie.load('isLogin')||{};



class BaseApp extends React.Component {

  constructor() {
    super();

    this.state = {  
      current: 'home',
    }
    
    this.onLogOut = this.onLogOut.bind(this);
  }

  componentDidMount(){
    /* 使用thunk中间件，异步处理 */ 
    this.props.dispatch( getItems() )
    this.props.dispatch( addUserStatus(values) )
  
  } 

  onLogOut(){
    console.log(delUserStatus)
    if(window.confirm("Are you sure to log out?")){
      this.props.dispatch( delUserStatus() )
      
    }
  }

  render() {

    let { curUser } = this.props;
    let curComponent = this.props.location.pathname.split('/')[1];
    return (
      <div >

        {/* 
          selectedKeys={curComponent} 是根据url来给导航加active
          原先 antd 是页面刷新，样式自动给到 home
        */}
        <div  style={{display: "flex",justifyContent: "flex-start"}}>
          <Menu selectedKeys={curComponent} mode="horizontal">
            
            <Menu.Item key="home">
              <Link to="/"><Icon type="home" />Home</Link>
            </Menu.Item>
            <Menu.Item key="list">
              <Link to="/list">List</Link>
            </Menu.Item>
            <Menu.Item key="cart">
              <Link to="/cart">Cart</Link>
            </Menu.Item>
            <Menu.Item key="about">
              <Link to="/about">About</Link>
            </Menu.Item>

          </Menu>
          {
            curUser.uid !== 0 ?(
              <div style={
                {display: "flex",
                flexDirection:"column",
                justifyContent:"center"}
              }>
                <span> | Welcome {curUser.username}<Button type="link" onClick={this.onLogOut}>Log Out</Button>
                </span>
              </div>):''
          }
        </div>

        <div>
          {/* Switch 组件只会渲染首个被匹配的组件 */}
          <Switch>
            <Route exact path="/" render={props => <Home {...props} />} />

            <Route exact path="/list" render={props => <List {...props} />} />
            
            {/* 需要手动传入路由的props，Item才能接收到 */}
            <Route path="/list/item/:id" render={props => <Item {...props} />} />

            <Route path="/cart" render={_ => {
              if (curUser.uid !== 0) {
                return <Cart uid={curUser.uid}/>
              } else {
                return <Redirect to='/login' />
              }
            }} />

            <Route path="/login" render={props => <Login {...props}/>} />
            
            <Route path="/about" component={About} />

            <Route component={NotFound} />
          </Switch>
        </div>

      </div>
    );
  }
}

export default withRouter(
  connect(store=>{
    return store
  })(BaseApp)
)
