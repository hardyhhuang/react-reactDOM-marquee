# react-reactDOM-marquee

Marquee React component.


## Usage

```javascript
var ReactDOM = require('react-dom');
var Marquee = require('react-reactDOM-marquee');

var marqueeContent = (
    <div>
        <p>&nbsp;&nbsp;one one one one one one one one one one one one one one one one one one one</p>
        <p>&nbsp;&nbsp;two two two two two two two two two two two two two two two two two two two</p>
        <p>&nbsp;&nbsp;three three three three three three three three three three three three </p>
        <p>&nbsp;&nbsp;four four four four four four four four four four four four four four four </p>
    </div>
);

ReactDOM.render(
  <div style={{height:20}}>
    <Marquee
        text={marqueeContent}
        loop={true}
        hoverToStop={true}
    />
</div>
```

## Props

### text

Type: String Default: `""`

The text displayed.

### hoverToStop

Type: Bool Default: `false`

On hover make roll stop, leave makes recover.

### loop

Type: Bool Default: `false`

Whether or not loop the content.

### rollingSpeed

Type: Number Default: `100`

Rolling speed, unit: ms.

### displayTime

Type: Number Default: `5000`

Every record display time, unit: ms.

## Scripts

```
$ npm run build
```

## License

MIT
