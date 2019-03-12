import Scale from "../source/classes/Scale.js";

import { describe, it } from "mocha";
import { expect } from "chai";

describe("Scale Class", () => {
  describe("Method: getScaleFromRoot", () => {
    it("Should give correct scale from given root while NOT constraining to base octave", () => {
      expect(
        Scale.getScaleFromRoot("C", Scale.allScales().major.structure)
      ).to.deep.equal([0, 2, 4, 5, 7, 9, 11]);
      expect(
        Scale.getScaleFromRoot("Eb", Scale.allScales().minor.structure)
      ).to.deep.equal([3, 5, 6, 8, 10, 11, 13]);
    });

    it("Should give correct scale from given root while constraining to base octave", () => {
      expect(
        Scale.getScaleFromRoot("C", Scale.allScales().major.structure, true)
      ).to.deep.equal([0, 2, 4, 5, 7, 9, 11]);
      expect(
        Scale.getScaleFromRoot("Eb", Scale.allScales().minor.structure, true)
      ).to.deep.equal([3, 5, 6, 8, 10, 11, 1]);
    });
  });

  describe("Method: randomScale", () => {
    it("Should return a random scale", () => {
      let scale = Scale.randomScale();
      expect(scale).to.haveOwnProperty("difficulty");
      expect(scale).to.haveOwnProperty("type");
      expect(scale).to.haveOwnProperty("structure");
    });

    it("Should return a random scale at or below the given difficulty", () => {
      for (let i = 0; i < 10; i++) {
        expect(Scale.randomScale(1).difficulty).to.be.lessThan(2);
        expect(Scale.randomScale(1).difficulty).to.be.lessThan(2);
        expect(Scale.randomScale(1).difficulty).to.be.lessThan(2);
        expect(Scale.randomScale(1).difficulty).to.be.lessThan(2);
        expect(Scale.randomScale(1).difficulty).to.be.lessThan(2);
      }
    });

    it("Should return a random scale ONLY of the given difficulty when passed exclusively arg of true", () => {
      for (let i = 0; i < 10; i++) {
        expect(Scale.randomScale(1, true).difficulty).to.equal(1);
        expect(Scale.randomScale(1, true).difficulty).to.equal(1);
        expect(Scale.randomScale(1, true).difficulty).to.equal(1);
        expect(Scale.randomScale(1, true).difficulty).to.equal(1);
        expect(Scale.randomScale(1, true).difficulty).to.equal(1);
      }
    });
  });
});
