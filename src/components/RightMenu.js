import React, { Component } from 'react';
import { Menu, Icon } from 'antd';
import { message, Modal, Input, Button } from 'antd';
import cookie from 'react-cookies'

class RightMenu extends Component {
    state = {
        Loginvisible: false,
        Registervisible: false,
        name: '',
        mobile: '',
        address: '',
        password: '',
        password_confirmation: ''
    }

    logout = () => {
        cookie.remove('token', { path: '/' })
        window.location.reload();
    }

    onLogin = () => {
        let { mobile, password } = this.state
        if(mobile == '' || password == ''){
            message.error('Enter Mobile and Password');
            return
        }
        let num = parseInt(mobile)
        if (num.toString().length !== 10) {
            message.error('Please Correct Mobile number');
            return
        }
        fetch("/api/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ mobile, password })
        })
            .then(res => res.json())
            .then(
                (result) => {
                    if (result.hasOwnProperty('token')) {
                        cookie.save('token', JSON.stringify(result.token), { path: '/' })
                        window.location.reload();
                    } else {
                        message.error('Invalid Credentials.');
                    }
                },
                (error) => {
                    console.log(error);
                }
            )
    };

    onRegister = () => {
        let { name, mobile, address, password, password_confirmation } = this.state
        let error_text = 'Please enter '
        if(mobile == ''){
            error_text = error_text+'Mobile Number, '
        }
        if(name == ''){
            error_text = error_text+'Name, '
        }
        if(address == ''){
            error_text = error_text+'Address, '
        }
        if(password == ''){
            error_text = error_text+'Password, '
        }
        if (error_text !== 'Please enter '){
            message.error(error_text);
            return
        }
        let num = parseInt(mobile)
        if (num.toString().length !== 10) {
            message.error('Please Correct Mobile number');
            return
        }

        if(password.length < 6){
            message.error('Password Must be atleast 6 character long');
            return
        }

        if(password !== password_confirmation){
            message.error('Password and Confirmation Password Does not match');
            return
        }

        fetch("/api/register", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, mobile, address, password, password_confirmation })
        })
            .then(res => res.json())
            .then(
                (result) => {
                    if (result.hasOwnProperty('token')) {
                        cookie.save('token', JSON.stringify(result.token), { path: '/' })
                        window.location.reload();
                    } else 
                        message.error('User Alredy Exist');
                },
                (error) => {
                    console.log(error);
                }
            )
    };

    renderMenu() {
        let token = cookie.load('token');
        if (token === undefined) {
            return (
                <Menu mode="horizontal">
                    <Menu.Item >
                        <Button type="primary" onClick={() => this.setState({ Loginvisible: true })}>
                            Sign In
                    </Button>
                    </Menu.Item>
                    <Menu.Item >
                        <Button type="primary" onClick={() => this.setState({ Registervisible: true })}>
                            Sign Up
                    </Button>
                    </Menu.Item>
                    <Modal
                        title="Sign In"
                        visible={this.state.Loginvisible}
                        okText='Sign In'
                        onOk={this.onLogin}
                        onCancel={() => this.setState({ Loginvisible: false, mobile:'',password:'' })}
                    >
                        <Input
                            placeholder="Mobile"
                            onChange={({ target: { value } }) => this.setState({ mobile: value })}
                            className='login-input'
                            maxLength={10}
                            value={this.state.mobile} />
                        <Input
                            placeholder="Password"
                            onChange={({ target: { value } }) => this.setState({ password: value })}
                            className='login-input'
                            type='password'
                            value={this.state.password} />

                    </Modal>

                    <Modal
                        title="Sign Up"
                        visible={this.state.Registervisible}
                        okText='Sign Up'
                        onOk={this.onRegister}
                        onCancel={() => this.setState({ Registervisible: false, mobile:'',password:'',name:'',password_confirmation:'',address:'' })}
                    >
                        <Input
                            placeholder="Name"
                            className='login-input'
                            onChange={({ target: { value } }) => this.setState({ name: value })}
                            value={this.state.name} />
                        <Input
                            placeholder="Mobile"
                            className='login-input'
                            onChange={({ target: { value } }) => this.setState({ mobile: value })}
                            maxLength={10}
                            value={this.state.mobile} />
                        <Input
                            placeholder="Address"
                            className='login-input'
                            onChange={({ target: { value } }) => this.setState({ address: value })}
                            value={this.state.address} />
                        <Input
                            placeholder="Password"
                            className='login-input'
                            onChange={({ target: { value } }) => this.setState({ password: value })}
                            value={this.state.password} />
                        <Input
                            placeholder="Password Confirmation"
                            className='login-input'
                            onChange={({ target: { value } }) => this.setState({ password_confirmation: value })}
                            value={this.state.password_confirmation} />

                    </Modal>
                </Menu>
            )
        } else {
            return (
                <Menu mode="horizontal">
                    <Menu.Item >
                        <Button type="primary" onClick={this.logout}>
                            Logout
                        </Button>
                    </Menu.Item>
                </Menu>
            )

        }
    }
    render() {
        return (
            <div>{this.renderMenu()}</div>
        );
    }
}
export default RightMenu;
