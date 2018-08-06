import React, {Component} from 'react';

class VideoTile extends Component {
  constructor(props) {
    super(props);
    this.state = {
        playing: false
    };

    this.onMouseEnter = this.onMouseEnter.bind(this);
    this.onMouseOut = this.onMouseOut.bind(this);
  }

  onMouseEnter(e) {
    this.refs.vidRef.pause();
  }

  onMouseOut(e) {
    this.refs.vidRef.play();
  }

  render() {
    return (
        <div onMouseEnter={this.onMouseEnter} onMouseOut={this.onMouseOut} class="outline w-100 h-100 relative" style={{ cursor: 'crosshair', background: this.props.color, overflow: 'hidden' }}>
          <video ref="vidRef" src={this.props.videoPath} type="video/mp4" autoPlay={true} loop={true} style={{ objectFit: 'cover', objectPosition: 'top', opacity: this.props.opacity || 0.5, mixBlendMode: 'overlay' }} class="w-100 h-100" />
        </div>
    );
  }
}

export default VideoTile;
