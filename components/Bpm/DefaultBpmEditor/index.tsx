"use client";
import React, { useEffect, useState, useRef } from "react";
// import { useHistory } from "react-router-dom";
import {
  RedoOutlined,
  SaveOutlined,
  UndoOutlined,
  VerticalAlignBottomOutlined,
} from "@ant-design/icons";

import "bpmn-js/dist/assets/bpmn-font/css/bpmn-codes.css";
import "bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css";
// 左边工具栏以及编辑节点的样式
import "bpmn-js/dist/assets/bpmn-font/css/bpmn.css";
import "bpmn-js/dist/assets/diagram-js.css";
// @ts-ignore: Could not find a declaration file
import BpmnModeler from "bpmn-js/lib/Modeler";
// @ts-ignore: Could not find a declaration file
import camundaModdleDescriptor from "camunda-bpmn-moddle/resources/camunda";
import { Button, Card, message, Space } from "antd";
import {
  BpmnPropertiesPanelModule,
  BpmnPropertiesProviderModule,
} from "bpmn-js-properties-panel";
// import propertiesProviderModule from "bpmn-js-properties-panel/lib/provider/camunda";

import "bpmn-js-properties-panel/dist/"; // 右边工具栏样式

// import { generateBpmEditUrl } from "@manyun/bpm.route.bpm-routes";
// import { fetchBpm } from "@manyun/bpm.service.fetch-bpm";
// import { mutateBpm } from "@manyun/bpm.service.mutate-bpm";

import styles from "./bpm-editor.module.css";
import CustomPaletteProvider from "./components/CustomPalette";
import CustomContentPadProvider from "./components/content-pad";
import { PanelView } from "./components/panel-view";
import { defaultEmpty } from "./components/testxml";
import customTranslate from "./customTranslate/customTranslate";
import { defaultXML } from "./defaultXML";

export type BpmEditorProps = {
  /**
   *   根据该code的值区分当前页面是新建还是编辑
   */
  code?: string;
};

