// @flow
import React from 'react';
import { Alpha } from '../../types';
import { css, StyleSheet } from 'aphrodite';

const styles = StyleSheet.create({
  alpha: {
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
  alpha: Alpha,
}

const AlphaListItem = ({ alpha }: Props) => {
  return (
    <div key={alpha.id} className={css(styles.alpha)}>
        <h3>{alpha.name}</h3>
        <span>{alpha.description}</span>
    </div>
  );
};

export default AlphaListItem;