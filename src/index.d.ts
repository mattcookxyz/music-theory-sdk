declare module "music-theory-toolkit" {
    declare class Note {
        static random(alpha: boolean = false, flatSharpFilter: boolean|string = false): string|number;
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
    export {
        Note
    }
}