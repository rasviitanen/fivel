// @flow
import React, { Component } from 'react';
import { css, StyleSheet } from 'aphrodite';
import { connect } from 'react-redux';

import Checklist from '../Checklist';
import NewTodoForm from '../NewTodoForm';
import NewCommentForm from '../NewCommentForm';


import { State as EssenceState } from '../../types';

import { fetchTodos, addTodo, deleteTodo, changeTodo, addComment, fetchComments } from '../../actions/states';
import { sendMessage } from '../../actions/room';
import { OpenInNew } from '@material-ui/icons';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';


import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

const styles = StyleSheet.create({
  entity: {
    background: "WhiteSmoke", 
    padding: '5px',
    overflow: 'auto',
    width: '100%',
    height: '100%'
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

        this.handleClickOpen = this.handleClickOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.scrollToBottom = this.scrollToBottom.bind(this);

        this.state = {
            show: false,
            open: false,
        };

        this.messagesEnd = React.createRef();
    }
    
    handleClickOpen = () => {
        this.props.fetchTodos(this.props.state.id);
        this.props.fetchComments(this.props.state.id);
        this.setState({ open: true });
    };
    
    handleClose = () => {
        this.setState({ open: false });
    };    

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
                return (<div key={ todo.id } style={{ margin: '5px', padding: '5px 8px', cursor: 'pointer', color: "#fff", background: '#FFDE03', borderRadius: '3px', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
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

    handleNewTodoSubmit = data => this.props.sendMessage(this.props.channel, "create_todo", {"state_id": this.props.state.id, "todo": data});
    handleNewCommentSubmit = data => this.props.addComment(this.props.channel, {"state_id": this.props.state.id, "comment": data});
      
    scrollToBottom = () => {
        this.messagesEnd.current.scrollIntoView({ behavior: "smooth" });
      }

    render() {
        return (
            <div>
                <OpenInNew style={{ height: '0.8em', cursor: "pointer" }} onClick={this.handleClickOpen}/>
                <Dialog
                    fullWidth={true}
                    maxWidth="xl"
                    fullScreen={fullScreen}
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="responsive-dialog-title"
                >
                    <DialogContent>
                    <h6 id="responsive-dialog-title">{ this.props.state.name }</h6>                    
                    { this.props.state.description }
                    <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                        <div style={{ width: '55%', height: '70vh' }}>
                        <div className={css(styles.entity)}>
                            <Card>
                                <CardContent>
                                    <Checklist patterns={this.props.state.patterns}/>
                                </CardContent>
                            </Card>

                            <div style={{ paddingBottom: '5px'}}>
                                <Card style={{ marginTop: '5px'}}>
                                    <CardContent style={{padding: '2px'}}>
                                        <p style={{ marginLeft: '5px'}}>To Do</p>                                                                                
                                        { this.renderTodos() }
                                    </CardContent>
                                </Card>
                                <NewTodoForm onSubmit={ this.handleNewTodoSubmit }></NewTodoForm>

                                <Card style={{ marginTop: '5px'}}>
                                    <CardContent style={{padding: '2px'}}>
                                        <p style={{ marginLeft: '5px'}}>Doing</p>                                        
                                        { this.renderDoing() }
                                    </CardContent>
                                </Card>
                                
                                <Card style={{ marginTop: '5px'}}>
                                    <CardContent style={{padding: '2px'}}>
                                        <p style={{ marginLeft: '5px'}}>Done</p>
                                        { this.renderDone() }
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                        </div>

                        <div style={{ width: '44%', height: '70vh', display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
                            <div className={css(styles.entity)}>
                                { this.renderComments() } 
                                <div ref={this.messagesEnd}/>
                            </div>
                            <NewCommentForm onSubmit={ this.handleNewCommentSubmit } style= {{ position: 'absolute', bottom: '0px' }}/>
                        </div>
                    </div>
                    </DialogContent>

                    <DialogActions>
                        <Button onClick={this.handleClose}>Close</Button>
                    </DialogActions>
                </Dialog>
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