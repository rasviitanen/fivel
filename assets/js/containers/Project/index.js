// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Navbar from '../../components/Navbar';
import Alphas from '../Alphas';

import {
  connectToChannel,
  leaveChannel,
} from '../../actions/room';

type Props = {
  socket: any,
  channel: any,
  room: Object,
  params: {
    id: number,
  },
  presentUsers: Array,
  connectToChannel: () => void,
  leaveChannel: () => void,
}

class Room extends Component {
  renderPresentUsers() {
    return this.props.presentUsers.map((user) =>
      <img src={"https://avatars.dicebear.com/v2/identicon/" + user.username + ".svg"} height="20px" style={{ marginRight: '5px'}}></img>
    );
  }

  componentDidMount() {
    this.props.connectToChannel(this.props.socket, this.props.match.params.id);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.match.params.id !== this.props.match.params.id) {
      this.props.leaveChannel(this.props.channel);
      this.props.connectToChannel(nextProps.socket, nextProps.match.params.id);
    }
    if (!this.props.socket && nextProps.socket) {
      this.props.connectToChannel(nextProps.socket, nextProps.match.params.id);
    }
  }

  componentWillUnmount() {
    this.props.leaveChannel(this.props.channel);
  }

  props: Props

  render() {
    return (
      <div style={{ flex: '1' }}>
        { this.renderPresentUsers() }
        <Alphas room_id={ this.props.match.params.id }/>
      </div>
    );
  }
}

export default connect(
  (state) => ({
    room: state.room.currentRoom,
    socket: state.session.socket,
    channel: state.room.channel,
    presentUsers: state.room.presentUsers,
  }),
  { connectToChannel, leaveChannel }
)(Room);