// @flow
import React, { Component } from 'react';
import { css, StyleSheet } from 'aphrodite';
import { connect } from 'react-redux';

import { addComment, fetchComments } from '../../actions/states';
import Card from '@material-ui/core/Card';

const styles = StyleSheet.create({
  entity: {
        padding: '5px',
        borderRadius: '6px',
        overflow: 'auto',
        width: '100%',
        height: '100%'
    },  
});

type Props = {
    stateId: number,
    comments: Object,
    updatedCommentsForStateId: number,
    channel: any,
    fetchComments: () => void,
}

class Comments extends Component<Props> {
    constructor(props, context) {
        super(props, context);

        this.scrollToBottom = this.scrollToBottom.bind(this);
        this.messagesEnd = React.createRef();
    }

    componentDidMount() {
        this.props.fetchComments(this.props.stateId);
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
        if (this.props.stateId === nextProps.updatedCommentsForStateId) {
            return true;
        }
        return false;
    }

    renderComments() {
        return this.props.comments.sort(function(a, b) {return a.id - b.id}).map((comment) => {
            return (
                <div key={ comment.id }>
                    <strong>{comment.user}:</strong> {comment.content}
                </div>
            );
        });
    }
       
    scrollToBottom = () => {
        this.messagesEnd.current.scrollIntoView({ behavior: "smooth" });
    }

    render() {
        return (
            <Card className={css(styles.entity)}>
                { this.renderComments() } 
                <div ref={this.messagesEnd}/>
            </Card>
        );
    }
    }

export default connect(
    (state) => ({
      comments: state.states.comments,
      updatedCommentsForStateId: state.states.updatedCommentsForStateId,
      channel: state.room.channel,
    }),
    { fetchComments, addComment }
  )(Comments);