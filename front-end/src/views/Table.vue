<template>
<div v-if="board">
    <div class="info-bar other-players">
        <div
            class="other-player"
            v-for="hand in board.getOtherHands()"
            :key="hand.player.name"
        >
            <CardStack v-if="hand.player.name != playerName"
                :title="hand.player.name"
                :cards="hand.cards"
                :highlighed="hand.selected !== undefined"
            ></CardStack>
            <div>{{ hand.role }}</div>
            <div>{{ hand.points }}</div>
        </div>
    </div>
    <div class="info-bar proposals">
        <h2>Proposals</h2>
        <div class="hand">
            <div class="actionable-card"
                    v-for="(card, index) in board.proposedCards"
                    :key="index"
            >
                <button @click="enact(index)">Enact</button>
                <CardStack
                    :cards="[card]"
                    visible
                ></CardStack>
                <button @click="discard(index)">Recycle</button>
            </div>
        </div>
        <button @click="propose">Propose</button>
    </div>
    <div class="info-bar table-center">
        <CardStack
            title="Proposal Draw"
            :cards="board.proposalDrawCards"
            drawable
            @drawn="proposalDrawn"
        >
        </CardStack>
        <CardStack
            title="Proposal Recycling"
            :cards="board.proposalRecycleCards"
            visible
            drawable
            @drawn="shuffleProposals"
        >
        </CardStack>
        <CardStack
            title="Event Draw"
            :cards="board.eventDrawCards"
            drawable
            @drawn="drawEvent"
        >
        </CardStack>
        <CardStack
            title="Event Recycling"
            :cards="board.eventRecycleCards"
            visible
            drawable
            @drawn="shuffleEvents"
        >
        </CardStack>
    </div>
    <div class="info-bar active-cards">
        <h2>Active Cards</h2>
        <div class="hand">
            <div class="actionable-card"
                    v-for="(card, index) in board.activeCards"
                    :key="index"
            >
                <button @click="repeal(index)">Repeal</button>
                <CardStack
                    :cards="[card]"
                    visible
                ></CardStack>
            </div>
        </div>
    </div>
    <div class="info-bar hand">
        <CardStack
            v-for="(card, index) in board.getPlayerHand().cards"
            :key="index"
            :cards="[card]"
            visible
            drawable
            :highlighed="board.getPlayerHand().selected === index"
            @drawn="select(index)"
        ></CardStack>
    </div>
    <div class="info-bar metrics">
        <h2>{{ board.getPlayerHand().role }}</h2>
        <div
            v-if="board.getPlayerHand().role !== 'Monarch'"
        >
            <input
                v-model="points"
                @focus="changingPoints = true"
                @blur="updatePoints"
            >
            <button @click="swapWithMonarch">Swap with Monarch</button>
        </div>
        <div v-else>
            {{ monarchGoals }}
        </div>
    </div>
    <span v-if="board.getPlayerHand().isSpy">You are the spy</span>
</div>
</template>

<script>
import CardStack from "../components/CardStack.vue"
import { Card } from "../model/card"
import { Board } from '../model/board'
import { Game } from '../model/game'
import axios from 'axios'

export default {
    data: function() {
        return {
            board: Board | undefined,
            reloadHandler: Number,
            playerName: Game.instance.playerName,
            points: this.board?.getPlayerHand().points,
            changingPoints: false,
            monarchGoals: this.board?.getMonarchGoals()
        }
    },
    components: {
        CardStack
    },
    methods: {
        proposalDrawn: async function() {
            clearInterval(this.reloadHandler);
            await axios.put('/api/board/proposal/draw', {
                player: this.playerName,
            })
            this.intitiateReloads();
        },
        intitiateReloads: async function() {
            this.board = await Game.instance.reloadBoard();
            this.reloadHandler = setInterval(async () => {
                this.board = await Game.instance.reloadBoard();
                if (!this.changingPoints) {
                    this.points = this.board.getPlayerHand().points;
                }
            }, 1000);
        },
        select: async function(index) {
            clearInterval(this.reloadHandler);
            await axios.put('/api/board/ready', {
                player: this.playerName,
                index
            })
            this.intitiateReloads();
        },
        propose: async function() {
            clearInterval(this.reloadHandler);
            await axios.put('/api/board/propose');
            this.intitiateReloads();
        },
        discard: async function(index) {
            clearInterval(this.reloadHandler);
            await axios.put('/api/board/discard', {
                index
            }) 
            this.intitiateReloads();
        },
        enact: async function(index) {
            clearInterval(this.reloadHandler);
            await axios.put('/api/board/enact', {
                index
            }) 
            this.intitiateReloads();
        },
        repeal: async function(index) {
            clearInterval(this.reloadHandler);
            await axios.put('/api/board/repeal', {
                index
            }) 
            this.intitiateReloads();
        },
        shuffleProposals: async function(index) {
            clearInterval(this.reloadHandler);
            await axios.put('/api/board/proposal/shuffle') 
            this.intitiateReloads();
        },
        drawEvent: async function(index) {
            clearInterval(this.reloadHandler);
            await axios.put('/api/board/event/draw') 
            this.intitiateReloads();
        },
        shuffleEvents: async function(index) {
            clearInterval(this.reloadHandler);
            await axios.put('/api/board/event/shuffle') 
            this.intitiateReloads();
        },
        updatePoints: async function() {
            clearInterval(this.reloadHandler);
            await axios.put('/api/board/points', {
                player: this.playerName,
                points: this.points
            })
            await this.intitiateReloads();
            this.changingPoints = false;
            this.points = this.board.getPlayerHand().points;
        },
        swapWithMonarch: async function() {
            clearInterval(this.reloadHandler);
            axios.put('/api/board/swap', {
                player: this.playerName
            })
            await this.intitiateReloads();
            this.monarchGoals = this.board.getMonarchGoals();
        }
    },
    created: async function() {
        await this.intitiateReloads();
        this.monarchGoals = this.board?.getMonarchGoals();
    },
    unmounted: function() {
        clearInterval(this.reloadHandler);
    }
}
</script>

<style scoped>
.info-bar {
    background-color: white;
    border-bottom: 2px solid black;
    border-top: 2px solid black;
    margin-bottom: 24px;

    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
}

h2 {
    width: 100%;
    text-align: center;
}

.proposals {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.actionable-card {
    border: 1px solid black
}

.other-player {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.other-players {
    flex-wrap: nowrap;
    overflow: scroll;
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
</style>