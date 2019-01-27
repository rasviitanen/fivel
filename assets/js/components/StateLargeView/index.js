// @flow
import React, { Component } from 'react';
import { css, StyleSheet } from 'aphrodite';
import { connect } from 'react-redux';

import ReactTooltip from 'react-tooltip';
import Checklist from '../Checklist';
import NewTodoForm from '../NewTodoForm';

import { State as EssenceState, Todo } from '../../types';

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
    state: EssenceState,
    todos: Object,
    fetchTodos: () => void,
    addTodo: () => void,
    deleteTodo: () => void,
}

type State = {
    show: boolean,
}



class StateLargeView extends Component<Props, State> {
    constructor(props, context) {
        super(props, context);

        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);

        this.state = {
            show: false
        };
    }

    renderTodos() {
        return this.props.todos.map((todo) =>
            <div key={ todo.id } style={{ margin: '5px', padding: '5px 8px', cursor: 'pointer', color: "#fff", background: 'SlateBlue', borderRadius: '3px', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                { todo.name }
                <i className="fa fa-minus-circle" onClick={ () => this.deleteTodo(todo.id) }></i>
            </div>
        );
    }

    addTodo = (name) => {    
        this.props.addTodo(this.props.state.id, name);
    };

    deleteTodo = (id) => {    
        this.props.deleteTodo(this.props.state.id, id);
    };

    handleClose() {
        this.setState({ show: false });
    }

    handleShow() {
        this.props.fetchTodos(this.props.state.id);
        this.setState({ show: true });
    }

    handleNewTodoSubmit = data => this.props.addTodo(this.props.state.id, data);

    render() {
        console.log("rendering");
        return (
            <div>
                <i className="fa fa-expand" style={{ cursor: "pointer" }} onClick={this.handleShow}/>
                <Modal isOpen={this.state.show} fade={ false } toggle={this.handleClose} size="lg">
                    <ModalHeader>
                        { this.props.state.name }
                    </ModalHeader>
                    
                    <ModalBody>
                    <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                        <div style={{ width: '70%'}}>
                            <h3>Checklist</h3>
                            <Checklist patterns={this.props.state.patterns}/>
                            <hr />
                            <Card>
                                <CardBody>
                                    <CardTitle>To Do</CardTitle>
                                </CardBody>
                                    { this.renderTodos() }
                                <CardFooter>
                                    <NewTodoForm onSubmit={ this.handleNewTodoSubmit } ></NewTodoForm>
                                </CardFooter>
                            </Card>

                            <Card>
                                <CardBody>
                                    <CardTitle>Doing</CardTitle>
                                </CardBody>
                            </Card>
                            
                            <Card>
                                <CardBody>
                                    <CardTitle>Done</CardTitle>
                                </CardBody>
                            </Card>
                            </div>
                        <div className={css(styles.entity)} style={{ width: '28%' }}>
                            <h4>Discussion</h4>
                            <hr />
                        </div>
                    </div>
                    </ModalBody>

                    <ModalFooter>
                        <Button onClick={this.handleClose}>Close</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
    }

export default connect(
    (state) => ({
      todos: state.states.todos,
    }),
    { fetchTodos, addTodo, deleteTodo }
  )(StateLargeView);;