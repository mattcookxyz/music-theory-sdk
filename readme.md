# Music Theory SDK

This is a toolkit for note/chord/set parsing, transposition, and enumeration.

This repository is under active development, and the interface should be considered *extremely* unstable. Development help is welcome!

# Classes

There are currently 4 primary classes (some which share relevant functionality) available in this package. All class methods are static.

## **Note**

### **.random( isAlpha = false, flatSharpFilter = false )**

Generates a random note.

<details>
<summary>Arguments...</summary>
<br>

asAlpha [ true | false ]: Whether to return an alphanumeric note ( 'C#' v. 1 )

flatSharpFilter [ 'b' | '#' ]: If present with one of these values, AND the random note generated contains a modifier ( 'b' or '#' ), then it will use only that type of modifier. I.E. if a 'C#/Db' is generated, it would instead only return 'C#' or 'Db'.
</details>

### **.numericNoteToAlpha( numNote, flatSharpFilter )**

Converts a numeric note (10) to alphanumeric ('A#/Bb').

<details>
<summary>Arguments...</summary>
<br>

numNote [ number ]: A numeric note to convert. If the value is greater than 11, it will be transposed down however many octaves until it is <= 11.

flatSharpFilter [ 'b', '#' ]: If this arg is present with one of these values, AND the note converts to one with a modifier ( 'b' or '#' ), then it will use only that type of modifier. I.E. if a 'C#/Db' results, it will instead only return 'C#' or 'Db'.
</details>

## More API documentation coming soon. Feel free to dig through the code in the meantime. It is well-documented in-line in JSDoc format.