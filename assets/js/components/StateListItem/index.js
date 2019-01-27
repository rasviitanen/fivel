// @flow
import React, { Component } from 'react';
import { css, StyleSheet } from 'aphrodite';
import ReactTooltip from 'react-tooltip';
import Checklist from '../Checklist';

import { State as EssenceState } from '../../types';
import StateLargeView from '../StateLargeView';
import StateTodoCounter from '../StateTodoCounter';

const styles = StyleSheet.create({
  state: {
    width: '100%',
    borderRadius: '5px',
    margin: '5px',
    background: '#eee',
    paddingBottom: '24px',
    transition: '0.3s',
    minWidth: '200px',
    color: '#333'
  },

  darken: {
    background: '#eee',
    opacity: '0.7',
    zIndex: '20',
    height: '100%',
    width: '100%',
    position: 'absolute',
    top: '0px',
    left: '0px',
  },

  tooltip: {
    fontSize: "14px"
  },

  stateHead: {
    display: 'flex',
    margin: '5px',
    flexDirection: 'column',
    textAlign: 'center'
  },

  hr: {
    borderTop: '1px solid grey',
    borderBottom: '1px solid grey'
  },
 
});

type Props = {
  id: number,
  state: EssenceState,
  belongs_to_alpha: string,
}


class StateListItem extends Component<Props> {

  render() {
    return (
      <div className={css(styles.state)}>
        <div className={css(styles.stateHead)}>

          <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
            <span style={{fontWeight: "bold"}}> { this.props.id.toString() }. { this.props.state.name }</span>
            <i className="fa fa-info-circle" style={{margin: '5px'}} data-tip data-for={ this.props.state.name + "-" + this.props.belongs_to_alpha }></i>
            <StateLargeView style={{margin: '5px'}} state={ this.props.state } setNumTodos={ () => this.setNumTodos.bind(this) }/>
          </div>

          <div className={ css(styles.hr) } style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
            <StateTodoCounter stateId={ this.props.state.id } numTodos={ this.props.state.todos.length }/>
          </div>
        </div>
        <ReactTooltip id={ this.props.state.name + "-" + this.props.belongs_to_alpha }  className={css(styles.tooltip)} type="info" aria-haspopup='true' role='example'>
          <p style={{fontWeight: "bold"}}>{ this.props.state.name }</p>
          <p>{ this.props.state.description }</p>
        </ReactTooltip>

        <Checklist patterns={this.props.state.patterns}/>
        
      </div>
    );
  }
};

export default StateListItem;