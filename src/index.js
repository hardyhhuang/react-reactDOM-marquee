import React, {PropTypes} from 'react';
import ReactDOM from 'react-dom';

const STEP = 1;                    //roll step

const Marquee = React.createClass({
    displayName: 'Marquee',

  propTypes: {
    text: PropTypes.string,         //The text displayed
    hoverToStop: PropTypes.bool,    //On hover make roll stop, leave makes recover
    loop: PropTypes.bool,           //Whether or not loop the content
    rollingSpeed:PropTypes.number,  //Rolling speed, unit: ms
    displayTime:PropTypes.number    //Every record display time, unit: ms
  },

  getDefaultProps() {
    return {
      text: '',
      hoverToStop: false,
      loop: false,
      rollingSpeed: 100,
      displayTime: 5000
    };
  },

  getInitialState() {
    return {
      animatedHeight: 0,
      overflowHeight: 0,
      offset: 0
    };
  },

  componentDidMount() {
      this._measureText();
      this._startAnimation(false);
  },

  componentWillUnmount() {
    clearTimeout(this._marqueeTimer);
  },

  handleMouseEnter() {
    if (this.props.hoverToStop) {
      clearTimeout(this._marqueeTimer);
    }
  },

  handleMouseLeave() {
    if (this.props.hoverToStop && this.state.overflowHeight > 0) {
      this._startAnimation(true);
    }
  },

  render() {
    const style = {
      'position': 'relative',
      'bottom': this.state.animatedHeight,      //roll up
      'whiteSpace': 'nowrap',
      'overflow': 'hidden'
    };
    if (this.state.overflowHeight < 0) {
      return (
        <div className={`ui-marquee`} style={{overflow: 'hidden'}} >
          <div ref="text" style={style} title={this.props.text}>{this.props.text}</div>
        </div>
      );
    }
    else {
      return (
        <div className={`ui-marquee`} style={{overflow: 'hidden'}}
             onMouseEnter={this.handleMouseEnter}
             onMouseLeave={this.handleMouseLeave}>
          <div ref="text" style={style}>{this.props.text}</div>
        </div>
      );
    }
  },

  _startAnimation(rollImmediately = false) {
    clearTimeout(this._marqueeTimer);
    const {rollingSpeed, displayTime} = this.props;
    let delayTime = rollImmediately ? 0 : displayTime;
    const animate = () => {
        const {overflowHeight, offset} = this.state;
        let animatedHeight = this.state.animatedHeight + STEP;
        const isRoundOver = animatedHeight > ((this.props.loop ? overflowHeight: overflowHeight-offset)- 1);
        if (isRoundOver) {
            if (this.props.loop) {             
              animatedHeight = -offset + 1;
            }else {
              return;
            }
        }
        this.setState({
         animatedHeight
        });
        if(animatedHeight % offset == 0){
          this._marqueeTimer = setTimeout(animate, displayTime);
        }else{
          this._marqueeTimer = setTimeout(animate, rollingSpeed);
        }

        };
    this._marqueeTimer = setTimeout(animate, delayTime);
  },

  _measureText() {
    const container = ReactDOM.findDOMNode(this);
    const shownode = ReactDOM.findDOMNode(this.refs.text.firstChild.firstChild);
    if (container && shownode) {
       const overflowHeight = container.offsetHeight;
       const offset = shownode.clientHeight;    
      if (overflowHeight !== this.state.overflowHeight) {
        this.setState({
          overflowHeight, offset
        });
      }
    }
  }
});
export default Marquee;
