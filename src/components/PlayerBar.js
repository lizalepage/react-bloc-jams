import React, { Component } from 'react';

class PlayerBar extends Component {
  render() {
    return(
      <section className="player-bar">
        <section id="buttons">
          <button className="mdl-button mdl-js-button mdl-button--raised mdl-button--accent" onClick={this.props.handlePrevClick}>
            <span className="ion-skip-backward"></span>
          </button>
          <button className="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored" onClick={this.props.handleSongClick}>
            <span className={this.props.isPlaying ? 'ion-pause' : 'ion-play'}></span>
          </button>
          <button className="mdl-button mdl-js-button mdl-button--raised mdl-button--accent" onClick={this.props.handleNextClick}>
            <span className="ion-skip-forward"></span>
          </button>
        </section>
        <section id="time-control">
          <div className="current-time">{this.props.currentTime}</div>
          <input
              type="range"
              className="mdl-slider mdl-js-slider"
              value={this.props.timeLapsed || 0 }
              max="1"
              min="0"
              step="0.01"
            onChange={this.props.handleTimeChange}
          />
          <div className="total-time">{this.props.duration}</div>
        </section>
        <section id="volume-control">
          <div id="volume-control">
            <div className="icon ion-volume-low"></div>
              <input
                type="range"
                className="mdl-slider mdl-js-slider"
                value= {this.props.volume}
                max="1"
                min="0"
                step="0.01"
                onChange={this.props.handleVolumeChange}
              />
            <div className="icon ion-volume-high"></div>
          </div>
        </section>
      </section>
    );
  }
}

export default PlayerBar;
