// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { css, StyleSheet } from 'aphrodite';
import ReactTooltip from 'react-tooltip';

import { Pattern } from '../../types';
import { setPatternCompleted, setPatternUncompleted } from '../../actions/patterns';


const styles = StyleSheet.create({
  tooltip: {
    fontSize: "14px"
  },

  pattern: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '12px',
    alignItems: 'center',
  },

  completed: {
    color: '#fff',
    background: 'MediumSeaGreen',
    transition: '0.3s',
    cursor: 'pointer',
  },

  uncompleted: {
    color: 'grey',
    background: '#fff',
    transition: '0.3s',
    cursor: 'pointer',    
  },
});

type Props = {
  pattern: Pattern,
  setPatternCompleted: () => void,
  setPatternUncompleted: () => void,
  patternId: number,
  changedPatternId: number,
  completed: boolean,
}

type State = {
  completed: boolean,
}

class ChecklistItem extends Component<Props, State> {
  state = {
    completed: this.props.pattern.completed,
  }

  componentWillReceiveProps(nextProps) {
    // You don't have to do this check first, but it can help prevent an unneeded render
    if (this.props.patternId == nextProps.changedPatternId && this.state.completed != nextProps.completed) {
      this.toggleCompleted();
    }
  }

  toggleCompleted() {
    this.setState(prevState => ({
      completed: !prevState.completed,
    }));
  };

  handleClick = (event: SyntheticEvent<HTMLElement>) => {    
    if (this.state.completed) {
      this.props.setPatternUncompleted(this.props.pattern.id);
    } else {
      this.props.setPatternCompleted(this.props.pattern.id);
    }

    (event.currentTarget: HTMLElement);
  };


  render() {
    return (
      <li key={ this.props.pattern.name } onClick={ this.handleClick } className={"list-group-item pattern " + css( this.state.completed ? styles.completed : styles.uncompleted)}>
        <span><i className={ this.state.completed ? "fa fa-check-circle" : "fa fa-circle-o" }/> { this.props.pattern.name } <i className="fa fa-info" data-tip data-for={ this.props.pattern.name }/></span>
        <ReactTooltip id={ this.props.pattern.name }  className={css(styles.tooltip)} type="info" aria-haspopup='true' role='example'>
            <p style={{fontWeight: "bold"}}>{ this.props.pattern.name }</p>
            <p>{ this.props.pattern.description }</p>
        </ReactTooltip>
        <h3>{ this.props.patternId } "|" { this.props.changedPatternId } </h3>
      </li>
    );
  }
}

export default connect(
  (state) => ({
    changedPatternId: state.patterns.pattern.id,
    completed: state.patterns.pattern.completed,
  }),
  { setPatternCompleted, setPatternUncompleted }
)(ChecklistItem);