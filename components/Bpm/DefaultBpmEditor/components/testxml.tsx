export const defaultEmpty = (
  key: string,
  startKey: string,
  endKey: string,
  taskKey: string,
  lineKey: string,
  lineKey2: string
) => {
  return ` <?xml version="1.0" encoding="UTF-8"?>
  <definitions xmlns="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" xmlns:di="http://www.omg.org/spec/DD/20100524/DI" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:camunda="http://camunda.org/schema/1.0/bpmn" xmlns:activiti="http://activiti.org/bpmn" xmlns:tns="http://www.activiti.org/testm1642385801933" xmlns:xsd="http://www.w3.org/2001/XMLSchema" id="m1642385801933" name="" targetNamespace="http://www.activiti.org/testm1642385801933">
    <process id="${key}" name="默认流程" isExecutable="true">
      <startEvent id="${startKey}" name="开始">
        <outgoing>Flow_05u1v18</outgoing>
      </startEvent>
      <sequenceFlow id="${lineKey}" sourceRef="${startKey}" targetRef="${taskKey}" />
      <userTask id="${taskKey}" name="审批">
        <incoming>Flow_05u1v18</incoming>
        <outgoing>Flow_09zovlk</outgoing>
      </userTask>
      <endEvent id="${endKey}" name="结束">
      <extensionElements>
      <camunda:executionListener delegateExpression="\${processFinishListener}" event="start" />
    </extensionElements>
        <incoming>Flow_09zovlk</incoming>
      </endEvent>
      <sequenceFlow id="${lineKey2}" sourceRef="${taskKey}" targetRef="${endKey}" />
    </process>
    <bpmndi:BPMNDiagram id="BPMNDiagram_1">
      <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="${key}">
        <bpmndi:BPMNEdge id="Flow_05u1v18_di" bpmnElement="${lineKey}">
          <di:waypoint x="-632" y="-180" />
          <di:waypoint x="-580" y="-180" />
        </bpmndi:BPMNEdge>
        <bpmndi:BPMNEdge id="Flow_09zovlk_di" bpmnElement="${lineKey2}">
          <di:waypoint x="-480" y="-180" />
          <di:waypoint x="-428" y="-180" />
        </bpmndi:BPMNEdge>
        <bpmndi:BPMNShape id="Event_1unogsh_di" bpmnElement="${startKey}">
          <dc:Bounds x="-668" y="-198" width="36" height="36" />
          <bpmndi:BPMNLabel>
            <dc:Bounds x="-660" y="-155" width="22" height="14" />
          </bpmndi:BPMNLabel>
        </bpmndi:BPMNShape>
        <bpmndi:BPMNShape id="Activity_186yvb8_di" bpmnElement="${taskKey}">
          <dc:Bounds x="-580" y="-220" width="100" height="80" />
        </bpmndi:BPMNShape>
        <bpmndi:BPMNShape id="Event_1glpkh3_di" bpmnElement="${endKey}">
          <dc:Bounds x="-428" y="-198" width="36" height="36" />
          <bpmndi:BPMNLabel>
            <dc:Bounds x="-420" y="-155" width="22" height="14" />
          </bpmndi:BPMNLabel>
        </bpmndi:BPMNShape>
      </bpmndi:BPMNPlane>
    </bpmndi:BPMNDiagram>
  </definitions>
  `;
};
