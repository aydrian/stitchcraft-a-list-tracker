import React, { Component } from 'react'
import { Container, Header, Icon, Menu, Image } from 'semantic-ui-react'
import {
  Stitch,
  GoogleRedirectCredential,
  RemoteMongoClient
} from 'mongodb-stitch-browser-sdk'

import Login from './components/Login'
import AddMovieForm from './components/AddMovieForm'
import MovieList from './components/MovieList'

class App extends Component {
  constructor(props) {
    super(props)
    this.appId = 'stitchcraft-a-list-tracker-idzxn'

    this.state = {
      isAuthed: false,
      profile: {},
      movies: []
    }
  }

  componentDidMount = async () => {
    this.client = Stitch.initializeAppClient(this.appId)
    this.mongodb = this.client.getServiceClient(
      RemoteMongoClient.factory,
      'mongodb-atlas'
    )

    if (this.client.auth.hasRedirectResult()) {
      await this.client.auth.handleRedirectResult()
    }

    const isAuthed = this.client.auth.isLoggedIn
    if (isAuthed) {
      const { profile } = this.client.auth.user
      const movies = await this.getMovies()
      this.setState({ isAuthed, profile, movies })
    }
  }

  login = () => {
    const { isAuthed } = this.state

    if (isAuthed) {
      return
    }

    const credential = new GoogleRedirectCredential()
    this.client.auth.loginWithRedirect(credential)
  }

  logout = () => {
    this.client.auth.logout()
    this.setState({ isAuthed: false, profile: {} })
  }

  addMovie = async ({ date, title, price }) => {
    date = new Date(date)
    price = parseFloat(price)
    console.log({ date, title, price })

    const addResult = this.mongodb
      .db('a-list-tracker')
      .collection('movies')
      .insertOne({
        date,
        title,
        price,
        owner_id: this.client.auth.user.id
      })

    const movies = await this.getMovies()
    this.setState({ movies })

    return addResult
  }

  deleteMovie = async ({ _id }) => {
    await this.mongodb
      .db('a-list-tracker')
      .collection('movies')
      .deleteOne({ _id })
    const movies = await this.getMovies()
    this.setState({ movies })
  }

  getMovies = async () => {
    return this.mongodb
      .db('a-list-tracker')
      .collection('movies')
      .find()
      .toArray()
  }

  render() {
    const { isAuthed, profile, movies } = this.state
    return (
      <Container style={{ marginTop: '1em' }}>
        <Header as="h1" textAlign="center">
          <Header.Content>
            <Icon name="film" /> <span>A-List Tracker</span>
            <Header.Subheader>Built using MongoDB Stitch</Header.Subheader>
          </Header.Content>
        </Header>
        {isAuthed ? (
          <Container>
            <Menu borderless size="small" stackable>
              <Menu.Item header>
                <Image src={profile.pictureUrl} avatar />
                Welcome, {profile.firstName}
              </Menu.Item>
              <Menu.Item
                position="right"
                content="Logout"
                onClick={this.logout}
              />
            </Menu>
            <AddMovieForm handleAddMovie={this.addMovie} />
            {movies.length && (
              <MovieList movies={movies} handleMovieDelete={this.deleteMovie} />
            )}
          </Container>
        ) : (
          <Login loginUser={this.login} />
        )}
      </Container>
    )
  }
}

export default App
