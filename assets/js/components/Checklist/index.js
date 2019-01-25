// @flow
import React, { Component } from 'react';
import ChecklistItem from '../ChecklistItem';
import { Pattern } from '../../types';
import { connect } from 'react-redux';
import { togglePatternCompleted } from '../../actions/patterns';

function renderChecklist(patterns) {
  return patterns.map((pattern) =>
    <ChecklistItem key={ pattern.id } pattern={ pattern }/>
  );
}

type Props = {
  patterns: Array<Pattern>,
}

class Checklist extends Component<Props> {
    // Number of completed items in the checklist
    render() {
        return (
        <div>
            <ul className="list-group list-group-flush">
                { renderChecklist(this.props.patterns) }
            </ul>
        </div>
        );
    }
};

export default Checklist