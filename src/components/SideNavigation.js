import React from 'react';
import {Nav, NavItem} from 'react-bootstrap';

import {Label, Glyphicon} from 'react-bootstrap';

import {Carousel, Button} from 'react-bootstrap';

import {ListGroup, ListGroupItem} from 'react-bootstrap';
import CategoryCarousel from './CategoryCarousel';

class SideNavigation extends React.Component {

    constructor(props, context) {
        super(props, context);
    
        this.handleSelect = this.handleSelect.bind(this);
        this.handleSelectCarousel = this.handleSelectCarousel.bind(this);
        this.handleSelectCategory = this.handleSelectCategory.bind(this);    
        this.state = {
            index: 0,
            direction: null
        };
    }

	handleSelect = (eventKey) => {
		alert(`selected: ${eventKey}`);
	}

    handleSelectCarousel(selectedIndex, e) {
        // alert(`selected=${selectedIndex}, direction=${e.direction}`);
        this.setState({
          index: selectedIndex,
          direction: e.direction
        });        
    }    

    handleSelectCategory(selectedIndex) {
        alert(`${selectedIndex}`);
    }

	render() {

        var styles = {
            overallColor: {
                // backgroundColor: '#ffe8e8',
                //display: 'center'
            },
            labelColor: {
                // backgroundColor: '#ff6666',
                color: '#fbff89',
                maxWidth: '100%',
                margin: 'auto'
            },
            padding: {
                marginLeft: '20px',
                marginRight: '20px'
            },
            languageColor: {
                color: ''
            }
        }

        const { index, direction, tree } = this.state;

    	return(
            <div style={styles.overallColor}>
                <Nav bsStyle="pills" stacked activeKey={1} onSelect={this.handleSelect}>
                    <NavItem eventKey={1} toogle="true"  title="Trang chủ">
                        <Glyphicon glyph="home"/>
                        <span> Trang chủ</span>
                    </NavItem>
                    <NavItem eventKey={2} title="Những thông tin mới nhất">
                        <Glyphicon glyph="heart-empty" />
                        <span> Cộng đồng</span>                        
                    </NavItem>
                    <NavItem eventKey={3} title="Khám phá xung quanh bạn">
                        <Glyphicon glyph="map-marker" />
                        <span> Khám phá</span> 
                    </NavItem>
                </Nav>
                <h4>
                    <Label bsStyle="default" style={styles.labelColor}>
                        <Glyphicon glyph="book" />
                        <span> Danh mục sách</span>
                    </Label>
                </h4>
                <CategoryCarousel/>
            </div>
    	)
  	}
}

export default SideNavigation;

