const shapeStyle: ShapeStyle = {
  top: 0,
  left: 0,
};

const compList = [
  {
    id: "",
    label: "文字",
    component: "v-text",
  },
  {
    id: "",
    label: "按钮",
    component: "v-button",
  },
  {
    id: "",
    label: "图片",
    component: "v-image",
  },
];

const componentList: ComponentItem[] = compList.map((m) => {
  return {
    ...m,
    shapeStyle: shapeStyle,
  };
});

export { componentList };
