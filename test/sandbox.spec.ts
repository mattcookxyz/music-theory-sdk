import { Note } from '../src';
import { describe, it } from 'mocha';
import * as chai from 'chai';

const expect = chai.expect;

describe('sandbox', () => {
  it('Should do something', () => {
    const note = new Note('B5').transpose(-1);
    console.log(note);
  });
});
