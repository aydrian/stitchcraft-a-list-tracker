import React, { Component } from 'react'
import { Segment, Form, Input } from 'semantic-ui-react'
import { DateInput } from 'semantic-ui-calendar-react'

class AddMovieForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      date: '',
      title: '',
      price: ''
    }
  }

  handleChange = (e, { name, value }) => {
    return this.setState(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  render() {
    const { handleAddMovie } = this.props
    const { date, title, price } = this.state
    return (
      <Segment>
        <Form
          onSubmit={() => {
            handleAddMovie(this.state).then(result => {
              this.setState({
                date: '',
                title: '',
                price: ''
              })
            })
          }}
        >
          <Form.Group>
            <Form.Field width={3}>
              <DateInput
                placeholder="Date"
                name="date"
                required
                dateFormat="MM/DD/YYYY"
                value={date}
                onChange={this.handleChange}
              />
            </Form.Field>
            <Form.Field width={9}>
              <Input
                placeholder="Title"
                name="title"
                required
                value={title}
                onChange={this.handleChange}
              />
            </Form.Field>
            <Form.Field width={2}>
              <Input
                placeholder="Price"
                name="price"
                required
                value={price}
                onChange={this.handleChange}
              />
            </Form.Field>
            <Form.Button type="submit" primary width={2} fluid content="Add" />
          </Form.Group>
        </Form>
      </Segment>
    )
  }
}

export default AddMovieForm
