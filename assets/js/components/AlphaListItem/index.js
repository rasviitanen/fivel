// @flow
import React from 'react';
import { Alpha } from '../../types';
import { css, StyleSheet } from 'aphrodite';
import ReactTooltip from 'react-tooltip';
import StateListItem from '../StateListItem';
import HelpOutline from '@material-ui/icons/HelpOutline';


const styles = StyleSheet.create({
  container: {
    display: 'flex',
    borderRadius: '8px',
    flexDirection: 'column',
    justifyContent: 'space-between',
    color: 'grey',
    background: '#fff',
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
});

type Props = {
  alpha: Alpha,
}

function renderStates(alpha) {
  
  return alpha.essence_states.map((state, index) =>
    {
      if (index == 0) {
        return <StateListItem key={ alpha.name + "_"  + state.name } id={ index + 1 } state={ state } belongs_to_alpha_id={ alpha.id }/>
      } else {
        return <StateListItem key={ alpha.name + "_"  + state.name } id={ index + 1 } state={ state } belongs_to_alpha_id={ alpha.id }/>
      }
    }
  );
}

const AlphaListItem = ({ alpha }: Props) => {
  return (
    <div className={css(styles.container)}>
      <div key={alpha.id} className={css(styles.alpha)}>
            <h6>{alpha.name} <HelpOutline data-tip data-for={ alpha.name }/></h6>
            <ReactTooltip id={ alpha.name } className={css(styles.tooltip)} type="info" aria-haspopup='true' role='example'>
              <p style={{ fontWeight: "bold" }}>{ alpha.name }</p>
              <p>{ alpha.description }</p>
            </ReactTooltip>
      </div>
      <div className={css(styles.alphas)}>
        { renderStates(alpha) }
      </div>
    </div>
);
};

export default AlphaListItem;