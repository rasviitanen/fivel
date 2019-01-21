// @flow
import React, { Component } from 'react';
import { css, StyleSheet } from 'aphrodite';
import ReactTooltip from 'react-tooltip';
import Checklist from '../Checklist';

import { State as EssenceState } from '../../types';

const styles = StyleSheet.create({
  state: {
    width: '15%',
    borderRadius: '5px',
    margin: '5px',
    background: '#fff',
    paddingBottom: '24px',
    transition: '0.3s',
    minWidth: '200px',
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
    justifyContent: 'space-between',
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
      <div className={"card text-center " + css(styles.state)}>
        <div className="card-block">
          <div className="card-text">
              <p style={{fontWeight: "bold"}}> { this.props.id.toString() }. { this.props.state.name } <i className="fa fa-info-circle" data-tip data-for={ this.props.state.name + "-" +this.props. belongs_to_alpha }></i></p>
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