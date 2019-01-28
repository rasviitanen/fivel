// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { css, StyleSheet } from 'aphrodite';
import ReactTooltip from 'react-tooltip';

import { Pattern } from '../../types';
import { togglePatternCompleted } from '../../actions/patterns';


const styles = StyleSheet.create({
  tooltip: {
    fontSize: "14px"
  },


  completed: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: "row",
    alignItems: 'center',

    color: '#fff',
    background: '#008700',
    transition: '0.3s',
    cursor: 'pointer',

    margin: '3px 8px',
    borderRadius: '20px',
  },

  uncompleted: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',

    color: 'grey',
    background: '#eee',
    transition: '0.3s',
    cursor: 'pointer',   
    
    margin: '3px 8px',
    borderRadius: '20px',
  },
});

type Props = {
  pattern: Pattern,
  changedPatterns: Object,
  togglePatternCompleted: () => void,
}

class ChecklistItem extends Component<Props> {
  handleClick = (event: SyntheticEvent<HTMLElement>) => {    
    const pattern = (this.props.changedPatterns[this.props.pattern.id]) ? this.props.changedPatterns[this.props.pattern.id] :  this.props.pattern;
    this.props.togglePatternCompleted(pattern);
  };

  render() {
    const pattern = (this.props.changedPatterns[this.props.pattern.id]) ? this.props.changedPatterns[this.props.pattern.id] :  this.props.pattern;

    return (
      <li key={ pattern.name } onClick={ this.handleClick } className={"list-group-item " + css( pattern.completed ? styles.completed : styles.uncompleted)}>
        <span><i className={ pattern.completed ? "fa fa-check-circle" : "fa fa-circle-o" }/> { pattern.name } </span>
        <i className="fa fa-info" data-tip data-for={ pattern.name }/>
        <ReactTooltip id={ pattern.name }  className={css(styles.tooltip)} type="info" aria-haspopup='true' role='example'>
            <p style={{fontWeight: "bold"}}>{ pattern.name }</p>
            <p>{ pattern.description }</p>
        </ReactTooltip>
      </li>
    );
  }
}

export default connect(
  (state) => ({
    changedPatterns: state.patterns.patterns,
  }),
  { togglePatternCompleted }
)(ChecklistItem);