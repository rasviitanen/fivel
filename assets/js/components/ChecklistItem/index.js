// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { css, StyleSheet } from 'aphrodite';

import { Pattern } from '../../types';

import { sendMessage } from '../../actions/room';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import HelpOutline from '@material-ui/icons/HelpOutline';
import Tooltip from '@material-ui/core/Tooltip';

const styles = StyleSheet.create({
  tooltip: {
    fontSize: "1em",
  },

  completed: {
    color: '#fff',
    background: "#3ACC6C",
    transition: '0.3s',
  },

  uncompleted: {
    background: '#fff',
    transition: '0.3s',
  },

  completedText: {
    color: '#fff',
  }
});

type Props = {
  pattern: Pattern,
  changedPatterns: Object,
  channel: any,
  sendMessage: () => void,
}

class ChecklistItem extends Component<Props> {
  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.pattern.id === nextProps.pattern.id) {
        return true;
    }
    return false;
  }

  handleClick = (event: SyntheticEvent<HTMLElement>) => {    
    const pattern = (this.props.changedPatterns[this.props.pattern.id]) ? this.props.changedPatterns[this.props.pattern.id] :  this.props.pattern;
    this.props.sendMessage(this.props.channel, "toggle_pattern_completion", pattern);
  };

  render() {
    const pattern = (this.props.changedPatterns[this.props.pattern.id]) ? this.props.changedPatterns[this.props.pattern.id] :  this.props.pattern;

    return (
      <ListItem role={undefined} dense button onClick={ this.handleClick } className={css((pattern.completed) ? styles.completed : styles.uncompleted)}>
        <Checkbox
          checked={ pattern.completed }
          tabIndex={-1}
          className={css(pattern.completed ? styles.completedText : null)}
          disableRipple
        />
        <ListItemText classes={{ primary: css(pattern.completed ? styles.completedText : null)}}  primary={ pattern.name }/>
        <Tooltip disableFocusListener title={ pattern.description }>
          <HelpOutline style={{ height: '0.7em', margin: '3px' }}/>
        </Tooltip>
      </ListItem>
    );
  }
}

export default connect(
  (state) => ({
    changedPatterns: state.patterns.patterns,
    channel: state.room.channel,
  }),
  { sendMessage }
)(ChecklistItem);