import React, {Component} from 'react';

import desertSketch from './img/desert.svg';
import desertImage from './img/desert.jpg';
import mtnSketch from './img/mtn.svg';
import mtnImage from './img/mtn.jpg';
import houseSketch from './img/house.svg';
import houseImage from './img/house.jpg';
import GrowingTile from './components/GrowingTile.react';
import DrawingTile from './components/DrawingTile.react';
import SlidingTile from './components/SlidingTile.react';
import ImageTile from './components/ImageTile.react';
import VideoTile from './components/VideoTile.react';
import './App.css';

class App extends Component {
  render() {
    return (<div className="App helvetica pa4">
      <nav className="flex justify-between mb4 mt2">
        <a className="black link dim" href="/">DAWN</a>
        <div>
          <a className="black link dim mr3">ABOUT</a>
          <a className="black link dim mr3">WORK</a>
          <a className="black link dim">CONTACT</a>
        </div>
      </nav>
      <header className="mb3">
        <div className="desc-tile outline flex justify-center items-center">
          <h1 className="ma0 tc w-80 f2 normal">We’re a design and engineering studio that helps meaningful organizations build things for the web</h1>
        </div>
        <DrawingTile className="desert-tile" image={desertImage} sketch={desertSketch} />
        <VideoTile className="city-tile" objectPosition="center bottom" videoPath="/city.mp4" opacity={0.7} />
        <SlidingTile className="mtn-tile" image={mtnImage} sketch={mtnSketch} />
        <GrowingTile className="house-tile" image={houseImage} sketch={houseSketch} />
        <VideoTile className="ocean-tile" startingIndex={1} objectPosition="left top" videoPath="/ocean.mp4" opacity={0.7} />
      </header>
      <hr/>
      <main>
        <section>
          <div className="fl w-25 pa2">
            <div className="h4 bg-light-gray">
            </div>
            <p>This is a description of one of our wonderful capabilities. We totally know what we’re doing.</p>
          </div>
          <div className="fl w-25 pa2">
            <div className="h4 bg-light-gray">
            </div>
            <p>This is a description of one of our wonderful capabilities. We totally know what we’re doing.</p>
          </div>
          <div className="fl w-25 pa2">
            <div className="h4 bg-light-gray">
            </div>
            <p>This is a description of one of our wonderful capabilities. We totally know what we’re doing.</p>
          </div>
          <div className="fl w-25 pa2">
            <div className="h4 bg-light-gray">
            </div>
            <p>This is a description of one of our wonderful capabilities. We totally know what we’re doing.</p>
          </div>
        </section>
      </main>
    </div>);
  }
}

export default App;
