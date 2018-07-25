import React from 'react';

import {Navbar, FormGroup, FormControl, Button} from 'react-bootstrap';

class TopBar extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Navbar>
                <Navbar.Header>
                    <Navbar.Brand>
                        <a href="#home">Brand</a>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Navbar.Form pullLeft>
                        <FormGroup>
                            <FormControl type="text" placeholder="Search" />
                        </FormGroup>{' '}
                        {/*<Button type="submit">Submit</Button>*/}
                    </Navbar.Form>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}
