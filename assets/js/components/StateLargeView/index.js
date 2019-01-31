// @flow
import React, { Component } from 'react';
import { css, StyleSheet } from 'aphrodite';
import { connect } from 'react-redux';

import Checklist from '../Checklist';
import NewTodoForm from '../NewTodoForm';
import NewCommentForm from '../NewCommentForm';


import { State as EssenceState, Todo } from '../../types';

import { Card, CardBody, CardTitle, CardFooter, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { fetchTodos, addTodo, deleteTodo, changeTodo, addComment, fetchComments } from '../../actions/states';
import { sendMessage } from '../../actions/room';


const styles = StyleSheet.create({
  modal: {
    width: '80vw',
  },
  entity: {
    background: "WhiteSmoke", 
    padding: '10px',
    overflow: 'auto',
    width: '100%',
    height: '100%'
  },
  
  hr: {
    margin: '0px'
  },
});

type Props = {
    state: EssenceState,
    todos: Object,
    comments: Object,
    updatedStateId: number,
    channel: any,
    fetchTodos: () => void,
    fetchComments: () => void,
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
        this.scrollToBottom = this.scrollToBottom.bind(this);

        this.state = {
            show: false
        };

        this.messagesEnd = React.createRef();
    }
    

    componentDidMount() {
        // To view the current todos and comments on the state cards
        this.props.fetchTodos(this.props.state.id);
        this.props.fetchComments(this.props.state.id);
        if (this.messagesEnd.current){ 
            this.scrollToBottom() 
        };
    }

    componentDidUpdate() {
        if (this.messagesEnd.current){ 
            this.scrollToBottom() 
        };
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

    renderComments() {
        return this.props.comments.map((comment) => {
                return (
                    <div key={ comment.id }>
                        <strong>{comment.user}:</strong> {comment.content}
                    </div>
                );
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
        this.props.fetchComments(this.props.state.id);
        this.setState({ show: true });
    }

    //handleNewTodoSubmit = data => this.props.addTodo(this.props.state.id, data);
    handleNewTodoSubmit = data => this.props.sendMessage(this.props.channel, "create_todo", {"state_id": this.props.state.id, "todo": data});
    handleNewCommentSubmit = data => this.props.addComment(this.props.channel, {"state_id": this.props.state.id, "comment": data});
      
    scrollToBottom = () => {
        this.messagesEnd.current.scrollIntoView({ behavior: "smooth" });
      }

    render() {
        return (
            <div>
                <i className="fa fa-expand" style={{ cursor: "pointer" }} onClick={this.handleShow}/>
                <Modal isOpen={this.state.show} size="lg" fade={ false } toggle={this.handleClose} contentClassName={css(styles.modal)} style={{marginLeft: '10vw'}}>
                    <ModalHeader>
                        <strong>{ this.props.state.name }</strong>
                        <br/>
                        <span>{ this.props.state.description }</span>
                    </ModalHeader>
                    
                    <ModalBody>
                    <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                        <div style={{ width: '55%'}}>
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
                        <div style={{ width: '44%', height: '80vh', display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
                            <div className={css(styles.entity)}>
                                { this.renderComments() } 
                                <div ref={this.messagesEnd}>
                                </div>
                            </div>
                            <Card>
                            <CardFooter>
                                <NewCommentForm onSubmit={ this.handleNewCommentSubmit } style= {{ position: 'absolute', bottom: '0px' }}/>
                            </CardFooter>
                            </Card>
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
      comments: state.states.comments,
      updatedStateId: state.states.updatedStateId,
      channel: state.room.channel,
    }),
    { fetchTodos, fetchComments, addTodo, deleteTodo, changeTodo, sendMessage, addComment }
  )(StateLargeView);