import React from 'react'
import { Table, Button } from 'semantic-ui-react'

const MovieList = ({ movies, handleMovieDelete }) => {
  return (
    <Table>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Date</Table.HeaderCell>
          <Table.HeaderCell>Title</Table.HeaderCell>
          <Table.HeaderCell>Price</Table.HeaderCell>
          <Table.HeaderCell> </Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {movies.map(movie => {
          return (
            <Table.Row key={movie._id}>
              <Table.Cell>{movie.date.toString()}</Table.Cell>
              <Table.Cell>{movie.title}</Table.Cell>
              <Table.Cell>{movie.price}</Table.Cell>
              <Table.Cell>
                <Button
                  negative
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
