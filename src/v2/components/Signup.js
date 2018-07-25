import React from 'react';

import {Panel, Grid, Col, Row, FormGroup, FormControl, ControlLabel, Button} from 'react-bootstrap';
import {withRouter} from 'react-router-dom';

import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';

import '../css/signup.css';

import LocalizedStrings from 'react-localization';
import {api_register} from "../Utils/Services";
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
        register: "Register"
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

class Signup extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            real_name: "",
            email: "",
            password: "",
            confirm_password: "",
            birthday: null,
            gender: "Male",
        };

        // Submit info to register - Validations lie here
        this.handleSubmit = (e) => {

            e.preventDefault();

            if (this.state.real_name === "") {alert('Please enter your real name'); return}
            if (this.state.email === "") {alert('Please enter your email'); return}
            if (this.state.password === "") {alert('Please enter your password'); return}
            if (this.state.confirm_password !== this.state.password) {alert('Your confirm password is not right!'); return}

            // ENCODE PASSWORD
            const md5Base64 = require('md5-base64');
            const encodedPassword = md5Base64(this.state.password);

            // birthday
            if (this.state.birthday === null) {alert('Please enter your birthday'); return}
            const encodedBirthday = `${this.state.birthday.get('day') + 1}/${this.state.birthday.get('month') + 1}/${this.state.birthday.get('year')}`;

            let url = 'https://thedung.pythonanywhere.com/api/user/register';

            fetch(
                url,
                {
                    method: 'POST',
                    headers: {
                        'Authorization' : 'Token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoiYWRtaW4iLCJjcmVhdGVfdGltZSI6IjIwMTgtMDMtMDRUMDI6NTc6MjMuOTgxMjUzKzAwOjAwIiwiZW1haWwiOiJ0aGVkdW5nMjcwOUBnbWFpbC5jb20iLCJpZCI6MX0.dhZvtbK9YrUzdRObkurnRp89bCH7yy2L3sdaUbWQu0k',
                        'Content-Type' : 'application/json'
                    },
                    body: JSON.stringify({
                        'real_name' : this.state.real_name,
                        'email' : this.state.email,
                        'password': encodedPassword,
                        'gender': this.state.gender,
                        'birthday': encodedBirthday,
                        // other field
                        'register_type': 'normal',
                        'fcm_token' : null
                    })
                }
            )
                .then(response => response.json())
                .then(
                    json => {
                        console.log(json);
                        if (json.error_code === 2) {
                            alert('email existed');
                        }
                        if (json.error_code === 0) {
                            localStorage.setItem('pin-email', `${this.state.email}`);
                            this.props.history.push('/v2/pin');
                        }
                    }
                );

        }

        this.handleChangeDate = (date) => {
            console.log(date);
            console.log(typeof(date));
            this.setState({
                birthday: date
            });
        }

        this.setGender = (e) => {
            this.setState({
                gender: e.target.value
            });
            console.log(e.target.value);
        }

        this.handleChangeRealname = (e) => {
            console.log('Username: ' + e.target.value);
            this.setState({
                real_name: e.target.value
            })
        }

        this.handleChangeEmail = (e) => {
            console.log('Email: ' + e.target.value);
            this.setState({
                email: e.target.value
            })
        }

        this.handleChangePassword = (e) => {
            console.log('Password: ' + e.target.value);
            this.setState({
                password: e.target.value
            })
        }

        this.handleChangeConfirmPassword = (e) => {
            console.log('Confirm Password: ' + e.target.value);
            this.setState({
                confirm_password: e.target.value
            })
        }
    }

    renderHeader() {
        return(
            <h1>{ruben.please_enter}</h1>
        )
    }

    renderForm() {
        return (
            <Grid fluid>
                <Row>
                    <h2 className="heading-account-setting">{ruben.register_new_account}</h2>
                </Row>
                <Row>
                    <Panel>
                        <Panel.Heading componentClass="panel-profile-heading">
                            <Panel.Title>
                                <h2>{ruben.please_enter}</h2>
                            </Panel.Title>
                        </Panel.Heading>
                        <Panel.Body className="panel-profile-container">
                            <Grid fluid>
                                <Col md={3}></Col>
                                <Col md={6}>
                                    <Row className="heading-field">
                                        <h2 className="about-you"><b>{ruben.about_you}</b></h2>
                                    </Row>
                                    <Row>
                                        <form onSubmit={this.handleSubmit}>
                                            <FormGroup>
                                                <ControlLabel>{ruben.real_name}:</ControlLabel>
                                                <FormControl
                                                    type="text"
                                                    onChange={this.handleChangeRealname}
                                                />
                                            </FormGroup>

                                            <FormGroup>
                                                <ControlLabel>{ruben.email}:</ControlLabel>
                                                <FormControl
                                                    type="email"
                                                    onChange={this.handleChangeEmail}
                                                />
                                            </FormGroup>

                                            <FormGroup>
                                                <ControlLabel>{ruben.password}:</ControlLabel>
                                                <FormControl
                                                    type="password"
                                                    onChange={this.handleChangePassword}

                                                />
                                            </FormGroup>

                                            <FormGroup>
                                                <ControlLabel>{ruben.confirm_password}:</ControlLabel>
                                                <FormControl
                                                    type="password"
                                                    onChange={this.handleChangeConfirmPassword}

                                                />
                                            </FormGroup>

                                            <FormGroup>
                                                <Row style={{marginTop: '8px'}} className={"dob-row"}>
                                                    <Col md={4} className={"dob-label display-flex"}>
                                                        <ControlLabel className={"margin-auto lean-left"}>{ruben.gender}:</ControlLabel>
                                                    </Col>
                                                    <Col md={4} style={{float: 'right'}}>
                                                    <label className="radio-box-container">{ruben.male}
                                                        <input
                                                            type="radio"
                                                            value="Male"
                                                            name="gender"
                                                            checked={this.state.gender === 'Male'}
                                                            onChange={this.setGender}
                                                        />
                                                        <span className="checkmark"></span>
                                                    </label>
                                                    </Col>
                                                    <Col md={4} style={{float: 'right'}}>
                                                    <label className="radio-box-container">{ruben.female}
                                                        <input
                                                            type="radio"
                                                            value="Female"
                                                            name="gender"
                                                            checked={this.state.gender === 'Female'}
                                                            onChange={this.setGender}
                                                        />
                                                        <span className="checkmark"></span>
                                                    </label>
                                                    </Col>
                                                </Row>
                                            </FormGroup>



                                            <FormGroup>
                                                <Row className={"dob-row"}>
                                                    <Col md={4} className={"dob-label display-flex"}>
                                                        <ControlLabel className={"margin-auto lean-left"}>{ruben.date_of_birth}:</ControlLabel>
                                                    </Col>
                                                    <Col md={8} style={{float: 'right'}}>
                                                        <DatePicker
                                                            selected={this.state.birthday}
                                                            onChange={this.handleChangeDate}
                                                            placeholderText={'DD/MM/YYYY'}
                                                            dateFormat="DD/MM/YYYY"
                                                            className={"form-control"}
                                                            showMonthDropdown
                                                            showYearDropdown
                                                            dropdownMode="select"
                                                        />
                                                    </Col>
                                                </Row>
                                            </FormGroup>

                                            <Button bsSize="large" bsStyle="danger" type="submit" className="submit-button">{ruben.register}</Button>
                                        </form>
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

    render() {
        return(
            <Grid>
                {/*{this.renderHeader()}*/}
                {this.renderForm()}
            </Grid>
        )
    }
}

export default withRouter(Signup);