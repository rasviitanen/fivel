// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';

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