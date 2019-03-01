import React, { Component } from 'react'
import { Form, Input } from 'semantic-ui-react'

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
          <Form.Field>
            <label>Date</label>
            <Input
              name="date"
              required
              defaultValue={date}
              onChange={this.handleChange}
            />
          </Form.Field>
          <Form.Field>
            <label>Title</label>
            <Input
              name="title"
              required
              defaultValue={title}
              onChange={this.handleChange}
            />
          </Form.Field>
          <Form.Field>
            <label>Price</label>
            <Input
              name="price"
              required
              defaultValue={price}
              onChange={this.handleChange}
            />
          </Form.Field>
          <Form.Field>
            <Form.Button type="submit" primary>
              Add
            </Form.Button>
          </Form.Field>
        </Form.Group>
      </Form>
    )
  }
}

export default AddMovieForm
