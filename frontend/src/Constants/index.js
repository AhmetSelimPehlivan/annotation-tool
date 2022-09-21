import LineIcon from '../Assets/Line.svg';
import PointIcon from '../Assets/Point.svg';
import EraserIcon from '../Assets/Eraser.svg';
import ClickIcon from '../Assets/Click.svg';
import {REGION_TYPES} from './regionTypes';
import {ATTRIBUTE_TYPE} from './attributeTypes';

export const IMAGE_TYPE = {
  icon: 'LOGO/ICON',
  image: 'LOGO/IMAGE'
};

export const REGION_SHAPE = [
  {
    Name: REGION_TYPES.LINE,
    Icon: LineIcon,
    Cursor: ""
  },
  {
    Name: REGION_TYPES.POINT,
    Icon: PointIcon,
    Cursor: ""
  },
  {
    Name: REGION_TYPES.ERASER,
    Icon: EraserIcon,
    Cursor: ""
  },
  {
    Name: REGION_TYPES.CLICK,
    Icon: ClickIcon,
    Cursor: ""
  }
];

export const ATTRIBUTE_TYPES = [
  {
    Name: ATTRIBUTE_TYPE.NOSE,
    Color: "#C0392B"
  },
  {
    Name: ATTRIBUTE_TYPE.EYE,
    Color: "#E74C3C"
  },
  {
    Name: ATTRIBUTE_TYPE.EAR,
    Color: "#9B59B6"
  },
  {
    Name: ATTRIBUTE_TYPE.SHOULDER,
    Color: "#8E44AD"
  },
  {
    Name: ATTRIBUTE_TYPE.ELBOW,
    Color: "#2980B9"
  },
  {
    Name: ATTRIBUTE_TYPE.WRIST,
    Color: "#1ABC9C"
  },
  {
    Name: ATTRIBUTE_TYPE.HIP,
    Color: "#16A085"
  },
  {
    Name: ATTRIBUTE_TYPE.KNEE,
    Color: "#27AE60"
  },
  {
    Name: ATTRIBUTE_TYPE.ANKLE,
    Color: "#F1C40F"
  }
];