import React, { Component } from 'react';
import albumData from './../data/albums';
import PlayerBar from './PlayerBar';

class Album extends Component {
  constructor(props) {
    super(props);

    const album = albumData.find( album => {
      return album.slug === this.props.match.params.slug
    });

    this.state = {
      album: album,
      currentSong: album.songs[0],
      currentTime: 0,
      duration: album.songs[0].duration,
      isPlaying: false,
      volume: 80,
    };

    this.audioElement = document.createElement('audio');
    this.audioElement.src = album.songs[0].audioSrc;
  }

    componentDidMount () {
      this.eventListeners ={
        timeupdate: e => {
          this.setState({ currentTime: this.audioElement.currentTime});
        },
        durationchange: e => {
          this.setState({ duration: this.audioElement.duration})
        }
      };
      this.audioElement.addEventListener('timeupdate', this.eventListeners.timeupdate);
      this.audioElement.addEventListener('durationchange', this.eventListeners.durationchange);
    }

    componentWillUnmount() {
      this.audioElement.src = null;
      this.audioElement.removeEventListeners('timeupdate', this.eventListners.timeupdate);
      this.audioElement.removeEventListeners('durationchange', this.eventListners.durationchage);
    }

    play() {
      this.audioElement.play();
      this.setState({ isPlaying: true });
    }

    pause() {
      this.audioElement.pause();
      this.setState({ isPlaying: false});
    }

    setSong(song) {
      this.audioElement.src = song.audioSrc;
      this.setState({ currentSong: song});
    }

    handleSongClick(song) {
      const isSameSong = this.state.currentSong === song;
      if(this.state.isPlaying && isSameSong) {
        this.pause();
      } else {
        if(!isSameSong) {this.setSong(song);}
        this.play();
      }
      }

    handlePrevClick() {
      const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
      const newIndex = Math.max(0, currentIndex - 1);
      const newSong = this.state.album.songs[newIndex];
      this.setSong(newSong);
      this.play(newSong);
    }


    handleNextClick () {
      const indexNow = this.state.album.songs.findIndex(song => this.state.currentSong === song);
      const lastSong= this.state.album.songs.length - 1;
      const nextIndex = Math.min(indexNow + 1, lastSong) ;
      const nextSong= this.state.album.songs[nextIndex];
      this.setSong(nextSong);
      this.play(nextSong);
    }

    handleTimeChange(e) {
      const newTime = this.audioElement.duration * e.target.value;
      this.audioElement.currentTime = newTime;
      this.setState({currentTime: newTime});
    }

    handleVolumeChange(e) {
      const newVolume = e.target.value;
      this.audioElement.volume = newVolume;
      this.setState({volume : newVolume})
    }

    formatTime(time){
      const timeMinutes = Math.floor(time / 60);
      let timeSeconds = Math.floor(time - timeMinutes * 60);
      if(timeSeconds<10){timeSeconds = "0" + timeSeconds};
      const prettyTime = timeMinutes + ":" + timeSeconds
      return prettyTime;

    }


  render(){
    return (
      <section className="album">
        <section id="album-info">
          <img id="album-cover-art" src={this.state.album.albumCover} />
          <div className="album-details">
            <h1 id="album-title">{this.state.album.title} </h1>
            <h2 className="artist"> {this.state.album.artist}</h2>
            <div id="release-info">{this.state.album.releaseInfo}</div>
          </div>
        </section>
        <table id="song-list">
          <colgroup>
            <col id="song-number-column" />
            <col id="song-title-column" />
            <col id="song-duration-column" />
          </colgroup>
          <tbody>
            {
              this.state.album.songs.map( (songs, index) =>
            <tr className="song" key={index} onClick={() => this.handleSongClick(songs)}>
              <td className ="song-actions">
                <button>
                  <span className="song-number"> {index + 1} </span>
                  <span className='ion-play'></span>
                  <span className="ion-pause"></span>
              </button>
              </td>
              <td className="song-title"> {songs.title} </td>
              <td className="song-duration"> {this.formatTime(songs.duration)}</td>
            </tr>
          )
        }
          </tbody>
        </table>
        <PlayerBar
          isPlaying={this.state.isPlaying}
          currentSong={this.state.currentSong}
          currentTime={this.formatTime(this.audioElement.currentTime)}
          timeLapsed={(this.audioElement.currentTime/this.audioElement.duration)}
          volume={this.audioElement.volume}
          duration={this.formatTime(this.audioElement.duration)}
          handleSongClick={() => this.handleSongClick(this.state.currentSong)}
          handlePrevClick={() => this.handlePrevClick()}
          handleNextClick={() => this.handleNextClick()}
          handleTimeChange={(e) => this.handleTimeChange(e)}
          handleVolumeChange={(e) => this.handleVolumeChange(e)}

          />

      </section>
    );
  }


}

export default Album;
