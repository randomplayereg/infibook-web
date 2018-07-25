import React from 'react';

import {Grid, Row, Col, Glyphicon} from 'react-bootstrap';

import {NavLink} from 'react-router-dom';

import '../css/NavigationM.css';

import LocalizedStrings from 'react-localization';
let ruben = new LocalizedStrings({
    en:{
        // Navigation
        home: "HomePage",
        library: "Library",
        transaction: "Transaction",
        account: "My account",
        signin: "Sign in",
        signup: "Sign up"
    },
    vi: {
        // Navigation
        home: "Trang chủ",
        library: "Danh mục",
        transaction: "Trao đổi",
        account: "Tài khoản",
        signin: "Đăng nhập",
        signup: "Đăng ký",
        hi: "Xin chào",
        signout: "Đăng xuất"
    }
});

class NavigationM extends React.Component {
    constructor(props) {
        super(props);

        ruben.setLanguage(localStorage.getItem('language'));

        this.appendStyle = this.appendStyle.bind(this);
    }

    // color: #dedbdb;

    appendStyle(clicked) {
        if (this.props.clicked)
            if (this.props.clicked == clicked) {
                return {
                    color: '#ffc423'
                }
            };
        return {};
    }

    render() {
        return (
            <Grid>
                <Row>
                    <Col>
                        <span>
                            <small onClick={()=>{localStorage.setItem('language', 'en'); window.location.reload();}} style={{cursor: 'pointer'}}>English</small>
                            <small> | </small>
                            <small onClick={()=>{localStorage.setItem('language', 'vi'); window.location.reload();}} style={{cursor: 'pointer'}}>Tiếng Việt</small>
                        </span>

                        {localStorage.getItem('uid') !== "undefined" ?
                            <small style={{float: 'right'}}>{ruben.hi}, {localStorage.getItem('username')} | {ruben.signout}</small>
                            :
                            <small style={{float: 'right'}}>{ruben.signin} | {ruben.signup}</small>
                        }
                    </Col>
                </Row>
                <Row>
                    <Col md={12} className={"navDiv"}>
                        <h1
                            onClick={() => {window.location.href = '/v2/home'}}
                            style={this.appendStyle('HomePage')}
                        >
                            <Glyphicon glyph={'home'}/> {ruben.home}
                        </h1>
                        <h1
                            onClick={() => {window.location.href = '/v2/library'}}
                            style={this.appendStyle('Library')}
                        >
                            <Glyphicon glyph={'book'}/> {ruben.library}
                        </h1>
                        <h1
                            onClick={() => {window.location.href = '/v2/transaction'}}
                            style={this.appendStyle('Transaction')}
                        >
                            <Glyphicon glyph={'transfer'}/> {ruben.transaction}
                        </h1>
                        <h1
                            onClick={() => {window.location.href = '/'}}
                            style={this.appendStyle('Setting')}
                        >
                            <Glyphicon glyph={'cog'}/> {ruben.account}
                        </h1>
                    </Col>
                </Row>
            </Grid>
        )
    }
}

export default  NavigationM;