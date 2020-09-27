
export enum GameDifficulty {
  Easy = 3, Medium = 10, Hard = 25
}

export enum CardState {
  Closed = 0, OpenGreen = 1, OpenRed = 2, Hidden = 3
}

export interface Card {
  point: number;
  state: CardState;
}
