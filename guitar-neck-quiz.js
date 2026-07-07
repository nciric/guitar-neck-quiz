// Guitar Neck Quiz - Game Logic
// Supports color-blind friendly markers, multiple selection, and settings.

const NOTE_DEFS = {
  52: { midi: 52, spellings: [{ name: "E", octave: 3, index: -7, accidental: "none" }] },
  53: { midi: 53, spellings: [{ name: "F", octave: 3, index: -6, accidental: "none" }] },
  54: { midi: 54, spellings: [
    { name: "F#", octave: 3, index: -6, accidental: "sharp" },
    { name: "Gb", octave: 3, index: -5, accidental: "flat" }
  ] },
  55: { midi: 55, spellings: [{ name: "G", octave: 3, index: -5, accidental: "none" }] },
  56: { midi: 56, spellings: [
    { name: "G#", octave: 3, index: -5, accidental: "sharp" },
    { name: "Ab", octave: 3, index: -4, accidental: "flat" }
  ] },
  57: { midi: 57, spellings: [{ name: "A", octave: 3, index: -4, accidental: "none" }] },
  58: { midi: 58, spellings: [
    { name: "A#", octave: 3, index: -4, accidental: "sharp" },
    { name: "Bb", octave: 3, index: -3, accidental: "flat" }
  ] },
  59: { midi: 59, spellings: [{ name: "B", octave: 3, index: -3, accidental: "none" }] },
  60: { midi: 60, spellings: [{ name: "C", octave: 4, index: -2, accidental: "none" }] },
  61: { midi: 61, spellings: [
    { name: "C#", octave: 4, index: -2, accidental: "sharp" },
    { name: "Db", octave: 4, index: -1, accidental: "flat" }
  ] },
  62: { midi: 62, spellings: [{ name: "D", octave: 4, index: -1, accidental: "none" }] },
  63: { midi: 63, spellings: [
    { name: "D#", octave: 4, index: -1, accidental: "sharp" },
    { name: "Eb", octave: 4, index: 0, accidental: "flat" }
  ] },
  64: { midi: 64, spellings: [{ name: "E", octave: 4, index: 0, accidental: "none" }] },
  65: { midi: 65, spellings: [{ name: "F", octave: 4, index: 1, accidental: "none" }] },
  66: { midi: 66, spellings: [
    { name: "F#", octave: 4, index: 1, accidental: "sharp" },
    { name: "Gb", octave: 4, index: 2, accidental: "flat" }
  ] },
  67: { midi: 67, spellings: [{ name: "G", octave: 4, index: 2, accidental: "none" }] },
  68: { midi: 68, spellings: [
    { name: "G#", octave: 4, index: 2, accidental: "sharp" },
    { name: "Ab", octave: 4, index: 3, accidental: "flat" }
  ] },
  69: { midi: 69, spellings: [{ name: "A", octave: 4, index: 3, accidental: "none" }] },
  70: { midi: 70, spellings: [
    { name: "A#", octave: 4, index: 3, accidental: "sharp" },
    { name: "Bb", octave: 4, index: 4, accidental: "flat" }
  ] },
  71: { midi: 71, spellings: [{ name: "B", octave: 4, index: 4, accidental: "none" }] },
  72: { midi: 72, spellings: [{ name: "C", octave: 5, index: 5, accidental: "none" }] },
  73: { midi: 73, spellings: [
    { name: "C#", octave: 5, index: 5, accidental: "sharp" },
    { name: "Db", octave: 5, index: 6, accidental: "flat" }
  ] },
  74: { midi: 74, spellings: [{ name: "D", octave: 5, index: 6, accidental: "none" }] },
  75: { midi: 75, spellings: [
    { name: "D#", octave: 5, index: 6, accidental: "sharp" },
    { name: "Eb", octave: 5, index: 7, accidental: "flat" }
  ] },
  76: { midi: 76, spellings: [{ name: "E", octave: 5, index: 7, accidental: "none" }] },
  77: { midi: 77, spellings: [{ name: "F", octave: 5, index: 8, accidental: "none" }] },
  78: { midi: 78, spellings: [
    { name: "F#", octave: 5, index: 8, accidental: "sharp" },
    { name: "Gb", octave: 5, index: 9, accidental: "flat" }
  ] },
  79: { midi: 79, spellings: [{ name: "G", octave: 5, index: 9, accidental: "none" }] },
  80: { midi: 80, spellings: [
    { name: "G#", octave: 5, index: 9, accidental: "sharp" },
    { name: "Ab", octave: 5, index: 10, accidental: "flat" }
  ] },
  81: { midi: 81, spellings: [{ name: "A", octave: 5, index: 10, accidental: "none" }] },
  82: { midi: 82, spellings: [
    { name: "A#", octave: 5, index: 10, accidental: "sharp" },
    { name: "Bb", octave: 5, index: 11, accidental: "flat" }
  ] },
  83: { midi: 83, spellings: [{ name: "B", octave: 5, index: 11, accidental: "none" }] },
  84: { midi: 84, spellings: [{ name: "C", octave: 6, index: 12, accidental: "none" }] },
  85: { midi: 85, spellings: [
    { name: "C#", octave: 6, index: 12, accidental: "sharp" },
    { name: "Db", octave: 6, index: 13, accidental: "flat" }
  ] },
  86: { midi: 86, spellings: [{ name: "D", octave: 6, index: 13, accidental: "none" }] },
  87: { midi: 87, spellings: [
    { name: "D#", octave: 6, index: 13, accidental: "sharp" },
    { name: "Eb", octave: 6, index: 14, accidental: "flat" }
  ] },
  88: { midi: 88, spellings: [{ name: "E", octave: 6, index: 14, accidental: "none" }] }
};

