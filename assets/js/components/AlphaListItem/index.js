// @flow
import React from 'react';
import { Alpha } from '../../types';

type Props = {
  alpha: Alpha,
}

const AlphaListItem = ({ alpha }: Props) => {
  return (
    <div key={alpha.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
      <h3>{alpha.name}</h3>
      <span>{alpha.name}</span>
    </div>
  );
};

export default AlphaListItem;