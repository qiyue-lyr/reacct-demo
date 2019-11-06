import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { Form, Icon, Input, Checkbox } from 'antd';
 
const FormItem = Form.Item;

class LoginForm extends Component {
 
    render() {
        const { getFieldDecorator } = this.props.form;
        
        return (
            <Form className="login-form">
                
                <FormItem>
                    {getFieldDecorator('username', {
                        rules: [{ required: true, message: 'Please input your username!' }],
                    })(
                        <Input
                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        placeholder="Username"
                        />,
                    )}
                </FormItem>
               
                <FormItem>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: 'Please input your Password!' }],
                    })(
                        <Input
                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        type="password"
                        placeholder="Password"
                        />,
                    )}
                </FormItem>
                
                <FormItem>
                    {getFieldDecorator('remember', {
                        valuePropName: 'checked',
                        initialValue: false,
                    })(<Checkbox>Remember me</Checkbox>)}
                    
                    <span>| Or <Link to="/register">register now!</Link></span>
                </FormItem>
           
            </Form>
        );
    }
}
 
// const WrappedNormalLoginForm = Form.create()(LoginForm);
 
export default Form.create()(LoginForm);
