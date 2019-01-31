// @flow
import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { css, StyleSheet } from 'aphrodite';
import { Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import ReactTooltip from 'react-tooltip';
import { Progress } from 'reactstrap';

const styles = StyleSheet.create({
  sidebar: {
    display: 'flex',
    flexDirection: 'column',
    padding: '12px 6px',
    width: '200px',
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

type RoomLinkProps = {
  room: Room
}

const RoomLink = ({ room }: RoomLinkProps) =>
  <NavLink to={`/r/${room.id}`} className={css(styles.link)} activeClassName={css(styles.activeLink)}>
    <div className={css(styles.badge)}>
      <span>{room.name}</span>
    </div>
  </NavLink>;

type Props = {
  rooms: Array<Room>,
  currentRoom: Room,
  presentUsers: Array,
  alphas: Array,
  completions: Object
}

class Sidebar extends Component<Props> {
  renderPresentUsers() {
    return this.props.presentUsers.map((user) =>
      <div>
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
    return this.props.alphas.map((alpha) => {
      let completed = 0;
      let total = 0;
      alpha.essence_states.map((state) => {
        completed += this.props.completions[alpha.id + ':' + state.id];
        total += state.patterns.length;
      });
      return (
          <div style={{width: '100%'}}>
          <div className="text-center">{alpha.name}</div>
          <Progress value={completed} max={total}/>
          </div>
        );
    });
  }

  render() {
    return (
      <div className={css(styles.sidebar)}>
      <NavDropdown eventKey={3} title="Projects" id="basic-nav-dropdown">
        {this.props.rooms.map(room => <MenuItem eventKey={room.id}><RoomLink key={room.id} room={room} /></MenuItem>)}
        <MenuItem eventKey={"new-room"}>
          <NavLink
          exact to="/"
          className={css(styles.link)}
          activeClassName={css(styles.activeLink)}
          >
          <div className={css(styles.badge)}>
            <span><i className="fa fa-plus"/> New Project</span>
          </div>
          </NavLink>
        </MenuItem>
      </NavDropdown>
      <hr />
      { this.renderRoomInfo() }
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
  }),
)(Sidebar);
