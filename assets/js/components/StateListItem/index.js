// @flow
import React, { Component } from 'react';
import { css, StyleSheet } from 'aphrodite';
import ReactTooltip from 'react-tooltip';
import Checklist from '../Checklist';

import { State as EssenceState } from '../../types';
import StateLargeView from '../StateLargeView';

const styles = StyleSheet.create({
  state: {
    width: '100%',
    borderRadius: '5px',
    margin: '5px',
    background: '#fff',
    paddingBottom: '24px',
    transition: '0.3s',
    minWidth: '200px'
  },

  darken: {
    background: '#fff',
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
    margin: '10px',
    flexDirection: 'column',
    textAlign: 'center'
  },
 
});

type Props = {
  id: number,
  state: EssenceState,
  belongs_to_alpha: string,
}

class StateListItem extends Component<Props, State> {
  render() {
    return (
      <div className={css(styles.state)}>
        <div className={css(styles.stateHead)}>
          <span style={{fontWeight: "bold"}}> { this.props.id.toString() }. { this.props.state.name }</span>
          <div style={{ display: "flex", flexDirection: "row", padding: "10px", justifyContent: "center", alignItems: "center" }}>
            <i className="fa fa-info-circle" style={{margin: '5px'}} data-tip data-for={ this.props.state.name + "-" + this.props.belongs_to_alpha }></i>
            <StateLargeView style={{margin: '5px'}} state={ this.props.state }/>
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