import React, { Component } from 'react'
import './App.css'
import { getUrls, createNewURL } from "../../apiCalls"
import UrlContainer from '../UrlContainer/UrlContainer'
import UrlForm from '../UrlForm/UrlForm'

class App extends Component {
  constructor() {
    super();
    this.state = {
      urls: []
    }
  }

  componentDidMount() {
    getUrls()
    .then(urls => this.setState({urls: urls.urls}))
  }

  addURL = async (newURL) => {
    const postedURL = await createNewURL(newURL)
    this.setState({ urls: [...this.state.urls, postedURL] });
  }

  render() {
    return (
      <main className="App">
        <header>
          <h1>URL Shortener</h1>
          <UrlForm 
          addURL={this.addURL}/>
        </header>
        <UrlContainer urls={this.state.urls} />
      </main>
    )
  }
}

export default App;
