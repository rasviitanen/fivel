// @flow
import React from 'react';
import { Alpha } from '../../types';
import { css, StyleSheet } from 'aphrodite';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    background: '#fff',
    justifyContent: 'space-between',
    boxShadow: '2px 5px 5px rgba(0,0,0,.3)',
  },

  alpha: {
    width: '15%',
    display: 'flex',
    flexDirection: 'column',
    padding: '10px',
    margin: '10px',
    background: '#fff',
    boxShadow: '0px 1px 1px rgba(0,0,0,.3)',
  },

  state: {
    width: '15%',
    display: 'flex',
    flexDirection: 'column',
    padding: '10px',
    margin: '10px',
    background: '#fff',
    boxShadow: '0px 1px 1px rgba(0,0,0,.3)',
  }
});

type Props = {
  alpha: Alpha,
}

function renderStates(states) {
  return states.reverse().map((state) =>
    <div key={ state.id } className={css(styles.state)}>
      <h4>{state.name}</h4>
      <span>{state.description}</span>
    </div>
  );
}

const AlphaListItem = ({ alpha }: Props) => {
  return (
    <div className={css(styles.container)}>
      <div key={alpha.id} className={css(styles.alpha)}>
          <h2>{alpha.name}</h2>
          <h4>{alpha.description}</h4>
      </div>
      { renderStates(alpha.essence_states) }
    </div>
);
};

export default AlphaListItem;