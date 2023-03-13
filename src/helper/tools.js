export class stopwatch {
  /*
  let startTime;
  let endTime;
  let elapsedTime;
  let running = false;
  /*

  /**
   * Starts a stopwatch if one hasn't already been started
   */
  start = function () {
    if (this.running) {
      return;
    }
    this.running = true;
    this.startTime = new Date();
  };

  /**
   * Stops the current stopwatch
   */
  stop = function () {
    if (!this.running) {
      return;
    }
    this.running = false;
    this.endTime = new Date();
    this.elapsedTime = this.endTime - this.startTime;
  };

  /**
   * Gets either the current time the stopwatch has been running for or how long it ran for
   * @returns {number} the time in seconds
   */
  getTime = function () {
    // Return the elapsed time in seconds.
    if (this.running) return (new Date() - this.startTime) / 1000;
    else return this.elapsedTime / 1000;
  };
}
