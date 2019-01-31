// @flow
import React, { Component } from 'react';
import { css, StyleSheet } from 'aphrodite';
import { connect } from 'react-redux';

import Checklist from '../Checklist';
import NewTodoForm from '../NewTodoForm';

import { State as EssenceState, Todo } from '../../types';

import { Card, CardBody, CardTitle, CardFooter, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { fetchTodos, addTodo, deleteTodo, changeTodo } from '../../actions/states';
import { sendMessage } from '../../actions/room';



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
    updatedStateId: number,
    channel: any,
    fetchTodos: () => void,
    addTodo: () => void,
    deleteTodo: () => void,
    changeTodo: () => void,
    sendMessage: () => void,
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

    componentDidMount() {
        this.props.fetchTodos(this.props.state.id);
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (this.props.state.id === nextProps.updatedStateId || this.state.show == true) {
            return true;
        }
        return false;
    }

    renderTodos() {
        return this.props.todos.map((todo) => {
            if (todo.state === "todo") {
                return (<div key={ todo.id } style={{ margin: '5px', padding: '5px 8px', cursor: 'pointer', color: "#fff", background: '#0087af', borderRadius: '3px', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <span>{ todo.name } <i className="fa fa-angle-double-down" onClick={ () => this.changeTodo(todo.id, {"state": "doing"}) }></i></span>
                    <i className="fa fa-minus-circle" onClick={ () => this.deleteTodo(todo.id) }></i>
                </div>);
            }
        });
    }

    renderDoing() {
        return this.props.todos.map((todo) => {
            if (todo.state === "doing") {
                return (<div key={ todo.id } style={{ margin: '5px', padding: '5px 8px', cursor: 'pointer', color: "#fff", background: '#c6bc4b', borderRadius: '3px', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <span>{ todo.name } <i className="fa fa-angle-double-up" onClick={ () => this.changeTodo(todo.id, {"state": "todo"}) }></i> <i className="fa fa-angle-double-down" onClick={ () => this.changeTodo(todo.id, {"state": "done"}) }></i></span>
                    <i className="fa fa-minus-circle" onClick={ () => this.deleteTodo(todo.id) }></i>
                </div>);
            }
        });
    }

    renderDone() {
        return this.props.todos.map((todo) => {
            if (todo.state === "done") {
                return (<div key={ todo.id } style={{ margin: '5px', padding: '5px 8px', cursor: 'pointer', color: "#fff", background: '#008700', borderRadius: '3px', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <span>{ todo.name } <i className="fa fa-angle-double-up" onClick={ () => this.changeTodo(todo.id, {"state": "doing"}) }></i></span>
                    <i className="fa fa-minus-circle" onClick={ () => this.deleteTodo(todo.id) }></i>
                </div>);
            }
        });
    }

    deleteTodo = (id) => {    
        this.props.sendMessage(this.props.channel, "delete_todo", {"state_id": this.props.state.id, "todo_id": id});

    };
    
    changeTodo = (id, change) => {    
        this.props.sendMessage(this.props.channel, "change_todo", {"state_id": this.props.state.id, "todo_id": id, "todo_params": change});
    };

    handleClose() {
        this.setState({ show: false });
    }

    handleShow() {
        this.props.fetchTodos(this.props.state.id);
        this.setState({ show: true });
    }

    //handleNewTodoSubmit = data => this.props.addTodo(this.props.state.id, data);
    handleNewTodoSubmit = data => this.props.sendMessage(this.props.channel, "create_todo", {"state_id": this.props.state.id, "todo": data});

    render() {
        return (
            <div>
                <i className="fa fa-expand" style={{ cursor: "pointer" }} onClick={this.handleShow}/>
                <Modal isOpen={this.state.show} size="lg" fade={ false } toggle={this.handleClose}>
                    <ModalHeader>
                        <strong>{ this.props.state.name }</strong>
                        <br/>
                        <span>{ this.props.state.description }</span>
                    </ModalHeader>
                    
                    <ModalBody>
                    <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                        <div style={{ width: '70%'}}>
                            <Checklist patterns={this.props.state.patterns}/>
                        <div style={{ paddingTop: '5px'}}>
                            <Card>
                                <CardBody>
                                    <CardTitle>To Do</CardTitle>
                                    { this.renderTodos() }
                                </CardBody>
                                <CardFooter>
                                    <NewTodoForm onSubmit={ this.handleNewTodoSubmit } ></NewTodoForm>
                                </CardFooter>
                            </Card>

                            <Card>
                                <CardBody>
                                    <CardTitle>Doing</CardTitle>
                                    { this.renderDoing() }
                                </CardBody>
                            </Card>
                            
                            <Card>
                                <CardBody>
                                    <CardTitle>Done</CardTitle>
                                    { this.renderDone() }
                                </CardBody>
                            </Card>
                        </div>
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
      updatedStateId: state.states.updatedStateId,
      channel: state.room.channel,
    }),
    { fetchTodos, addTodo, deleteTodo, changeTodo, sendMessage }
  )(StateLargeView);