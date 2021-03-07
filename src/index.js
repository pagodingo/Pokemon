import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';

/*--------------------------------------------------*/


async function getPokemon(input = 'pikachu') {
    let url = 'https://pokeapi.co/api/v2/pokemon/' + input.toLowerCase();
    try {
        let res = await fetch(url);
        return await res.json();
    } catch (error) {
        console.log(error);
    }
}

async function renderPokemon(input) {
    let pokemon = await getPokemon(input);
    document.getElementById('poke-img').src = pokemon.sprites.front_default;
}

renderPokemon();

/*--------------------------------------------------*/

class Pokemon extends React.Component {
  constructor(props) {
    super(props);
    this.state = {string: 'pikachu'}
    this.submitHandle = this.submitHandle.bind(this)
  }
  submitHandle = (event) => {
      // Set the component's state here
      this.setState({string: renderPokemon(this.element.value)});
      event.preventDefault();
  }
  // Output the component
  render() {
    return (
      <form onSubmit={this.submitHandle}>
        <h1><b>Search Pokedex DB for Pokemon</b>
        </h1>
        <h3>Find Pokemon Stats:</h3>
        <input
          type="text" ref={el => this.element = el}
        />
      </form>
    );
  }
}


ReactDOM.render(<Pokemon />, document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
