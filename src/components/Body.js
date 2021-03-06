import React from 'react';
import SideNavigation from './SideNavigation';

import {Grid, Row, Col} from 'react-bootstrap';
import MainContent from './MainContent';

class Body extends React.Component {
    
    render() {

        var styles = {
            fill: {
                color: 'red',
                backgroundColor: 'red'
            },
            flexbox: {
                display: 'flex',
                backgroundColor: 'yellow'
            },
            rightside: {
                border: '1px solid #ddd',
                borderRadius: '4px',
                padding: '1px',
            }
        };
      
        return(
            <Grid>
                <Row>
                    <Col md={2}>
                        <SideNavigation />
                    </Col>
                    <Col md={8}>
                        <MainContent />
                    </Col>
                    <Col md={2} fluid>
                        <img src="https://picsum.photos/195/500" style={styles.rightside}/>
                    </Col>
                </Row>
            </Grid>
        )
    }
}

export default Body;