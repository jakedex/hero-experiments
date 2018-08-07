import React, {Component} from 'react';

import desertSketch from './img/desert.svg';
import desertImage from './img/desert.jpg';
import mtnSketch from './img/mtn.svg';
import mtnImage from './img/mtn.jpg';
import houseSketch from './img/house.svg';
import houseImage from './img/house.jpg';
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
        <div className="fl w-50 h-66 pa2">
          <div className="outline w-100 h-100 flex justify-center items-center">
            <h1 className="ma0 tc w-80 f2 normal">We’re a design and engineering studio that helps meaningful organizations build things for the web</h1>
          </div>
        </div>
        <div className="fl w-25 h-33 pa2">
          <DrawingTile image={desertImage} sketch={desertSketch} />
        </div>
        <div className="fl w-25 h-33 pa2">
          <SlidingTile image={mtnImage} sketch={mtnSketch} />
        </div>
        <div className="fl w-25 h-33 pa2">
          <VideoTile color='#2AA3EF' objectPosition="center bottom" videoPath="/city.mp4" />
        </div>
        <div className="fl w-25 h-33 pa2"></div>
        <div className="fl w-25 h-33 pa2"></div>
        <div className="fl w-25 h-33 pa2">
          <div className="outline w-100 h-100">
            <ImageTile mode="reveal" image={houseImage} sketch={houseSketch} />
          </div>
        </div>
        <div className="fl w-50 h-33 pa2">
          <VideoTile color='#FCBE2F' objectPosition="left top" videoPath="/ocean.mp4" opacity={0.8} />
        </div>
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
