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

export { componentList };
