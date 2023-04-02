export class TimeStream {
  rate = 1;
  lastTimeUniformValue: number | undefined = undefined;
  private _time: number | undefined = undefined;

  updateTime(timeUniformValue: number, dt: number) {
    if (this.lastTimeUniformValue === undefined) {
      this.lastTimeUniformValue = timeUniformValue;
    }

    const diff = timeUniformValue - this.lastTimeUniformValue;

    if (diff < 0) {
      this.lastTimeUniformValue = timeUniformValue;
      this._time = timeUniformValue;
      return;
    }

    if (this._time === undefined) {
      return;
    }

    this.lastTimeUniformValue = timeUniformValue;
    // dt must be >= diff
    // if diff === dt then we have 100% progression rate
    // If diff === 0 then we have 0% progression rate
    const progressionRate = diff / dt;
    this._time += diff * (progressionRate * this.rate);
  }

  get time() {
    return this._time || 0;
  }
}
