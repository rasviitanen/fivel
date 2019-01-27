// @flow
import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { InputGroup, InputGroupAddon, Button } from 'reactstrap';

type Props = {
  handleSubmit: () => void,
  onSubmit: () => void,
  submitting: boolean,
}

class NewRoomForm extends Component {
  props: Props

  handleSubmit = data => this.props.onSubmit(data);

  render() {
    const { handleSubmit, submitting } = this.props;

    return (
      <form onSubmit={handleSubmit(this.handleSubmit)}>
          <InputGroup>
            <Field
              name="name"
              type="text"
              placeholder="Name"
              component="input"
              className="form-control"
            />
            <InputGroupAddon addonType="append">
              <Button type="submit" disabled={submitting}>{submitting ? 'Saving...' : 'Submit'}</Button>
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
  form: 'newRoom',
  validate,
})(NewRoomForm);