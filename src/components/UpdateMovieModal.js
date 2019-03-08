import React, { Component } from 'react'
import { Modal, Form, Input } from 'semantic-ui-react'
import { DateInput } from 'semantic-ui-calendar-react'

class UpdateMovieModal extends Component {
  constructor(props) {
    super(props)

    this.handleUpdateMovie = props.handleUpdateMovie

    this.state = {
      open: false,
      userInput: props.movie
    }
  }

  handleChange = (e, { name, value }) => {
    return this.setState(prevState => ({
      userInput: {
        ...prevState.userInput,
        [name]: value
      }
    }))
  }

  render() {
    return (
      <Modal>
        <Modal.Header>Update Movie</Modal.Header>
        <Modal.Content>
          <Form
            onSubmit={() => {
              this.handleUpdateMovie(this.state).then(result => {
                this.setState({
                  userInput: {
                    date: '',
                    title: '',
                    price: ''
                  }
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
              <Form.Button
                type="submit"
                primary
                width={2}
                fluid
                content="Add"
              />
            </Form.Group>
          </Form>
        </Modal.Content>
      </Modal>
    )
  }
}

export default UpdateMovieModal
