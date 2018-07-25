import React from 'react';

import {Grid, Col, Row, Glyphicon, Image} from 'react-bootstrap';

import LocalizedStrings from 'react-localization';

import '../css/TransactionOwner.css';
import NavigationM from "./NavigationM";

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
        owner_transaction: "Chủ giao dịch",
        requester_transaction: "Giao dịch mượn",
        owner: "Chủ sở hữu",
        requester: "Người mượn",
        status: "Trạng thái sách",
        status_set: {
            3: "3",
            4: "4",
            5: "Giao dịch bị từ chối hoặc hủy bỏ",
            6: "6",
            7: "7",
            8: "Đang chờ yêu cầu trả sách",
            9: "9",
            10: "10",
            11: "Người mượn muốn trả sách cho bạn",
            12: "12",
            13: "13",
            14: "14",
            15: "15",
            16: "16",
        },
        responding: "Phản hồi",
        on_going: "Đang diễn ra",
        finished: "Kết thúc",
        my_queue: "Hàng đợi",
        my_request: "Yêu cầu"
    }
});

class TransactionOwner extends React.Component {

    constructor(props){
        super(props);

        this.state = {

        };

        this.renderTransactions = this.renderTransactions.bind(this);

        this.groupFilter = this.groupFilter.bind(this);

        ruben.setLanguage('vi');

        this.fetchTransaction();
    }

    groupFilter() {

    }

    fetchTransaction() {
        let currentEmail = localStorage.getItem('uid');
        let token = `Token ${localStorage.getItem('token')}`;

        if (typeof(currentEmail) === "undefined") {
            alert('You need to login to perform this action!');
        }

        let url = `https://thedung.pythonanywhere.com/api/transaction/get-all/${currentEmail}`

        fetch(
            url,
            {
                method: 'GET',
                headers: {
                    'Authorization' : token
                }
            }
        )
            .then((response) => response.json())
            .then(
                json => {
                    this.setState({
                        transactions: json.filter((item) => {return item.owner_email === currentEmail})
                    });
                    console.log(json);
                    console.log(this.state.transactions);
                }
            );
    }

    renderTransactions() {
        const data = this.state.transactions;

        let render = [];
        data.forEach(
            (item) => {
                console.log(item);
                render.push(
                    <Row>
                        <div className="transaction-container">
                            <Grid fluid className="pure">

                                <Col md={3} className="pure aim-high">
                                    <Image width='210px' height='280px' src={item.book_image} thumbnail/>
                                </Col>

                                <Col md={8}>
                                    <h3><b>{item.book_name}</b></h3>
                                    <hr/>
                                    <h4>{ruben.owner}: {item.owner_name}</h4>
                                    <h4>{ruben.requester}: {item.requester_name}</h4>
                                    <hr/>
                                    <h4>{ruben.status}: {ruben.status_set[item.status]}</h4>
                                </Col>

                                <Col md={1} className="pure aim-high ">
                                    <div className="arrow">
                                        <Glyphicon glyph="chevron-right" />
                                    </div>
                                </Col>
                            </Grid>
                        </div>
                    </Row>
                )
            }
        )

        return render;
    }

    render() {
        return(
            <div>

                <NavigationM
                    />

                <Grid>
                    <Row style={{ padding: '0px 0px',
                        backgroundColor: '#9b859b', color: "#fff", display: 'flex', marginTop: '12px'}}>
                        <h2 style={{margin: 'auto'}}>Giao dịch sách của bạn</h2>
                    </Row>
                </Grid>

                <Grid style={{marginTop: '12px'}}>
                    <Col md={3}>

                        <div className="navigation owner-navigation" onClick={()=>window.location.href = '/v2/transaction/owner'}>
                            <Grid fluid>
                                <Col md={10}>
                                    {ruben.owner_transaction}
                                </Col>
                                <Col md={2} className="aim-high">
                                    <div className="arrow">
                                        <Glyphicon glyph="chevron-right" />
                                    </div>
                                </Col>
                            </Grid>
                        </div>

                        <div className="navigation requester-navigation" onClick={()=>window.location.href = '/v2/transaction/requester'}>
                            <Grid fluid>
                                <Col md={10}>
                                    {ruben.requester_transaction}
                                </Col>
                                <Col md={2} className="aim-high">
                                    <div className="arrow">
                                        <Glyphicon glyph="chevron-right" />
                                    </div>
                                </Col>
                            </Grid>
                        </div>

                    </Col>

                    <Col md={9}>
                        <Row>
                            <div className="customize-group-container">
                                <button className="customize-group-radio" onClick={()=>this.groupFilter('responding')}>{ruben.responding}</button>
                                <button className="customize-group-radio" onClick={()=>this.groupFilter('on_going')}>{ruben.on_going}</button>
                                <button className="customize-group-radio" onClick={()=>this.groupFilter('finished')}>{ruben.finished}</button>
                                <button className="customize-group-radio" onClick={()=>this.groupFilter('my_queue')}>{ruben.my_queue}</button>
                            </div>
                        </Row>

                        {this.state && this.state.transactions &&
                        this.renderTransactions()
                        }

                    </Col>
                </Grid>

            </div>
        )
    }
}

export default TransactionOwner;