// @flow
import React, { Component } from 'react';
import { css, StyleSheet } from 'aphrodite';
import ReactTooltip from 'react-tooltip';
import Checklist from '../Checklist';
import { connect } from 'react-redux';

import { State as EssenceState } from '../../types';
import StateLargeView from '../StateLargeView';
import StateTodoCounter from '../StateTodoCounter';


import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';

import Avatar from '@material-ui/core/Avatar';
import {HelpOutline} from '@material-ui/icons';

import { messageStateCompletionForAlpha } from '../../actions/alphas';


const styles = StyleSheet.create({
  cardNumber: {
    background: '#6200EE',
  },

  card: {
    width: '100%',
    margin: '5px',
    transition: '0.3s',
    minWidth: '200px',
    height: 'auto'
  },

  completed: {
    opacity: '0.6'
  },

  focusedState: {
    boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.5)",
  },
});

type Props = {
  id: number,
  state: EssenceState,
  belongs_to_alpha_id: number,
  changedPatterns: Object,
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

  title() {
    return(
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        { this.props.state.name }
      </div>
    );
  }
  
  buttons() {
    return(
      <div style={{ display: "flex", flexDirection: "row", alignItems: 'center' }}>
        <HelpOutline style={{ height: '0.8em'}} data-tip data-for={ this.props.state.name + "-" + this.props.belongs_to_alpha_id }/>
        <StateLargeView state={ this.props.state } setNumTodos={ () => this.setNumTodos.bind(this) }/>
      </div>
    );
  }

  completion() {
    if (this.completed() === this.props.state.patterns.length) {
      return "Completed"
    } else {
      return this.completed() + ' / ' + this.props.state.patterns.length
    }
  }

  render() {
    return (
      <Card className={css(styles.card, this.props.completed === this.props.state.patterns.length ? styles.completed : '')}>
          <CardHeader
            avatar={
              <Avatar aria-label="StateNumber" className={css(styles.cardNumber)}>
                { this.props.id.toString() }
              </Avatar>
            }
            title={ this.title() }
            subheader={ this.completion() }
            action={ this.buttons() }
          />
          <CardContent style={{padding: '2px', textAlign: 'center'}}>
            <StateTodoCounter stateId={ this.props.state.id }/>
          </CardContent>
          <ReactTooltip id={ this.props.state.name + "-" + this.props.belongs_to_alpha_id }  className={css(styles.tooltip)} type="info" aria-haspopup='true' role='example'>
            <h6>{ this.props.state.name }</h6>
            { this.props.state.description }
          </ReactTooltip>

          <Checklist patterns={this.props.state.patterns}/>
      </Card>
    );
  }
};

export default connect(
  (state) => ({
      changedPatterns: state.patterns.patterns
  }),
  { messageStateCompletionForAlpha }
)(StateListItem);;