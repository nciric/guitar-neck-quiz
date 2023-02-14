// Extra data to help with drawing.
type NoteData = {
    // String name.
    note: string;
    // Position of the note on the staff.
    pos: number;
    // Is it sharp/flat or not.
    sharp: boolean;
}

// We have 6 strings, E-A-D-G-B-E and will use
// first 11 frets + open notes (12th fret == open note).
// Usually the first string starts on high E.
const NOTE_MATRIX: NoteData[][] = [
    [{ note: 'E', pos: 14, sharp: false }, { note: 'F', pos: 15, sharp: false }, { note: 'F#/Gb', pos: 15, sharp: true }, { note: 'G', pos: 16, sharp: false },
    { note: 'G#/Ab', pos: 16, sharp: true }, { note: 'A', pos: 17, sharp: false }, { note: 'A#/Bb', pos: 17, sharp: true }, { note: 'B', pos: 18, sharp: false },
    { note: 'C', pos: 19, sharp: false }, { note: 'C#/Db', pos: 19, sharp: true }, { note: 'D', pos: 20, sharp: false }, { note: 'D#/Eb', pos: 20, sharp: true }
    ],
    [{ note: 'B', pos: 11, sharp: false }, { note: 'C', pos: 12, sharp: false }, { note: 'C#/Db', pos: 12, sharp: true }, { note: 'D', pos: 13, sharp: false },
    { note: 'D#/Eb', pos: 13, sharp: true }, { note: 'E', pos: 14, sharp: false }, { note: 'F', pos: 15, sharp: false }, { note: 'F#/Gb', pos: 15, sharp: true },
    { note: 'G', pos: 16, sharp: false }, { note: 'G#/Ab', pos: 16, sharp: true }, { note: 'A', pos: 17, sharp: false }, { note: 'A#/Bb', pos: 17, sharp: true }
    ],
    [{ note: 'G', pos: 9, sharp: false }, { note: 'G#/Ab', pos: 9, sharp: true }, { note: 'A', pos: 10, sharp: false }, { note: 'A#/Bb', pos: 10, sharp: true },
    { note: 'B', pos: 11, sharp: false }, { note: 'C', pos: 12, sharp: false }, { note: 'C#/Db', pos: 12, sharp: true }, { note: 'D', pos: 13, sharp: false },
    { note: 'D#/Eb', pos: 13, sharp: true }, { note: 'E', pos: 14, sharp: false }, { note: 'F', pos: 15, sharp: false }, { note: 'F#/Gb', pos: 15, sharp: true }
    ],
    [{ note: 'D', pos: 6, sharp: false }, { note: 'D#/Eb', pos: 6, sharp: true }, { note: 'E', pos: 7, sharp: false }, { note: 'F', pos: 8, sharp: false },
    { note: 'F#/Gb', pos: 8, sharp: true }, { note: 'G', pos: 9, sharp: false }, { note: 'G#/Ab', pos: 9, sharp: true }, { note: 'A', pos: 10, sharp: false },
    { note: 'A#/Bb', pos: 10, sharp: true }, { note: 'B', pos: 11, sharp: false }, { note: 'C', pos: 12, sharp: false }, { note: 'C#/Db', pos: 12, sharp: true }
    ],
    [{ note: 'A', pos: 3, sharp: false }, { note: 'A#/Bb', pos: 3, sharp: true }, { note: 'B', pos: 4, sharp: false }, { note: 'C', pos: 5, sharp: false },
    { note: 'C#/Db', pos: 5, sharp: true }, { note: 'D', pos: 6, sharp: false }, { note: 'D#/Eb', pos: 6, sharp: true }, { note: 'E', pos: 7, sharp: false },
    { note: 'F', pos: 8, sharp: false }, { note: 'F#/Gb', pos: 8, sharp: true }, { note: 'G', pos: 9, sharp: false }, { note: 'G#/Ab', pos: 9, sharp: true }
    ],
    [{ note: 'E', pos: 0, sharp: false }, { note: 'F', pos: 1, sharp: false }, { note: 'F#/Gb', pos: 1, sharp: true }, { note: 'G', pos: 2, sharp: false },
    { note: 'G#/Ab', pos: 2, sharp: true }, { note: 'A', pos: 3, sharp: false }, { note: 'A#/Bb', pos: 3, sharp: true }, { note: 'B', pos: 4, sharp: false },
    { note: 'C', pos: 5, sharp: false }, { note: 'C#/Db', pos: 5, sharp: true }, { note: 'D', pos: 6, sharp: false }, { note: 'D#/Eb', pos: 6, sharp: true }
    ]
];

