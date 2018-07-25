import React from 'react';

import Home from './pages/Home'
import Error from './components/Error'

import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Store from "./pages/Store";
import Transaction from "./pages/Transaction";
import Explore from "./pages/Explore";
import Shelf from './pages/Shelf';
import BookView from './pages/BookView';
import UserCorner from './components/UserCorner';
import TransactionDetail from './components/TransactionDetail';
import Authorization from "./v2/components/Authorization";
import NavigationM from "./v2/components/NavigationM";
import HomePage from "./v2/components/HomePage";
import Bookshelf from "./v2/components/Bookshelf";
import BookDetail from "./v2/components/BookDetail";
import VerrattiC from "./v2/components/ExchangeDetail";
import VerrattiE from "./v2/components/VerrattiE";
import TransactionOwner from "./v2/components/TransactionOwner";
import TransactionRequester from "./v2/components/TransactionRequester";
import Profile from "./v2/components/Profile";
import GlobalHeader from "./v2/components/GlobalHeader";
import GlobalFooter from "./v2/components/GlobalFooter";
import Login from "./v2/components/Login";
import Signup from "./v2/components/Signup";
import PinPage from "./v2/components/PinPage";

class Router extends React.Component {

    constructor(props) {
        super(props);

        localStorage.setItem('lang', 'en');
    }

    ComponentCategory = ({ match }) => {
        if (match.params.language === "VN") {
            if (['01','02','03','04','05','06','07','08','09'].includes(match.params.category)) {
                return (
                    // <StoreBooks language={match.params.language} category={match.params.category}/>
                    // <BookContent language={match.params.language} category={match.params.category}/>
                    <Shelf language={match.params.language} category={match.params.category}/>
                )
            } else {
                return (
                    <div>Not Found</div>
                )
            }
        }
        if (match.params.language === "EN") {
            if (['02','03'].includes(match.params.category)) {
                return (
                    // <StoreBooks language={match.params.language} category={match.params.category}/>
                    // <BookContent language={match.params.language} category={match.params.category}/>
                    <Shelf language={match.params.language} category={match.params.category}/>
                )
            } else {
                return (
                    <div>Not Found</div>
                )
            }
        }
    };

    ComponentDetailBook = ({ match }) => {
        if (match.params.code !== "") {
            return (
                <BookView
                    code={match.params.code}
                />
            )
        }
    }

    ComponentDetailTransaction = ({ match }) => {
        if (match.params.id !== "") {
            return (
                <TransactionDetail
                    id={match.params.id}
                />
            )
        }
    };

    ComponentDetail = ({ match }) => {
        if (match.params.code !== "") {
            return (
                <BookDetail
                    code={match.params.code}
                />
            )
        }
    };

    ComponentDMM = ({ match }) => {
        if (match.params.id !== "") {
            return (
                <VerrattiC
                    id={match.params.id}
                />
            )
        }
    };

    render() {
        return (
            <BrowserRouter>
                <div>
                    <GlobalHeader/>

                    <Switch>
                        <Route path={'/v2/auth'} component={Authorization} exact/>

                        <Route path={'/v2/signup'} component={Signup} exact/>

                        <Route path={'/v2/pin'} component={PinPage} exact/>

                        <Route path={'/v2/home'} component={HomePage} exact/>

                        <Route path={'/v2/library'} component={Bookshelf} exact/>

                        <Route path={'/v2/library/detail/:code'} component={this.ComponentDetail} exact/>

                        <Route path={'/v2/transaction'} component={VerrattiE} exact />

                        <Route path={'/v2/transaction/owner'} component={TransactionOwner} exact />

                        <Route path={'/v2/transaction/requester'} component={TransactionRequester} exact />

                        <Route path={'/v2/transaction/:id'} component={this.ComponentDMM} exact/>

                        <Route path={'/v2/profile(|/location|/password)'} component={Profile} exact/>

                        <Route component={Error}/>
                    </Switch>

                    <GlobalFooter/>
                </div>
            </BrowserRouter>
        );

    }
}

export default Router;