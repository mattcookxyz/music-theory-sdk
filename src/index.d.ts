declare module "music-theory-toolkit" {
    declare class Note {
        static random(alpha: boolean, flatSharpFilter: boolean): string|number;
        static numNoteToAlpha(numNote: number, flatSharpFilter: boolean): string;
        static alphaNoteToNumeric(alphaNote: string): number;
        static applyInterval(root: string|number, interval: number, constrainToBaseOctave: boolean, flatSharpFilter: string): number|string;
        toAlphaDict: {
            [index: number]: string;
        }
        toNumDict: {
            [index: string]: number;
        }
    }
    export {
        Note
    }
}