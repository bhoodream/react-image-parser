# React-Image-Parser
With this component, you can easily analyze the image and get all the colors.

Install:
```bash
npm i react-image-parser
```

Add:

```javascript
import ImageParser from 'react-image-parser';
```

Use:

```javascript
<ImageParser
    img={'./path/to/image'}
    minColorAlpha={1}
    colorAlphaPrecision={1000}
    colorDifference={120}
    sortType={'count'}
    sortDir={'desc'}
    maxImgSideSize={1000}
    onColorsParsed={colors => console.log(colors)}
/>
```

Colors:

![Colors](https://i.imgur.com/1fzW3Ju.jpg)