import React, { Component } from "react";
import Card from "./Card";
import "./Deck.css";

import axios from "axios";

const API_BASE_URL = "https://deckofcardsapi.com/api/deck";

export default class Deck extends Component {
  constructor(props) {
    super(props);
    this.state = { deck: null, drawn: [] };
    this.getCard = this.getCard.bind(this);
  }

  async componentDidMount() {
    // durch get fetch url - url accessible
    let deck = await axios.get(`${API_BASE_URL}/new/shuffle`);
    this.setState({ deck: deck.data });
  }

  async getCard() {
    let deck_id = this.state.deck.deck_id;
    try {
      let cardUrl = `${API_BASE_URL}/${deck_id}/draw/`;
      let cardRes = await axios.get(cardUrl);
      if (!cardRes.data.success) {
        throw new Error("No card remaining!");
      }
      let card = cardRes.data.cards[0];
      // set state using new card info from api
      // je nach dem click event kriege ich neue Value aber die alte Value ist durch ...st.drawn auch gespeichert.
      this.setState((st) => ({
        drawn: [
          ...st.drawn,
          {
            id: card.code,
            image: card.image,
            name: ` ${card.value} of ${card.suit}`,
          },
        ],
      }));
    } catch (err) {
      alert(err);
    }

    // dadurch kriege ich ein id zwischen deck und draw
    // 'https://deckofcardsapi.com/api/deck/${deck_id}/draw/'

    // make request using deck id
    // let cardRes = await axios.get(
    //   "https://deckofcardsapi.com/api/deck/gnbcgi8lga2s/draw/",
    // );
  }

  render() {
    const cards = this.state.drawn.map((c) => (
      <Card key={c.id} name={c.name} image={c.image} />
    ));
    return (
      <div className='Deck'>
        <h1 className='Deck-title'>&#x2666; Card Dealer &#x2666;</h1>
        <h2 className='Deck-title subtitle'>
          &#x2666;A little demo made with React &#x2666;
        </h2>
        <button onClick={this.getCard}>Get Card!</button>
        <div className='Deck-cardarea'>{cards}</div>
      </div>
    );
  }
}
