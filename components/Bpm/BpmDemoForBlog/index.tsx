import { useEffect, useState } from "react";
import "bpmn-js/dist/assets/bpmn-font/css/bpmn-codes.css";
import "bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css";
import "bpmn-js/dist/assets/bpmn-font/css/bpmn.css";
import "bpmn-js/dist/assets/diagram-js.css";
import "bpmn-js/dist/assets/bpmn-js.css";
import { Button } from "antd";
import Modeler from "bpmn-js/lib/Modeler";
import styles from "./bpm-demo-for-blog.module.css";
const bpmnXMLString = `<?xml version="1.0" encoding="UTF-8"?>
<bpmn:definitions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" xmlns:di="http://www.omg.org/spec/DD/20100524/DI" id="Definitions_17n1c2u" targetNamespace="http://bpmn.io/schema/bpmn" exporter="bpmn-js (https://demo.bpmn.io)" exporterVersion="17.7.1">
  <bpmn:process id="Process_1q0g8bt" isExecutable="false">
    <bpmn:startEvent id="StartEvent_0hcpxtn">
      <bpmn:outgoing>Flow_0c7xmc2</bpmn:outgoing>
    </bpmn:startEvent>
    <bpmn:task id="Activity_1xe73bk" name="海石">
      <bpmn:incoming>Flow_0c7xmc2</bpmn:incoming>
      <bpmn:outgoing>Flow_0ox8xns</bpmn:outgoing>
    </bpmn:task>
    <bpmn:sequenceFlow id="Flow_0c7xmc2" sourceRef="StartEvent_0hcpxtn" targetRef="Activity_1xe73bk" />
    <bpmn:endEvent id="Event_0vau36o">
      <bpmn:incoming>Flow_0ox8xns</bpmn:incoming>
    </bpmn:endEvent>
    <bpmn:sequenceFlow id="Flow_0ox8xns" sourceRef="Activity_1xe73bk" targetRef="Event_0vau36o" />
  </bpmn:process>
  <bpmndi:BPMNDiagram id="BPMNDiagram_1">
    <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Process_1q0g8bt">
      <bpmndi:BPMNShape id="_BPMNShape_StartEvent_2" bpmnElement="StartEvent_0hcpxtn">
        <dc:Bounds x="152" y="102" width="36" height="36" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Activity_1xe73bk_di" bpmnElement="Activity_1xe73bk">
        <dc:Bounds x="240" y="80" width="100" height="80" />
        <bpmndi:BPMNLabel />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Event_0vau36o_di" bpmnElement="Event_0vau36o">
        <dc:Bounds x="392" y="102" width="36" height="36" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNEdge id="Flow_0c7xmc2_di" bpmnElement="Flow_0c7xmc2">
        <di:waypoint x="188" y="120" />
        <di:waypoint x="240" y="120" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_0ox8xns_di" bpmnElement="Flow_0ox8xns">
        <di:waypoint x="340" y="120" />
        <di:waypoint x="392" y="120" />
      </bpmndi:BPMNEdge>
    </bpmndi:BPMNPlane>
  </bpmndi:BPMNDiagram>
</bpmn:definitions>`;
const BpmDemo = () => {
  const [bpmnModeler, setBpmnModeler] = useState<any | null>(null);

  console.log("123");
  console.log("123");
  console.log("123");
  console.log("123");
  console.log("123");
  console.log("123");

  console.log("456");
  console.log("456");
  console.log("456");
  console.log("456");
  console.log("456");
  console.log("456");
  useEffect(() => {
    setBpmnModeler(new Modeler({ container: "#canvas" }));
    return () => {
      // 步骤1: 清理画布
      const canvasContainer = document.querySelector("#canvas");
      if (canvasContainer) {
        canvasContainer.innerHTML = ""; // 清空画布内容
      } // 步骤2: 释放实例
      setBpmnModeler(null);
    };
  }, []);

  useEffect(() => {
    if (bpmnModeler) {
      (async function () {
        await bpmnModeler.importXML(bpmnXMLString);
      })();
    }
  }, [bpmnModeler]);

  const fileDownload = (href: string, filename: string) => {
    if (href && filename) {
      let aLink = document.createElement("a");
      aLink.download = filename; //指定下载的文件名
      aLink.href = href; //  URL对象
      aLink.click(); // 模拟点击
      document.body.removeChild(aLink); // 从文档中移除a标签
      URL.revokeObjectURL(aLink.href); // 释放URL 对象
    }
  };

  // 根据所需类型进行转码并返回下载地址
  const encodedFile = (type: string, filename = "diagram", data: string) => {
    const encodedData = encodeURIComponent(data);
    return {
      filename: `${filename}.${type}`,
      href: `data:application/${
        type === "svg" ? "text/xml" : "bpmn20-xml"
      };charset=UTF-8,${encodedData}`,
      data: data,
    };
  };

  const exportXML = async () => {
    try {
      const allShapes = bpmnModeler.get("elementRegistry").getAll();

      const { svg } = await bpmnModeler.saveSVG();

      const { href, filename } = encodedFile(
        "SVG",
        allShapes[0].businessObject.name,
        svg
      );
      fileDownload(href, filename);
    } catch (e) {}
  };

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <div id="canvas" style={{ width: "100%", height: "100%" }} />
      <Button
        style={{ position: "absolute", top: 20, right: "50%" }}
        size="small"
        onClick={() => {
          exportXML();
        }}
      >
        导出
      </Button>
    </div>
  );
};

export default BpmDemo;