const STRING_ROOT_MIDIS = [76, 71, 67, 62, 57, 52]; // High E to Low E
const STRING_NAMES = ["E", "B", "G", "D", "A", "E"];

// Layout constants for Canvas
const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 600;

// Fretboard layout
const FB_X_START = 80;
const FB_X_END = 750;
const FB_Y_START = 40;
const FB_Y_STEP = 30; // Spacing between strings
const FB_HEIGHT = FB_Y_STEP * 5;
const FB_Y_END = FB_Y_START + FB_HEIGHT;

// Staff layout
const STAFF_X_START = 150;
const STAFF_X_END = 650;
const STAFF_Y_START = 400; // E4 line will be below this
const STAFF_LINE_STEP = 12;
const STAFF_E4_Y = STAFF_Y_START + 4 * STAFF_LINE_STEP; // Y coordinate for E4 line

// Game State
let currentTarget = null;
let userSelections = new Set(); // "string-fret"
let gameState = "guessing"; // "guessing" | "checked"
let score = { correct: 0, total: 0 };
let streak = 0;

// Audio
let audioCtx = null;
const clefImage = new Image();
let clefLoaded = false;
clefImage.onload = () => {
  clefLoaded = true;
  draw();
};
clefImage.src = 'treble-clef.webp';

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  setupEventListeners();
  loadNewChallenge();
});

function setupEventListeners() {
  const canvas = document.getElementById("note-info");
  canvas.addEventListener("click", handleCanvasClick);

  document.getElementById("btn-check").addEventListener("click", checkAnswers);
  document.getElementById("btn-next").addEventListener("click", loadNewChallenge);

  document.getElementById("setting-octave").addEventListener("change", () => {
    updateTargetDisplay();
    draw();
  });
  document.getElementById("setting-accidentals").addEventListener("change", loadNewChallenge);
}

// Logarithmic fret X calculation
function getFretX(fretNum) {
  if (fretNum === 0) return FB_X_START;
  const ratio = (1 - Math.pow(2, -fretNum / 12)) / 0.5;
  return FB_X_START + (FB_X_END - FB_X_START) * ratio;
}

// Draw everything
function draw() {
  const canvas = document.getElementById("note-info");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  drawFretboard(ctx);
  drawStaff(ctx);
  drawInstructions(ctx);
}

