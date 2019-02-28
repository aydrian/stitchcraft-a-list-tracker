import React, { Component } from 'react'
import { Container, Header, Icon, Menu, Image } from 'semantic-ui-react'
import {
  Stitch,
  GoogleRedirectCredential,
  RemoteMongoClient
} from 'mongodb-stitch-browser-sdk'

import Login from './components/Login'

class App extends Component {
  constructor(props) {
    super(props)
    this.appId = 'stitchcraft-a-list-tracker-idzxn'

    this.state = {
      isAuthed: false,
      profile: {}
    }
  }

  componentDidMount = async () => {
    this.client = Stitch.initializeAppClient(this.appId)
    this.mongodb = this.client.getServiceClient(
      RemoteMongoClient.factory,
      'mongodb-atlas'
    )

    let user
    if (this.client.auth.hasRedirectResult()) {
      user = await this.client.auth.handleRedirectResult()
    }

    const isAuthed = this.client.auth.isLoggedIn
    if (isAuthed) {
      user = this.client.auth.user
      this.setState({ isAuthed, profile: user.profile })
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

  render() {
    const { isAuthed, profile } = this.state
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
          </Container>
        ) : (
          <Login loginUser={this.login} />
        )}
      </Container>
    )
  }
}

export default App
