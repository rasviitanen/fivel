// @flow
import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import Button from '@material-ui/core/Button';

type Props = {
  handleSubmit: () => void,
  onSubmit: () => void,
  submitting: boolean,
}

class NewTodoForm extends Component {
  props: Props

  handleSubmit = data => this.props.onSubmit(data);

  render() {
    const { handleSubmit, submitting } = this.props;

    return (
      <form autoComplete="off" style={{ marginBottom: '0px' }} onSubmit={handleSubmit(this.handleSubmit)}>
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
            <Field 
              name="name"
              type="text"
              placeholder="Write a to do that helps you fulfill the checklist..."
              component="input"
              className="form-control"
            />
            <Button type="submit" disabled={submitting} style={{ height: '100%' }}>{submitting ? 'Adding...' : 'Add'}</Button>
          </div>
      </form>
    );
  }
}

const validate = (values) => {
  const errors = {};
  if (!values.name) {
    errors.name = 'Required';
  }
  return errors;
};

export default reduxForm({
  form: 'newTodo',
  validate,
})(NewTodoForm);