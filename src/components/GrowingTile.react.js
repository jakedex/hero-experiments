import React, {Component} from 'react';
import ReactCursorPosition from 'react-cursor-position';

// TODO remove hardcoded
import HouseSketch from './svg/house';

const IMG_HEIGHT = 176;
const IMG_WIDTH = 238;
const HORIZON_HEIGHT = 85;
const SUN_POSITION = { x: 172, y: 64 };

const COLORS = [
  { sun: '#ED3A5B', lines: '#fff' },
  { sun: '#F98FA6', lines: '#fff' },
  { sun: '#FDAD2A', lines: '#fff' },
  { sun: '#2AA3EF', lines: '#fff' },
  { sun: '#8D65F2', lines: '#fff' },
  { sun: '#fff', lines: '#FFF500' },
  { sun: '#fff', lines: '#FDAD2A' },
]

const getDistance = (p1, p2) => Math.hypot(p2.x - p1.x, p2.y - p1.y)

const sunFull = ({colorIndex, diameter}) =>`url("data:image/svg+xml;utf8,<svg width='${diameter}' height='${diameter}' fill='none' xmlns='http://www.w3.org/2000/svg'><circle cx='${diameter / 2}' cy='${diameter / 2}' r='${diameter / 2}' fill='${COLORS[colorIndex].sun}'/></svg>")`;
const sunEmpty = colorIndex => `url("data:image/svg+xml;utf8,<svg opacity='0.3' width='48' height='48' viewBox='0 0 48 48' fill='none' xmlns='http://www.w3.org/2000/svg'><circle cx='24' cy='24' r='22' stroke-width='3px' stroke='${COLORS[colorIndex].sun}'/></svg>")`;

const getSunCSS = ({ x, y, colorIndex }) => {
  const dist = getDistance({ x, y }, SUN_POSITION);

  const diameter = 560 * ((200 - dist) / 200.0);
  const radius = diameter / 2;

  return {
    content: sunFull({colorIndex, diameter}),
    top: SUN_POSITION.y - radius,
    left: SUN_POSITION.x - radius
  };
}

const getIllustrationOpacity = ({y, sun}) => {
  const MAX_OPACITY = 1.0;
  const MIN_OPACITY = 0.2;

  // const vertical = sun ? sun.position.y : y;
  //
  // if (vertical > HORIZON_HEIGHT) {
  //   return MIN_OPACITY;
  // }
  //
  // const opacity = MAX_OPACITY * ((HORIZON_HEIGHT - vertical + 25) / HORIZON_HEIGHT);
  //
  // return opacity > MIN_OPACITY ? opacity : MIN_OPACITY;

  return MAX_OPACITY;
}

const getStyle = (state) => {
  const { x, y, colorIndex } = state;

  return {
    container: { overflow: 'hidden', cursor: 'crosshair' },
    image: { opacity: getIllustrationOpacity(state), objectFit: 'cover' }
  };
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
    const sunCSS = getSunCSS(this.state);

    return (
        <div className={`outline w-100 h-100 relative ${className}`} style={style.container} onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave} onClick={this.onClick}>
          <ReactCursorPosition onPositionChanged={this.onPositionChanged}>
            <img src={image} style={{ objectFit: 'cover' }} class="w-100 h-100 absolute"/>
            { this.state.isSketchDisplayed && <span style={{ position: 'absolute', top: sunCSS.top, left: sunCSS.left, content: sunCSS.content}}></span>}
            { this.state.isSketchDisplayed && <HouseSketch color={COLORS[this.state.colorIndex].lines} style={style.image} className="w-100 h-100 absolute" />}
          </ReactCursorPosition>
        </div>
    );
  }
}

export default DrawingTile;
