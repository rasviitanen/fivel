// @flow
import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { InputGroup, InputGroupAddon, Button } from 'reactstrap';

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
      <form autocomplete="off" style={{ marginBottom: '0px' }} onSubmit={handleSubmit(this.handleSubmit)}>
          <InputGroup>
            <Field 
            name="name"
              type="text"
              placeholder="Write a to do that helps you fulfill the checklist..."
              component="input"
              className="form-control"
            />
            <InputGroupAddon addonType="append">
              <Button color="success" type="submit" disabled={submitting} style={{ marginBottom: '0px' }}>{submitting ? 'Adding...' : 'Add'}</Button>
            </InputGroupAddon>
          </InputGroup>
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