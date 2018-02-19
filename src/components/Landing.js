import React from 'react';

const Landing = () => (
  <section className="landing">
    <h1 className="hero-title"> Turn the music up!</h1>

    <div className="mdl-grid">
    <div className="mdl-cell mdl-cell--4-col">
      <div className="mdl-cell__title">
        <h2 className="mdl-cell__title-text">Choose your music</h2>
      </div>
      <div className="mdl-cell__supporting-text">
      The world is full of music; why should you have to listen to music that someone else chose?
      </div>
      <div className="mdl-cell__actions mdl-card--border">
      </div>

    </div>

    <div className="mdl-cell mdl-cell--4-col">
      <div className="mdl-cell__title">
        <h2 className="mdl-cell__title-text">Unlimited, streaming, ad-free</h2>
      </div>
      <div className="mdl-cell__supporting-text">
      No arbitrary limits. No distractions
      </div>
      <div className="mdl-cell__actions mdl-card--border">
      </div>

    </div>

    <div className="mdl-cell mdl-cell--4-col">
      <div className="mdl-cell__title">
        <h2 className="mdl-cell__title-text">Mobile enabled</h2>
      </div>
      <div className="mdl-cell__supporting-text">
      Listen to your music on the go. This streaming service is available on all mobile platforms.
      </div>
      <div className="mdl-cell__actions mdl-card--border">
      </div>

    </div>

    </div>


  </section>
);

export default Landing;
