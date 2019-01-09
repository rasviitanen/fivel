// @flow
import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { css, StyleSheet } from 'aphrodite';
import { fetchAlphas } from '../../actions/alphas';
import AlphaListItem from '../../components/AlphaListItem'
import { Alpha } from '../../types';


const styles = StyleSheet.create({
  card: {
    maxWidth: '500px',
    padding: '3rem 4rem',
    margin: '2rem auto',
  },
});


type Props = {
  alphas: Array<Alpha>,
  fetchAlphas: () => void,
}

class Alphas extends Component<Props> {
  static contextTypes = {
    router: PropTypes.object,
  }

  componentDidMount() {
    this.props.fetchAlphas();
  }

  renderAlphas() {
    return this.props.alphas.map((alpha) =>
      <AlphaListItem
        alpha={alpha}
      />
    );
  }

  render() {
    return (
      <div style={{ flex: '1' }}>
        <div className={`card ${css(styles.card)}`}>
          <div style={{ marginBottom: '1rem' }}>
            {this.renderAlphas()}
          </div>
        </div>
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