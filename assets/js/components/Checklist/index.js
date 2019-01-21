// @flow
import React, { Component } from 'react';
import ChecklistItem from '../ChecklistItem';
import { Pattern } from '../../types';

function renderChecklist(patterns) {
  return patterns.reverse().map((pattern) =>
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
        </div>
        );
    }
};

export default Checklist;