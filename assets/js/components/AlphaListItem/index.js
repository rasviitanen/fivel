// @flow
import React from 'react';
import { Alpha } from '../../types';
import { css, StyleSheet } from 'aphrodite';
import ReactTooltip from 'react-tooltip';

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

  state: {
    width: '15%',
    borderRadius: '3px',
    margin: '5px',
    background: '#fff',
  },

  tooltip: {
    fontSize: "14px"
  },

  stateHead: {
    display: 'flex',
    justifyContent: 'space-between',
  },

  pattern: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  completion: {
    fontSize: '12px',
    padding: '3px',
    textAlign: 'center',
  }
});

type Props = {
  alpha: Alpha,
}


function renderChecklist(state) {
  return state.patterns.reverse().map((pattern) =>
    <li key={ pattern.name } className={"list-group-item " + css(styles.pattern)}>
      <span><i className="fa fa-square-o"></i> { pattern.name }</span>
      <i className="fa fa-info" data-tip data-for={ pattern.name }></i>
      <ReactTooltip id={ pattern.name }  className={css(styles.tooltip)} type="info" aria-haspopup='true' role='example'>
          <p style={{fontWeight: "bold"}}>{ pattern.name }</p>
          <p>{ pattern.description }</p>
      </ReactTooltip>
    </li>
  );
}


function renderStates(alpha) {
  var iteration = 1;
  return alpha.essence_states.reverse().map((state) =>
    <div key={ state.name } className={"card text-center " + css(styles.state)}>
      <div className={"card-header " + css(styles.completion)}>
        Completed 0/6
      </div>
      <div className="card-block">
        <p className="card-text">
            { iteration++ + '.' } { state.name } <i className="fa fa-info-circle" data-tip data-for={ state.name + "-" + alpha.name }></i>
        </p>
        <ReactTooltip id={ state.name + "-" + alpha.name }  className={css(styles.tooltip)} type="info" aria-haspopup='true' role='example'>
          <p style={{fontWeight: "bold"}}>{ state.name }</p>
          <p>{ state.description }</p>
        </ReactTooltip>
        <ul className="list-group list-group-flush">
          {renderChecklist(state)}
        </ul>
      </div>
    </div>
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
      { renderStates(alpha) }
    </div>
);
};

export default AlphaListItem;