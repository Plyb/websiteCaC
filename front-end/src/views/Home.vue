<template>
  <div class="home">
    <div class="spacer"></div>
    <div class="content">
      <h1>Council and Crown</h1>
      <form @submit.prevent="enterGame">
        <label>Enter your name:</label>
        <input type="text" v-model="playerName">
        <input class="button" v-if="gameRunning" type="submit" value="Join Game" :disabled="playerName.length == 0">
      </form>
      <p class="error"> {{ errorMessage }}</p>
      <button @click.prevent="startGame" :disabled="playerName.length == 0">Start New Game</button>
      <p><strong>Warning:</strong> Starting a new game will close all existing games</p>
    </div>
    <div class="lowerSpacer"></div>
  </div>
</template>

<script>
import axios from 'axios';
import { Player } from '../model/player'
import { Game } from '../model/game'

export default {
  name: "Home",
  data: function() {
    return {
      playerName: "",
      errorMessage: "",
      gameRunning: false
    }
  },
  methods: {
    enterGame: async function() {
      try {
        let res = await axios.get('/api/players');
        let playerNames = res.data.players;
        if (playerNames.find(player => player.name === this.playerName)) {
          this.errorMessage = "There is already a player with that name. Try Again.";
        }
        else {
          await axios.post('/api/players', { playerName: this.playerName});
          const player = new Player(this.playerName);

          let players = playerNames.map(player => new Player(player.name));
          players.push(player);

          Game.instance = new Game(this.playerName, players);

          this.$router.push('lobby');
        }
      }
      catch (error) {
        console.log(error);
      }
    },
    startGame: async function() {
      try {
        await axios.post('/api/game');
        this.enterGame();
      }
      catch (error) {
        console.log(error);
      }
    }
  },
  created: async function() {
    let res = await axios.get('/api/game');
    if (res.data.game) {
      this.gameRunning = true;
    }
  }
};
</script>

<style scoped>
h1 {
  font-size: 3.5em;
  margin-top: 0;
}

button, .button {
  margin: 1em;
  padding: 5px;
  border-radius: 10px;
  border-color: white;
  border-width: 2px;
  border-image: none;
  border-style: solid;
}

button:disabled, .button:disabled {
  background-color: lightgray;
}

button:enabled, .button:enabled {
  background-color: khaki;
  cursor: pointer;
  user-select: none;
}

button:focus, .button:focus {
  outline:0;
}

button:active, .button:active {
  background-color: gold;
}

.home {
  height: 100%;
  background-color: khaki;
  display: flex;
  flex-direction: column;
}

.content {
  background-color: white;
  padding: 2em;
  padding-bottom: 4em;
  border-style: solid;
  border-color: black;
  border-width: 2px 0px 2px 0px;
  flex: initial;
}

.error {
  color: darkred;
}

.spacer {
  height: 25%;
  flex: initial
}

.lowerSpacer {
  flex: 1;
}

.footer {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0.5em;
  background-color: lightgray;
}
</style>
