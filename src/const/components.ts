import { keys } from "lodash";

const shapeStyle: ShapeStyle = {
  top: 0,
  left: 0,
};

const compList = [
  {
    id: "",
    label: "文字",
    component: "v-text",
    sizeStyle: {
      width: 200,
      height: 100,
    },
  },
  {
    id: "",
    label: "按钮",
    component: "v-button",
    sizeStyle: {
      width: 60,
      height: 30,
    },
  },
  {
    id: "",
    label: "图片",
    component: "v-image",
    sizeStyle: {
      width: 100,
      height: 100,
    },
  },
];

const componentList: ComponentItem[] = compList.map((m) => {
  return {
    ...m,
    shapeStyle: shapeStyle,
  };
});

// 八个点

const initialAngle = {
  // 每个点对应的初始角度
  lt: (Math.PI * 7) / 4,
  t: 0,
  rt: Math.PI / 4,
  r: Math.PI / 2,
  rb: (Math.PI * 3) / 4,
  b: Math.PI,
  lb: (Math.PI * 5) / 4,
  l: (Math.PI * 3) / 2,
};

type PointKey = keyof typeof initialAngle;

const pointList: PointKey[] = keys(initialAngle) as PointKey[];

interface AngleToCursor {
  range: [number, number];
  cursor: string;
  desc: string;
}

const angleToCursor: AngleToCursor[] = [
  // 每个范围的角度对应的光标
  { range: [-Math.PI / 8, Math.PI / 8], cursor: "n", desc: "上" }, //上
  { range: [Math.PI / 8, (Math.PI * 3) / 8], cursor: "ne", desc: "上右" }, //上右
  { range: [(Math.PI * 3) / 8, (Math.PI * 5) / 8], cursor: "e", desc: "右" }, //右
  {
    range: [(Math.PI * 5) / 8, (Math.PI * 7) / 8],
    cursor: "se",
    desc: "下右",
  }, //下右
  { range: [(Math.PI * 7) / 8, (Math.PI * 9) / 8], cursor: "s", desc: "下" }, //下
  {
    range: [(Math.PI * 9) / 8, (Math.PI * 11) / 8],
    cursor: "sw",
    desc: "下左",
  }, //下左
  {
    range: [(Math.PI * 11) / 8, (Math.PI * 13) / 8],
    cursor: "w",
    desc: "左",
  }, //左
  {
    range: [(Math.PI * 13) / 8, (Math.PI * 15) / 8],
    cursor: "nw",
    desc: "上左",
  }, //上左
];

export { componentList, initialAngle, PointKey, pointList, angleToCursor };
