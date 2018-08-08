import React, {Component} from 'react';
import ReactCursorPosition from 'react-cursor-position';

const IMG_HEIGHT = 176;
const IMG_WIDTH = 238;

const getStyle = ({ x, y }, mode) => {
  const modes = {
    reveal: {
      container: { cursor: 'ew-resize', backgroundColor: 'black' },
      image: { clipPath: `inset(0 0 0 ${x}px)`, objectFit: 'cover', objectPosition: 'left' }
    },
    fade: {
      container: { cursor: 'ew-resize' },
      image: { opacity: 1.0 * (x / IMG_WIDTH), objectFit: 'cover', objectPosition: 'left' }
    },
  };

  return modes[mode];
}

class ImageTile extends Component {
  constructor(props) {
    super(props);
    this.state = {
        x: 0,
        y: 0
    };

    this.onMouseOver = this.onMouseOver.bind(this);
  }

  onMouseOver({ position, elementDimensions }) {
    this.setState({
      x: position.x > 10 ? position.x : 0,
      y: position.y > 10 ? position.y : 0,
      dimensions: elementDimensions
    });
  }

  render() {
    const { sketch, image } = this.props;

    const style = getStyle(this.state, this.props.mode);

    return (
        <div className={`outline w-100 h-100 relative ${this.props.className}`} style={style.container}>
          <ReactCursorPosition onPositionChanged={this.onMouseOver}>
            <img src={this.props.mode === 'fade' ? image : sketch} style={{ objectFit: 'cover', objectPosition: 'left' }} class="w-100 h-100 absolute"/>
            <img src={this.props.mode === 'fade' ? sketch : image} style={style.image} class="w-100 h-100 absolute"/>
          </ReactCursorPosition>
        </div>
    );
  }
}

export default ImageTile;
