// @flow
import React, { Component } from 'react';
import ChecklistItem from '../ChecklistItem';
import { Pattern } from '../../types';
import ChecklistCompletionCounter from '../ChecklistCompletionCounter';


function renderChecklist(patterns) {
  return patterns.map((pattern) =>
    <ChecklistItem key={ pattern.id } completed={ pattern.completed } pattern={ pattern }/>
  );
}

type Props = {
  patterns: Array<Pattern>,
}


class Checklist extends Component<Props, State> {
    // Number of completed items in the checklist
    render() {
        return (
        <div>
            <ul className="list-group list-group-flush">
                { renderChecklist( this.props.patterns, this.handlePatternClick ) }
            </ul>
            <ChecklistCompletionCounter total={ this.props.patterns.length }/>
        </div>
        );
    }
};

export default Checklist;