import { TimePulse } from './lib/TimePulse.js';
import { TimeStream } from './lib/TimeStream.js';
import { setInterval, updateTimeoutsAndIntervals } from './lib/timeout.js';

function waterWave(angle: number) {
  return -(Math.abs(Math.sin(angle)) - 1);
}

const timePulse = new TimePulse();
const midHighTimeStream = new TimeStream();

timePulse.onReset = function () {
  if (inputs.limit !== curLimit) {
    curLimit = inputs.limit;
  }
};

let curLimit = inputs.limit;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function update(dt: number) {
  updateTimeoutsAndIntervals(dt * 1000);

  timePulse.rate = inputs.bpm / 60;
  timePulse.updateTime(dt);

  uniforms.pulse = waterWave((timePulse.time - 0.5) * Math.PI);
  uniforms.scriptLimit = curLimit;

  midHighTimeStream.rate = inputs.uMusicEnabled * inputs.uRotationMultiplier;
  midHighTimeStream.updateTime(syn_MidHighTime, dt);

  uniforms.scriptSyn_BPMConfidence = inputs.uMusicEnabled * syn_BPMConfidence;
  uniforms.scriptSyn_OnBeat = inputs.uMusicEnabled * syn_OnBeat;
  uniforms.scriptSyn_BassLevel = inputs.uMusicEnabled * syn_BassLevel;
  uniforms.scriptSyn_MidHighTime = midHighTimeStream.time;
  uniforms.scriptGreen = 1.0;
}

setInterval(function () {
  console.log(`syn_MidHighitme: ${syn_MidHighTime}`);
  console.log(
    `uniforms.scriptSyn_MidHighTime: ${uniforms.scriptSyn_MidHighTime}`,
  );
}, 1000);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function transition() {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
}
