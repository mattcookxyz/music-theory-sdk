import { Note } from '..';

export interface IStaticRandomChordResult {
  root?: string | number;
  quality?: IQuality;
  value: string;
}

export interface IRandomChordOpts {
  flatSharpFilter?: boolean | string;
  maxDifficulty?: number;
  destructure?: boolean;
  alpha?: boolean;
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
