// We have 6 strings, E-A-D-G-B-E and will use
// first 11 frets + open notes (12th fret == open note).
// Usually the first string starts on high E.
const NOTE_MATRIX: string[][] = [
    [ 'E', 'F', 'F#/Gb', 'G', 'G#/Ab', 'A', 'A#/Bb', 'B', 'C', 'C#/Db', 'D', 'D#/Eb' ],
    [ 'B', 'C', 'C#/Db', 'D', 'D#/Eb', 'E', 'F', 'F#/Gb', 'G', 'G#/Ab', 'A', 'A#/Bb' ],
    [ 'G', 'G#/Ab', 'A', 'A#/Bb', 'B', 'C', 'C#/Db', 'D', 'D#/Eb', 'E', 'F', 'F#/Gb' ],
    [ 'D', 'D#/Eb', 'E', 'F', 'F#/Gb', 'G', 'G#/Ab', 'A', 'A#/Bb', 'B', 'C', 'C#/Db' ],
    [ 'A', 'A#/Bb', 'B', 'C', 'C#/Db', 'D', 'D#/Eb', 'E', 'F', 'F#/Gb', 'G', 'G#/Ab' ],
    [ 'E', 'F', 'F#/Gb', 'G', 'G#/Ab', 'A', 'A#/Bb', 'B', 'C', 'C#/Db', 'D', 'D#/Eb' ]
];

// Pick a note on a string for a user to find.
function randomlyPickNote(): object {
    const string_index: number = randomIntFromInterval_(0, 5);
    const note_index: number = randomIntFromInterval_(0, 12);

    const string_name: string = NOTE_MATRIX[string_index][0];
    const note_name: string = NOTE_MATRIX[string_index][note_index];

    return {string_index, string_name, note_index, note_name};
}

// Returns a random number in [min, max] range.
function randomIntFromInterval_(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1) + min)
}