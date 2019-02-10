// @flow
import React, { Component } from 'react';
import { css, StyleSheet } from 'aphrodite';
import { connect } from 'react-redux';

import Chip from '@material-ui/core/Chip';
import {Label, LabelImportant, LabelOff} from '@material-ui/icons';

const styles = StyleSheet.create({
  chipHighlight: {
      fontSize: '0.7em',
      margin: '2px',
      height: '18px',
      background: "#ffc107",
      color: '#fff'
  },
  chipRegular: {
    fontSize: '0.7em',
    margin: '2px',
    height: '18px',
    background: "rgba(0,0,0,0)",
},
whiteText: {
    color: '#fff'
}
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
                <Chip classes={{ root: css(!renderColor ? styles.chipHighlight : styles.chipRegular), icon: css(!renderColor ? styles.whiteText : null)}} icon={<Label style={{ height: '0.6em' }}/>} label={ this.props.numTodos }/>
                <Chip classes={{ root: css(!renderColor ? styles.chipHighlight : styles.chipRegular), icon: css(!renderColor ? styles.whiteText : null)}} icon={<LabelImportant style={{ height: '0.6em' }}/>} label={ this.props.numDoing }/>
                <Chip classes={{ root: css(!renderColor ? styles.chipHighlight : styles.chipRegular), icon: css(!renderColor ? styles.whiteText : null)}} icon={<LabelOff style={{ height: '0.6em' }}/>} label={ this.props.numDone }/>
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