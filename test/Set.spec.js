import Set from "../source/classes/Set";

import { describe, it } from "mocha";
import { expect } from "chai";

describe("Set Class", () => {
  describe("Method: getNumericNoteSetFromRoot", () => {
    it("Should correctly return note set for given root", () => {
      expect(Set.getNumericNoteSetFromRoot("C")).to.deep.equal([
        0,
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11
      ]);
      expect(Set.getNumericNoteSetFromRoot(0)).to.deep.equal([
        0,
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11
      ]);
    });
  });

  describe("Method: getAlphaNoteSetFromRoot", () => {
    it("Should correctly return note set for given root", () => {
      expect(Set.getAlphaNoteSetFromRoot("C")).to.deep.equal([
        "C",
        "C#/Db",
        "D",
        "D#/Eb",
        "E",
        "F",
        "F#/Gb",
        "G",
        "G#/Ab",
        "A",
        "A#/Bb",
        "B"
      ]);
      expect(Set.getAlphaNoteSetFromRoot(0)).to.deep.equal([
        "C",
        "C#/Db",
        "D",
        "D#/Eb",
        "E",
        "F",
        "F#/Gb",
        "G",
        "G#/Ab",
        "A",
        "A#/Bb",
        "B"
      ]);
    });

    it("Should properly filter flats and sharps", () => {
      expect(Set.getAlphaNoteSetFromRoot("C", "#")).to.deep.equal([
        "C",
        "C#",
        "D",
        "D#",
        "E",
        "F",
        "F#",
        "G",
        "G#",
        "A",
        "A#",
        "B"
      ]);
      expect(Set.getAlphaNoteSetFromRoot(0, "b")).to.deep.equal([
        "C",
        "Db",
        "D",
        "Eb",
        "E",
        "F",
        "Gb",
        "G",
        "Ab",
        "A",
        "Bb",
        "B"
      ]);
    });
  });
});
