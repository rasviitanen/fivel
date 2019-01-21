// @flow
import React, { Component } from 'react';
import { css, StyleSheet } from 'aphrodite';

const styles = StyleSheet.create({
    completion: {
        fontSize: '12px',
        padding: '3px',
        textAlign: 'center',
        position: 'absolute',
        bottom: '0',
        width: '100%',
        color: 'grey',
    }
});

type Props = {
  total: number
}


class ChecklistCompletionCounter extends Component<Props> {
    render() {
        return (
            <div className={"card-footer bottom " + css(styles.completion)}>
                Total {this.props.total}
            </div>
        );
    }
}

export default ChecklistCompletionCounter;

