import { Note } from '..';

export interface IQualityOpts {
  targetDifficulty?: number;
  maxDifficulty?: number;
}

export interface IChordOpts extends IQualityOpts {
  flatSharpFilter?: false | string;
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
