import React from 'react';

import {Modal} from 'antd';
import LoginForm from './LoginForm';

import {connect} from 'react-redux'//可以注入store对象
 
import {addUserStatus} from '../store/action/user'

class LoginModal extends React.Component {
   
    constructor(){
        super();
    
        this.state = {
            visible: true,
            confirmLoading: false,
        }
        this.getFormValue = React.createRef();
        
    }

    handleOk = e => {

        this.setState({
            confirmLoading: true
        });

        let demo = this.getFormValue.current;//获取到Form组件数据

        demo.validateFields((err, values) => {
            if(!err){
                // console.log(values);
                
                // axios.post('/api/checkUser',values)
                // .then(res => {

                //     let {onSuccess, history} = this.props;

                //     if(res.data.status && typeof onSuccess === 'function'){

                //         let userData = {uid: res.data.uid, username:values.username};                       
                //         onSuccess(userData)
                //         .then(msg=>{
                            
                //             console.log('ok')
                //             history.push('/cart')
                //         }).catch(e=>console.log(e)) 
                //     } 
                    
                //     this.setState({
                //         confirmLoading: false,
                //         visible: false
                //     });
                // })

                this.props.dispatch( addUserStatus(values) ).then(_=>{
                    this.setState({
                        confirmLoading: false,
                        visible: false
                    });
                    this.props.history.push('/cart')
                })


            }
        });
    }

    handleCancel = _ => {
        this.setState({
            visible: false,
        });
        console.log('cancel')
        this.props.history.push('/list')
    }

    render() {
        const { visible, confirmLoading} = this.state;
        
        return (
            <div>
                <Modal title="登录"
                    visible={visible}
                    onOk={this.handleOk}
                    confirmLoading={confirmLoading}
                    onCancel={this.handleCancel}
                >
                    <LoginForm ref={this.getFormValue} />
                </Modal>
            </div>
        );
    }
}
   
export default connect()(LoginModal)
