import React from 'react'
import { Table, Button } from 'semantic-ui-react'

const USDFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2
})
const DateFormatter = new Intl.DateTimeFormat('en-US')

const MovieList = ({ movies, handleMovieDelete }) => {
  return (
    <Table size="small" striped>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell size={2}>Date</Table.HeaderCell>
          <Table.HeaderCell size={10}>Title</Table.HeaderCell>
          <Table.HeaderCell size={2}>Price</Table.HeaderCell>
          <Table.HeaderCell size={2}> </Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {movies.map(movie => {
          return (
            <Table.Row key={movie._id}>
              <Table.Cell>{DateFormatter.format(movie.date)}</Table.Cell>
              <Table.Cell>{movie.title}</Table.Cell>
              <Table.Cell>{USDFormatter.format(movie.price)}</Table.Cell>
              <Table.Cell>
                <Button
                  negative
                  size="tiny"
                  onClick={() => {
                    handleMovieDelete({ _id: movie._id })
                  }}
                >
                  Delete
                </Button>
              </Table.Cell>
            </Table.Row>
          )
        })}
      </Table.Body>
    </Table>
  )
}

export default MovieList
