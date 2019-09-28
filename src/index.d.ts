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

    interface IScale {
        difficulty: number;
        mode: string;
        category: string;
        structure: number[];
    }

    class Note {
        static random(alpha: boolean, flatSharpFilter?: boolean|string): string|number;
        static numNoteToAlpha(numNote: number, flatSharpFilter?: boolean|string): string;
        static alphaNoteToNumeric(alphaNote: string): number;
        static applyInterval(root: string|number, interval: number, constrainToBaseOctave?: boolean, flatSharpFilter?: boolean|string): number|string;
        toAlphaDict: {
            [index: number]: string;
        }
        toNumDict: {
            [index: string]: number;
        }
    }

    class Chord {
        static random(difficulty?: number, onlyThisDifficulty?: boolean, constrainToBaseOctave?: boolean, flatSharpFilter?: boolean|string): IChord;
        static randomQuality(difficulty?: number, onlyThisDifficulty?: boolean): IChordQuality;
        static allQualitiesWithDifficulty(difficulty?: number, onlyThisDifficulty?: boolean): IChordQuality[];
        static applyStructureToRoot(root: number|string, structure: number[], constrainToBaseOctave?: boolean, alpha?: boolean, flatSharpFilter?: boolean|string): number[]|string[];
        static allQualities(): {
            [index: string]: IChordQuality;
        };
    }

    class Set {
        static getNumericNoteSet(root?: number|string): number[];
        static random(): number[];
        static getAlphaNoteSet(root?: number|string, flatSharpFilter?: boolean|string): string[];
        static alphaSetToNumeric(alphaNoteSet: string[]): number[];
        static numericSetToAlpha(numNoteSet: number[], flatSharpFilter?: boolean|string): string[];
        static applyStructureToRoot(root: number|string, structure: number[], constrainToBaseOctave?: boolean, alpha?: boolean, flatSharpFilter?: string|boolean): string[]|number[];
    }

    class Scale {
        static getScaleFromRoot(root: string|number, structure: number[], constrainToBaseOctave?: boolean): number[];
        static random(difficulty?: number, onlyThisDifficulty?: boolean): number[];
        static allScalesWithDifficulty(difficulty?: number, onlyThisDifficulty?: boolean): number[][];
        static applyStructureToRoot(root: string|number, structure: number[], constrainToBaseOctave?: boolean): number[];
        static allScales(): {
            [index: string]: IScale;
        }
    }

    export {
        Note,
        Chord,
        Set,
        Scale
    }
}