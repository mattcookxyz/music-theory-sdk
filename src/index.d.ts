declare module "music-theory-toolkit" {

    interface IChordQuality {
        difficulty: number;
        type: string;
        symbol: string;
        structure: number[];
    }

    interface IChord {
        root: string;
        quality: IChordQuality;
        alphaChord: string[];
        numChord: number[];
    }

    declare class Note {
        static random(alpha: boolean, flatSharpFilter: boolean|string = false): string|number;
        static numNoteToAlpha(numNote: number, flatSharpFilter: boolean|string = false): string;
        static alphaNoteToNumeric(alphaNote: string): number;
        static applyInterval(root: string|number, interval: number, constrainToBaseOctave: boolean = true, flatSharpFilter: boolean|string = false): number|string;
        toAlphaDict: {
            [index: number]: string;
        }
        toNumDict: {
            [index: string]: number;
        }
    }

    declare class Chord {
        static random(difficulty: number = 4, onlyThisDifficulty: boolean = false, constrainToBaseOctave: boolean = true, flatSharpFilter: boolean|string = false): IChord;
        static randomQuality(difficulty: number = 5, onlyThisDifficulty: boolean = false): IChordQuality;
    }

    export {
        Note,
        Chord
    }
}