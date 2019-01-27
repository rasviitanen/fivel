// @flow
import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { css, StyleSheet } from 'aphrodite';
import { Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';

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
}

class Sidebar extends Component<Props> {
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
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
        <img src={"https://avatars.dicebear.com/v2/identicon/" + this.props.currentRoom.name + ".svg"} height="50px" style={{ marginBottom: '12px'}}></img>
        <h3 style={{ fontWeight: 'bold'}}>{ this.props.currentRoom.name }</h3>
        Current Users
        <div>
        <img src={"https://avatars.dicebear.com/v2/identicon/" + this.props.currentRoom.name + ".svg"} height="20px" style={{ marginRight: '5px'}}></img>
        <img src={"https://avatars.dicebear.com/v2/identicon/" + this.props.currentRoom.name + ".svg"} height="20px" style={{ marginRight: '5px'}}></img>
        </div>
      </div>
    </div>
    );
  }
};

export default connect(
  (state) => ({
    currentRoom: state.sidebar.currentRoom,
  }),
)(Sidebar);
