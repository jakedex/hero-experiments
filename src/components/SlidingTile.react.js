import React, {Component} from 'react';
import ReactCursorPosition from 'react-cursor-position';

// TODO remove hardcoded
import MtnSketch from './svg/mtn';

const IMG_HEIGHT = 176;
const IMG_WIDTH = 238;
const HORIZON_HEIGHT = 120;

const COLORS = [
  { sun: '#8D65F2', lines: '#fff' },
  { sun: '#ED3A5B', lines: '#fff' },
  { sun: '#FFF500', lines: '#FDAD2A' },
  { sun: '#FDAD2A', lines: '#fff' },
  { sun: '#F98FA6', lines: '#fff' },
]

const sunFull = color =>`url("data:image/svg+xml;utf8,<svg width='64' height='64' viewBox='0 0 64 64' fill='none' xmlns='http://www.w3.org/2000/svg'><circle cx='32' cy='32' r='32' fill='${color}'/></svg>")`;
const sunEmpty = color => `url("data:image/svg+xml;utf8,<svg opacity='0.3' width='64' height='64' viewBox='0 0 64 64' fill='none' xmlns='http://www.w3.org/2000/svg'><circle cx='32' cy='32' r='30' stroke-width='3px' stroke='${color}'/></svg>")`;

const getSunCSS = ({ y, colorIndex, isBG = false }) => {
  const color = isBG ? COLORS[colorIndex].lines : COLORS[colorIndex].sun
  return y < HORIZON_HEIGHT ? sunFull(color) : sunEmpty(color);
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
      container: { cursor: 'ew-resize', backgroundColor: COLORS[state.colorIndex].sun, overflow: 'hidden' },
      image: { clipPath: `inset(0 0 0 ${x}px)`, objectFit: 'cover' }
    },
    fade: {
      container: { cursor: getSunCSS({y, colorIndex, isCursor: true}) },
      image: { opacity: getIllustrationOpacity(state), objectFit: 'cover' }
    },
  };

  return modes.reveal;
}

class SlidingTile extends Component {
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
    if (this.state.isSketchDisplayed) {
      this.setState({
        x: position.x > 10 ? position.x : 0,
        y: position.y > 10 ? position.y : 0,
        dimensions: elementDimensions
      });
    }
  }

  onMouseEnter() {
    this.setState({
      isSketchDisplayed: true,
    })
  }

  onMouseLeave() {
    this.setState({
      isSketchDisplayed: false,
      x: 0,
      y: 0,
    });
  }

  render() {
    const { sketch, image, className } = this.props;

    const style = getStyle(this.state);

    return (
        <div className={`outline w-100 h-100 relative ${className}`} style={style.container} onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave} onClick={this.onClick}>
          <ReactCursorPosition onPositionChanged={this.onPositionChanged}>
            {/* <img src={sketch} style={{ objectFit: 'cover' }} class="w-100 h-100 absolute"/> */}
            <MtnSketch color={COLORS[this.state.colorIndex].lines} className="w-100 h-100 absolute" />
            {this.state.isSketchDisplayed && <span style={{ position: 'absolute', top: this.state.y - 32, right: 32, content: getSunCSS({ isBG: true, ...this.state})}}></span>}
            <div style={style.image} class="w-100 h-100 absolute">
              <img src={image} style={style.image} class="w-100 h-100 absolute"/>
              {this.state.isSketchDisplayed && <span style={{ position: 'absolute', top: this.state.y - 32, right: 32, mixBlendMode: 'none', content: getSunCSS(this.state)}}></span>}
            </div>
          </ReactCursorPosition>
        </div>
    );
  }
}

export default SlidingTile;
