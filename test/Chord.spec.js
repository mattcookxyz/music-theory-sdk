import Chord from "../source/classes/Chord";

import lodash from "lodash";

import { describe, it } from "mocha";
import { expect } from "chai";

describe("Chord Class", () => {
  describe("Method: randomQuality", () => {
    it("Should return a random chord quality", () => {
      let chord = Chord.randomQuality();
      expect(chord).to.haveOwnProperty("difficulty");
      expect(chord).to.haveOwnProperty("type");
      expect(chord).to.haveOwnProperty("symbol");
      expect(chord).to.haveOwnProperty("structure");
    });

    it("Should return a random chord quality at or below the given difficulty", () => {
      for (let i = 0; i < 10; i++) {
        expect(Chord.randomQuality(1).difficulty).to.be.lessThan(2);
        expect(Chord.randomQuality(1).difficulty).to.be.lessThan(2);
        expect(Chord.randomQuality(1).difficulty).to.be.lessThan(2);
        expect(Chord.randomQuality(1).difficulty).to.be.lessThan(2);
        expect(Chord.randomQuality(1).difficulty).to.be.lessThan(2);
      }
    });

    it("Should return a random chord quality ONLY of the given difficulty when passed exclusively arg of true", () => {
      for (let i = 0; i < 10; i++) {
        expect(Chord.randomQuality(1, true).difficulty).to.equal(1);
        expect(Chord.randomQuality(1, true).difficulty).to.equal(1);
        expect(Chord.randomQuality(1, true).difficulty).to.equal(1);
        expect(Chord.randomQuality(1, true).difficulty).to.equal(1);
        expect(Chord.randomQuality(1, true).difficulty).to.equal(1);
      }
    });
  });

  describe("Method: allQualitiesWithDifficulty", () => {
    it("Should return all qualities with given difficulty and below", () => {
      expect(Chord.allQualitiesWithDifficulty(1)).to.have.lengthOf(7);
    });

    it("Should return all qualities with given difficulty ONLY when exclusively arg === true", () => {
      expect(Chord.allQualitiesWithDifficulty(1, true)).to.have.lengthOf(4);
    });
  });

  describe("Method: allQualities", () => {
    it("Should return all programmed chord qualities", () => {
      expect(lodash.size(Chord.allQualities())).to.equal(14);
    });
  });
});
