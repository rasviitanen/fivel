// @flow
import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { InputGroup, InputGroupAddon, Button } from 'reactstrap';

type Props = {
  handleSubmit: () => void,
  onSubmit: () => void,
  submitting: boolean,
}

class NewCommentForm extends Component {
  props: Props

  handleSubmit = data => this.props.onSubmit(data);

  render() {
    const { handleSubmit, submitting } = this.props;

    return (
      <form autoComplete="off" style={{ marginBottom: '0px' }} onSubmit={handleSubmit(this.handleSubmit)}>
          <InputGroup>
            <Field 
              name="content"
              type="text"
              placeholder="Message..."
              component="input"
              label="content"
              className="form-control"
            />
            <InputGroupAddon addonType="append">
              <Button color="success" type="submit" disabled={submitting} style={{ marginBottom: '0px' }}>{submitting ? 'Sending...' : 'Send'}</Button>
            </InputGroupAddon>
          </InputGroup>
      </form>
    );
  }
}

const validate = (values) => {
  const errors = {};
  if (!values.content) {
    errors.content = 'Required';
  }
  return errors;
};

export default reduxForm({
  form: 'newComment',
  validate,
})(NewCommentForm);