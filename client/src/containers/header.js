import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router'
import {reduxForm} from 'redux-form'
import * as action_type from '../action_type'
import $ from 'jquery'
import config from '../config'


export const fields = ['username', 'password', 'remember'];

class Login extends Component {

    login(form) {
        this.props.dispatch({
            type: action_type.USER_LOGIN,
            ajax_type: 'post',
            uri: './user_login',
            data: form
        })
    }

    render() {
        const {
            fields: {username, password, remember},
            handleSubmit,
            submitting
        } = this.props

        return (
            <form className="flex login-bar">
                <span>用户名:</span>
                <input type="text" placeholder="用户名" {...username}/>
                <span>密码:</span>
                <input type="password" placeholder="密码" {...password} />
                <input type="checkbox" placeholder="密码" {...remember}/>记住
                <button type="button" className="btn bg-purple btn-flat btn-xs"
                        onClick={handleSubmit(this.login.bind(this))}>
                    登录
                </button>
                <Link to="signup" style={{color: "black"}}>注册</Link>
            </form>
        )
    }
}

Login.propTypes = {
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    resetForm: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired
}

var LoginForm = reduxForm({
        form: 'login',
        fields
    }, state => ({
        initialValues: {username: 'laoqian123', password: '123456', remember: true}
    }),
    dispatch => {
        dispatch
    })(Login)

class Logout extends Component {

    logout() {
        this.props.dispatch({
            type: action_type.USER_LOGOUT,
            ajax_type: 'get',
            uri: './user_logout'
        })
    }

    render() {
        return (
            <div className="flex login-bar">
                <span>尊敬的{this.props.user.nickname}你好,欢迎归来!</span>
                <button type="primary" className="btn bg-purple btn-flat btn-xs" onClick={this.logout.bind(this)}>退出
                </button>
            </div>
        )
    }
}

var LogoutBar = connect(
    state => {
        return {}
    },
    dispatch => {
        return {dispatch}
    }
)(Logout);


class Header extends Component {
    render() {
        let menus = config.header_menu;
        console.log(menus)
        return (
            <div className="header">
                <div  className="notice-bar">
                    通知栏
                </div>
                <div className="header-wrapper" >
                    <img src="./images/64.png" alt=""/>
                    <span>工程项目管理系统</span>
                    <ul className="ul list-inline  pull-right flex-vm">
                        {
                        menus.map(menu=>(
                            <li className="flex-hvm">
                                <Link to={menu.url} className="flex flex-center">
                                    <i className={menu.icon}></i>
                                    {menu.name}
                                </Link>
                            </li>
                        ))
                        }
                    </ul>
                </div>
            </div>
        )
    }
}


Header.propTypes = {
    style: React.PropTypes.object
};


function mapStateToProps(state) {
    return {
        style: state.website.header_style,
        user: state.website.user
    }
}

function mapActionToProps(dispatch) {
    return {}
}


export default connect(
    mapStateToProps,
    mapActionToProps
)(Header);
