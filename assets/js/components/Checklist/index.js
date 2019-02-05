// @flow
import React, { Component } from 'react';
import ChecklistItem from '../ChecklistItem';
import { Pattern } from '../../types';

import List from '@material-ui/core/List';

function renderChecklist(patterns) {
  return patterns.map((pattern) =>
    <ChecklistItem key={ pattern.id } patternId={ pattern.id } pattern={ pattern }/>
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
            <List>
                { renderChecklist(this.props.patterns) }
            </List>
        </div>
        );
    }
};

export default Checklist;