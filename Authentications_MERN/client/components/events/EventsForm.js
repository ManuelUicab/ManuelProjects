import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { createEvent } from '../../actions/Event';
import TextFieldGroup from '../common/TextFieldGroup';

class EventsForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      errors: {},
      isLoading: false
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    const {name, value } = e.target;
    this.setState({
        [name]: value
    });
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.createEvent(this.state);
  }

  render() {
    const { title, errors, isLoading } = this.state;

    return (
      <form onSubmit={this.onSubmit}>
        <h1>Create New Game Event</h1>

        <TextFieldGroup
          field="title"
          label="Event Title"
          name="title"
          value={title}
          onChange={this.onChange}
          error={errors.title}
        />

        <button type="submit" className="btn btn-primary">Create</button>
      </form>
    );
  }
}

EventsForm.propTypes = {
  createEvent: propTypes.func.isRequired
}

export default connect(null, { createEvent })(EventsForm);