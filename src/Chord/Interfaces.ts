import { Note } from '..';

export interface IChordOpts {
  flatSharpFilter?: false | string;
  maxDifficulty?: number;
  targetDifficulty?: number;
}

export interface IRandomQualityOpts {
  targetDifficulty?: number;
  maxDifficulty?: number;
}

export interface IQuality {
  difficulty: number;
  name: string;
  symbol: string;
  structure: number[];
}

export interface IParsedChord {
  root: Note;
  quality: IQuality;
}
