// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Alpha } from '../../types';
import { css, StyleSheet } from 'aphrodite';
import ReactTooltip from 'react-tooltip';
import StateListItem from '../StateListItem';
import HelpOutline from '@material-ui/icons/HelpOutline';

import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { expandAlpha } from '../../actions/alphas';


const styles = StyleSheet.create({
  container: {
    display: 'flex',
    borderRadius: '8px',
    flexDirection: 'column',
    justifyContent: 'space-between',
    color: 'grey',
    background: '#eee',
    margin: '10px'
  },

  alphas: {
    display: 'flex',
    flexDirection: 'row',
  },

  alpha: {
    borderRadius: '3px',
    padding: '5px',
    marginLeft: '5px',
  },

  tooltip: {
    fontSize: "14px"
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
  alpha: Alpha,
  alphaExpansionToggledById: number,
  expanded: boolean,
  expandAlpha: () => void,
}


class AlphaListItem extends Component<Props> {
  state = { expanded: false };

  componentWillReceiveProps(newProps) {
    if (this.props.alpha.id === newProps.alphaExpansionToggledById) {
      return this.setState({ expanded: !newProps.expanded });
    }
  }

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  renderStates() {
    const alpha = this.props.alpha;
    
    return this.props.alpha.essence_states.map((state, index) =>
      {
        return <StateListItem key={ alpha.name + "_"  + state.name } id={ index + 1 } expanded={this.state.expanded} state={ state } belongs_to_alpha_id={ alpha.id } />
      }
    );
  }

  render() {
    const alpha = this.props.alpha;
    return (
      <div className={css(styles.container)}>
        <div key={alpha.id} className={css(styles.alpha)}>
              <div>
                {alpha.name} 
                <HelpOutline style={{height: '0.9em'}} data-tip data-for={ alpha.name }/>
                <IconButton
                  className={css(styles.expand, this.state.expanded ? styles.expandOpen : null)}
                  onClick={ () => this.props.expandAlpha(this.props.alpha.id, !this.state.expanded) }
                  aria-expanded={this.state.expanded}
                  aria-label="Show more"
                >
                <ExpandMoreIcon/>
                </IconButton>
              </div>
              <ReactTooltip id={ alpha.name } className={css(styles.tooltip)} type="info" aria-haspopup='true' role='example'>
                <p style={{ fontWeight: "bold" }}>{ alpha.name }</p>
                <p>{ alpha.description }</p>
              </ReactTooltip>
        </div>
        <div className={css(styles.alphas)}>
          { this.renderStates() }
        </div>
      </div>);
  }
};

export default connect(
  (state) => ({
    alphaExpansionToggledById: state.alphas.alphaId,
    expanded: state.alphas.expand
  }),
  { expandAlpha }
)(AlphaListItem);