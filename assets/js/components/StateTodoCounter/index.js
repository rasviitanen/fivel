// @flow
import React, { Component } from 'react';
import { css, StyleSheet } from 'aphrodite';
import { connect } from 'react-redux';

import Chip from '@material-ui/core/Chip';
import {Label, LabelImportant, LabelOff} from '@material-ui/icons';


const styles = StyleSheet.create({
  chip: {
      fontSize: '0.7em',
      margin: '2px',
      height: '18px'
  },
});

type Props = {
    stateId: number,
    updatedStateId: number,
    numTodos: number,
    numDoing: number,
    numDone: number,
}

class StateTodoCounter extends Component<Props> {
    shouldComponentUpdate(nextProps, nextState) {
        if (this.props.stateId === nextProps.updatedStateId) {
            return true;
        }
        return false;
    }

    render() {
        const renderColor = (this.props.numTodos + this.props.numDoing == 0);
        return (
            <div>
                <Chip classes={{ root: css(styles.chip)}} icon={<Label style={{ height: '0.6em' }}/>} color="primary" label={ this.props.numTodos } variant={!(renderColor) ? "default" : "outlined"}/>
                <Chip classes={{ root: css(styles.chip)}} icon={<LabelImportant style={{ height: '0.6em' }}/>} color="primary" label={ this.props.numDoing } variant={!(renderColor) ? "default" : "outlined"}/>
                <Chip classes={{ root: css(styles.chip)}} icon={<LabelOff style={{ height: '0.6em' }}/>} color="primary" label={ this.props.numDone } variant={!(renderColor) ? "default" : "outlined"}/>
            </div>
        );
        }
    }

export default connect(
    (state) => ({
        numTodos: state.states.numTodos,
        numDoing: state.states.numDoing,
        numDone: state.states.numDone,
        updatedStateId: state.states.updatedStateId
    }),
  )(StateTodoCounter);