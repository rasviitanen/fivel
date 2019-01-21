// @flow
import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { css, StyleSheet } from 'aphrodite';
import { logout } from '../../actions/session';

type Props = {
  logout: () => void,
  currentUser: Object,
  isAuthenticated: boolean,
}

const styles = StyleSheet.create({
  navbar: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 1rem',
    height: '50px',
    background: 'DodgerBlue',
    justifyContent: 'space-between',
    boxShadow: '0 1px 1px rgba(0,0,0,.1)',
    position: 'sticky',
    top: '0px',
    zIndex: '20',
    flex: '1',
    color: '#fff',

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

class NavBar extends Component {
  static contextTypes = {
    router: PropTypes.object,
  }

  props: Props

  handleLogout = () => this.props.logout(this.context.router);

  render() {
    const { currentUser, isAuthenticated } = this.props;

      return (
        <div className={css(styles.navbar)}>
          <nav>
            <Link to="/" className={css(styles.link)}><i class="fa fa-line-chart" aria-hidden="true"></i> FIVEL Essence</Link>
          </nav>

          {isAuthenticated &&
            <nav>
              <span style={{ marginRight: "15px" }}>{currentUser.username}</span>
              <div type="button" onClick={this.handleLogout}
              className="btn btn-outline btn-sm">
                <i className="fa fa-sign-out" ></i> Sign Out
              </div>
            </nav>
          }
        </div>
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
