# React-Image-Parser
With this component, you can easily analyze the image and get all the colors.

####Install:
```bash
npm i react-image-parser
```

####Add:

```javascript
import ImageParser from 'react-image-parser';
```

####Use:

```javascript
<ImageParser
    img={'./path/to/image'}
    minColorAlpha={1}
    colorAlphaPrecision={100}
    colorDifference={120}
    sortType={'count'}
    sortDir={'desc'}
    maxImgSideSize={400}
    onColorsParsed={colors => console.log(colors)}
/>
```

####Props:

| Name        | Type           | Required  |  Default |  Description |
|:------------|:---------------|:----------|:---------|:-------------|
| img        | String | Yes  |  null |  Path to image. |
| minColorAlpha | Number | No  |  1 | Minimum alpha with which to take colors. |
| colorAlphaPrecision | Number | No  |  100 | Precision of alpha to which to round off. |
| colorDifference | Number | No  |  120 | The difference between the colors that will be taken. Max is 765. |
| sortType | String | No |  'count' | On what parameter the sorting will be performed. Types: count, alpha. |
| sortDir | String | No  |  'desc' | Sort direction. Types: desc, asc; |
| maxImgSideSize | Number | No  |  400 | The maximum size of the sides of the canvas on which the image will be analyzed. |
| onColorsParsed | Function | No  |  null | The function in which the extracted colors will be passed. |


####Colors:

![Colors](https://i.imgur.com/1fzW3Ju.jpg)