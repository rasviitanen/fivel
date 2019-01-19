// @flow
import React from 'react';
import { Alpha } from '../../types';
import { css, StyleSheet } from 'aphrodite';
import ReactTooltip from 'react-tooltip';
import StateListItem from '../StateListItem';


const styles = StyleSheet.create({
  container: {
    display: 'flex',
    borderRadius: '3px',
    flexDirection: 'row',
    margin: '10px',
    background: '#dfe3e6',
    justifyContent: 'space-between',
  },

  alpha: {
    width: '10%',
    borderRadius: '3px',
    padding: '5px',
    margin: '10px',
    color: "grey",
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
        return <StateListItem key={ alpha.name + "_"  + state.name } id={ index + 1 } state={ state } belongs_to_alpha={ alpha.name }/>
      } else {
        return <StateListItem key={ alpha.name + "_"  + state.name } id={ index + 1 } state={ state } belongs_to_alpha={ alpha.name }/>
      }
    }
  );
}

const AlphaListItem = ({ alpha }: Props) => {
  return (
    <div className={css(styles.container)}>
      <div key={alpha.id} className={css(styles.alpha)}>
          <div>
            <span style={{ fontWeight: "bold" }}>{alpha.name} <i className="fa fa-info-circle" data-tip data-for={ alpha.name }></i></span>
            <ReactTooltip id={ alpha.name } className={css(styles.tooltip)} type="info" aria-haspopup='true' role='example'>
              <p style={{ fontWeight: "bold" }}>{ alpha.name }</p>
              <p>{ alpha.description }</p>
            </ReactTooltip>
          </div>
      </div>
      <div className="row">
        { renderStates(alpha) }
      </div>
    </div>
);
};

export default AlphaListItem;