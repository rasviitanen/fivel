// @flow
import React, { Component } from 'react';
import { css, StyleSheet } from 'aphrodite';
import { connect } from 'react-redux';

import Checklist from '../Checklist';
import NewTodoForm from '../NewTodoForm';

import { Card, CardBody, CardTitle, CardFooter, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { fetchTodos, addTodo, deleteTodo } from '../../actions/states';


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
}

class StateTodoCounter extends Component<Props, State> {
    shouldComponentUpdate(nextProps, nextState) {
        if (this.props.stateId === nextProps.updatedStateId) {
            return true;
        }
        return false;
    }

    render() {
        return (
            <div>
                { this.props.numTodos }
            </div>
        );
        }
    }

export default connect(
    (state) => ({
        numTodos: state.states.todos.length,
        updatedStateId: state.states.updatedStateId
    }),
  )(StateTodoCounter);