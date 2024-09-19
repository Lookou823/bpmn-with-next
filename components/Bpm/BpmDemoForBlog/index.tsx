import { useEffect, useState } from "react";

import Modeler from "bpmn-js/lib/Modeler";
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

  return <div id="canvas" style={{ width: 800, height: 600 }}></div>;
};

export default BpmDemo;
