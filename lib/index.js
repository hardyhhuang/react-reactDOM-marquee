'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var STEP = 1; //roll step

var Marquee = _react2.default.createClass({
  displayName: 'Marquee',

  propTypes: {
    text: _react.PropTypes.string, //The text displayed
    hoverToStop: _react.PropTypes.bool, //On hover make roll stop, leave makes recover
    loop: _react.PropTypes.bool, //Whether or not loop the content
    rollingSpeed: _react.PropTypes.number, //Rolling speed, unit: ms
    displayTime: _react.PropTypes.number //Every record display time, unit: ms
  },

  getDefaultProps: function getDefaultProps() {
    return {
      text: '',
      hoverToStop: false,
      loop: false,
      rollingSpeed: 100,
      displayTime: 5000
    };
  },
  getInitialState: function getInitialState() {
    return {
      animatedHeight: 0,
      overflowHeight: 0,
      offset: 0
    };
  },
  componentDidMount: function componentDidMount() {
    this._measureText();
    this._startAnimation(false);
  },
  componentWillUnmount: function componentWillUnmount() {
    clearTimeout(this._marqueeTimer);
  },
  handleMouseEnter: function handleMouseEnter() {
    if (this.props.hoverToStop) {
      clearTimeout(this._marqueeTimer);
    }
  },
  handleMouseLeave: function handleMouseLeave() {
    if (this.props.hoverToStop && this.state.overflowHeight > 0) {
      this._startAnimation(true);
    }
  },
  render: function render() {
    var style = {
      'position': 'relative',
      'bottom': this.state.animatedHeight, //roll up
      'whiteSpace': 'nowrap',
      'overflow': 'hidden'
    };
    if (this.state.overflowHeight < 0) {
      return _react2.default.createElement(
        'div',
        { className: 'ui-marquee', style: { overflow: 'hidden' } },
        _react2.default.createElement(
          'div',
          { ref: 'text', style: style, title: this.props.text },
          this.props.text
        )
      );
    } else {
      return _react2.default.createElement(
        'div',
        { className: 'ui-marquee', style: { overflow: 'hidden' },
          onMouseEnter: this.handleMouseEnter,
          onMouseLeave: this.handleMouseLeave },
        _react2.default.createElement(
          'div',
          { ref: 'text', style: style },
          this.props.text
        )
      );
    }
  },
  _startAnimation: function _startAnimation() {
    var _this = this;

    var rollImmediately = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

    clearTimeout(this._marqueeTimer);
    var _props = this.props,
        rollingSpeed = _props.rollingSpeed,
        displayTime = _props.displayTime;

    var delayTime = rollImmediately ? 0 : displayTime;
    var animate = function animate() {
      var _state = _this.state,
          overflowHeight = _state.overflowHeight,
          offset = _state.offset;

      var animatedHeight = _this.state.animatedHeight + STEP;
      var isRoundOver = animatedHeight > (_this.props.loop ? overflowHeight : overflowHeight - offset) - 1;
      if (isRoundOver) {
        if (_this.props.loop) {
          animatedHeight = -offset + 1;
        } else {
          return;
        }
      }
      _this.setState({
        animatedHeight: animatedHeight
      });
      if (animatedHeight % offset == 0) {
        _this._marqueeTimer = setTimeout(animate, displayTime);
      } else {
        _this._marqueeTimer = setTimeout(animate, rollingSpeed);
      }
    };
    this._marqueeTimer = setTimeout(animate, delayTime);
  },
  _measureText: function _measureText() {
    var container = _reactDom2.default.findDOMNode(this);
    var shownode = _reactDom2.default.findDOMNode(this.refs.text.firstChild.firstChild);
    if (container && shownode) {
      var overflowHeight = container.offsetHeight;
      var offset = shownode.clientHeight;
      if (overflowHeight !== this.state.overflowHeight) {
        this.setState({
          overflowHeight: overflowHeight, offset: offset
        });
      }
    }
  }
});
exports.default = Marquee;
