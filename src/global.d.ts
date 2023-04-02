/* eslint-disable @typescript-eslint/no-explicit-any */
export type {};

declare global {
  const inputs: {
    limit: number;
    bpm: number;
    uMusicEnabled: number;
    uRotationMultiplier: number;
  };
  const uniforms: {
    pulse: number;
    scriptLimit: number;
    scriptGreen: number;
    scriptSyn_BPMConfidence: number;
    scriptSyn_OnBeat: number;
    scriptSyn_BassLevel: number;
    scriptSyn_MidHighTime: number;
  };
  const syn_MidHighTime: number;
  const syn_BPMConfidence: number;
  const syn_OnBeat: number;
  const syn_BassLevel: number;

  const console: {
    log: (message?: any, ...optionalParams: any[]) => void;
    error: (message?: any, ...optionalParams: any[]) => void;
  };
}
