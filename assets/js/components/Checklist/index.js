// @flow
import React, { Component } from 'react';
import ChecklistItem from '../ChecklistItem';
import { Pattern } from '../../types';
import ChecklistCompletionCounter from '../ChecklistCompletionCounter';


function renderChecklist(patterns, handler) {
  return patterns.map((pattern) =>
    <ChecklistItem key={ pattern.name } pattern={ pattern } parent_handler={ handler }/>
  );
}

type Props = {
  patterns: Array<Pattern>,
  setStateCompleted: Function
}

type State = {
  completed: number,
}

class Checklist extends Component<Props, State> {
    // Number of completed items in the checklist
    state = {
        completed: 0,
    }

    handlePatternClick = (add) => {        
        this.setState(prevState => (
            {completed: prevState.completed + add}
        ));

        if (this.state.completed + add == this.props.patterns.length) {
            console.log("completed");
            this.props.setStateCompleted(true);
        } else {
            console.log("uncompleted");
            this.props.setStateCompleted(false);
        }
    };

    render() {
        return (
        <div>
            <ul className="list-group list-group-flush">
                { renderChecklist( this.props.patterns, this.handlePatternClick ) }
            </ul>
            <ChecklistCompletionCounter completed={ this.state.completed } total={ this.props.patterns.length }/>
        </div>
        );
    }
};

export default Checklist;