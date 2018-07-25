import React from 'react';

import LocalizedStrings from 'react-localization';
import {Grid, Row, Col, Navbar, Nav, MenuItem, NavDropdown, NavItem} from 'react-bootstrap';
import {Link, Switch, Route} from 'react-router-dom';
import '../css/globalheader.css';
import HomePage from "./HomePage";

class GlobalFooter extends React.Component {
    constructor(props){
        super(props);
    }

    render() {
        return(
            <div>
                <h1 style={{textAlign: 'center'}}>Footer</h1>
            </div>
        )
    }
}

export default GlobalFooter;