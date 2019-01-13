// @flow
import React from 'react';
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom';
import { css, StyleSheet } from 'aphrodite';

const styles = StyleSheet.create({
  sidebar: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh'
  },

  link: {
    position: 'relative',
    display: 'flex',
    width: '100px',
    ':hover': {
      textDecoration: 'none',
    },
    ':focus': {
      textDecoration: 'none',
    },
  },

  activeLink: {
    color: '#000',
    ':after': {
      position: 'absolute',
      top: '12px',
      bottom: '12px',
      left: '0',
      width: '3px',
      content: '""',
      background: 'rgba(100,100,255,1.0)',
    },
  },

  badge: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100px',
    height: '45px',
    margin: '12px auto',
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
      <span>{room.name.slice(0, 10)}</span>
    </div>
  </NavLink>;

type Props = {
  rooms: Array<Room>,
  router: PropTypes.router,
}

const Sidebar = ({ rooms, router }: Props) =>
  <div className={css(styles.sidebar)}>
    {rooms.map(room => <RoomLink key={room.id} room={room} />)}
    <NavLink
      exact to="/"
      className={css(styles.link)}
      activeClassName={css(styles.activeLink)}
    >
      <div className={css(styles.badge)}>
        <span className="fa fa-plus" />
      </div>
    </NavLink>
    <div style={{ flex: '1' }} />
  </div>;

export default Sidebar;