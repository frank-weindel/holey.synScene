interface TimeoutDef {
  id: number;
  cb: () => void;
  durationLeft: number;
}

interface IntervalDef {
  id: number;
  cb: () => void;
  durationLeft: number;
  duration: number;
}

const setTimeoutIds: number[] = [];
const setTimeouts: Record<number, TimeoutDef> = {};

let nextSetTimeoutId = 0;
export function setTimeout(cb: () => void, duration: number) {
  const id = nextSetTimeoutId++;

  setTimeouts[id] = {
    id: id,
    cb: cb,
    durationLeft: duration,
  };
  setTimeoutIds.push(id);

  return id;
}

export function clearTimeout(id: number) {
  delete setTimeouts[id];
  // Remove id from IDs array
  const index = setTimeoutIds.indexOf(id);
  if (index !== -1) {
    setTimeoutIds.splice(index, 1);
  }
}

const setIntervalIds: number[] = [];
const setIntervals: Record<number, IntervalDef> = {};

let nextSetIntervalId = 0;
export function setInterval(cb: () => void, duration: number) {
  const id = nextSetIntervalId++;

  setIntervals[id] = {
    id: id,
    cb: cb,
    durationLeft: duration,
    duration: duration,
  };
  setIntervalIds.push(id);

  return id;
}

export function clearInterval(id: number) {
  delete setIntervals[id];
  // Remove id from IDs array
  const index = setIntervalIds.indexOf(id);
  if (index !== -1) {
    setIntervalIds.splice(index, 1);
  }
}

export function updateTimeoutsAndIntervals(dtMs: number) {
  setTimeoutIds.forEach(function (id) {
    const timeout = setTimeouts[id];
    if (timeout) {
      timeout.durationLeft -= dtMs;
      if (timeout.durationLeft <= 0) {
        try {
          timeout.cb();
        } catch (e) {
          console.error(e);
        }
        clearTimeout(id);
      }
    }
  });
  setIntervalIds.forEach(function (id) {
    const interval = setIntervals[id];
    if (interval) {
      interval.durationLeft -= dtMs;
      if (interval.durationLeft <= 0) {
        try {
          interval.cb();
        } catch (e) {
          console.error(e);
        }
        interval.durationLeft = interval.duration;
      }
    }
  });
}
