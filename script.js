var TimePulse = /** @class */ (function () {
    function TimePulse() {
        this.time = 0;
        this.rate = 1; // 1 pulse for every 1 second
    }
    TimePulse.prototype.onReset = function () {
        // To be implemented
        // eslint-disable-next-line @typescript-eslint/no-empty-function
    };
    TimePulse.prototype.updateTime = function (dt) {
        this.time += dt * this.rate;
        if (this.time > 1) {
            var diff = this.time % 1;
            this.time = diff;
            this.onReset();
        }
    };
    return TimePulse;
}());

var TimeStream = /** @class */ (function () {
    function TimeStream() {
        this.rate = 1;
        this.lastTimeUniformValue = undefined;
        this._time = undefined;
    }
    TimeStream.prototype.updateTime = function (timeUniformValue, dt) {
        if (this.lastTimeUniformValue === undefined) {
            this.lastTimeUniformValue = timeUniformValue;
        }
        var diff = timeUniformValue - this.lastTimeUniformValue;
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
        var progressionRate = diff / dt;
        this._time += diff * (progressionRate * this.rate);
    };
    Object.defineProperty(TimeStream.prototype, "time", {
        get: function () {
            return this._time || 0;
        },
        enumerable: false,
        configurable: true
    });
    return TimeStream;
}());

var setTimeoutIds = [];
var setTimeouts = {};
var nextSetTimeoutId = 0;
function setTimeout(cb, duration) {
    var id = nextSetTimeoutId++;
    setTimeouts[id] = {
        id: id,
        cb: cb,
        durationLeft: duration,
    };
    setTimeoutIds.push(id);
    return id;
}
function clearTimeout(id) {
    delete setTimeouts[id];
    // Remove id from IDs array
    var index = setTimeoutIds.indexOf(id);
    if (index !== -1) {
        setTimeoutIds.splice(index, 1);
    }
}
var setIntervalIds = [];
var setIntervals = {};
var nextSetIntervalId = 0;
function setInterval(cb, duration) {
    var id = nextSetIntervalId++;
    setIntervals[id] = {
        id: id,
        cb: cb,
        durationLeft: duration,
        duration: duration,
    };
    setIntervalIds.push(id);
    return id;
}
function clearInterval(id) {
    delete setIntervals[id];
    // Remove id from IDs array
    var index = setIntervalIds.indexOf(id);
    if (index !== -1) {
        setIntervalIds.splice(index, 1);
    }
}
function updateTimeoutsAndIntervals(dtMs) {
    setTimeoutIds.forEach(function (id) {
        var timeout = setTimeouts[id];
        if (timeout) {
            timeout.durationLeft -= dtMs;
            if (timeout.durationLeft <= 0) {
                try {
                    timeout.cb();
                }
                catch (e) {
                    console.error(e);
                }
                clearTimeout(id);
            }
        }
    });
    setIntervalIds.forEach(function (id) {
        var interval = setIntervals[id];
        if (interval) {
            interval.durationLeft -= dtMs;
            if (interval.durationLeft <= 0) {
                try {
                    interval.cb();
                }
                catch (e) {
                    console.error(e);
                }
                interval.durationLeft = interval.duration;
            }
        }
    });
}

function waterWave(angle) {
    return -(Math.abs(Math.sin(angle)) - 1);
}
var timePulse = new TimePulse();
var midHighTimeStream = new TimeStream();
timePulse.onReset = function () {
    if (inputs.limit !== curLimit) {
        curLimit = inputs.limit;
    }
};
var curLimit = inputs.limit;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function update(dt) {
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
    uniforms.scriptGreen = 0.0;
}
setInterval(function () {
    console.log("syn_MidHighitme: ".concat(syn_MidHighTime));
    console.log("uniforms.scriptSyn_MidHighTime: ".concat(uniforms.scriptSyn_MidHighTime));
}, 1000);
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function transition() {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
}