function drawFretboard(ctx) {
  // Neck background
  ctx.fillStyle = "#2e1f15";
  ctx.fillRect(FB_X_START - 20, FB_Y_START - 10, (FB_X_END - FB_X_START) + 40, FB_HEIGHT + 20);

  // Fret markers (dots)
  const singleMarkers = [3, 5, 7, 9];
  ctx.fillStyle = "#e5e0d8";
  singleMarkers.forEach(f => {
    const x = (getFretX(f - 1) + getFretX(f)) / 2;
    const y = FB_Y_START + FB_HEIGHT / 2;
    ctx.beginPath();
    ctx.arc(x, y, 6, 0, 2 * Math.PI);
    ctx.fill();
  });

  // Double marker at fret 12
  const x12 = (getFretX(11) + getFretX(12)) / 2;
  ctx.beginPath();
  ctx.arc(x12, FB_Y_START + FB_Y_STEP * 1.5, 5, 0, 2 * Math.PI);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(x12, FB_Y_START + FB_Y_STEP * 3.5, 5, 0, 2 * Math.PI);
  ctx.fill();

  // Frets
  for (let i = 0; i <= 12; i++) {
    const x = getFretX(i);
    ctx.beginPath();
    ctx.moveTo(x, FB_Y_START - 5);
    ctx.lineTo(x, FB_Y_END + 5);
    if (i === 0) {
      ctx.strokeStyle = "#f5f2eb"; // Nut
      ctx.lineWidth = 5;
    } else {
      ctx.strokeStyle = "#c8b9a6"; // Fret wire
      ctx.lineWidth = 2;
    }
    ctx.stroke();
  }

  // Strings
  const stringWidths = [1.5, 2, 2.5, 3, 3.5, 4.5];
  for (let s = 0; s < 6; s++) {
    const y = FB_Y_START + s * FB_Y_STEP;
    ctx.beginPath();
    ctx.moveTo(FB_X_START - 10, y);
    ctx.lineTo(FB_X_END + 10, y);
    ctx.strokeStyle = "#bbbbbb";
    ctx.lineWidth = stringWidths[s];
    ctx.stroke();

    // String Names at the start
    ctx.fillStyle = "#aaaaaa";
    ctx.font = "14px sans-serif";
    ctx.textAlign = "right";
    ctx.textBaseline = "middle";
    ctx.fillText(STRING_NAMES[s], FB_X_START - 25, y);
  }

  // Interactive targets / selections
  for (let s = 0; s < 6; s++) {
    const y = FB_Y_START + s * FB_Y_STEP;
    for (let f = 0; f <= 12; f++) {
      let x;
      if (f === 0) {
        x = FB_X_START - 15; // slightly left of nut for open string
      } else {
        x = (getFretX(f - 1) + getFretX(f)) / 2;
      }

      const key = `${s}-${f}`;
      const isSelected = userSelections.has(key);

      if (gameState === "guessing") {
        if (isSelected) {
          drawSelectedMarker(ctx, x, y);
        }
      } else if (gameState === "checked") {
        const correctPositions = getCorrectPositions();
        const isCorrect = correctPositions.includes(key);

        if (isSelected && isCorrect) {
          drawFeedbackMarker(ctx, x, y, "correct");
        } else if (isSelected && !isCorrect) {
          drawFeedbackMarker(ctx, x, y, "incorrect");
        } else if (!isSelected && isCorrect) {
          drawFeedbackMarker(ctx, x, y, "missed");
        }
      }
    }
  }
}

// Color-blind friendly markers
function drawSelectedMarker(ctx, x, y) {
  ctx.fillStyle = "#ffc107"; // Yellow
  ctx.strokeStyle = "#ff9800";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(x, y, 10, 0, 2 * Math.PI);
  ctx.fill();
  ctx.stroke();
}

function drawFeedbackMarker(ctx, x, y, type) {
  ctx.font = "bold 14px sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  if (type === "correct") {
    // Green circle + Checkmark
    ctx.fillStyle = "#28a745";
    ctx.beginPath();
    ctx.arc(x, y, 12, 0, 2 * Math.PI);
    ctx.fill();
    ctx.fillStyle = "white";
    ctx.fillText("✓", x, y);
  } else if (type === "incorrect") {
    // Red circle + Cross
    ctx.fillStyle = "#dc3545";
    ctx.beginPath();
    ctx.arc(x, y, 12, 0, 2 * Math.PI);
    ctx.fill();
    ctx.fillStyle = "white";
    ctx.fillText("✗", x, y);
  } else if (type === "missed") {
    // Blue dashed circle
    ctx.strokeStyle = "#00d2ff";
    ctx.lineWidth = 2;
    ctx.setLineDash([4, 2]);
    ctx.beginPath();
    ctx.arc(x, y, 12, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.setLineDash([]); // Reset
  }
}

