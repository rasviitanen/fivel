// @flow
import React, { Component } from 'react';
import { css, StyleSheet } from 'aphrodite';
import ReactTooltip from 'react-tooltip';
import Checklist from '../Checklist';
import { connect } from 'react-redux';

import Collapse from '@material-ui/core/Collapse';
import { State as EssenceState } from '../../types';
import StateLargeView from '../StateLargeView';
import StateTodoCounter from '../StateTodoCounter';


import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import {HelpOutline} from '@material-ui/icons';

import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { messageStateCompletionForAlpha, expandAlpha } from '../../actions/alphas';

const styles = StyleSheet.create({
  cardNumber: {
    background: '#ffc107',
  },

  card: {
    width: '100%',
    margin: '5px',
    transition: '0.3s',
    minWidth: '200px',
    height: 'auto'
  },

  completed: {
    background: '#ccc',
  },

  focusedState: {
    boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.5)",
  },

  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: '0.3s'
  },

  expandOpen: {
    transform: 'rotate(180deg)',
  },
});

type Props = {
  id: number,
  state: EssenceState,
  belongs_to_alpha_id: number,
  changedPatterns: Object,
  expanded: boolean,
  expandAlpha: () => void,
  messageStateCompletionForAlpha: () => void,
}

class StateListItem extends Component<Props> {
  completed() {
    var completed = 0;
    this.props.state.patterns.map((pattern) => {
      if (this.props.changedPatterns[pattern.id]) {
          if (this.props.changedPatterns[pattern.id].completed){ completed += 1 };
      }

      if (pattern.completed && !this.props.changedPatterns[pattern.id]) {
        completed += 1;
      }
    });
    
    this.props.messageStateCompletionForAlpha(this.props.belongs_to_alpha_id, this.props.state.id, completed);

    return completed;
  }

  title(completed) {
    return (<span>{ this.props.state.name }<HelpOutline style={{ height: '0.8em'}} data-tip data-for={ this.props.state.name + "-" + this.props.belongs_to_alpha_id }/></span>);
  }
  
  buttons() {
    return(
      <div style={{ display: "flex", flexDirection: "row", alignItems: 'center' }}>
        <StateLargeView state={ this.props.state } setNumTodos={ () => this.setNumTodos.bind(this) }/>
      </div>
    );
  }

  completion() {
    if (this.completed() === this.props.state.patterns.length) {
      return "COMPLETED"
    } else {
      return this.completed() + ' / ' + this.props.state.patterns.length
    }
  }

  render() {
    const completed = this.completed() === this.props.state.patterns.length;
    return (
      <Card className={css(styles.card, completed ? styles.completed : '')}>
          <CardHeader
            avatar={
              <Avatar aria-label="StateNumber" className={css(styles.cardNumber)}>
                { this.props.id.toString() }
              </Avatar>
            }
            title={ this.title(completed) }
            subheader={ this.completion() }
            action={ this.buttons() }
          />
          <CardContent style={{padding: '2px', textAlign: 'center'}}>
            <StateTodoCounter stateId={ this.props.state.id }/>
          </CardContent>
          <ReactTooltip id={ this.props.state.name + "-" + this.props.belongs_to_alpha_id }  className={css(styles.tooltip)} type="info" aria-haspopup='true' role='example'>
            { this.props.state.description }
          </ReactTooltip>
          <IconButton
            className={css(styles.expand, this.props.expanded ? styles.expandOpen : null)}
            onClick={ () => this.props.expandAlpha(this.props.belongs_to_alpha_id, !this.props.expanded) }
            aria-expanded={this.expanded}
            aria-label="Show more"
          >
          <ExpandMoreIcon/>
          </IconButton>
          <Collapse in={this.props.expanded} timeout="auto" unmountOnExit>
            <Checklist patterns={this.props.state.patterns}/>
          </Collapse>
      </Card>
    );
  }
};

export default connect(
  (state) => ({
      changedPatterns: state.patterns.patterns,
  }),
  { messageStateCompletionForAlpha, expandAlpha }
)(StateListItem);;