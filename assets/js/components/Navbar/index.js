// @flow
import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { css, StyleSheet } from 'aphrodite';
import { logout } from '../../actions/session';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

type Props = {
  logout: () => void,
  currentUser: Object,
  isAuthenticated: boolean,
}

const styles = StyleSheet.create({
  navbar: {
    flexGrow: '1',
    margin: '0px',
  },

  grow: {
    flexGrow: '1',
  },

  link: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: '18px',
    ':hover': {
      textDecoration: 'none',
    },
    ':focus': {
      textDecoration: 'none',
    },
  },
});

class NavBar extends Component<Props> {
  static contextTypes = {
    router: PropTypes.object,
  }

  handleLogout = () => this.props.logout(this.context.router);

  render() {
    const { currentUser, isAuthenticated } = this.props;

      return (
        <AppBar position="static" className={css(styles.navbar)}>
          <Toolbar>
            <Link to="/" className={css(styles.link)}>FIVEL Essence</Link>
            <div className={css(styles.grow)} />
          {isAuthenticated &&
            <Toolbar>
              <img src={"https://avatars.dicebear.com/v2/identicon/" + currentUser.username + ".svg"} height="15px" style={{ marginRight: "5px" }}></img>
              <span style={{ marginRight: "15px" }}>{currentUser.username}</span>
              <Button color="inherit" onClick={this.handleLogout}>
                Sign Out
              </Button>
            </Toolbar>
          }
          </Toolbar>
        </AppBar>
      );
  }
}

export default connect(
  state => ({
    isAuthenticated: state.session.isAuthenticated,
    currentUser: state.session.currentUser,
  }),
  { logout }
)(NavBar);
