<template>
    <div id="lobby">
        <div class="header">
            <h2>Your name: {{ playerName }}</h2>
            <h3>Players: <span v-for="player in players" :key="player">{{ player.name + " " }}</span></h3>
        </div>

        <div class="start-game">
            <p>Instructions: Wait for everyone to join, then click Start Game</p>
            <button :disabled="errorMessage !== ''" @click="beginGame">Start Game</button>
            <p class="error">{{ errorMessage }}</p>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import { Game } from '../model/game'
import { Player } from '../model/player'

export default {
    name: "Lobby",
    components: {},
    data: function() {
        return {
            reloadHandler: Number,
            playerName: Game.instance.playerName,
            players: Game.instance.allPlayers,
        }
    },
    methods: {
        beginGame: async function() {
            await axios.put('/api/game/start');
            this.$router.push('table');
        }
    },
    computed: {
        errorMessage: function() {
            if (this.players.length < 4) {
                return "Not enough players";
            }
            if (this.players.length > 9) {
                return "Too many players";
            }
            return "";
        }
    },
    created: function() {
        this.reloadHandler = setInterval(async () => {
            this.players = await Game.instance.reloadPlayers()
            if (Game.instance.board) {
                this.$router.push('table');
            }
        }, 2000);
    },
    unmounted: function() {
        clearInterval(this.reloadHandler);
    }
}
</script>

<style scoped>
#lobby {
    background-color: khaki;
    height: 100%
}
h2 {
    font-size: 2em;
}

p {
    padding-left: 0.5em;
    padding-right: 0.5em;
}

.header {
    padding: 2em;
    margin-bottom: 1em;
    background-color: white;
    border-bottom: 2px solid black;
}

.label {
    padding-top: 0.5em;
    background-color: white;
    border-style: solid;
    border-color: black;
    border-width: 2px 2px 0px 2px;
}

.cardBar {
    background-color: white;
    margin-bottom: 1em;

    padding: 0.5em;
    border-style: solid;
    border-color: black;
    border-width: 0px 2px 2px 2px;
    min-height: 15em;

    display: flex;

    overflow: auto;
}

.start-game {
    background-color: white;
    border-top: 2px solid black;
    border-bottom: 2px solid black;
    padding-top: 0.5em;
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

.error {
    color: darkred;
}
</style>