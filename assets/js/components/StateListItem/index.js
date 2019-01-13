// @flow
import React from 'react';
import { State } from '../../types';
import { css, StyleSheet } from 'aphrodite';

const styles = StyleSheet.create({
  state: {
    display: 'flex',
    flexDirection: 'column',
    padding: '20px',
    margin: '20px',
    background: '#fff',
    justifyContent: 'space-between',
    boxShadow: '2px 5px 5px rgba(0,0,0,.3)',
  },
});

type Props = {
  state: State,
}

const StateListItem = ({ state }: Props) => {
  return (
    <div key={state.id} className={css(styles.state)}>
        <h3>{state.name}</h3>
        <span>{state.description}</span>
        {state.id}
    </div>
  );
};

export default StateListItem;