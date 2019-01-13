import React, { Component } from 'react';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state ={ isLoading: true}
  }

  /*componentDidMount() {
    return fetch('https://nhl-betting.herokuapp.com/')
      .then(function (response) {
        return response.json();
      })
      .then(function (response) {
        console.log(response);
        this.setState({ games: response });
      })
      .catch(function (error) {
        console.log(error);
      });
  }*/

  componentDidMount(){
    return fetch('https://nhl-betting.herokuapp.com/')
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          isLoading: false,
          games: responseJson,
        }, function(){

        });

      })
      .catch((error) =>{
        console.error(error);
      });
  }

  render() {

    if (this.state.isLoading) {
      return (
        <div className="loading">
          <img src="https://cdn.dribbble.com/users/322079/screenshots/2283882/no-halftime-loaders-petrick.gif" />
        </div>
      )
    }

    return (
      <div>
        <ul className="gameList">
          {this.state.games.map(game => <li key={game.home + game.away} className="gameListItem">{game.home} | <span className={(game.prediction > 10 && game.hometeamWinPercentage > 55 && game.homeOdds > 1.8 || game.prediction > 15 && game.hometeamWinPercentage > 60 && game.homeOdds > 1.5) ? "winner" : null}>Odds: {game.homeOdds}</span> | Win%: {game.hometeamWinPercentage} vs {game.away} | <span className={(game.prediction < -10 && game.awayteamWinPercentage > 55 && game.homeOdds > 2 || game.prediction < -15 && game.awayteamWinPercentage > 60 && game.awayOdds > 1.8) ? "winner" : null}>Odds: {game.awayOdds}</span> | Win%: {game.awayteamWinPercentage} </li>)}
        </ul>
      </div>
    );
  }
}

export default App;
