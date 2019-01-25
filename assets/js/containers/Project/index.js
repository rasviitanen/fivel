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
  connectToChannel: () => void,
  leaveChannel: () => void,
}

class Room extends Component {
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
  }),
  { connectToChannel, leaveChannel }
)(Room);