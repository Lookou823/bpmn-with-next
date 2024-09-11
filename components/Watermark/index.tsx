import { useEffect, useRef } from "react";
import { nanoid } from "nanoid";

const WaterMark = ({ text = "这里是水印" }) => {
  const _text = text;
  const classNameRef = useRef<string>(`watermark-${nanoid()}`);

  useEffect(() => {
    createWaterDom(document.body!);
  }, []);
  const handleAddWaterMark = (str: string, element: any) => {
    let rotate = -25;
    let fontWeight = "normal";
    let fontSize = "14px";
    let fontFamily = "SimHei";
    let fontColor = "rgba(0, 0, 0, 0.25)";
    let rect = {
      width: 370,
      height: 300,
      left: 10,
      top: 150,
    };
    let can = document.createElement("canvas");
    can.className = "mark-canvas";
    let watermarkDiv = element;
    watermarkDiv.appendChild(can);
    can.width = rect.width;
    can.height = rect.height;
    can.style.display = "none";
    can.style.zIndex = "9999";

    let cans = can.getContext("2d")!;
    cans.rotate((rotate * Math.PI) / 180);
    cans.font = `${fontWeight} ${fontSize} ${fontFamily}`;
    cans.fillStyle = fontColor;
    cans.textAlign = "center";
    cans.textBaseline = "middle";
    cans.fillText(str, rect.left, rect.top);
    // 使用 canvas 生成图片
    const styleStr = `height: inherit !important; background-color: transparent !important; transform: inherit !important; visibility: visible !important; display: block !important; position: absolute !important; z-index: 99 !important; opacity: 1 !important; top: 0 !important; left: 0 !important; right: 0 !important; bottom: 0 !important; pointer-events: none !important; background-repeat: repeat !important; background-image: url(${can.toDataURL(
      "image/png"
    )}) !important;`;
    watermarkDiv.setAttribute("style", styleStr);
    // 生成之后删除多余的 canvas 元素
    let canvasDom = document.querySelector(".mark-canvas");
    if (canvasDom && canvasDom.parentElement) {
      canvasDom.parentElement.removeChild(canvasDom);
    }
  };

  const createWaterDom = (element: {
    appendChild: (arg0: HTMLDivElement) => void;
  }) => {
    let dom = document.createElement("div");
    dom.className = classNameRef.current;
    element.appendChild(dom);
    handleAddWaterMark(
      _text,
      document.querySelector(`.${classNameRef.current}`)
    );
  };
};

export default WaterMark;
