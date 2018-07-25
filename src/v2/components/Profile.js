import React from 'react';

import {Glyphicon, Well, Button, Grid, Row, Col, Panel, FormGroup, ControlLabel, FormControl} from 'react-bootstrap';

import {BrowserRouter, Switch, Route, Link} from 'react-router-dom';

import '../css/profile.css';

import LocalizedStrings from 'react-localization';
import GlobalHeader from "./GlobalHeader";

let ruben = new LocalizedStrings({
    en: {
        profile: "Profile",
        edit_profile: "Edit profile",
        change_password: "Change password",
        edit_location: "Edit location",
        edit_details: "Edit details",
        about_you: "About you",
        required_field: "Required field",
        real_name: "Real name",
        gender: "Gender",
        male: "Male",
        female: "Female",
        date_of_birth: "Date of birth",
        day: "Day",
        month: "Month",
        year: "Year",
        mobile_phone: "Mobile phone",
        save_details: "Save details",
        account_setting: "Account Setting",
        my_account: "My Account",
        my_location: "My Location",
        home_location: "Home Location",
        exchange_location: "Exchange Location",
    },
    vi: {
    }
});

class EditLocation extends  React.Component {
    render() {
        return(
            <div>
                <Grid fluid>
                    <Row>
                        <h2 className="heading-account-setting">{ruben.edit_location}</h2>
                    </Row>
                    <Row>
                        <Panel>
                            <Panel.Heading componentClass="panel-profile-heading">
                                <Panel.Title>
                                    <h2>{ruben.my_location}</h2>
                                </Panel.Title>
                            </Panel.Heading>
                            <Panel.Body className="panel-profile-container">

                                <table className="table-container">
                                    <thead>

                                    </thead>

                                    <tfoot>


                                    </tfoot>

                                    <tbody>
                                        <tr>
                                            <th scope="colgroup" colSpan="2">
                                                <h4 className="orange-cool-text"> <b>{ruben.home_location}:</b> </h4>
                                            </th>
                                            <th scope="col">
                                                <h4>10 Duong X, phuong Y, quan Z, thanh pho ABC</h4>
                                            </th>
                                            <th scope="col">
                                                <Glyphicon glyph="pencil" className="edit-button" />
                                            </th>
                                        </tr>

                                        <tr>
                                            <th scope="colgroup" colSpan="2">
                                                <h4 className="orange-cool-text"> <b>{ruben.exchange_location}:</b> </h4>
                                            </th>
                                            <th scope="col">
                                                <h4>15 Duong A, phuong B, quan C, thanh pho XYZ</h4>
                                            </th>
                                            <th scope="col">
                                                <Glyphicon glyph="pencil" className="edit-button" />
                                            </th>
                                        </tr>
                                    </tbody>

                                </table>


                            </Panel.Body>
                        </Panel>
                    </Row>
                </Grid>
            </div>
        )
    }
}

class EditProfile extends  React.Component {

    constructor(props){
        super(props);

        this.year_stack = this.year_stack.bind(this);
    }

    year_stack = () => {
        let res = [];
        res.push(
            <option value={ruben.year}>{ruben.year}</option>
        );
        for (var y = 1930; y <= 2010; y++) {
            res.push(
                <option value={y}>{y}</option>
            );
        }
        return res;
    };

    render() {
        return(
            <div>
                <Grid fluid>
                    <Row>
                        <Col md={4}/>
                        <Col md={4}>
                            <h2 className="heading-account-setting">{ruben.account_setting}</h2>
                        </Col>
                        <Col md={4}/>
                    </Row>
                    <Row>
                        <Panel>
                            <Panel.Heading componentClass="panel-profile-heading">
                                <Panel.Title>
                                    <h2>{ruben.edit_details}</h2>
                                </Panel.Title>
                            </Panel.Heading>
                            <Panel.Body className="panel-profile-container">
                                <Grid fluid>
                                    <Row className="heading-field">
                                        <h2 className="about-you"><b>{ruben.about_you}</b></h2>
                                        <small>*{ruben.required_field}</small>
                                    </Row>
                                    <Row>
                                        <form>
                                            <FormGroup>
                                                <ControlLabel>{ruben.real_name}:</ControlLabel>
                                                <FormControl
                                                    type="text"
                                                />
                                            </FormGroup>

                                            <FormGroup>
                                                <ControlLabel>{ruben.gender}:</ControlLabel>
                                                <FormControl componentClass="select" placeholder={ruben.gender}>
                                                    <option value="male">{ruben.male}</option>
                                                    <option value="female">{ruben.female}</option>
                                                </FormControl>
                                            </FormGroup>

                                            <FormGroup>
                                                <ControlLabel>{ruben.date_of_birth}:</ControlLabel>
                                                <Grid fluid>
                                                    <Col md={4}>
                                                        <FormControl componentClass="select" placeholder={ruben.day}>
                                                            <option value={ruben.day}>{ruben.day}</option>
                                                        </FormControl>
                                                    </Col>
                                                    <Col md={4}>
                                                        <FormControl componentClass="select" placeholder={ruben.month}>
                                                            <option value={ruben.month}>{ruben.month}</option>
                                                        </FormControl>
                                                    </Col>
                                                    <Col md={4}>
                                                        <FormControl componentClass="select" placeholder={ruben.year}>
                                                            {this.year_stack()}
                                                        </FormControl>
                                                    </Col>
                                                </Grid>
                                            </FormGroup>

                                            <FormGroup>
                                                <ControlLabel>{ruben.mobile_phone}:</ControlLabel>
                                                <FormControl
                                                    type="text"
                                                />
                                            </FormGroup>

                                            <Button bsSize="large" bsStyle="danger" type="submit" className="submit-button">{ruben.save_details}</Button>
                                        </form>
                                    </Row>
                                </Grid>
                            </Panel.Body>
                        </Panel>
                    </Row>
                </Grid>
            </div>
        )
    }
}

class ChangePassword extends  React.Component {
    render() {
        return(
            <div>Change password</div>
        )
    }
}

class Profile extends React.Component {

    constructor(props) {
        super(props);
        ruben.setLanguage('en');
    }

    render() {
        return(
            <div>
                <h1>{ruben.profile}</h1>
                <Grid>
                    <Col md={3}>
                        <h3 className="my-account">{ruben.my_account}</h3>
                        <hr/>
                        <ul className="sidenav-li">
                            <li>
                                <Link to='/v2/profile/'>{ruben.edit_profile}</Link>
                            </li>
                            <li>
                                <Link to='/v2/profile/location'>{ruben.edit_location}</Link>
                            </li>
                            <li>
                                <Link to='/v2/profile/password'>{ruben.change_password}</Link>
                            </li>
                        </ul>
                    </Col>
                    <Col md={9}>
                        <Switch>
                            <Route path='/v2/profile' component={EditProfile} exact/>

                            <Route path='/v2/profile/location' component={EditLocation} exact/>

                            <Route path='/v2/profile/password' component={ChangePassword} exact/>
                        </Switch>
                    </Col>
                </Grid>
            </div>
        )
    }
}

export default Profile;