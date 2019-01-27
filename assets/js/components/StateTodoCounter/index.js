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
                <Badge style={{ margin: "5px" }} color={(renderColor) ? "secondary" : "warning"}>To Do: { this.props.numTodos }</Badge>
                <Badge style={{ margin: "5px" }} color={(renderColor) ? "secondary" : "warning"}>Doing: { this.props.numDoing }</Badge>
                <Badge style={{ margin: "5px" }} color={(renderColor) ? "secondary" : "warning"}>Done: { this.props.numDone }</Badge>
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