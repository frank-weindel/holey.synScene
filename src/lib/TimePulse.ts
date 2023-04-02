export class TimePulse {
  time = 0;
  rate = 1; // 1 pulse for every 1 second

  onReset() {
    // To be implemented
    // eslint-disable-next-line @typescript-eslint/no-empty-function
  }

  updateTime(dt: number) {
    this.time += dt * this.rate;
    if (this.time > 1) {
      const diff = this.time % 1;
      this.time = diff;
      this.onReset();
    }
  }
}
