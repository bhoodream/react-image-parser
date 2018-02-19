# React-Image-Parser
With this component you can easily parse the image data.  

#### Install:
```bash
npm i react-image-parser
```

#### Add:

```javascript
import ImageParser from 'react-image-parser';
```

#### Use:

```javascript
<ImageParser
    img={'./path/to/image'}
    maxImgSideSize={400}
    onImageData={data => console.log(data)}
/>
```

#### Props:

| Name        | Type           | Required  |  Default |  Description |
|:------------|:---------------|:----------|:---------|:-------------|
| img        | String | Yes  |  null |  Path to image. For example, './my/image/path.png' |
| maxImgSideSize | Number | No  |  bigger side of image | The maximum size of the sides of the canvas on which the image will be parsed. |
| onImageData | Function | No  |  null | The function in which the parsed data will be passed. |

#### Data:

![Data](https://i.imgur.com/Z2tYLJR.png)