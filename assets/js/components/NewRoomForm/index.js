// @flow
import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import Button from '@material-ui/core/Button';

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
          <div style={{ display: 'flex', flexDirection: 'row'}}>
            <Field
              name="name"
              type="text"
              placeholder="Name"
              component="input"
              className="form-control"
            />
            <Button type="submit" disabled={submitting}>{submitting ? 'Saving...' : 'Submit'}</Button>
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
  form: 'newRoom',
  validate,
})(NewRoomForm);