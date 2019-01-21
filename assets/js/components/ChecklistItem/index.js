// @flow
import React, { Component } from 'react';
import { css, StyleSheet } from 'aphrodite';
import ReactTooltip from 'react-tooltip';
import { State as EssenceState, Pattern } from '../../types';


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
  parent_handler: Function,
}

type State = {
  completed: boolean,
}

class ChecklistItem extends Component<Props, State> {
  state = {
    completed: this.props.pattern.completed,
  }
  
  handleClick = (event: SyntheticEvent<HTMLElement>) => {
    // To access your button instance use `event.currentTarget`.
    console.log(this.props.pattern);
    (event.currentTarget: HTMLElement);
    if (this.state.completed) {
        this.props.parent_handler(-1);
    } else {
        this.props.parent_handler(1);
    }
    this.setState(prevState => ({
        completed: !prevState.completed,
    }));
  };


  render() {
    return (
      <li key={ this.props.pattern.name } onClick={ this.handleClick } className={"list-group-item pattern " + css( this.state.completed ? styles.completed : styles.uncompleted)}>
        <span><i className={ this.state.completed ? "fa fa-check-circle" : "fa fa-circle-o" }/> { this.props.pattern.name } <i className="fa fa-info" data-tip data-for={ this.props.pattern.name }/></span>
        <ReactTooltip id={ this.props.pattern.name }  className={css(styles.tooltip)} type="info" aria-haspopup='true' role='example'>
            <p style={{fontWeight: "bold"}}>{ this.props.pattern.name }</p>
            <p>{ this.props.pattern.description }</p>
        </ReactTooltip>
      </li>
    );
  }
}

export default ChecklistItem;