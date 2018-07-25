import React from 'react';

import {Button, Panel, Grid, Col, Row} from 'react-bootstrap';

import {View, Pin} from 'react-desktop/macOs'

import {admin_token} from "../Utils/Services";

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
        please_enter: "Enter your information and continue",
        real_name: "Username",
        email: "Email",
        password: "Password",
        confirm_password: "Confirm Password",
        gender: "Gender",
        male: "Male",
        female: "Female",
        date_of_birth: "Date of birth",
        register_new_account: "Register new account",
        about_you: "About you",
        register: "Register",

        pin_head: "Verify your account",
        enter_pin: "Please enter the pin !",
        send: "Send"
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

class PinPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            pin: null
        }

        this.onPinChange = value => {
            this.setState({
                pin: value
            })
        }

        this.handleSendPin = () => {
            let url = 'https://thedung.pythonanywhere.com/api/user/register/confirm-pin';

            fetch(
                url,
                {
                    method: "POST",
                    headers: {
                        "Authorization" : admin_token,
                        "Content-Type" : "application/json"
                    },
                    body: JSON.stringify({
                        "email" : localStorage.getItem("pin-email"),
                        "pin" : this.state.pin,
                        "fcm_token" : null
                    })
                }
            )
                .then( response => response.json())
                .then(
                    json => {
                        console.log("Pin response:");
                        console.log(json);
                        if (json.error_code === 7) {
                            alert('PIN is incorrect');
                        } else {
                            alert('Successfully confirm your account, you can login now!')
                        }
                    }
                )
        }
    }

    render() {
        return (
            <Grid>
                <Row>
                    <Panel>
                        <Panel.Heading componentClass="panel-profile-heading">
                            <Panel.Title>
                                <h2>{ruben.pin_head}</h2>
                            </Panel.Title>
                        </Panel.Heading>
                        <Panel.Body className="panel-profile-container">
                            <Grid fluid>
                                <Col md={3}></Col>
                                <Col md={6}>
                                    <Row className="heading-field">
                                        <h2 className="about-you"><b>{ruben.enter_pin}</b></h2>
                                    </Row>
                                    <View padding={'20px'} background={"#efeff1"}>
                                        <Pin
                                            onChange={this.onPinChange}
                                            length={4}
                                            reveal
                                            margin={"auto"}
                                        />
                                    </View>
                                    <Row style={{marginTop: '16px'}}>
                                        <Button bsSize="large" bsStyle="danger" onClick={this.handleSendPin} className="submit-button">{ruben.send}</Button>
                                    </Row>
                                </Col>
                                <Col md={3}></Col>
                            </Grid>
                        </Panel.Body>
                    </Panel>
                </Row>
            </Grid>
        )
    }
}

export default PinPage;