// Number of strings.
const STRING_COUNT = 6;

// Number of frets (including open string)
const FRET_COUNT = 12;

// Standard font for the app.
const FONT = '24px serif';

// Note info related to guitar strings.
type NoteInfo = {
    string_index: number;
    string_name: string;
    note_index: number;
    note_name: string;
}

// For calculation of clicks.
let g_string_step: number;
let g_fret_step: number;
let g_startx: number;
let g_starty: number;
let g_line_length: number;

// Pick a note on a string for a user to find.
function randomlyPickNote(): NoteInfo {
    const string_index: number = randomIntFromInterval_(0, 5);
    const note_index: number = randomIntFromInterval_(0, 11);

    const string_name: string = NOTE_MATRIX[string_index][0].note;
    const note_name: string = NOTE_MATRIX[string_index][note_index].note;

    return { string_index, string_name, note_index, note_name };
}

function drawNoteInfo() {
    const note_info_canvas = document.getElementById('note-info') as HTMLCanvasElement;
    if (note_info_canvas == null) return;

    const ctx = note_info_canvas.getContext('2d');
    if (ctx == null) return;

    const note_info = randomlyPickNote();

    drawStrings(ctx, note_info);
    drawNote(ctx, note_info);

    ctx.textAlign = 'center';
    ctx.fillText('Press any key for a new note', ctx.canvas.width / 2, 30);

    // Add page refresh handler.
    window.addEventListener('keypress', function(event){
        window.location.reload();
        return false;
    }, true);

    // Add a click handler.
    note_info_canvas.addEventListener('click', function (event) {
        const click_x = event.pageX - (note_info_canvas.offsetLeft + note_info_canvas.clientLeft);
        const click_y = event.pageY - (note_info_canvas.offsetTop + note_info_canvas.clientTop);

        const result = clickResult_(click_x, click_y, note_info);
        if (result == null) return;

        ctx.fillText('✓', result[0], result[1] + 8);

        if (result[2] != -1) {
            ctx.fillText('✘', result[2], result[3] + 8);
        }
    }, false);
}

// Draw all 6 strings, put names at the begining and paint selected string thicker.
function drawStrings(ctx: CanvasRenderingContext2D, note_info: NoteInfo) {
    const width = ctx.canvas.width;
    const height = ctx.canvas.height;

    const step = Math.floor(height * 0.5 / STRING_COUNT);
    g_string_step = step;

    const margin = 30;

    let startx = 2 * margin;
    g_startx = startx;

    let starty = margin * 2;
    g_starty = starty;

    const line_length = width - 3 * margin;
    g_line_length = line_length;

    ctx.font = FONT;
    ctx.textAlign = 'center';

    // Save it for frets.
    const original_y = starty;

    for (let i = 0; i < STRING_COUNT; i++) {
        // This is a trial and error positioning. Nothing magical, depends on the font size and type.
        ctx.fillText(NOTE_MATRIX[i][0].note, margin, starty + 8);
        // Draw the lines now.
        ctx.beginPath();
        ctx.moveTo(startx, starty);
        ctx.lineTo(startx + line_length, starty);
        ctx.stroke();
        starty += step;
    }

    // Draw frets.
    const fret_height = step * 5;

    const step_x = line_length / FRET_COUNT;
    g_fret_step = step_x;

    const original_x = startx;
    ctx.lineWidth = 1;
    for (let i = 0; i < FRET_COUNT; i++) {
        ctx.beginPath();
        ctx.moveTo(startx, original_y);
        ctx.lineTo(startx, original_y + fret_height);
        ctx.stroke();
        startx += step_x;
    }

    // Draw clickable dots on one string.
    const radius = step / 5;
    for (let x = 0; x < FRET_COUNT; x++) {
        ctx.beginPath();
        ctx.arc(original_x + x * step_x, original_y + note_info.string_index * step, radius, 0, 2 * Math.PI, true);
        ctx.stroke();
        ctx.beginPath();
        ctx.fillStyle = 'white';
        ctx.arc(original_x + x * step_x, original_y + note_info.string_index * step, radius - 1, 0, 2 * Math.PI, true);
        ctx.fill();
    }
}

