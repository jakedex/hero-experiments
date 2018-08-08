import React, {Component} from 'react';
import ReactCursorPosition from 'react-cursor-position';

// TODO remove hardcoded
import DesertSketch from './svg/desert';

const IMG_HEIGHT = 176;
const IMG_WIDTH = 238;
const HORIZON_HEIGHT = 85;

const COLORS = [
  { sun: '#FFF500', lines: '#FFF500' },
  { sun: '#8D65F2', lines: '#fff' },
  { sun: '#FDAD2A', lines: '#fff' },
  { sun: '#2AA3EF', lines: '#fff' },
  { sun: '#ED3A5B', lines: '#ED3A5B' },
  { sun: '#F98FA6', lines: '#F98FA6' },
  { sun: '#fff', lines: '#FDAD2A' },
]

const sunFull = colorIndex =>`url("data:image/svg+xml;utf8,<svg width='48' height='48' viewBox='0 0 48 48' fill='none' xmlns='http://www.w3.org/2000/svg'><circle cx='24' cy='24' r='24' fill='${COLORS[colorIndex].sun}'/></svg>")`;
const sunEmpty = colorIndex => `url("data:image/svg+xml;utf8,<svg opacity='0.3' width='48' height='48' viewBox='0 0 48 48' fill='none' xmlns='http://www.w3.org/2000/svg'><circle cx='24' cy='24' r='22' stroke-width='3px' stroke='${COLORS[colorIndex].sun}'/></svg>")`;
const getSunCSS = ({ y, colorIndex, isCursor = false }) => {
  const css = y < HORIZON_HEIGHT ? sunFull(colorIndex) : sunEmpty(colorIndex);

  return isCursor ? `${css} 24 24, auto` : css;
}

const getIllustrationOpacity = ({y, sun}) => {
  const MAX_OPACITY = 1.0;
  const MIN_OPACITY = 0.2;

  const vertical = sun ? sun.position.y : y;

  if (vertical > HORIZON_HEIGHT) {
    return MIN_OPACITY;
  }

  const opacity = MAX_OPACITY * ((HORIZON_HEIGHT - vertical + 25) / HORIZON_HEIGHT);

  return opacity > MIN_OPACITY ? opacity : MIN_OPACITY;
}

const getStyle = (state) => {
  const { x, y, colorIndex } = state;

  const modes = {
    reveal: {
      container: { cursor: 'ew-resize', backgroundColor: 'black' },
      image: { clipPath: `inset(0 0 0 ${x}px)`, objectFit: 'cover' }
    },
    fade: {
      container: { cursor: getSunCSS({y, colorIndex, isCursor: true}) },
      image: { opacity: getIllustrationOpacity(state), objectFit: 'cover' }
    },
  };

  return modes.fade;
}

class DrawingTile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSketchDisplayed: false,
      x: 0,
      y: 0,
      sun: null,
      colorIndex: 0
    };

    this.onClick = this.onClick.bind(this);
    this.onPositionChanged = this.onPositionChanged.bind(this);
    this.onMouseEnter = this.onMouseEnter.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
  }

  onClick() {
    const { x, y } = this.state;

    this.setState({
      // sun: { position: { x, y }, colorIndex: this.state.colorIndex },
      colorIndex: this.state.colorIndex < COLORS.length - 1 ? this.state.colorIndex + 1 : 0
    });
  }

  onPositionChanged({ position, elementDimensions }) {
    this.setState({
      x: position.x > 10 ? position.x : 0,
      y: position.y > 10 ? position.y : 0,
      dimensions: elementDimensions
    });
  }

  onMouseEnter() {
    this.setState({
      isSketchDisplayed: true
    });
  }

  onMouseLeave() {
    this.setState({
      isSketchDisplayed: false
    });
  }

  render() {
    const { sketch, image, className } = this.props;

    const style = getStyle(this.state);

    return (
        <div className={`outline w-100 h-100 relative ${className}`} style={style.container} onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave} onClick={this.onClick}>
          <ReactCursorPosition onPositionChanged={this.onPositionChanged}>
            <img src={image} style={{ objectFit: 'cover' }} class="w-100 h-100 absolute"/>
            { this.state.isSketchDisplayed && <DesertSketch color={COLORS[this.state.colorIndex].lines} style={style.image} className="w-100 h-100 absolute" />}
            {/* { this.state.isSketchDisplayed && <img src={sketch} style={style.image} class="w-100 h-100 absolute"/>} */}
            { this.state.sun && <span style={{ position: 'absolute', top: this.state.sun.position.y - 24, left: this.state.sun.position.x - 24, content: getSunCSS({ y:this.state.sun.position.y, colorIndex: this.state.sun.colorIndex})}}></span>}
          </ReactCursorPosition>
        </div>
    );
  }
}

export default DrawingTile;
