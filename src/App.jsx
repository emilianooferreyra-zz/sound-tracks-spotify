import React, { Component } from "react";
import "./App.css";
import { FormGroup, FormControl, InputGroup, Glyphicon } from "react-bootstrap";
import Profile from "./Profile";
import Gallery from "./Gallery";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "",
      artist: null,
      tracks: []
    };
  }

  search() {
    console.log("this.state", this.state);

    //my access token from spotify
    const ACCESS_TOKEN = "BQBqAydUya-BHosEXyb3XQsgitAFwP4xlEIgL0-STNKe-3Rl01j5tJMLovuxMmMkLIg0pPy0xnLzAg25MKbgZikqx7zrBBw5r735oMgGGDIjkPYzbHq8Yyb2-8NstNBucGaQ_C4fSP4ZEVEbQTkwm3tPFoxD41VRwBo1DQ&refresh_token=AQDypp4zuKvmYHTdgyAtsJMgd6j1NXeAX6EFCxVUZbVuT_EbctBNJ-s6fRUjMD6zH_aKOE_JpVqdzn-m_DhAVvuo0pR-WYLFTh_GdYpoqbvsB72xlZFy0UNzGeLBFPYbnJs  ";
    const BASE_URL = "https://api.spotify.com/v1/search?";
    const ALBUM_URL = "https://api.spotify.com/v1/artists/";

    let FETCH_URL = `${BASE_URL}q=${this.state.query}&type=artist&limit=1`;
    console.log("FETCH_URL", FETCH_URL);

    let myOptions = {
      method: "GET",
      headers: {
        'Autorization': `Bearer ${ACCESS_TOKEN}`
      },
      mode: "cors",
      cache: "default"
    };

    fetch(FETCH_URL, myOptions)
      .then(response => response.json())
      .then(json => {
        const artist = json.artists.item[0];
        this.setState({ artist });

        FETCH_URL = `${ALBUM_URL}/${artist.id}/top-tracks?country=US&`;
        fetch(FETCH_URL, myOptions)
          .then(response => response.json())
          .then(json => {
            console.log("artist's top tracks:", json);
            const { tracks } = json;
            this.setState({ tracks });
          })
      });
  }

  

  render() {
    return (
      <div className="App">
        <div className="App-title">Sound Tracks</div>
        <FormGroup>
          <InputGroup>
            <FormControl
              type="text"
              placeholder="Search for an Artist"
              value={this.state.query}
              onChange={event => {
                this.setState({ query: event.target.value });
              }}
              onKeyPress={event => {
                if (event.key === "Enter") {
                  this.search();
                }
              }}
            />
            <InputGroup.Addon onClick={() => this.search()}>
              <Glyphicon glyph="search" />
            </InputGroup.Addon>
          </InputGroup>
        </FormGroup>
        {
          this.state.artist !== null
          ?
            <div>
              <Profile
                artist={this.state.artist}
              />
              <Gallery
                tracks={this.state.tracks}
              />
            </div>
          : <div></div>
        }

      </div>
    );
  }
}

export default App;


