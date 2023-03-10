import React from "react";

class App extends React.Component {
  state = {
    second: 0,
    minut: 0,
    hour: 0,
    btnDisabled: false,
    interval: "",
    intervalsStorage: [],
  }

  startClicked = () => {
    this.setState({
      btnDisabled: true,
    })
    let timer = setInterval(()=> {
      const {second, minut, hour} = this.state
      if(second === 59) {
        if(minut === 59) {
          this.setState({
            second: 0,
            minut: 0,
            hour: hour + 1
          })
        } else {
          this.setState({
            second: 0,
            minut: minut + 1
          })
        }
      } else {
        this.setState({
          second: second + 1
        });
      }
    }, 1000);
    this.setState({
      interval: timer,
    })
  }

  stopClicked = () => {
    clearInterval(this.state.interval)
    this.setState({
      btnDisabled: false,
    })
  }

  intervalClicked = () => {
    const {hour, minut, second, intervalsStorage} = this.state
      intervalsStorage.push(`${hour}:${minut}:${second}`)
      this.setState({
      intervalsStorage,
    })
  }

  clearClicked = () => {
    this.stopClicked()
    this.setState({
      second: 0,
      minut: 0,
      hour: 0,
      intervalsStorage: []
    })
  }

  render() {
    const {second, minut, hour, btnDisabled, intervalsStorage} = this.state
    return (
      <div>
        <div className="timer-container">
          <h1>
            <span>Online</span> Stopwatch
          </h1>

          <div className="timer-col">
            <div className="timer-hours">{hour}</div>
            <div className="timer-label">Hours</div>
          </div>

          <div className="timer-col">
            <div className="timer-minutes">{minut}</div>
            <div className="timer-label">Minutes</div>
          </div>

          <div className="timer-col">
            <div className="timer-seconds">{second}</div>
            <div className="timer-label">Seconds</div>
          </div>
        </div>

        <div className="timer-container text-center">
          <div className="timer-btn">
            <button className="btn btn-success" onClick={this.startClicked} disabled={btnDisabled}>Start</button>
          </div>
          <div className="timer-btn">
            <button className="btn btn-danger" onClick={this.stopClicked}>Stop</button>
          </div>
          <div className="timer-btn">
            <button disabled={!btnDisabled} className="btn btn-secondary" onClick={this.intervalClicked}>Interval</button>
          </div>
          <div className="timer-btn">
            <button className="btn btn-warning" onClick={this.clearClicked}>Clear</button>
          </div>
        </div>

        <div className="timer-container-intervals text-center">
            {intervalsStorage.map((item, index)=> <p>{index+1}. =&gt; {item}</p>)}
        </div>
      </div>
    );
  }
}

export default App;
