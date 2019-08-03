[Click here to return to the readme.](../readme.md)

## Objects

<dl>
<dt><a href="#Chord">Chord</a> : <code>object</code></dt>
<dd><p>Generate, parse, and mangle chords.</p>
</dd>
<dt><a href="#Note">Note</a> : <code>object</code></dt>
<dd><p>Generate, transpose, and translate numeric/alphabetical chords.</p>
</dd>
<dt><a href="#Scale">Scale</a> : <code>object</code></dt>
<dd><p>Generate scales.</p>
</dd>
<dt><a href="#Set">Set</a> : <code>object</code></dt>
<dd><p>Generate, transpose, and mangle sets of individual notes.</p>
</dd>
</dl>

<a name="Chord"></a>

## Chord : <code>object</code>
Generate, parse, and mangle chords.

**Kind**: global namespace  

* [Chord](#Chord) : <code>object</code>
    * [.random(difficulty, onlyThisDifficulty, constrainToBaseOctave, flatSharpFilter)](#Chord.random) ⇒ <code>object</code>
    * [.randomQuality(difficulty, onlyThisDifficulty)](#Chord.randomQuality) ⇒ <code>object</code>
    * [.allQualitiesWithDifficulty(difficulty, onlyThisDifficulty)](#Chord.allQualitiesWithDifficulty) ⇒ <code>Array.&lt;object&gt;</code>
    * [.applyStructureToRoot(root, structure, constrainToBaseOctave, alpha, flatSharpFilter)](#Chord.applyStructureToRoot) ⇒ <code>Array.&lt;number&gt;</code> \| <code>Array.&lt;string&gt;</code>
    * [.allQualities()](#Chord.allQualities) ⇒ <code>object</code>

<a name="Chord.random"></a>

### Chord.random(difficulty, onlyThisDifficulty, constrainToBaseOctave, flatSharpFilter) ⇒ <code>object</code>
Provides a random chord of the given difficulty (or below)

**Kind**: static method of [<code>Chord</code>](#Chord)  
**Returns**: <code>object</code> - an object containing root, quality details, an alpha version of the chord, and numeric representation of the chord and its intervals  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| difficulty | <code>number</code> | <code>4</code> | 0-4 - difficulty of chord candidates |
| onlyThisDifficulty | <code>boolean</code> | <code>false</code> | constrain to the given difficulty, or allow easier chord qualities |
| constrainToBaseOctave | <code>boolean</code> | <code>true</code> | keep notes within base octave [ 0 - 11 ] |
| flatSharpFilter | <code>boolean</code> \| <code>string</code> | <code>false</code> | constrain the output root to # or b for alphaChord |

<a name="Chord.randomQuality"></a>

### Chord.randomQuality(difficulty, onlyThisDifficulty) ⇒ <code>object</code>
Provides a random chord quality of the given difficulty (or below)

**Kind**: static method of [<code>Chord</code>](#Chord)  
**Returns**: <code>object</code> - a random chord quality object  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| difficulty | <code>number</code> | <code>5</code> | 0-4 - difficulty of chord candidates |
| onlyThisDifficulty | <code>boolean</code> | <code>false</code> | constrain to the given difficulty, or allow easier qualities |

<a name="Chord.allQualitiesWithDifficulty"></a>

### Chord.allQualitiesWithDifficulty(difficulty, onlyThisDifficulty) ⇒ <code>Array.&lt;object&gt;</code>
Get all qualities of given difficulty (including lower difficulties by default, per the exclusively arg)

**Kind**: static method of [<code>Chord</code>](#Chord)  
**Returns**: <code>Array.&lt;object&gt;</code> - a set of chord quality objects  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| difficulty | <code>string</code> | <code>4</code> | 0 through 4 - difficulty of chord qualities to include (up to and including) |
| onlyThisDifficulty | <code>boolean</code> | <code>false</code> | constrain to given difficulty, or allow easier qualities |

<a name="Chord.applyStructureToRoot"></a>

### Chord.applyStructureToRoot(root, structure, constrainToBaseOctave, alpha, flatSharpFilter) ⇒ <code>Array.&lt;number&gt;</code> \| <code>Array.&lt;string&gt;</code>
Takes in a root note, and returns the given structure built from the root

**Kind**: static method of [<code>Chord</code>](#Chord)  
**Returns**: <code>Array.&lt;number&gt;</code> \| <code>Array.&lt;string&gt;</code> - an array of chord members  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| root | <code>number</code> \| <code>string</code> |  | Numeric note 0-11 or alphabetical note to build chord |
| structure | <code>Array.&lt;number&gt;</code> |  | Array of chord members as chromatic integers from 0 as root |
| constrainToBaseOctave | <code>boolean</code> | <code>true</code> | whether to allow notes to extend beyond 11, or transpose to base octave |
| alpha | <code>boolean</code> | <code>false</code> | whether to return as alphabetical chord members or numeric |
| flatSharpFilter | <code>boolean</code> \| <code>string</code> | <code>false</code> | constrain the output root to # or b for alphaChord |

<a name="Chord.allQualities"></a>

### Chord.allQualities() ⇒ <code>object</code>
Comprehensive list of chord qualities

**Kind**: static method of [<code>Chord</code>](#Chord)  
**Returns**: <code>object</code> - an object containing all known chord qualities as objects  
<a name="Note"></a>

## Note : <code>object</code>
Generate, transpose, and translate numeric/alphabetical chords.

**Kind**: global namespace  

* [Note](#Note) : <code>object</code>
    * [.random(alpha, flatSharpFilter)](#Note.random) ⇒ <code>string</code> \| <code>number</code>
    * [.numNoteToAlpha(numNote, flatSharpFilter)](#Note.numNoteToAlpha) ⇒ <code>string</code>
    * [.alphaNoteToNumeric(alphaNote)](#Note.alphaNoteToNumeric) ⇒ <code>number</code>
    * [.applyInterval(root, interval, constrainToBaseOctave, flatSharpFilter)](#Note.applyInterval) ⇒ <code>number</code> \| <code>string</code>

<a name="Note.random"></a>

### Note.random(alpha, flatSharpFilter) ⇒ <code>string</code> \| <code>number</code>
Generates a random note.

**Kind**: static method of [<code>Note</code>](#Note)  
**Returns**: <code>string</code> \| <code>number</code> - a random note  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| alpha | <code>number</code> | <code>false</code> | whether to return an alpha note ( 'C#' vs. 1 ) |
| flatSharpFilter | <code>string</code> | <code>false</code> | if asAlpha = true, 'b' or '#' will result in 'Db' or 'C#' instead of 'Db/C#' |

<a name="Note.numNoteToAlpha"></a>

### Note.numNoteToAlpha(numNote, flatSharpFilter) ⇒ <code>string</code>
Converts a numeric note (10) to alpha ('A#/Bb')

**Kind**: static method of [<code>Note</code>](#Note)  
**Returns**: <code>string</code> - an alpha note ('A#/Bb')  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| numNote | <code>number</code> |  | integer between 0 and 11, representing a chromatic note to convert to alpha |
| flatSharpFilter | <code>string</code> | <code>false</code> | 'b' or '#' will result in 'Db' or 'C#' instead of 'Db/C#' |

<a name="Note.alphaNoteToNumeric"></a>

### Note.alphaNoteToNumeric(alphaNote) ⇒ <code>number</code>
Converts an alpha note ('C') to numeric (0)

**Kind**: static method of [<code>Note</code>](#Note)  
**Returns**: <code>number</code> - a numeric note (0)  

| Param | Type | Description |
| --- | --- | --- |
| alphaNote | <code>string</code> | alpha note ('C') to convert to numeric note (0) |

<a name="Note.applyInterval"></a>

### Note.applyInterval(root, interval, constrainToBaseOctave, flatSharpFilter) ⇒ <code>number</code> \| <code>string</code>
Applies a given interval to an alpha or numeric note

**Kind**: static method of [<code>Note</code>](#Note)  
**Returns**: <code>number</code> \| <code>string</code> - the note after application of given interval  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| root | <code>number</code> \| <code>string</code> |  | the note to transpose from |
| interval | <code>number</code> |  | the interval to apply to the note |
| constrainToBaseOctave | <code>boolean</code> | <code>true</code> | whether to keep the output note within the base octave, or 0-11 range |
| flatSharpFilter | <code>string</code> | <code>false</code> | 'b' or '#' will result in 'Db' or 'C#' instead of 'Db/C#' |

<a name="Scale"></a>

## Scale : <code>object</code>
Generate scales.

**Kind**: global namespace  

* [Scale](#Scale) : <code>object</code>
    * [.getScaleFromRoot(root, structure, constrainToBaseOctave)](#Scale.getScaleFromRoot) ⇒ <code>Array.&lt;number&gt;</code>
    * [.random(difficulty, onlyThisDifficulty)](#Scale.random) ⇒ <code>object</code>
    * [.allScalesWithDifficulty(difficulty, onlyThisDifficulty)](#Scale.allScalesWithDifficulty) ⇒ <code>Array.&lt;object&gt;</code>
    * [.applyStructureToRoot(root, structure, constrainToBaseOctave)](#Scale.applyStructureToRoot) ⇒ <code>Array.&lt;number&gt;</code>
    * [.allScales()](#Scale.allScales) ⇒ <code>object</code>

<a name="Scale.getScaleFromRoot"></a>

### Scale.getScaleFromRoot(root, structure, constrainToBaseOctave) ⇒ <code>Array.&lt;number&gt;</code>
This function gets an array of integers representing notes of a scale

**Kind**: static method of [<code>Scale</code>](#Scale)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| root | <code>number</code> \| <code>string</code> |  | root from which to build scale |
| structure | <code>Array.&lt;number&gt;</code> |  | array representing the interval relationships for every note from the root (including root) |
| constrainToBaseOctave | <code>boolean</code> | <code>true</code> | Whether to keep notes within base octave [ 0 - 11 ] |

<a name="Scale.random"></a>

### Scale.random(difficulty, onlyThisDifficulty) ⇒ <code>object</code>
Provides a random scale of the given difficulty (or below)

**Kind**: static method of [<code>Scale</code>](#Scale)  
**Returns**: <code>object</code> - scale object with difficulty, mode, category, and structure  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| difficulty | <code>number</code> | <code>4</code> | 0-4 - difficulty of scale candidates |
| onlyThisDifficulty | <code>boolean</code> | <code>false</code> | constrain to the given difficulty, or allow easier scales |

<a name="Scale.allScalesWithDifficulty"></a>

### Scale.allScalesWithDifficulty(difficulty, onlyThisDifficulty) ⇒ <code>Array.&lt;object&gt;</code>
Provides an array of scale objects

**Kind**: static method of [<code>Scale</code>](#Scale)  
**Returns**: <code>Array.&lt;object&gt;</code> - an array of scale objects fitting given difficulty parameters  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| difficulty | <code>number</code> | <code>4</code> | 0-4 - difficulty of scale candidates |
| onlyThisDifficulty | <code>boolean</code> | <code>false</code> | constrain to the given difficulty, or allow easier scales |

<a name="Scale.applyStructureToRoot"></a>

### Scale.applyStructureToRoot(root, structure, constrainToBaseOctave) ⇒ <code>Array.&lt;number&gt;</code>
Takes in a root note, and returns the given structure built from the root

**Kind**: static method of [<code>Scale</code>](#Scale)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| root | <code>number</code> \| <code>string</code> |  | integer 0-11 or alphaNote to build chord from as root |
| structure | <code>Array.&lt;number&gt;</code> |  | array of chord members as chromatic integers from 0 as root |
| constrainToBaseOctave | <code>boolean</code> | <code>true</code> | keep notes within base octave [ 0 - 11 ] |

<a name="Scale.allScales"></a>

### Scale.allScales() ⇒ <code>object</code>
Returns all programmed scales

**Kind**: static method of [<code>Scale</code>](#Scale)  
**Returns**: <code>object</code> - an object containing all known scales  
<a name="Set"></a>

## Set : <code>object</code>
Generate, transpose, and mangle sets of individual notes.

**Kind**: global namespace  

* [Set](#Set) : <code>object</code>
    * [.getNumericNoteSet(root)](#Set.getNumericNoteSet) ⇒ <code>Array.&lt;number&gt;</code>
    * [.random()](#Set.random) ⇒ <code>Array.&lt;number&gt;</code>
    * [.getAlphaNoteSet(root, flatSharpFilter)](#Set.getAlphaNoteSet) ⇒ <code>Array.&lt;string&gt;</code>
    * [.alphaSetToNumeric(alphaNoteSet)](#Set.alphaSetToNumeric) ⇒ <code>Array.&lt;number&gt;</code>
    * [.numericSetToAlpha(alphaNoteSet, flatSharpFilter)](#Set.numericSetToAlpha) ⇒ <code>Array.&lt;string&gt;</code>
    * [.applyStructureToRoot(root, structure, constrainToBaseOctave, alpha, flatSharpFilter)](#Set.applyStructureToRoot) ⇒ <code>Array.&lt;number&gt;</code> \| <code>Array.&lt;string&gt;</code>

<a name="Set.getNumericNoteSet"></a>

### Set.getNumericNoteSet(root) ⇒ <code>Array.&lt;number&gt;</code>
Returns a set of twelve numeric notes, starting on the given root

**Kind**: static method of [<code>Set</code>](#Set)  
**Returns**: <code>Array.&lt;number&gt;</code> - a numeric note set starting on the given root  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| root | <code>number</code> \| <code>string</code> | <code>0</code> | the root note of your desired note set (numeric [0-11] or alpha ['C#']) |

<a name="Set.random"></a>

### Set.random() ⇒ <code>Array.&lt;number&gt;</code>
Returns a set of twelve numeric notes, starting on a random root

**Kind**: static method of [<code>Set</code>](#Set)  
**Returns**: <code>Array.&lt;number&gt;</code> - a numeric note set starting on a random root  
<a name="Set.getAlphaNoteSet"></a>

### Set.getAlphaNoteSet(root, flatSharpFilter) ⇒ <code>Array.&lt;string&gt;</code>
Returns a set of twelve alphaNotes, starting on the given root

**Kind**: static method of [<code>Set</code>](#Set)  
**Returns**: <code>Array.&lt;string&gt;</code> - a set of twelve alpha notes, starting on the given root  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| root | <code>number</code> \| <code>string</code> | <code>0</code> | the root note of your desired note set (numeric [0-11] or alpha ['C#']) |
| flatSharpFilter | <code>string</code> | <code>false</code> | 'b', or '#', will result in 'C#' or 'Db' over 'C#/Db' |

<a name="Set.alphaSetToNumeric"></a>

### Set.alphaSetToNumeric(alphaNoteSet) ⇒ <code>Array.&lt;number&gt;</code>
Converts a set of alphaNotes (['C', 'Db/C#', 'D']) to numeric notes ([0, 1, 2])

**Kind**: static method of [<code>Set</code>](#Set)  
**Returns**: <code>Array.&lt;number&gt;</code> - a numeric note set equivalent to the input alpha note set  

| Param | Type | Description |
| --- | --- | --- |
| alphaNoteSet | <code>Array.&lt;number&gt;</code> | Set of integers between 0 and 11, representing a chromatic note array to convert to alphabetical notes ('C') |

<a name="Set.numericSetToAlpha"></a>

### Set.numericSetToAlpha(alphaNoteSet, flatSharpFilter) ⇒ <code>Array.&lt;string&gt;</code>
Converts a set of numeric notes ([0, 1, 2]) to alphaNotes (['C', 'Db/C#', 'D'])

**Kind**: static method of [<code>Set</code>](#Set)  
**Returns**: <code>Array.&lt;string&gt;</code> - an alpha note set equivalent to the input numeric note set  

| Param | Type | Description |
| --- | --- | --- |
| alphaNoteSet | <code>Array.&lt;number&gt;</code> | Set of integers between 0 and 11, representing a chromatic note array to convert to alphabetical notes ('C') |
| flatSharpFilter | <code>string</code> | 'b', or '#', will result in 'C#' or 'Db' over 'C#/Db' |

<a name="Set.applyStructureToRoot"></a>

### Set.applyStructureToRoot(root, structure, constrainToBaseOctave, alpha, flatSharpFilter) ⇒ <code>Array.&lt;number&gt;</code> \| <code>Array.&lt;string&gt;</code>
Takes in a root note, and returns the given chord structure built from the root

**Kind**: static method of [<code>Set</code>](#Set)  
**Returns**: <code>Array.&lt;number&gt;</code> \| <code>Array.&lt;string&gt;</code> - a set of notes representing the given structure built off given root  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| root | <code>number</code> \| <code>string</code> |  | integer 0-11 or alphaNote to build chord from as root |
| structure | <code>Array.&lt;number&gt;</code> |  | array of chord members representing intervals from the root |
| constrainToBaseOctave | <code>boolean</code> | <code>true</code> | whether to allow notes to extend beyond 11, or transpose to base octave |
| alpha | <code>boolean</code> | <code>false</code> | return chord members as alpha or numeric |
| flatSharpFilter | <code>boolean</code> \| <code>string</code> | <code>false</code> | 'b', or '#', will result in 'C#' or 'Db' over 'C#/Db' |

