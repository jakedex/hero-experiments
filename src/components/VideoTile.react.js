import React, {Component} from 'react';

const COLORS = ['#2AA3EF', '#FDAD2A', '#8D65F2', '#ED3A5B', '#F98FA6'];

const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

class VideoTile extends Component {
  constructor(props) {
    super(props);
    this.state = {
        playing: false,
        colorIndex: props.startingIndex || 0
    };

    this.onClick = this.onClick.bind(this);
    this.onMouseEnter = this.onMouseEnter.bind(this);
    this.onMouseOut = this.onMouseOut.bind(this);
  }

  onClick() {
    let newIndex = getRandomInt(0, COLORS.length - 1);
    while (newIndex === this.state.colorIndex) {
      newIndex = getRandomInt(0, COLORS.length - 1);
    }

    this.setState({
      colorIndex: newIndex
    })
  }

  onMouseEnter(e) {
    this.refs.vidRef.pause();
  }

  onMouseOut(e) {
    this.refs.vidRef.play();
  }

  render() {
    return (
        <div onClick={this.onClick} onMouseEnter={this.onMouseEnter} onMouseOut={this.onMouseOut} className={`outline w-100 h-100 relative ${this.props.className}`} style={{ cursor: 'crosshair', background: !this.props.grayscale && COLORS[this.state.colorIndex], overflow: 'hidden' }}>
          <video ref="vidRef" src={this.props.videoPath} type="video/mp4" autoPlay={true} loop={true} style={{ objectFit: 'cover', objectPosition: this.props.objectPosition || 'top', opacity: this.props.opacity || 0.5, mixBlendMode: 'soft-light' }} class="w-100 h-100" />
        </div>
    );
  }
}

export default VideoTile;
