import React from 'react';

import {Image, FormGroup, FormControl, Glyphicon, InputGroup, Grid, Modal, Button} from 'react-bootstrap';

import {Link} from 'react-router-dom';

import '../css/login.css';

import LocalizedStrings from 'react-localization';
let ruben = new LocalizedStrings({
    en:{
        // Navigation
        home: "HomePage",
        library: "Library",
        transaction: "Transaction",
        account: "My account",
        setting: "Setting",
        signin: "Sign in",
        signup: "Sign up",
        signout: "Sign out",
        edit_profile: "Edit Profile",
        edit_location: "Edit location",
        change_password: "Change password",
        hi: "Welcome",
        login_welcome: "Sign in to start sharing",
        login: "Login",
        forgot_password: "Forgot Password?",
        am_new: "I'm a new member"
    },
    vi: {
        // Navigation
        home: "Trang chủ",
        library: "Danh mục",
        transaction: "Trao đổi",
        account: "Tài khoản của tôi",
        signin: "Đăng nhập",
        signup: "Đăng ký",
        hi: "Xin chào",
        signout: "Đăng xuất"
    }
});

export default class Login extends React.Component {

    constructor(props) {
        super(props);
    }

    renderHeader() {
        return (
            <Image className="infibook-logo margin-auto display-flex" src={require('../images/logo.jpg')} alt={'Infibook'}/>
        )
    }

    renderForm() {
        return (
            <form
                className="login-form"
                onSubmit={this.props.handleSubmit}
            >

                <h3 className="welcome-text">{ruben.login_welcome}</h3>

                <FormGroup controlId="email" bsSize="large">
                    <InputGroup>

                        <InputGroup.Addon>
                            <Glyphicon glyph={'user'}/>
                        </InputGroup.Addon>

                        <FormControl
                            autoFocus
                            type="email"
                            value={this.props.email}
                            onChange={this.props.handleChange}

                            placeholder={'Email'}
                        />
                    </InputGroup>

                </FormGroup>

                <FormGroup controlId="password" bsSize="large">
                    <InputGroup>
                        <InputGroup.Addon>
                            <Glyphicon glyph={'lock'}/>
                        </InputGroup.Addon>

                        <FormControl
                            value={this.props.password}
                            onChange={this.props.handleChange}
                            type="password"

                            placeholder={'Password'}
                        />
                    </InputGroup>
                </FormGroup>

                <div className="center-div">
                    <p className={"forgot-password"}>
                        {ruben.forgot_password}
                    </p>
                </div>

                <button
                    type='submit'
                    className={"login-button margin-auto display-flex"}
                >
                    <p>{ruben.login}</p>
                </button>

            </form>
        )
    }

    renderFooter() {
        return (
            <div className={"center-div"}>
                <p style={{textAlign: 'center'}}>
                    <span className={"am-new"}>
                        {ruben.am_new}{'. '}
                    </span>

                    <span>
                        <Link to={'/v2/signup'}>
                            <span className={"signup"} onClick={this.props.handleClose}>
                                {ruben.signup}
                            </span>
                        </Link>
                    </span>
                </p>
            </div>
        )
    }

    render() {
        return (
            <Modal show={this.props.show} onHide={this.props.handleClose}>
                <Modal.Header>

                </Modal.Header>
                <Modal.Body>
                    {this.renderHeader()}
                    {this.renderForm()}
                </Modal.Body>
                <Modal.Footer>
                    {this.renderFooter()}
                </Modal.Footer>
            </Modal>
        )
    }
}