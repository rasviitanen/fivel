// @flow
import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { css, StyleSheet } from 'aphrodite';
import { fetchAlphas } from '../../actions/alphas';
import AlphaListItem from '../../components/AlphaListItem'

import { Alpha } from '../../types';

type Props = {
  alphas: Array<Alpha>,
  room_id: number,
  fetchAlphas: () => void,
}

class Alphas extends Component<Props> {
  static contextTypes = {
    router: PropTypes.object,
  }

  componentDidMount() {
    this.props.fetchAlphas(this.props.room_id);
  }

  componentWillReceiveProps(nextProps) {
    const currentId = this.props.room_id
    const nextId = nextProps.room_id

    if (currentId !== nextId) {
      this.props.fetchAlphas(nextId);
    }
  }

  renderAlphas() {
    return this.props.alphas.reverse().map((alpha) =>
      <div key={ alpha.id } style={{ flex: '1' }}>
        <AlphaListItem
          alpha={alpha}
        />
      </div>
      
    );
  }

  render() {
    return (
      <div style={{ flex: '1' }}>
          {this.renderAlphas()}
      </div>
    );
  }
}

export default connect(
  state => ({
    alphas: state.alphas.all,
  }),
  { fetchAlphas }
)(Alphas);