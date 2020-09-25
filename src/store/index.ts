import Vue from 'vue'
import Vuex from 'vuex'

import { CardState, Card } from '../globaltypes'

Vue.use(Vuex)

// Thanks to mbacalan, https://github.com/mbacalan/matchingGame
function shuffle(array: Array<number>) {
  let currentIndex = array.length, temporaryValue, randomIndex;

  while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
  }

  return array;
}

function toggleStateInSameCardset(cardset: Card[], card: Card) {
  const selectedCard = cardset.find(c => c.state === CardState.OpenGreen);
  if (selectedCard !== undefined) {
    selectedCard.state = CardState.Closed;
    card.state = CardState.OpenGreen;
  }
}

function updateStateBetweenCardset(cardset: Card[], card: Card) {
  const selectedCard = cardset.find(c => c.state === CardState.OpenGreen);
  if (selectedCard !== undefined) {
    if(selectedCard.point === card.point) {
      card.state = CardState.OpenGreen;
      setTimeout (() => {
        selectedCard.state = CardState.Hidden;
        card.state = CardState.Hidden;
      }, 1000);
    } else {
      card.state = CardState.OpenRed;
      setTimeout (() => {
        card.state = CardState.Closed;
      }, 3000);
    }
  } else {
    card.state = CardState.OpenGreen;
  }
}

export default new Vuex.Store({
  state: {
    cardset1: [] as Card[],
    cardset2: [] as Card[],
    timeUsed: ''
  },
  getters: {
    remainCards: state => (
      state.cardset1.filter(c => c.state !== CardState.Hidden).length + 
      state.cardset2.filter(c => c.state !== CardState.Hidden).length
    ),
    matchedCards: state => (
      state.cardset1.filter(c => c.state === CardState.OpenGreen).length !== 0 && 
      state.cardset2.filter(c => c.state === CardState.OpenGreen).length !== 0
    ),
    anyRedCard: state => (
      state.cardset1.filter(c => c.state === CardState.OpenRed).length !== 0 || 
      state.cardset2.filter(c => c.state === CardState.OpenRed).length !== 0
    ),
    timeUsed: state => state.timeUsed
  },
  mutations: {
    CREATE_NEW_CARDS: (state, difficulty: number) => {
      const len = difficulty;
      let pts: number[] = [];
      for (let n = 1; n <= len; n++) {
          pts.push(n);
      }

      pts = shuffle(pts);
      state.cardset1 = [];
      for (let n = 1; n <= len; n++) {
          const card = {
              point: pts[n - 1],
              state: CardState.Closed
          };
          state.cardset1.push(card);
      }

      pts = shuffle(pts);
      state.cardset2 = [];
      for (let n = 1; n <= len; n++) {
          const card = {
              point: pts[n - 1],
              state: CardState.Closed
          };
          state.cardset2.push(card);
      }
    },    
    UPDATE_CARD_DROM_UNO: (state, point) => {
      const card = state.cardset1.find(c => c.point === point);
      if(card !== undefined) {
        toggleStateInSameCardset(state.cardset1, card);
        updateStateBetweenCardset(state.cardset2, card);
      }
    },
    UPDATE_CARD_FROM_DUE: (state, point) => {
      const card = state.cardset2.find(c => c.point === point);
      if(card !== undefined) {
        toggleStateInSameCardset(state.cardset2, card);
        updateStateBetweenCardset(state.cardset1, card);
      }
    },
    SET_TIMEUSED: (state, timeused) => {
      state.timeUsed = timeused;
    }
  },
  actions: {
    createNewCards: (context, difficulty: number) => {
      context.commit('CREATE_NEW_CARDS', difficulty);
    },
    updateCardFromUno: (context, point) => {
      context.commit('UPDATE_CARD_DROM_UNO', point);
    },
    updateCardFromDue: (context, point) => {
      context.commit('UPDATE_CARD_FROM_DUE', point);
    },
    setTimeUsed: (context, timeused) => {
      context.commit('SET_TIMEUSED', timeused);
    }
  },
  modules: {
  }
})
