import React from 'react';

import '../Utils/Services';

import {Image, Button, Modal, Grid, Row, Col, Navbar, Nav, MenuItem, NavDropdown, NavItem} from 'react-bootstrap';
import {Link, Switch, Route} from 'react-router-dom';
import '../css/globalheader.css';
import logo from '../images/logo.jpg';

import LocalizedStrings from 'react-localization';
import Login from "./Login";
import {admin_token, api_logout} from "../Utils/Services";
import {printCoor} from "../Utils/Helper";

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
        hi: "Welcome"
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

class NavigationBar extends React.Component {
    constructor(props) {
        super(props);



        ruben.setLanguage(localStorage.getItem('lang'));
    }

    render() {

        const styles = {
            navbarStyle: {
                backgroundColor: '#746EA9'
            }
        };

        return(
            <Navbar className="custom-navbar">
                <Navbar.Header className='custom-header'>
                    <Navbar.Brand className="custom-brand">
                        <Link to='/v2/home' className='wrapper-link'>
                            <Image className="infibook-logo" src={require('../images/logo.jpg')} alt={'Infibook'}/>
                        </Link>
                    </Navbar.Brand>
                </Navbar.Header>
                <Nav className="nav-list">
                    <NavItem className={"nav-item"}>
                        <Link to='/v2/home' className={"nav-item-link"}>{ruben.home}</Link>
                    </NavItem>
                    <NavItem className={"nav-item"}>
                        <Link to='/v2/library' className={"nav-item-link"}>{ruben.library}</Link>
                    </NavItem>
                    <NavItem className={"nav-item"}>
                        <Link to='/v2/transaction' className={"nav-item-link"}>{ruben.transaction}</Link>
                    </NavItem>
                    <NavDropdown eventKey={3} title={ruben.account} id={"nav-item-drop"}>
                        <MenuItem eventKey={3.1} className={"nav-item-dropitem"}>
                            <Link to='/v2/profile' className={"nav-item-droplink"}>{ruben.edit_profile}</Link>
                        </MenuItem>
                        <MenuItem eventKey={3.2} className={"nav-item-dropitem"}>
                            <Link to='/v2/profile/location' className={"nav-item-droplink"}>{ruben.edit_location}</Link>
                        </MenuItem>
                        <MenuItem eventKey={3.3} className={"nav-item-dropitem"}>
                            <Link to='/v2/profile/password' className={"nav-item-droplink"}>{ruben.change_password}</Link>
                        </MenuItem>
                        <MenuItem divider />
                    </NavDropdown>
                </Nav>
            </Navbar>
        )
    }
}

