// @flow
import React from 'react';
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom';
import { css, StyleSheet } from 'aphrodite';
import { NavDropdown, MenuItem } from 'react-bootstrap';

const styles = StyleSheet.create({
  sidebar: {
    display: 'flex',
    flexDirection: 'column',
    padding: '12px 6px',
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
    borderRadius: '3px',
    ':after': {
      position: 'absolute',
      top: '0px',
      bottom: '0px',
      left: '0',
      width: '3px',
      content: '""',
      background: 'rgba(100,100,255,1.0)',
    },
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
  router: PropTypes.router,
}

const Sidebar = ({ rooms, router }: Props) =>
  <div className={css(styles.sidebar)}>
    <NavDropdown eventKey={3} title="Projects" id="basic-nav-dropdown">
      {rooms.map(room => <MenuItem eventKey={room.id}><RoomLink key={room.id} room={room} /></MenuItem>)}
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
    



  </div>;

export default Sidebar;