function drawStaff(ctx) {
  // 5 Lines
  ctx.strokeStyle = "#e0e0e0";
  ctx.lineWidth = 1;
  for (let i = 0; i < 5; i++) {
    const y = STAFF_Y_START + i * STAFF_LINE_STEP;
    ctx.beginPath();
    ctx.moveTo(STAFF_X_START, y);
    ctx.lineTo(STAFF_X_END, y);
    ctx.stroke();
  }

  // Draw Clef
  if (clefLoaded) {
    ctx.filter = 'invert(1)';
    ctx.drawImage(clefImage, STAFF_X_START + 10, STAFF_Y_START - 15, 45, 110);
    ctx.filter = 'none';
  }

  if (!currentTarget) return;

  const spelling = currentTarget.spelling;
  const index = spelling.index;
  const accidental = spelling.accidental;

  // Note Y coordinate relative to E4
  const noteY = STAFF_E4_Y - index * (STAFF_LINE_STEP / 2);
  const noteX = STAFF_X_START + 150; // Position note after the clef

  // Draw ledger lines
  ctx.strokeStyle = "#ffffff";
  ctx.lineWidth = 1.5;
  if (index < 0) {
    const startLedger = -2;
    const targetLedger = (index % 2 === 0) ? index : index + 1;
    for (let l = startLedger; l >= targetLedger; l -= 2) {
      const ly = STAFF_E4_Y - l * (STAFF_LINE_STEP / 2);
      ctx.beginPath();
      ctx.moveTo(noteX - 18, ly);
      ctx.lineTo(noteX + 18, ly);
      ctx.stroke();
    }
  } else if (index > 8) {
    const startLedger = 10;
    const targetLedger = (index % 2 === 0) ? index : index - 1;
    for (let l = startLedger; l <= targetLedger; l += 2) {
      const ly = STAFF_E4_Y - l * (STAFF_LINE_STEP / 2);
      ctx.beginPath();
      ctx.moveTo(noteX - 18, ly);
      ctx.lineTo(noteX + 18, ly);
      ctx.stroke();
    }
  }

  // Draw note head
  ctx.fillStyle = "#ffffff";
  ctx.beginPath();
  ctx.ellipse(noteX, noteY, 9, 6, -15 * Math.PI / 180, 0, 2 * Math.PI);
  ctx.fill();

  // Stem
  ctx.strokeStyle = "#ffffff";
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  const stemLength = 40;
  if (index >= 4) {
    // Stem down
    ctx.moveTo(noteX - 8, noteY);
    ctx.lineTo(noteX - 8, noteY + stemLength);
  } else {
    // Stem up
    ctx.moveTo(noteX + 8, noteY);
    ctx.lineTo(noteX + 8, noteY - stemLength);
  }
  ctx.stroke();

  // Accidental
  if (accidental && accidental !== "none") {
    ctx.fillStyle = "#ffffff";
    ctx.font = "24px sans-serif";
    ctx.textAlign = "right";
    ctx.textBaseline = "middle";
    const symbol = accidental === "sharp" ? "♯" : "♭";
    ctx.fillText(symbol, noteX - 15, noteY);
  }
}

function drawInstructions(ctx) {
  if (!currentTarget) return;
  
  const isOctaveSensitive = document.getElementById("setting-octave").checked;
  const spelling = currentTarget.spelling;
  const noteName = isOctaveSensitive ? `${spelling.name}${spelling.octave}` : spelling.name;

  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 24px sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(`Find all positions for: ${noteName}`, CANVAS_WIDTH / 2, 270);

  ctx.fillStyle = "#aaaaaa";
  ctx.font = "16px sans-serif";
  if (gameState === "guessing") {
     ctx.fillText("Click on the neck to select positions. Click 'Check Answers' when done.", CANVAS_WIDTH / 2, 310);
  } else {
     ctx.fillText("Results displayed. Click 'Next Note' to continue.", CANVAS_WIDTH / 2, 310);
  }
}