function DefaultBpmEditor({ code }: BpmEditorProps) {
  const renderFlag = useRef();
  // bpm对象
  // 需要.d.ts文件，对element类型进行类型定义
  const [bpmnModeler, setBpmnModeler] = useState<any | null>(null);
  // 传给属性面板的节点对象
  // 需要.d.ts文件，对element类型进行类型定义
  const [bpmNode, setBpmNode] = useState<any | null>(null);
  // 汉化
  const customTranslateModule = { translate: ["value", customTranslate] };
  // processName
  const [name, setName] = useState("");
  const [processName, setProcessName] = useState("");
  // 抽屉
  const [visible, setVisible] = useState(false);
  const [isProcessNameSaved, setIsProcessNameSaved] = useState<boolean>(true);
  const [bpmXml, setBpmXml] = useState(
    defaultEmpty(
      `Process_${new Date().getTime()}`,
      `Event1_${new Date().getTime()}`,
      `Event2_${new Date().getTime()}`,
      `Activity_${new Date().getTime()}`,
      `Flow1_${new Date().getTime()}`,
      `Flow2_${new Date().getTime()}`
    )
  );

  // 链接跳转
  // const history = useHistory();
  useEffect(() => {
    if (!bpmnModeler && !renderFlag.current) {
      console.log("挂载一次");
      renderFlag.current = true;
      initBpmn();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bpmnModeler]);

  useEffect(() => {
    if (bpmnModeler) {
      var link = document.createElement("link");
      link.rel = "stylesheet";
      link.href =
        "https://unpkg.com/@bpmn-io/properties-panel/dist/assets/properties-panel.css";
      document.head.appendChild(link);

      // importxml是异步的，所以后续的操作得写进回调函数中
      bpmnModeler.importXML(defaultXML).then(() => {
        //初始化使得流程图居中
        bpmnModeler.get("canvas").zoom("fit-viewport", "auto");
        const allShapes = bpmnModeler.get("elementRegistry").getAll();
        setBpmNode(allShapes[0]);
        setProcessName(allShapes[0].businessObject.name);
        addEventBusListener();
      });

      // bpmnModeler.importXML("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bpmnModeler]);
  const handleProcessName = (value: string) => {
    setName(value);
  };
  // 初始化流程图
  const initBpmn = () => {
    setBpmnModeler(
      new BpmnModeler({
        container: "#canvas", // 这里为数组的第一个元素

        propertiesPanel: {
          parent: "#properties",
        },
        additionalModules: [
          // customTranslateModule,
          // CustomPaletteProvider as any,
          // CustomContentPadProvider,
          // 右边的属性栏
          BpmnPropertiesPanelModule,
          BpmnPropertiesProviderModule,
          // { labelEditingProvider: ["value", ""] },
        ],
        // 键盘快捷键
        keyboard: {
          bindTo: window,
        },
        // addis: { CustomPaletteProvider, CustomContentPadProvider },
        moddleExtensions: {
          camunda: camundaModdleDescriptor,
          // activiti: activitiModdleDescriptor,
        },
      })
    );
  };

  // 监听 element
  const addEventBusListener = () => {
    const eventBus = bpmnModeler.get("eventBus"); // 需要使用 eventBus
    const allShapes = bpmnModeler.get("elementRegistry").getAll();
    const eventType = [
      "element.click",
      "element.dblclick",
      "element.changed",
      "shape.added",
    ]; // 需要监听的事件集合
    let addFlag = false;
    let lineFlag = false;
    // eventType.forEach((eventType) => {
    //   // 重构下面的监听事件逻辑 todo
    //   // 需要.d.ts文件进行类型定义
    //   eventBus.on(eventType, (e: any) => {
    //     if (e.type === "shape.added") {
    //       addFlag = true;
    //       lineFlag = false;
    //     } else if (e.type === "element.changed") {
    //       if (!isNewElement(e.element.id)) {
    //         if (
    //           e.element?.businessObject?.targetRef?.id &&
    //           e.element.type === "bpmn:SequenceFlow"
    //         ) {
    //           addFlag = true;
    //         }
    //         if (e.element.type === "bpmn:UserTask") {
    //           initailizeUserTaskName(e.element);
    //           // 如果是会签任务，则需要加上监听器
    //           if (e.element.businessObject.loopCharacteristics) {
    //             updateElementExtensions(e.element);
    //           }
    //           // 如果不是会签任务，则设置监听器为空
    //           if (!e.element.businessObject.loopCharacteristics) {
    //             deleteElementExtensions(e.element);
    //           }
    //         }
    //         if (e.element.type === "bpmn:ServiceTask") {
    //           initailizeServiceTaskName(e.element);
    //         }
    //         if (addFlag && e.element.type !== "bpmn:SequenceFlow") {
    //           addFlag = false;

    //           updateElementExtensions2(e.element);
    //         }
    //         if (
    //           lineFlag === false &&
    //           e.element.type !== "bpmn:SequenceFlow" &&
    //           e.element.type !== "bpmn:ExclusiveGateway"
    //         ) {
    //           setBpmNode(e.element);
    //         }
    //         if (e.element.type === "bpmn:SequenceFlow") {
    //           setConditionalLine(e.element);
    //           setBpmNode(e.element);
    //         }
    //       } else {
    //         if (e.element?.type !== "label") {
    //           setBpmNode(allShapes[0]);
    //         }
    //       }
    //     } else if (e.type === "element.dblclick") {
    //       setBpmNode(e.element);
    //       if (e.element.type !== "bpmn:Process" && e.element.type !== "label") {
    //         setVisible(true);
    //       } else {
    //         setVisible(false);
    //       }
    //     } else {
    //       setBpmNode(allShapes[0]);
    //       // setVisible(true);
    //     }
    //   });
    // });
  };

  const bpmUndo = () => {
    bpmnModeler.get("commandStack").undo();
  };
  const bpmRedo = () => {
    bpmnModeler.get("commandStack").redo();
  };

  const isNewElement = (id: string) => {
    const allShapes = bpmnModeler
      .get("elementRegistry")
      .getAll()
      .map((item: { id: string }) => item.id);

    return allShapes.indexOf(id) === -1;
  };

  const initailizeUserTaskName = (element: any) => {
    if (!element.businessObject?.name) {
      element["name"] = "审批";
      bpmnModeler.get("modeling").updateProperties(element, {
        name: "审批",
      });
    }
  };

  const initailizeServiceTaskName = (element: any) => {
    if (element?.name === undefined) {
      element["name"] = "抄送";
      bpmnModeler.get("modeling").updateProperties(element, {
        name: "抄送",
      });
    }
  };

  const setConditionalLine = (element: any) => {
    if (
      element?.businessObject?.sourceRef?.$type === "bpmn:UserTask" &&
      element?.businessObject?.targetRef?.$type === "bpmn:UserTask" &&
      element?.name === undefined
    ) {
      element["name"] = "同意";
      bpmnModeler.get("modeling").updateProperties(element, {
        name: "同意",
      });
      let condition;
      // eslint-disable-next-line no-template-curly-in-string
      let body = "${result == 0}";
      condition = bpmnModeler
        .get("moddle")
        .create("bpmn:FormalExpression", { body });
      bpmnModeler.get("modeling").updateProperties(element, {
        // eslint-disable-next-line no-template-curly-in-string
        conditionExpression: condition,
      });
    }
  };

  /**
   *
   * @description 格式化生成监听器数值，用于后续update方法的调用
   */
  const createListenerObject = (isTask: boolean, prefix: string) => {
    const listenerObj = Object.create(null);
    // isTask && (listenerObj.id = options.id); // 任务监听器特有的 id 字段
    if (isTask) {
      listenerObj.event = "complete";

      // eslint-disable-next-line no-template-curly-in-string
      listenerObj.expression =
        "${countersignService.taskComplete('ALL_PASS',task)}";
    } else {
      listenerObj.event = "start";

      // eslint-disable-next-line no-template-curly-in-string
      listenerObj.delegateExpression = "${processFinishListener}";
    }

    return bpmnModeler
      .get("moddle")
      .create(
        `${prefix}:${isTask ? "TaskListener" : "ExecutionListener"}`,
        listenerObj
      );
  };
  /**
   *
   * @description 删除或签用户任务的监听器
   */
  const deleteElementExtensions = (element: any) => {
    if (element.businessObject?.extensionElements) {
      bpmnModeler.get("modeling").updateProperties(element, {
        extensionElements: null,
      });
    }

    const value = element.businessObject.id.split("_");

    if (value.length === 3) {
      let newId = [value[1], value[2]].join("_");

      bpmnModeler.get("modeling").updateProperties(element, {
        id: newId,
        di: { id: `${newId}_di` },
      });
    }
  };
  /**
   *
   * @description 新增会签用户任务的监听器,并修改任务id
   */
  const updateElementExtensions = (element: any) => {
    let bpmnElementListeners =
      element.businessObject?.extensionElements?.values?.filter(
        (ex: any) => ex.$type === `camunda:TaskListener`
      ) ?? [];
    if (!bpmnElementListeners.length) {
      const lbj = createListenerObject(true, "camunda");
      bpmnElementListeners.push(lbj);

      let otherExtensionList =
        element.businessObject?.extensionElements?.values?.filter(
          (ex: any) => ex.$type !== `camunda:TaskListener`
        ) ?? [];

      let all = otherExtensionList.concat(bpmnElementListeners);
      const extensions = bpmnModeler
        .get("moddle")
        .create("bpmn:ExtensionElements", {
          values: all,
        });
      bpmnModeler.get("modeling").updateProperties(element, {
        extensionElements: extensions,
      });
    }
    const value = element.businessObject.id.split("_");

    let pre = ["Countersign"];
    if (value.length < 3) {
      pre = pre.concat(value);
      let newId = pre.join("_");

      bpmnModeler.get("modeling").updateProperties(element, {
        id: newId,
        di: { id: `${newId}_di` },
      });
    }
  };
  /**
   *
   * @description 更新开始、结束节点的监听器
   */
  const updateElementExtensions2 = (element: any) => {
    if (element.type === "bpmn:EndEvent") {
      let bpmnElementListeners =
        element.businessObject?.extensionElements?.values?.filter(
          (ex: any) => ex.$type === `camunda:ExecutionListener`
        ) ?? [];
      if (!bpmnElementListeners.length) {
        const lbj = createListenerObject(false, "camunda");
        bpmnElementListeners.push(lbj);

        let otherExtensionList =
          element.businessObject?.extensionElements?.values?.filter(
            (ex: any) => ex.$type !== `camunda:ExecutionListener`
          ) ?? [];

        let all = otherExtensionList.concat(bpmnElementListeners);
        const extensions = bpmnModeler
          .get("moddle")
          .create("bpmn:ExtensionElements", {
            values: all,
          });

        bpmnModeler.get("modeling").updateProperties(element, {
          name: "结束",
          extensionElements: extensions,
        });
      }
    } else if (element.type === "bpmn:StartEvent") {
      bpmnModeler.get("modeling").updateProperties(element, {
        name: "开始",
      });
    }
  };

  // xml格式处理函数
  const changeXml = (
    xml: string,
    currentKeyWord: string,
    targetKeyWord: string
  ) => {
    return xml.replace(new RegExp(currentKeyWord, "g"), targetKeyWord);
  };

  // 导出bpmn类型文件
  const exportXML = async () => {
    try {
      const allShapes = bpmnModeler.get("elementRegistry").getAll();

      const { svg } = await bpmnModeler.saveSVG();

      let { href, filename } = setEncoded(
        "SVG",
        allShapes[0].businessObject.name,
        svg
      );
      downloadFunc(href, filename);
    } catch (e) {}
  };
  function downloadFunc(href: string, filename: string) {
    if (href && filename) {
      let a = document.createElement("a");
      a.download = filename; //指定下载的文件名
      a.href = href; //  URL对象
      a.click(); // 模拟点击
      URL.revokeObjectURL(a.href); // 释放URL 对象
    }
  }
  // 根据所需类型进行转码并返回下载地址
  const setEncoded = (type: string, filename = "diagram", data: string) => {
    const encodedData = encodeURIComponent(data);
    return {
      filename: `${filename}.${type}`,
      href: `data:application/${
        type === "svg" ? "text/xml" : "bpmn20-xml"
      };charset=UTF-8,${encodedData}`,
      data: data,
    };
  };
  const uploadBackEndXML = async (code: string | undefined, name: string) => {
    try {
      const result = await bpmnModeler.saveXML({ format: true });
      const { xml } = result;
      let xml2 = changeXml(
        JSON.parse(JSON.stringify(xml)),
        "camunda:",
        "activiti:"
      );
      uploadXML(code, changeXml(xml2, "&#39;", "'"), name);
    } catch (err) {}
  };
  const judgeInvalidConfig = () => {
    let count = 0;
    const allShapes = bpmnModeler.get("elementRegistry").getAll();
    for (const item of allShapes) {
      if (
        item.businessObject.$type === "bpmn:EndEvent" &&
        item.type !== "label"
      ) {
        count += 1;
      }
    }

    return count === 1;
  };

  const judgeInvalidConditionalFlow = () => {
    const allShapes = bpmnModeler.get("elementRegistry").getAll();
    var reg = /\$\{(.+?)}/;

    for (const item of allShapes) {
      if (
        item.businessObject.$type === "bpmn:SequenceFlow" &&
        item.type !== "label"
      ) {
        if (item.businessObject.conditionExpression) {
          if (!item.businessObject.conditionExpression.body?.length) {
            return 1;
          } else if (!reg.test(item.businessObject.conditionExpression?.body)) {
            return 2;
          }
        }
      }
    }

    return 0;
  };

  const judgeInvalidConfigStart = () => {
    let count = 0;
    const allShapes = bpmnModeler.get("elementRegistry").getAll();
    for (const item of allShapes) {
      if (
        item.businessObject.$type === "bpmn:StartEvent" &&
        item.type !== "label"
      ) {
        count += 1;
      }
    }

    return count === 1;
  };

  const judgeInvalidData = () => {
    const allShapes = bpmnModeler.get("elementRegistry").getAll();
    let flag = true;
    let name = true;
    let nodeCurrentName = "";
    let nodeName = true;
    let elementId = "";
    allShapes.forEach((element: any) => {
      if (element.businessObject.$type !== "bpmn:Process") {
        if (
          element.businessObject.$type === "bpmn:StartEvent" ||
          element.businessObject.$type === "bpmn:EndEvent"
        ) {
          if (!element.businessObject.name) {
            nodeName = false;
            elementId = element.businessObject.id;
          }
        }

        if (element.businessObject.$type === "bpmn:UserTask") {
          if (
            !element.businessObject.assignee &&
            !element.businessObject.candidateUsers &&
            !element.businessObject.candidateGroups
          ) {
            flag = false;
            nodeCurrentName = element.businessObject.name;
            elementId = element.businessObject.id;
          }
          if (!element.businessObject.name) {
            nodeName = false;
            elementId = element.businessObject.id;
          }
        }
      }
      if (element.businessObject.$type === "bpmn:Process") {
        if (!element.businessObject.name) {
          name = false;
        }
      }
    });
    return { flag, id: elementId, name, nodeName, nodeCurrentName };
  };
  // 编辑或者保存
  const uploadXML = async (
    code: string | undefined,
    xml: string,
    name: string
  ) => {
    const invalidData = judgeInvalidData();
    const invalidConfig = judgeInvalidConfig();
    const invalidConfigStart = judgeInvalidConfigStart();
    const invalidConditionalFlow = judgeInvalidConditionalFlow();
    if (
      invalidData.flag &&
      invalidData.name &&
      invalidData.nodeName &&
      invalidConfig &&
      invalidConfigStart &&
      invalidConditionalFlow === 0 &&
      isProcessNameSaved
    ) {
      // const res = await mutateBpm({ code, xml, name });
      // if (res.error || !res.data) {
      //   message.error(res.error?.message);
      // } else if (res.data) {
      //   message.success("保存成功");
      //   history.push(generateBpmEditUrl({ processCode: code ?? res.data }));
      // }
    } else {
      if (!invalidConfigStart) {
        message.error("流程有且只有一个开始节点！");
      } else if (!invalidConfig) {
        message.error("流程有且只有一个结束节点！");
      } else if (invalidConditionalFlow === 1) {
        message.error("条件顺序流缺少条件表达式！");
      } else if (invalidConditionalFlow === 2) {
        message.error("条件顺序流的条件表达式不规范！");
      } else if (!invalidData.flag) {
        message.error(
          `名称为${invalidData.nodeCurrentName}的节点缺少用户或角色信息！`
        );
      } else if (!invalidData.nodeName) {
        message.error(`编号${invalidData.id}的节点缺少名称`);
      } else if (!isProcessNameSaved) {
        message.error("流程名称未保存！");
      } else {
        message.error("缺少流程名称！");
      }
    }
  };
  return (
    <div id={styles.editorPage}>
      <div id="canvas" className={styles.container}></div>
      <div
        id="properties"
        style={{ position: "absolute", top: 20, right: 40, width: 400 }}
      ></div>

      {/* {bpmnModeler && (
        <PanelView
          modeler={bpmnModeler}
          isProcessNameSaved={isProcessNameSaved}
          setIsProcessNameSaved={setIsProcessNameSaved}
          element={bpmNode}
          visible={visible}
          setVisible={setVisible}
          processName={processName}
          handleProcessName={handleProcessName}
          setProcessName={setProcessName}
        />
      )} */}
    </div>
  );
}

export default DefaultBpmEditor;