class ActionRow extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showLogin: false,
            loggedIn: localStorage.getItem('token') !== null,
            email: "",
            password: ""
        };

        this.vnLang = () => {
            localStorage.setItem('lang', 'vi');
            window.location.reload();
        };

        this.enLang = () => {
            localStorage.setItem('lang', 'en');
            window.location.reload();
        };

        this.signOut = () => {
            let url = 'https://thedung.pythonanywhere.com/api/user/logout';
            fetch(url, {
                method: 'POST',
                headers: {
                    'Authorization' : admin_token,
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify({
                    'email' : localStorage.getItem('uid'),
                    'token' : `Token ${localStorage.getItem('token')}`
                })
            })
                .then(response => response.json())
                .then(
                    json => {
                        if (json.error_code === 0) {
                            alert('Successfully logged out');
                            localStorage.removeItem('token');
                            localStorage.removeItem('username');
                            localStorage.removeItem('uid');
                            this.setState({
                                loggedIn: false
                            });
                        } else {
                            alert('Somethine wrong');
                            console.log(json);
                        }
                    }
                );
        }

        this.showLogin = () => {
            this.setState({
                showLogin: true
            })
        };

        this.hideLogin =() => {
            this.setState({
                showLogin: false
            })
        };

        this.handleChange = event => {
            console.log([event.target.id] + event.target.value);
            this.setState({
                [event.target.id]: event.target.value
            });
        };

        this.handleSubmit = (e) => {
            e.preventDefault();

            const md5Base64 = require('md5-base64');
            const encodedPassword = md5Base64(this.state.password);
            console.log('pw use md5-base64: ' + encodedPassword);

            var self = this;

            // const fetch = window.fetch.bind(window);

            let url = `https://thedung.pythonanywhere.com/api/user/login`;

            fetch(url,
                {
                    method: 'POST',
                    headers: {
                        'Authorization' : 'Token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoiYWRtaW4iLCJjcmVhdGVfdGltZSI6IjIwMTgtMDMtMDRUMDI6NTc6MjMuOTgxMjUzKzAwOjAwIiwiZW1haWwiOiJ0aGVkdW5nMjcwOUBnbWFpbC5jb20iLCJpZCI6MX0.dhZvtbK9YrUzdRObkurnRp89bCH7yy2L3sdaUbWQu0k'
                    },
                    body: JSON.stringify({
                        email: this.state.email,
                        password: encodedPassword,
                        login_type: this.state.email,
                        fcm_token: "fzYu1WW46Rs:APA91bF5_KMWd5FJaXtjoauWzlxIFhOPcZ-BwZpsIj-keErX_6tfXlWUvWngSoj6PnLgMDcBrJ5M6YFwS370H6CPQ-YIZm3nCzwqXTEll4ug8b0oPwiFrK3m0dkO9126K5UVBzXYyL39"
                    })
                })
                .then(response => response.json())
                .then(
                    json => {
                        console.log(json);
                        if (json.error_code) {
                            if (json.error_code == 11) {
                                alert('Wrong email or password');
                                // this.setState({
                                //     hideProgress: true,
                                //     show: false
                                // })
                            }
                        } else {
                            localStorage.setItem('token', json.token);
                            localStorage.setItem('username', json.real_name);
                            localStorage.setItem('uid', json.email);

                            this.setState({
                                loggedIn: true
                            });
                            this.hideLogin();


                            // setTimeout(() => {
                            //     window.location.replace('/v2/home');
                            // }, 2000);
                        }
                    }
                );
        }
    }

    render() {
        return (
            <Grid>
                <Row className="inline-display">
                    <div className="language-selector">
                        <small onClick={this.vnLang}>Tiếng Việt</small>
                        <small onClick={this.enLang}>English</small>
                    </div>
                    <div className="account-actions">
                        {this.state.loggedIn ?
                            [
                                <small>
                                    {/*<Link to='/v2/auth'>{ruben.signin}</Link>*/}
                                    {`${ruben.hi}, ${localStorage.getItem('username')}`}
                                </small>,
                                <small onClick={this.signOut}>
                                    {ruben.signout}
                                </small>
                            ]
                            :
                            [
                                <small onClick={this.showLogin}>
                                    Sign in
                                </small>,
                                <Login
                                    email={this.state.email}
                                    password={this.state.password}
                                    show={this.state.showLogin}
                                    handleClose={this.hideLogin}
                                    handleShow={this.showLogin}
                                    handleChange={this.handleChange}
                                    handleSubmit={this.handleSubmit}
                                />
                            ]
                        }
                    </div>
                </Row>
            </Grid>
        )
    }
}

class GlobalHeader extends React.Component {
    constructor(props){
        super(props);

        this.getLocation = () => {
            if (window.navigator.geolocation) {
                window.navigator.geolocation.watchPosition(this.showPosition);
            } else {
                alert("Geolocation is not supported by this browser.");
            }
        };

        this.showPosition = (position) => {
            this.setState({
                lat: position.coords.latitude,
                lng: position.coords.longitude
            })
        }

        this.getLocation();
    }

    renderLoc() {
        return(
            <h1>{`${this.state.lat}:${this.state.lng}}}`}</h1>
        )
    }

    render() {
        return(
            <div className="global-header">
                <Grid>
                    {/*{this.state && this.state.lat && this.state.lng && this.renderLoc()}*/}
                </Grid>
                <ActionRow/>
                <Grid>
                    <NavigationBar/>
                </Grid>
            </div>
        )
    }
}

export default GlobalHeader;