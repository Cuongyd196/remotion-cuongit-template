/**
 * Synthesizes the sound effects in public/sfx from math, so the files have no
 * third-party license. Output is deterministic: same code, same files.
 *
 * Run: npx tsx scripts/generate-sfx.ts
 */
import * as fs from "fs";
import * as path from "path";

const SAMPLE_RATE = 44100;
const PEAK = 0.8;
const EDGE_SEC = 0.002;

// Small seeded random generator (mulberry32), so noise is the same on every run.
const seededRandom = (seed: number) => () => {
  seed = (seed + 0x6d2b79f5) | 0;
  let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};

const render = (seconds: number, sampleAt: (t: number, progress: number) => number): Float64Array => {
  const out = new Float64Array(Math.round(seconds * SAMPLE_RATE));
  out.forEach((_, i) => {
    out[i] = sampleAt(i / SAMPLE_RATE, i / out.length);
  });
  return out;
};

// Two soft wooden mallet notes rising from E5 to A5.
const mallet = () =>
  render(0.32, (t) =>
    [659.25, 880].reduce((sum, frequency, i) => {
      const local = t - i * 0.07;
      if (local < 0) return sum;
      const body = Math.sin(2 * Math.PI * frequency * local) * Math.exp(-14 * local);
      const strike = 0.25 * Math.sin(2 * Math.PI * frequency * 4 * local) * Math.exp(-40 * local);
      return sum + body + strike;
    }, 0),
  );

const pop = () => {
  let phase = 0;
  return render(0.09, (_, p) => {
    phase += (2 * Math.PI * (880 * (1 - p) + 240)) / SAMPLE_RATE;
    return Math.sin(phase) * Math.exp(-5 * p);
  });
};

const tick = () => {
  const random = seededRandom(11);
  return render(0.03, (t, p) => (0.7 * Math.sin(2 * Math.PI * 1900 * t) + 0.3 * (random() * 2 - 1)) * Math.exp(-7 * p));
};

const bell = (t: number, frequency: number) => (Math.sin(2 * Math.PI * frequency * t) + 0.3 * Math.sin(2 * Math.PI * frequency * 2 * t)) * Math.exp(-6 * t);

const ding = () => render(0.6, (t) => bell(t, 1320));

// C6, E6, G6 played one after another.
const chime = () =>
  render(1.1, (t) =>
    [1046.5, 1318.5, 1568].reduce((sum, frequency, i) => {
      const local = t - i * 0.09;
      return local < 0 ? sum : sum + bell(local, frequency);
    }, 0),
  );

const toWav = (samples: Float64Array): Buffer => {
  const peak = samples.reduce((max, value) => Math.max(max, Math.abs(value)), 0) || 1;
  const edge = Math.round(EDGE_SEC * SAMPLE_RATE);
  const header = Buffer.alloc(44);
  const dataSize = samples.length * 2;
  header.write("RIFF", 0);
  header.writeUInt32LE(36 + dataSize, 4);
  header.write("WAVEfmt ", 8);
  header.writeUInt32LE(16, 16);
  header.writeUInt16LE(1, 20); // PCM
  header.writeUInt16LE(1, 22); // mono
  header.writeUInt32LE(SAMPLE_RATE, 24);
  header.writeUInt32LE(SAMPLE_RATE * 2, 28);
  header.writeUInt16LE(2, 32);
  header.writeUInt16LE(16, 34);
  header.write("data", 36);
  header.writeUInt32LE(dataSize, 40);
  const data = Buffer.alloc(dataSize);
  samples.forEach((value, i) => {
    // Short fades at both ends stop the sound from clicking.
    const fade = Math.min(1, i / edge, (samples.length - 1 - i) / edge);
    data.writeInt16LE(Math.round(((value / peak) * PEAK * fade) * 32767), i * 2);
  });
  return Buffer.concat([header, data]);
};

const library: Record<string, () => Float64Array> = {
  "transition/mallet.wav": mallet,
  "transition/pop.wav": pop,
  "emphasis/tick.wav": tick,
  "emphasis/ding.wav": ding,
  "outro/chime.wav": chime,
};

for (const [name, make] of Object.entries(library)) {
  const file = path.join("public", "sfx", name);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  const wav = toWav(make());
  fs.writeFileSync(file, wav);
  console.log(`${file} ${wav.length} bytes`);
}