// Click handling
function handleCanvasClick(event) {
  if (gameState !== "guessing") return;

  const canvas = document.getElementById("note-info");
  const rect = canvas.getBoundingClientRect();
  
  const scaleX = canvas.width / rect.width;
  const scaleY = canvas.height / rect.height;
  
  const clickX = (event.clientX - rect.left) * scaleX;
  const clickY = (event.clientY - rect.top) * scaleY;

  // Check if click is on fretboard
  if (clickY >= FB_Y_START - 15 && clickY <= FB_Y_END + 15 && clickX >= FB_X_START - 20 && clickX <= FB_X_END + 20) {
    const stringIdx = Math.round((clickY - FB_Y_START) / FB_Y_STEP);
    if (stringIdx < 0 || stringIdx > 5) return;

    let fretIdx = -1;
    // Open string hit box (left of nut)
    if (clickX < FB_X_START) {
       const y = FB_Y_START + stringIdx * FB_Y_STEP;
       const x = FB_X_START - 15;
       const dist = Math.sqrt((x-clickX)**2 + (y-clickY)**2);
       if (dist < 20) {
           fretIdx = 0;
       }
    }
    
    if (fretIdx === -1) {
        for (let f = 1; f <= 12; f++) {
          const prevX = getFretX(f - 1);
          const currX = getFretX(f);
          const x = (prevX + currX) / 2;
          const y = FB_Y_START + stringIdx * FB_Y_STEP;
          
          if (clickX >= prevX && clickX <= currX && clickY >= y - 15 && clickY <= y + 15) {
             fretIdx = f;
             break;
          }
        }
    }

    if (fretIdx !== -1) {
      toggleSelection(stringIdx, fretIdx);
    }
  }
}

function toggleSelection(string, fret) {
  const key = `${string}-${fret}`;
  if (userSelections.has(key)) {
    userSelections.delete(key);
  } else {
    userSelections.add(key);
    playSynth(STRING_ROOT_MIDIS[string] + fret);
  }
  draw();
}

function getCorrectPositions() {
  if (!currentTarget) return [];
  const octaveSensitive = document.getElementById("setting-octave").checked;
  const correct = [];

  for (let s = 0; s < 6; s++) {
    const root = STRING_ROOT_MIDIS[s];
    for (let f = 0; f <= 12; f++) {
      const midi = root + f;
      if (octaveSensitive) {
        if (midi === currentTarget.midi) {
          correct.push(`${s}-${f}`);
        }
      } else {
        if (midi % 12 === currentTarget.midi % 12) {
          correct.push(`${s}-${f}`);
        }
      }
    }
  }
  return correct;
}

function checkAnswers() {
  if (gameState !== "guessing") return;
  gameState = "checked";

  const correctPositions = getCorrectPositions();
  let correctCount = 0;
  let incorrectCount = 0;

  userSelections.forEach(key => {
    if (correctPositions.includes(key)) {
      correctCount++;
    } else {
      incorrectCount++;
    }
  });

  const missedCount = correctPositions.length - correctCount;
  const isPerfect = (incorrectCount === 0 && missedCount === 0);

  score.total++;
  if (isPerfect) {
    score.correct++;
    streak++;
  } else {
    streak = 0;
  }

  document.getElementById("score-val").textContent = `${score.correct}/${score.total}`;
  document.getElementById("streak-val").textContent = streak;

  document.getElementById("btn-check").disabled = true;
  document.getElementById("btn-next").disabled = false;

  draw();
}

function loadNewChallenge() {
  gameState = "guessing";
  userSelections.clear();

  const includeAccidentals = document.getElementById("setting-accidentals").checked;
  
  const eligibleKeys = Object.keys(NOTE_DEFS).filter(k => {
    const def = NOTE_DEFS[k];
    if (includeAccidentals) return true;
    return def.spellings.some(s => s.accidental === "none");
  });

  const randomKey = eligibleKeys[Math.floor(Math.random() * eligibleKeys.length)];
  const selectedDef = NOTE_DEFS[randomKey];

  let spellings = selectedDef.spellings;
  if (!includeAccidentals) {
    spellings = spellings.filter(s => s.accidental === "none");
  }
  const spelling = spellings[Math.floor(Math.random() * spellings.length)];

  currentTarget = {
    midi: selectedDef.midi,
    spelling: spelling
  };

  updateTargetDisplay();
  draw();

  document.getElementById("btn-check").disabled = false;
  document.getElementById("btn-next").disabled = true;
}

function updateTargetDisplay() {
  // Logic handled in drawInstructions
}

// Synth
function playSynth(midi) {
  if (!document.getElementById("setting-sound").checked) return;

  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (audioCtx.state === "suspended") {
    audioCtx.resume();
  }

  const freq = 440 * Math.pow(2, (midi - 69) / 12);
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();

  osc.type = "triangle";
  osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

  gain.gain.setValueAtTime(0.2, audioCtx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.8);

  osc.connect(gain);
  gain.connect(audioCtx.destination);

  osc.start();
  osc.stop(audioCtx.currentTime + 0.8);
}
