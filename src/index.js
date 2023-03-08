import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
/*--------------------------------------------------*/

async function getPokemon(input = 'PIKACHU') {
    let url = 'https://pokeapi.co/api/v2/pokemon/' + input.toLowerCase();
    try {
        let res = await fetch(url)
        if (res.status !== 200) {
          alert('Pokémon Not Found.');
          window.location.reload();
        }
        return await res.json();
    } catch (error) {
      console.log(error)
    }
}

async function renderPokemon(input) {
    let pokemon = await getPokemon(input)
    document.getElementById('pokemon-name').innerHTML = pokemon.name.replace(/"/g,"").toUpperCase();
    document.getElementById('poke-img').src = pokemon.sprites.front_default;
    document.getElementById('health-stat').innerHTML = JSON.stringify(pokemon.stats[0].base_stat)
    document.getElementById('xp-stat').innerHTML = JSON.stringify(pokemon.base_experience)
    document.getElementById('attack-stat').innerHTML = JSON.stringify(pokemon.stats[1].base_stat)
    document.getElementById('attack-bar').style.width = JSON.stringify(pokemon.stats[1].base_stat) + "%"
    document.getElementById('def-stat').innerHTML = JSON.stringify(pokemon.stats[2].base_stat)
    document.getElementById('def-bar').style.width = JSON.stringify(pokemon.stats[2].base_stat) + "%"
    document.getElementById('speed-stat').innerHTML = JSON.stringify(pokemon.stats[5].base_stat)
    document.getElementById('speed-bar').style.width = JSON.stringify(pokemon.stats[5].base_stat) + "%"
    document.getElementById('type-stat').innerHTML = JSON.stringify(pokemon.types[0].type.name).replace(/"/g,"").toUpperCase();
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
      this.setState({string: this.element.value});
      renderPokemon(this.element.value)
      event.preventDefault();
  }

  render() {

    return (
      <div>
        <h1 className="logo main-title"><b>Pokémon!</b>
        </h1>
      <form onSubmit={this.submitHandle}>
        <input
          type="text" ref={el => this.element = el}
        placeholder=" Charizard" spellCheck="false"/><i className="search-icon fa fa-search"></i>
      </form>
      <div className="card">
      <div className="card-top"></div>
      <div className="avatar-holder">
        <img id="poke-img" src="" alt="pokemon-not-found?"/>
      </div>
      <div className="name">
        <a href={'https://www.pokemon.com/us/pokedex/'+this.state.string} rel="noreferrer" target="_blank" id="pokemon-name">Pikachu</a>
      </div>
      <div className="stats">
        <div className="ds health-points">
          <h6 title="Health">HP ♥</h6>
          <p id="health-stat">hp</p>
        </div>
        <div className="ds experience">
          <h6 title="Experience">XP ✦<i className="fas fa-battery-full"></i></h6>
          <p id="xp-stat">xp</p>
        </div>
        <div className="ds type">
          <h6 title="Type">Type ✪</h6>
          <p id="type-stat">type</p>
        </div>
      </div>
      <div className="skills">
        <h6>Stats <i className="fad fa-game-console-handheld" aria-hidden="true"></i></h6>
        <div className="skill ">
          <h6><i className="fas fa-meteor"></i> Attack </h6>
          <div className="bar attack-bar"id="attack-bar">
            <p id="attack-stat">attack</p>
          </div>
        </div>
        <div className="skill ">
          <h6><i className="fas fa-shield-alt"></i> Defense </h6>
          <div className="bar def-bar" id="def-bar">
            <p id="def-stat"></p>
          </div>
        </div>
        <div className="skill ">
          <h6><i className="fas fa-dragon"></i> Speed </h6>
          <div className="bar speed-bar" id="speed-bar">
            <p id="speed-stat">speed</p>
          </div>
        </div>
      </div>
    </div>
      </div>
    )
  }
}

ReactDOM.render(<Pokemon />, document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

