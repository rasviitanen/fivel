// @flow
import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { css, StyleSheet } from 'aphrodite';
import { logout } from '../../actions/session';

import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import ReactTooltip from 'react-tooltip';
import LinearProgress from '@material-ui/core/LinearProgress';

const styles = StyleSheet.create({
  sidebar: {
    display: 'flex',
    flexDirection: 'column',
    padding: '12px 6px',
    width: '200px',
    minWidth: '200px',
    maxWidth: '200px',
    minHeight: '100vh',
    background: '#fff',
  },

  link: {
    position: 'relative',
    display: 'flex',
    ':hover': {
      textDecoration: 'none',
    },
    ':focus': {
      textDecoration: 'none',
    },
  },

  smallerText: {
    fontSize: '0.9em'
  },

  activeLink: {
    color: '#000',
    background: 'rgba(100,100,255,0.2)',

  },

  badge: {
    display: 'flex',
    alignItems: 'center',
    padding: '6px 6px',
    width: '100px',
    fontSize: '12px',
  },
});

type Room = {
  id: number,
  name: string,
}

type Props = {
  rooms: Array<Room>,
  currentRoom: Room,
  presentUsers: Array,
  alphas: Array,
  completions: Object,

  logout: () => void,
  currentUser: Object,
  isAuthenticated: boolean,
}

class Sidebar extends Component<Props> {
  state = {
    anchorEl: null,
  };

  static contextTypes = {
    router: PropTypes.object,
  }

  handleLogout = () => this.props.logout(this.context.router);

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  renderPresentUsers() {
    console.log("CURRENT ROOM");
    console.log(this.props.currentRoom);

    return this.props.presentUsers.map((user) =>
      <div key={user.id}>
        <img src={"https://avatars.dicebear.com/v2/identicon/" + user.username + ".svg"} height="25px" style={{ marginRight: '5px'}} data-tip={user.username}></img>
        <ReactTooltip/>
      </div>
    );
  }

  renderRoomInfo() {
    if (this.props.currentRoom.name) {
      return(
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
          <img src={"https://avatars.dicebear.com/v2/identicon/" + this.props.currentRoom.name + ".svg"} height="50px" style={{ marginBottom: '12px'}}></img>
          <h3 style={{ fontWeight: 'bold'}}>{ this.props.currentRoom.name }</h3>
          Online Users
          { this.renderPresentUsers() }
          <hr/>
          { this.renderCompletions() }
      </div>);
    }
  }

  
  renderCompletions() {
    const normalise = (value, max) => (value) * 100 / (max);

    return this.props.alphas.map((alpha) => {
      let completed = 0;
      let total = 0;
      alpha.essence_states.map((state) => {
        completed += this.props.completions[alpha.id + ':' + state.id];
        total += state.patterns.length;
      });
      return (
          <div key={alpha.id} style={{width: '100%'}}>
          <div className={css(styles.smallerText)}>{alpha.name}</div>
          <LinearProgress variant="determinate" value={normalise(completed, total)}/>
          </div>
        );
    });
  }

  render() {
    const { anchorEl } = this.state;

    return (
      <div className={css(styles.sidebar)}>
      <Button
          aria-owns={anchorEl ? 'project-menu' : undefined}
          aria-haspopup="true"
          onClick={this.handleClick}
      >
        Projects
      </Button>

      <Menu
          id="project-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >

        {this.props.rooms.map(room => 
          <NavLink key={room.id} to={`/r/${room.id}`}>
              <MenuItem onClick={this.handleClose}>
                {room.name}
              </MenuItem>
          </NavLink>)}

        <NavLink exact to="/">
          <MenuItem onClick={this.handleClose}>
              <span>New Project</span>
          </MenuItem>
        </NavLink>
      </Menu>
      <hr />
      { this.renderRoomInfo() }
      <Button color="inherit" onClick={this.handleLogout}>
          Sign Out
      </Button>
    </div>
    );
  }
};

export default connect(
  (state) => ({
    currentRoom: state.sidebar.currentRoom,
    presentUsers: state.room.presentUsers,
    alphas: state.alphas.all,
    completions: state.alphas.stateCompletions,
    isAuthenticated: state.session.isAuthenticated,
    currentUser: state.session.currentUser,
  }),
  { logout }
)(Sidebar);
