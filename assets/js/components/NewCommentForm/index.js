// @flow
import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import Button from '@material-ui/core/Button';

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
          <div style={{ display: 'flex', flexDirection: 'row'}}>
            <Field
              name="content"
              type="text"
              placeholder="Message..."
              component="input"
              label="content"
              className="form-control"
            />
            <Button type="submit" disabled={submitting}>{submitting ? 'Sending...' : 'Send'}</Button>
          </div>
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