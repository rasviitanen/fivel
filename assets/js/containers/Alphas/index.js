// @flow
import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { css, StyleSheet } from 'aphrodite';
import { fetchAlphas } from '../../actions/alphas';
import AlphaListItem from '../../components/AlphaListItem'

import CircularProgress from '@material-ui/core/CircularProgress';
import LinearProgress from '@material-ui/core/LinearProgress';

import { Alpha } from '../../types';

type Props = {
  alphas: Array<Alpha>,
  room_id: number,
  fetchAlphas: () => void,
}

type State = {
  isLoading: boolean,
}

class Alphas extends Component<Props, State> {
  state = {
    isLoading: true,
  }

  static contextTypes = {
    router: PropTypes.object,
  }

  componentDidMount() {
    this.props.fetchAlphas(this.props.room_id);
    setTimeout(() => this.setState({ isLoading: false }), 300);
  }

  componentWillReceiveProps(nextProps) {
    const currentId = this.props.room_id
    const nextId = nextProps.room_id

    if (currentId !== nextId) {
      this.setState({ isLoading: true });
      this.props.fetchAlphas(nextId);
      setTimeout(() => this.setState({ isLoading: false }), 300);
    }
  }

  renderAlphas() {
    return this.props.alphas.map((alpha) =>
        <div key={ alpha.id } style={{ flex: '1', display: (this.state.isLoading ? "none" : null) }}>
          <AlphaListItem
            alpha={alpha}
          />
      </div>
      
    );
  }

  render() {
    return (
      <div style={{ flex: '1' }}>
          { this.state.isLoading ? <CircularProgress /> : <div style={{ margin: '10px', textAlign: 'center', fontSize: '0.7em', opacity: '0.4'}}>This project builds upon the SEMAT Essence standard, credit goes to SEMAT Inc. and others for the original creation. <a href="http://semat.org/">Visit the SEMAT Inc. website.</a></div> }
          { this.renderAlphas() }
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