function drawNote(ctx: CanvasRenderingContext2D, note_info: NoteInfo) {
    ctx.fillStyle = 'black';
    const width = ctx.canvas.width;
    const height = ctx.canvas.height;
    const margin = 40;
    const line_length = width - 2 * margin;
    let startx = margin;
    let starty = margin + height / 2;

    ctx.font = FONT;
    ctx.textAlign = 'center';
    ctx.fillText('Click on a circle above to find: ' + note_info.note_name, width / 2, starty);

    // Staff + ledger lines = 12
    const step = Math.floor(height * 0.5 / 14);
    ctx.lineWidth = 1;
    const font_size = 30;
    starty += font_size;

    // Draw treble clef key from image.
    const clef_image = new Image();
    clef_image.onload = drawClefImage;
    clef_image.src = 'treble-clef.webp';
    function drawClefImage() {
        ctx.drawImage(this, margin / 2, original_y + 60);
    };

    // Keep it around if we need to draw ladger lines.
    const original_y = starty;
    // Skip 3 ledger lines.
    starty += 3 * step;
    for (let i = 0; i < 5; i++) {
        ctx.beginPath();
        ctx.moveTo(startx, starty);
        ctx.lineTo(startx + line_length, starty);
        ctx.stroke();
        starty += step;
    }

    // Draw ledger lines if necessary.
    // TODO: only draw necessary ledger lines, e.g. at or above the note.
    const ledger_length = width / 5;
    const note_data = NOTE_MATRIX[note_info.string_index][note_info.note_index];
    let draw_ledger = false;
    if (note_data.pos <= 6) {
        startx = 3 * margin;  // To avoid clef.
        starty = original_y + (3 + 5) * step;  // To skip staff part.
        draw_ledger = true;
    } else if (note_data.pos >= 17) {
        startx = startx + line_length - ledger_length;
        starty = original_y;
        draw_ledger = true;
    } else {
        startx = width / 2 - ledger_length;
    }

    if (draw_ledger == true) {
        for (let y = 0; y < 3; y++) {
            ctx.beginPath()
            ctx.moveTo(startx, starty);
            ctx.lineTo(startx + ledger_length, starty);
            ctx.stroke();
            starty += step;
        }
    }

    // Draw note.
    console.log(note_data);
    ctx.beginPath();
    startx += ledger_length / 2;
    starty = original_y + (22 - note_data.pos - 1) * step/2;
    ctx.ellipse(startx, starty, step / 2 + 2, step / 2, 0, 0, 2 * Math.PI);
    ctx.fill();

    // Draw sharp if needed.
    if (note_data.sharp == true) {
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(startx + step / 2 + 5, starty - step / 4);
        ctx.lineTo(startx + step / 2 + 5 + step, starty - step / 4 - 1);
        ctx.moveTo(startx + step / 2 + 5, starty + step / 4);
        ctx.lineTo(startx + step / 2 + 5 + step, starty + step / 4 - 1);

        ctx.moveTo(startx + step / 2 + 5 + step / 4, starty - step / 2);
        ctx.lineTo(startx + step / 2 + 5 + step / 4, starty + step / 2);
        ctx.moveTo(startx + step / 2 + 5 + 3 * step / 4 - 1, starty - step / 2);
        ctx.lineTo(startx + step / 2 + 5 + 3 * step / 4 - 1, starty + step / 2);

        ctx.stroke();
        ctx.lineWidth = 1;
    }
}

// Returns a random number in [min, max] range.
function randomIntFromInterval_(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

// Returns an array of [correct_x, correct_y, incorrect_x, incorrect_y]
// Incorrect_[x|y] can be -1 in case of a correct click.
// In case user clicked outside of circles we return null.
function clickResult_(x: number, y:number, note_info: NoteInfo) {
    const string_y = g_starty + note_info.string_index * g_string_step;
    const string_x = g_startx + note_info.note_index * g_fret_step;

    let distance = Math.sqrt(Math.pow(string_x - x, 2) + Math.pow(string_y - y, 2));
    const radius = g_string_step / 5;
    if (distance <= radius) return [string_x, string_y, -1, -1];

    // Find which one user selected.
    for (let i = 0; i < FRET_COUNT; i++) {
        distance = Math.sqrt(Math.pow(g_startx + i * g_fret_step - x, 2) + Math.pow(string_y - y, 2));
        if (distance <= radius) return [string_x, string_y, g_startx + i * g_fret_step, string_y];        
    }

    return null;
}