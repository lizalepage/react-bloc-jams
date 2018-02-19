import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import albumData from './../data/albums';

class Library extends Component {
  constructor(props) {
    super(props);
    this.state = {albums: albumData}
  }
  render() {
    return(
      <div className='library'>
        <div class="mdl-grid">




        {

          this.state.albums.map( (album, index) =>
            <div className='mdl-cell mdl-cell--6-col'>
            <Link to={`/album/${album.slug}`} key={index} >
             <img src={album.albumCover} alt={album.title}/>
                <div className="info"> Album: {album.title}</div>
                <div className="info">Artist: {album.artist}</div>
                <div className="info">Songs: {album.songs.length}</div>



            </Link>
            </div>
          )

        };
          </div>
          </div>







    );

}
}

export default Library;
