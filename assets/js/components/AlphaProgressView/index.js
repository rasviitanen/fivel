// @flow
import React, { Component } from 'react';
import { css, StyleSheet } from 'aphrodite';
import { connect } from 'react-redux';

import { Badge } from 'reactstrap';


const styles = StyleSheet.create({
  entity: {
    background: "WhiteSmoke", 
    padding: '10px',
    borderRadius: '5px',
    margin: "0 -5px",
  },
  
  hr: {
    margin: '0px'
  }
});

type Props = {
    alphaId: number,
    progress: number,
}

class AlphaProgressView extends Component<Props> {
    render() {
        return (
            <div>
                { progress }
            </div>
        );
        }
    }

export default connect(
    (state) => ({
        progress: state.alphas.completed,
    }),
  )(AlphaProgressView);