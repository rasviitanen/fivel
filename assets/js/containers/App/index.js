// @flow
import React, { Component } from 'react';
import { HashRouter, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { authenticate, unauthenticate } from '../../actions/session';
import Home from '../Home';
import Login from '../Login';
import Signup from '../Signup';
import Project from '../Project'
import MatchAuthenticated from '../../components/MatchAuthenticated';
import RedirectAuthenticated from '../../components/RedirectAuthenticated';
import Sidebar from '../../components/Sidebar';


type Props = {
  authenticate: () => void,
  unauthenticate: () => void,
  isAuthenticated: boolean,
  willAuthenticate: boolean,
  currentUserRooms: Array<RoomType>,
}

class App extends Component {
  componentDidMount() {
    const token = localStorage.getItem('token');

    if (token) {
      this.props.authenticate();
    } else {
      this.props.unauthenticate();
    }
  }

  props: Props

  render() {
    const { isAuthenticated, willAuthenticate, currentUserRooms } = this.props;
    const authProps = { isAuthenticated, willAuthenticate };

    return (
      <HashRouter>
        <div style={{ display: 'flex', flex: '1', flexDirection: 'row' }}>
          {isAuthenticated &&
                <Sidebar
                rooms={currentUserRooms}
                />
              }
          <Switch>
            <MatchAuthenticated exact path="/" component={Home} {...authProps} />
            <RedirectAuthenticated path="/login" component={Login} {...authProps} />
            <RedirectAuthenticated path="/signup" component={Signup} {...authProps} />
            <MatchAuthenticated path="/r/:id" component={Project} {...authProps} />
          </Switch>
        </div>
      </HashRouter>
    );
  }
}

export default connect(
  state => ({
    isAuthenticated: state.session.isAuthenticated,
    willAuthenticate: state.session.willAuthenticate,
    currentUserRooms: state.rooms.currentUserRooms,
  }),
  { authenticate, unauthenticate }
)(App);
