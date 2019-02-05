// @flow
import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { css, StyleSheet } from 'aphrodite';
import { fetchRooms, createRoom, joinRoom } from '../../actions/rooms';
import NewRoomForm from '../../components/NewRoomForm';
import RoomListItem from '../../components/RoomListItem'

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

  renderRooms() {
    const currentUserRoomIds = [];
    this.props.currentUserRooms.map((room) => currentUserRoomIds.push(room.id));

    return this.props.rooms.map((room) =>
      <RoomListItem
        key={room.id}
        room={room}
        onRoomJoin={this.handleRoomJoin}
        currentUserRoomIds={currentUserRoomIds}
      />
    );
  }

  handleNewRoomSubmit = data => this.props.createRoom(data, this.context.router);

  handleRoomJoin = roomId => this.props.joinRoom(roomId, this.context.router);

  render() {
    return (
      <div style={{ flex: '1', background: '#eee' }}>
        
        <div className={`card ${css(styles.card)}`}>
          <h3 style={{ marginBottom: '2rem', textAlign: 'center' }}>Create a new project room</h3>
          <NewRoomForm onSubmit={this.handleNewRoomSubmit} />
        </div>

        <div className={`card ${css(styles.card)}`}>
          <h3 style={{ marginBottom: '2rem', textAlign: 'center' }}>Join a project room</h3>
          <div style={{ marginBottom: '1rem' }}>
            {this.renderRooms()}
          </div>
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