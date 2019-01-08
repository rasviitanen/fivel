// @flow
import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import Navbar from '../../components/Navbar';
import { css, StyleSheet } from 'aphrodite';
import { fetchRooms, createRoom, joinRoom } from '../../actions/rooms';
import NewRoomForm from '../../components/NewRoomForm';

const styles = StyleSheet.create({
  card: {
    maxWidth: '500px',
    padding: '3rem 4rem',
    margin: '2rem auto',
  },
});

type Room = {
  id: number,
  name: string,
}

type Props = {
  rooms: Array<Room>,
  currentUserRooms: Array<Room>,
  fetchRooms: () => void,
  createRoom: () => void,
  joinRoom: () => void,
}

class Home extends Component {
  static contextTypes = {
    router: PropTypes.object,
  }

  componentDidMount() {
    this.props.fetchRooms();
  }

  props: Props

  handleNewRoomSubmit = data => this.props.createRoom(data, this.context.router);

  handleRoomJoin = roomId => this.props.joinRoom(roomId, this.context.router);

  render() {
    return (
      <div style={{ flex: '1' }}>
        <Navbar />
        <div className={`card ${css(styles.card)}`}>
          <h3 style={{ marginBottom: '2rem', textAlign: 'center' }}>Create a new project room</h3>
          <NewRoomForm onSubmit={this.handleNewRoomSubmit} />
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({
    rooms: state.rooms.all,
    currentUserRooms: state.rooms.currentUserRooms,
  }),
  { fetchRooms, createRoom, joinRoom }
)(Home);