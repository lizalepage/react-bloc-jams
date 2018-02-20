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
      volume: .50,
    };

    this.audioElement = document.createElement('audio');
    this.audioElement.src = album.songs[0].audioSrc;
    this.handleHoverOn = this.handleHoverOn.bind(this);
    this.handleHoverOff = this.handleHoverOff.bind(this);
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
      this.audioElement.removeEventListener('timeupdate', this.eventListeners.timeupdate);
      this.audioElement.removeEventListener('durationchange', this.eventListeners.durationchange);
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

    songClass(songs, index){
        if(songs === this.state.currentSong){
          if(this.state.isPlaying){
            return 'ion-pause';
            }
          else if (!this.state.isPlaying){
            return 'ion-play';
          }
        }
          else if (this.state.album.songs[index].hover){
            return 'ion-play';
          }


    }

    songNumber(songs, index){
      const theSong = index + 1;
        if(songs === this.state.currentSong || this.state.album.songs[index].hover){
          return
          }
        else{
          return theSong;
      }
    }

    handleHoverOn(index) {
      const temp = this.state.album.songs;
      temp[index].hover = true;
      this.setState(temp);
    }

    handleHoverOff(index) {
      const temp = this.state.album.songs;
      temp[index].hover = false;
      this.setState(temp);
}

    hoverEffect(index) {
      if (this.state.album.songs[index].hover) {
        return 'ion-play'
      }
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
        <table id="song-list" className="mdl-data-table mdl-js-data-table">
          <thead>
            <tr>
              <th className="mdl-data-table__cell--non-numeric" width="10%" id="song-number-column"> </th>
              <th className="mdl-data-table__cell--non-numeric" width="40%" id="song-title-column"> Song </th>
              <th className="mdl-data-table__cell--non-numeric" width="50%" id="song-duration-column"> Time </th>
            </tr>
          </thead>
          <tbody>
            {
              this.state.album.songs.map( (songs, index) =>
            <tr className="song" onMouseEnter={() => this.handleHoverOn(index)} onMouseLeave={() => this.handleHoverOff(index)} key={index} onClick={() => this.handleSongClick(songs)}>
              <td className ="mdl-data-table__cell--non-numeric">
                <button className="mdl-button mdl-js-button mdl-button--raised mdl-button--accent">
                    <i className={this.songClass(songs, index)}>
                    {this.songNumber(songs, index)}
                    </i>

                </button>
              </td>
              <td className="mdl-data-table__cell--non-numeric song-title"> {songs.title} </td>
              <td className="mdl-data-table__cell--non-numeric song-duration"> {this.formatTime(songs.duration)}</td>
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
