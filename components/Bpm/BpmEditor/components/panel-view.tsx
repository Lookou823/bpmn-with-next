import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  EditOutlined,
  MinusCircleOutlined,
  PlusOutlined,
  SaveOutlined,
} from "@ant-design/icons";
import {
  Button,
  Card,
  Drawer,
  Form,
  type FormInstance,
  Input,
  message,
  Select,
  Space,
} from "antd";

// import { RoleSelect } from "@manyun/auth-hub.ui.role-select";
// import { UserSelect } from "@manyun/auth-hub.ui.user-select";
import { NodeType, Sequence, TaskPeople } from "../model/bpm-instance/index";
import { getBpmInstanceLocales } from "../model/bpm-instance/index";
// import { DirectorSelect } from "@manyun/bpm.ui.director-select";
// import { VariableSelect } from "@manyun/bpm.ui.variable-select";

import styles from "../bpm-editor.module.css";

export type NodeUser = { label: string; value: string; key: string };
export type UserTaskFormValues = {
  isCounterSignedNode: boolean;
  taskPeopleType: any | null;
  candidateUsers: NodeUser[];
  candidateGroups: string[] | null;
  shiftUser: string | null;
};

export type SequenceFormValues = {
  sequenceType: any;
  expression: string;
};

export type CarbonCopyFormValues = {
  ccApprovalType: "APPROVAL_CC" | "APPROVAL_PASS_CC";
  ccPeoples: {
    type: string;
    codeList?: { key: number; label: string; value: number }[];
  }[];
};

export type PanelViewProps = {
  /** 需要.d.ts文件 */
  modeler: any;
  /** 需要.d.ts文件 */
  element: any;
  handleProcessName: (value: string) => void;
  setVisible: (value: boolean) => void;
  visible: boolean;
  processName: string;
  setProcessName: (name: string) => void;
  isProcessNameSaved: boolean;
  setIsProcessNameSaved: (param: boolean) => void;
};

const formItemLayoutWithOutLabel = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 16, offset: 6 },
  },
};
// 或签时的用户节点面板
const OrSignedPanel = ({
  form,
}: {
  form: FormInstance<UserTaskFormValues>;
}) => {
  const formTaskPeopleType = Form.useWatch("taskPeopleType", form);
  const locales = useMemo(() => getBpmInstanceLocales(), []);

  return (
    <Space direction="vertical" size={16} style={{ width: "100% " }}>
      <>
        <Card title={locales.multipleApprovalType} bordered={false}>
          <Form.Item
            label={locales.eventType.__self}
            rules={[{ required: true, message: locales.eventTypePlaceholder }]}
            name="isCounterSignedNode"
          >
            <Select
              placeholder={locales.eventTypePlaceholder}
              onChange={() => {
                form.setFieldsValue({ taskPeopleType: null });
              }}
              style={{ width: "170px" }}
            >
              <Select.Option value="COUNTER_SIGN">
                {locales.eventType.COUNTER_SIGN}
              </Select.Option>
              <Select.Option value="OR_SIGN">
                {locales.eventType.OR_SIGN}
              </Select.Option>
            </Select>
          </Form.Item>
        </Card>

        <Card
          title={`${locales.setPrefix}${locales.taskPeopleType.__self}`}
          bordered={false}
        >
          <Form.Item
            label={locales.taskPeopleType.__self}
            rules={[
              { required: true, message: locales.taskPeopleTypePlaceholder },
            ]}
            name="taskPeopleType"
          >
            <Select
              placeholder={locales.taskPeopleTypePlaceholder}
              style={{ width: "170px" }}
              options={[
                { value: "ASSIGNEE", label: locales.taskPeopleType.ASSIGNEE },
                { value: "GROUPS", label: locales.taskPeopleType.GROUPS },
                { value: "VARIABLE", label: locales.taskPeopleType.VARIABLE },
                {
                  value: "APPLICANT_DIRECTOR",
                  label: locales.taskPeopleType.APPLICANT_DIRECTOR,
                },
              ]}
            />
          </Form.Item>
          {formTaskPeopleType === TaskPeople.Groups && (
            <Form.Item
              label={locales.role}
              rules={[{ required: true, message: locales.rolePlaceholder }]}
              name="candidateGroups"
            >
              <Select />
            </Form.Item>
          )}
          {formTaskPeopleType === TaskPeople.Assignee && (
            <Form.Item
              label={locales.user}
              rules={[{ required: true, message: locales.userPlaceholder }]}
              name="candidateUsers"
            >
              <Select />
            </Form.Item>
          )}
          {formTaskPeopleType === TaskPeople.Variable && (
            <Form.Item
              label={`${locales.viriable}${locales.title}`}
              rules={[{ required: true, message: locales.viriablePlaceholder }]}
              name="shiftUser"
            >
              <Select />
            </Form.Item>
          )}

          {formTaskPeopleType === TaskPeople.Supervisor && (
            <Form.Item
              label={locales.director}
              rules={[{ required: true }]}
              name="director"
            >
              <Select />
            </Form.Item>
          )}
        </Card>
      </>
    </Space>
  );
};

// 抄送节点面板
const CcPanel = ({ form }: { form: FormInstance<CarbonCopyFormValues> }) => {
  const locales = useMemo(() => getBpmInstanceLocales(), []);

  const formCcPeoples = Form.useWatch("ccPeoples", form);
  const taskPeopleOptions = [
    { label: locales.taskPeopleType.ASSIGNEE, value: "ASSIGNEE" },
    { label: locales.taskPeopleType.GROUPS, value: "GROUPS" },
    { label: locales.taskPeopleType.VARIABLE, value: "VARIABLE" },
    {
      label: locales.taskPeopleType.APPLICANT_DIRECTOR,
      value: "APPLICANT_DIRECTOR",
    },
  ];
  const [ccPeopleTypeList, setCcPeopleList] =
    useState<{ label: string; value: string }[]>(taskPeopleOptions);

  useEffect(() => {
    if (formCcPeoples?.length) {
      const selectOptions = taskPeopleOptions;
      const formCcPeopleTypes = formCcPeoples.map(
        (data: { type: string }) => data?.type
      );

      setCcPeopleList(
        selectOptions.map((option) => {
          if (formCcPeopleTypes.includes(option.value)) {
            return { ...option, disabled: true };
          } else {
            return option;
          }
        })
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formCcPeoples]);

  return (
    <Space direction="vertical" size={16} style={{ width: "100% " }}>
      <Card
        title={`${locales.setPrefix}${locales.carbonCopyNode.__self}`}
        bordered={false}
      >
        <Form.Item
          label={locales.carbonCopyNode.__self}
          rules={[
            { required: true, message: locales.carbonCopyNode.placeholder },
          ]}
          name="ccApprovalType"
        >
          <Select
            placeholder={locales.carbonCopyNode.placeholder}
            style={{ width: "170px" }}
            options={[
              {
                label: locales.carbonCopyNode.APPROVAL_CC,
                value: "APPROVAL_CC",
              },
              {
                label: locales.carbonCopyNode.APPROVAL_PASS_CC,
                value: "APPROVAL_PASS_CC",
              },
            ]}
          />
        </Form.Item>
      </Card>
      <Card
        title={`${locales.setPrefix}${locales.carbonCopyPeople.__self}`}
        bordered={false}
      >
        <Form.List
          name="ccPeoples"
          rules={[
            {
              validator: async (_, ccPeoples) => {
                if (!ccPeoples || ccPeoples.length < 1 || !ccPeoples.length) {
                  return Promise.reject(
                    new Error(locales.carbonCopyPeople.isNotNull)
                  );
                } else {
                  return Promise.resolve();
                }
              },
            },
          ]}
        >
          {(fields, { add, remove }, { errors }) => (
            <>
              {fields.map((field, index) => (
                <div key={index}>
                  <Form.Item
                    label={locales.carbonCopyPeople.type}
                    rules={[
                      {
                        required: true,
                        message: locales.carbonCopyPeople.placeholder,
                      },
                    ]}
                    {...field}
                    name={[field.name, "type"]}
                    key={`${field.name}type`}
                  >
                    <Select
                      placeholder={locales.carbonCopyPeople.placeholder}
                      style={{ width: "170px" }}
                      onChange={(value) => {
                        const tempFormCcPeoples = formCcPeoples;

                        if (tempFormCcPeoples[field.name]?.type) {
                          tempFormCcPeoples[field.name].type = value;
                        }

                        if (!tempFormCcPeoples[field.name]?.type) {
                          tempFormCcPeoples[field.name] = { type: value };
                        }

                        if (tempFormCcPeoples[field.name]?.codeList) {
                          tempFormCcPeoples[field.name].codeList = [];
                        }
                        form.setFieldsValue({ ccPeoples: tempFormCcPeoples });
                      }}
                      options={ccPeopleTypeList}
                    ></Select>
                  </Form.Item>
                  {formCcPeoples?.length > 0 &&
                    formCcPeoples[field.name]?.type === TaskPeople.Groups && (
                      <Form.Item
                        label={locales.role}
                        rules={[
                          { required: true, message: locales.rolePlaceholder },
                        ]}
                        {...field}
                        name={[field.name, "codeList"]}
                        key={`${field.name}codeList`}
                      >
                        <Select />
                      </Form.Item>
                    )}
                  {formCcPeoples?.length > 0 &&
                    formCcPeoples[field.name]?.type === TaskPeople.Assignee && (
                      <Form.Item
                        label={locales.user}
                        rules={[
                          { required: true, message: locales.userPlaceholder },
                        ]}
                        {...field}
                        name={[field.name, "codeList"]}
                        key={`${field.name}codeList`}
                      >
                        <Select />
                      </Form.Item>
                    )}
                  {formCcPeoples?.length > 0 &&
                    formCcPeoples[field.name]?.type === TaskPeople.Variable && (
                      <Form.Item
                        label={`${locales.viriable}${locales.title}`}
                        rules={[
                          {
                            required: true,
                            message: locales.viriablePlaceholder,
                          },
                        ]}
                        {...field}
                        name={[field.name, "codeList"]}
                        key={`${field.name}codeList`}
                      >
                        <Select />
                      </Form.Item>
                    )}
                  {formCcPeoples?.length > 0 &&
                    formCcPeoples[field.name]?.type ===
                      TaskPeople.Supervisor && (
                      <Form.Item
                        label={locales.director}
                        rules={[{ required: true }]}
                        {...field}
                        name={[field.name, "codeList"]}
                        key={`${field.name}codeList`}
                      >
                        <Select />
                      </Form.Item>
                    )}
                  {fields.length > 1 ? (
                    <Form.Item
                      {...formItemLayoutWithOutLabel}
                      key={`${field.name}Button`}
                    >
                      <Button
                        type="dashed"
                        danger
                        onClick={() => {
                          remove(field.name);
                        }}
                        style={{
                          width: 170,
                        }}
                        icon={<MinusCircleOutlined />}
                      >
                        删除抄送人
                      </Button>
                    </Form.Item>
                  ) : null}
                </div>
              ))}

              <Form.Item {...formItemLayoutWithOutLabel}>
                <Button
                  type="dashed"
                  onClick={() => {
                    if (fields.length === 3) {
                      message.warning("最多支持添加3种类型的抄送人");
                      return;
                    }
                    add();
                  }}
                  style={{
                    width: 170,
                  }}
                  icon={<PlusOutlined />}
                >
                  添加抄送人
                </Button>
                <Form.ErrorList errors={errors} />
              </Form.Item>
            </>
          )}
        </Form.List>
      </Card>
    </Space>
  );
};
// 顺序流面板
const SequencePanel = ({
  form,
  element,
}: {
  form: FormInstance<SequenceFormValues>;
  /** 需要.d.ts */
  element: any;
}) => {
  // 由于有部分组件是根据sequenceType来决定是否渲染的，因此需要watch。
  const formSequenceType = Form.useWatch("sequenceType", form);
  const formExpression = Form.useWatch("expression", form);
  const [conditionStatus, setConditionStatus] = useState<"success" | "error">(
    "success"
  );
  const [conditionHelper, setConditionHelper] = useState("");
  const locales = useMemo(() => getBpmInstanceLocales(), []);

  useEffect(() => {
    const checkExpression = () => {
      const reg = /\$\{(.+?)}/;
      if (reg.test(formExpression)) {
        setConditionStatus("success");
        setConditionHelper("");
      } else if (!reg.test(formExpression) && formExpression) {
        setConditionStatus("error");
        setConditionHelper(locales.expression.isErrorFormat);
      } else {
        setConditionStatus("error");
        setConditionHelper(locales.expression.isNotNull);
      }
    };
    checkExpression();
  }, [
    element,
    formExpression,
    locales.expression.isErrorFormat,
    locales.expression.isNotNull,
  ]);
  const getSequenceTypeOptions = (isTargetNodeNotUserTask: boolean) => {
    const sequenceTypeOptions = [
      { label: locales.sequenceType.DEFAULT, value: "DEFAULT" },
      { label: locales.sequenceType.CONDITIONAL, value: "CONDITIONAL" },
      { label: locales.sequenceType.NORMAL, value: "NORMAL" },
    ];
    return isTargetNodeNotUserTask
      ? sequenceTypeOptions
      : sequenceTypeOptions.filter((option) => option.value !== "DEFAULT");
  };
  return (
    <Card
      title={`${locales.setPrefix}${locales.nodeType.SEQUENCE}`}
      bordered={false}
    >
      <Form.Item label={locales.sequenceType.__self} name="sequenceType">
        <Select
          placeholder={locales.sequenceType.placeholder}
          style={{ width: "170px" }}
          options={getSequenceTypeOptions(
            element?.businessObject?.sourceRef?.$type !== "bpmn:UserTask"
          )}
        />
      </Form.Item>

      {formSequenceType === Sequence.Conditional &&
        element?.businessObject?.sourceRef?.$type === "bpmn:UserTask" && (
          <Form.Item
            label={locales.conditionalSequenceType.__self}
            name="expression"
          >
            <Select
              placeholder={locales.conditionalSequenceType.placeholder}
              style={{ width: "170px" }}
              options={[
                // eslint-disable-next-line no-template-curly-in-string
                {
                  label: locales.conditionalSequenceType.AGREE_BRANCH,
                  value: "${result == 0}",
                },
                // eslint-disable-next-line no-template-curly-in-string
                {
                  label: locales.conditionalSequenceType.REFUSE_BRANCH,
                  value: "${result == 1}",
                },
              ]}
            />
          </Form.Item>
        )}
      {formSequenceType === Sequence.Conditional &&
        element?.businessObject?.sourceRef?.$type !== "bpmn:UserTask" && (
          <Form.Item
            validateStatus={conditionStatus}
            help={conditionHelper}
            label={locales.expression.__self}
            name="expression"
          >
            <Input
              placeholder={locales.expression.placeholder}
              style={{ width: "170px" }}
            ></Input>
          </Form.Item>
        )}
    </Card>
  );
};

export function PanelView({
  modeler,
  element,
  handleProcessName,
  setVisible,
  visible,
  processName,
  setProcessName,
  isProcessNameSaved,
  setIsProcessNameSaved,
}: PanelViewProps) {
  const [form] = Form.useForm();
  const formRef = useRef(null);
  const [name, setName] = useState("");
  const [nodeType, setNodeType] = useState<NodeType>(NodeType.Process);
  const locales = useMemo(() => getBpmInstanceLocales(), []);

  // useEffect(() => {
  //   const fetchUsers = async (list: string[]) => {
  //     if (list && list.length) {
  //       const { data } = await fetchUsersByIdsWeb({ userIds: list });
  //       form.setFieldsValue({
  //         candidateUsers: data.data.map(
  //           (item: { id: number; name: string }) => ({
  //             key: item.id,
  //             label: item.name,
  //             value: item.id,
  //           })
  //         ),
  //       });
  //     }
  //   };
  //   const fetchCcUsers = async (list: string[]) => {
  //     if (list && list.length) {
  //       const { data } = await fetchUsersByIdsWeb({ userIds: list });
  //       const ccPeoplesFormData = form.getFieldValue(["ccPeoples"]);
  //       ccPeoplesFormData.forEach(
  //         (element: {
  //           type: string;
  //           codeList: { key: number; label: string; value: number }[];
  //         }) => {
  //           if (element.type === TaskPeople.Assignee) {
  //             element.codeList = data.data.map(
  //               (item: { id: string; name: string }) => ({
  //                 key: item.id,
  //                 label: item.name,
  //                 value: item.id,
  //               })
  //             );
  //           }
  //         }
  //       );
  //       form.setFieldsValue({
  //         ccPeoples: ccPeoplesFormData,
  //       });
  //     }
  //   };
  //   form.setFieldsValue({ name: element?.businessObject?.name });
  //   setName(element?.businessObject?.name);
  //   // 确定传入的element类型，渲染不同的属性面板
  //   if (formRef.current) {
  //     switch (element?.businessObject.$type) {
  //       case "bpmn:ServiceTask": {
  //         setNodeType(NodeType.CcTask);
  //         initializeCcPeopleData(fetchCcUsers, element);
  //         break;
  //       }
  //       case "bpmn:UserTask":
  //         setNodeType(NodeType.UserTask);
  //         initializeUserTaskData(fetchUsers, element);
  //         break;
  //       case "bpmn:SequenceFlow":
  //         setNodeType(NodeType.Sequence);
  //         let elementSourceRef = element.businessObject.sourceRef;
  //         if (
  //           elementSourceRef &&
  //           elementSourceRef.default &&
  //           elementSourceRef.default.id === element.id
  //         ) {
  //           form.setFieldsValue({ sequenceType: Sequence.Default });
  //           form.setFieldsValue({ expression: undefined });
  //         } else if (!element.businessObject.conditionExpression) {
  //           form.setFieldsValue({ sequenceType: Sequence.Normal });
  //           form.setFieldsValue({ expression: undefined });
  //         } else {
  //           form.setFieldsValue({ sequenceType: Sequence.Conditional });
  //           const expression = element.businessObject.conditionExpression?.body;
  //           form.setFieldsValue({ expression: expression });
  //         }

  //         break;
  //       case "bpmn:Process":
  //         handleProcessName(element.businessObject.name);
  //         setNodeType(NodeType.Process);
  //         break;
  //       case "bpmn:StartEvent":
  //         setNodeType(NodeType.StartNode);

  //         break;
  //       case "bpmn:EndEvent":
  //         setNodeType(NodeType.EndNode);

  //         break;
  //       case "bpmn:ExclusiveGateway":
  //         setNodeType(NodeType.GatewayNode);

  //         break;
  //       default:
  //         setNodeType(NodeType.Default);

  //         break;
  //     }
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [element, form]);

  const initializeCcPeopleData = (
    fetchUsers: (list: string[]) => void,
    element: any
  ) => {
    const ccExpression = element?.businessObject.expression;
    if (ccExpression) {
      const { ccPeopleType, ccPeopleInfoData } =
        parseCcNodeExpressionInfo(ccExpression);
      const ccPeopleInfoJSONData = JSON.parse(ccPeopleInfoData);
      let ccAssigneeList: never[] = [];
      ccPeopleInfoJSONData.forEach(
        (element: { type: string; codeList: never[] }) => {
          if (element.type === TaskPeople.Assignee) {
            ccAssigneeList = element.codeList;
          }
        }
      );
      if (ccPeopleInfoData) {
        form.setFieldsValue({ ccPeoples: ccPeopleInfoJSONData });
        fetchUsers(ccAssigneeList);
      }
      form.setFieldsValue({
        ccApprovalType: ccPeopleType?.includes("PASS")
          ? "APPROVAL_PASS_CC"
          : "APPROVAL_CC",
      });
    } else {
      form.setFieldsValue({ ccPeoples: [] });
      form.setFieldsValue({ ccApprovalType: null });
    }
  };

  const initializeUserTaskData = (
    fetchUsers: (list: string[]) => void,
    element: any
  ) => {
    form.setFieldsValue({ shiftUser: null });
    // 会签
    if (
      element?.businessObject?.loopCharacteristics !== null &&
      element?.businessObject?.loopCharacteristics !== undefined
    ) {
      form.setFieldsValue({ isCounterSignedNode: "COUNTER_SIGN" });
      // eslint-disable-next-line no-template-curly-in-string
      if (element?.businessObject.assignee === "${assignee}") {
        initializeCounterSignedAssigneeNode(fetchUsers, element);
      } else {
        initializeCounterSignedGroupNode(element);
      }
    }
    // 或签
    else if (
      ((element?.businessObject?.loopCharacteristics === undefined ||
        element?.businessObject?.loopCharacteristics === null) &&
        element?.businessObject?.candidateUsers) ||
      element?.businessObject?.assignee ||
      element?.businessObject?.candidateGroups
    ) {
      form.setFieldsValue({ isCounterSignedNode: "OR_SIGN" });
      if (element?.businessObject.assignee) {
        initializeOrSignedAssigneeNode(fetchUsers, element);
      } else if (element?.businessObject.candidateUsers) {
        initializeOrSignedUsersNode(fetchUsers, element);
      } else if (element?.businessObject.candidateGroups) {
        initializeOrSignedGroupNode(fetchUsers, element);
      }
    } else if (
      !element?.businessObject?.candidateUsers &&
      !element?.businessObject?.assignee &&
      !element?.businessObject?.candidateGroups
    ) {
      initializeOthers();
    }
  };
  const initializeCounterSignedAssigneeNode = (
    fetchUsers: (list: string[]) => void,
    element: any
  ) => {
    // 用户
    const { approverType, approver } = getCounterSignedUserTaskApprover(
      element?.businessObject.loopCharacteristics.collection
    );

    form.setFieldsValue({ taskPeopleType: approverType });

    if (approverType === TaskPeople.Assignee) {
      if (approver?.length > 1) {
        fetchUsers(approver.split(","));
      } else {
        fetchUsers([approver]);
      }
    } else if (approverType === TaskPeople.Variable) {
      form.setFieldsValue({ shiftUser: approver });
    } else if (approverType === TaskPeople.Supervisor) {
      form.setFieldsValue({ director: approver });
    }

    form.setFieldsValue({ candidateGroups: null });
  };
  const initializeCounterSignedGroupNode = (element: any) => {
    const { approver } = getCounterSignedUserTaskApprover(
      element?.businessObject.loopCharacteristics.collection
    );
    // 角色
    form.setFieldsValue({ candidateGroups: approver });

    form.setFieldsValue({ taskPeopleType: TaskPeople.Groups });

    form.setFieldsValue({ candidateUsers: [] });
  };
  const initializeOrSignedAssigneeNode = (
    fetchUsers: (list: string[]) => void,
    element: any
  ) => {
    //用户
    const { approverType, approver } = getOrSignedUserTaskApprover(
      element?.businessObject.assignee
    );
    form.setFieldsValue({ taskPeopleType: approverType });

    if (approverType === TaskPeople.Assignee) {
      fetchUsers([approver]);
      form.setFieldsValue({ candidateGroups: null });
    }
  };
  const initializeOrSignedUsersNode = (
    fetchUsers: (list: string[]) => void,
    element: any
  ) => {
    const { approverType, approver } = getOrSignedUserTaskApprover(
      element?.businessObject.candidateUsers
    );
    form.setFieldsValue({ taskPeopleType: approverType });

    if (approverType === TaskPeople.Assignee) {
      form.setFieldsValue({ candidateGroups: null });
      fetchUsers(approver.split(","));
    } else if (approverType === TaskPeople.Supervisor) {
      form.setFieldsValue({ candidateGroups: null });
      form.setFieldsValue({ director: approver });
    } else {
      form.setFieldsValue({ candidateGroups: null });
      form.setFieldsValue({ shiftUser: approver });
    }
  };
  const initializeOrSignedGroupNode = (
    fetchUsers: (list: string[]) => void,
    element: any
  ) => {
    // 角色
    const { approverType, approver } = getOrSignedUserTaskApprover(
      element?.businessObject.candidateGroups
    );
    form.setFieldsValue({ taskPeopleType: approverType });

    form.setFieldsValue({ candidateGroups: approver });

    form.setFieldsValue({ candidateUsers: [] });
  };
  const initializeOthers = () => {
    form.setFieldsValue({ isCounterSignedNode: null });

    form.setFieldsValue({ candidateUsers: [] });

    form.setFieldsValue({ candidateGroups: null });

    form.setFieldsValue({ taskPeopleType: null });

    form.setFieldsValue({ shiftUser: null });
  };

  const getCounterSignedUserTaskApprover = (approverExpression: string) => {
    // eslint-disable-next-line
    const approverRegex = /(\'|\")(.+?)(\'|\")/gm;
    let matches;
    let phrases: string[] = [];
    while ((matches = approverRegex.exec(approverExpression)) !== null) {
      // 这是避免零宽度匹配的无限循环所必需的
      if (matches.index === approverRegex.lastIndex) {
        approverRegex.lastIndex++;
      }
      matches.forEach((match) => {
        if (isPhrase(match)) {
          phrases.push(match);
        }
      });
    }

    const [approverType, platformType, approver] = phrases;
    return { approverType, platformType, approver };
  };

  const getOrSignedUserTaskApprover = (approverExpression: string) => {
    // eslint-disable-next-line no-useless-escape
    const approverRegex = /(\'|\")(.+?)(\'|\")/gm;
    let matches;
    let phrases: string[] = [];
    while ((matches = approverRegex.exec(approverExpression)) !== null) {
      if (matches.index === approverRegex.lastIndex) {
        approverRegex.lastIndex++;
      }
      matches.forEach((match) => {
        if (isPhrase(match)) {
          phrases.push(match);
        }
      });
    }
    const [approverType, platformType, approver] = phrases;
    return { approverType, platformType, approver };
  };

  const parseCcNodeExpressionInfo = (ccNodeExpression: string) => {
    // eslint-disable-next-line no-useless-escape
    const nodeParamsRegex = /(?<=\()\S+(?=\))/gm;
    let matches;
    let phrases: string[] = [];
    while ((matches = nodeParamsRegex.exec(ccNodeExpression)) !== null) {
      if (matches.index === nodeParamsRegex.lastIndex) {
        nodeParamsRegex.lastIndex++;
      }
      matches.forEach((match) => {
        phrases.push(match);
      });
    }

    const [ccParams] = phrases;

    // eslint-disable-next-line no-useless-escape
    const nodePeopleInfoRegex = /(?<=\'\,\')\S+(?=\')/gm;
    let peopleInfomatches;
    let peopleInfophrases: string[] = [];
    while (
      (peopleInfomatches = nodePeopleInfoRegex.exec(ccNodeExpression)) !== null
    ) {
      if (peopleInfomatches.index === nodePeopleInfoRegex.lastIndex) {
        nodePeopleInfoRegex.lastIndex++;
      }
      peopleInfomatches.forEach((match) => {
        if (isPhrase(match)) {
          peopleInfophrases.push(match);
        }
      });
    }

    const [ccPeopleInfoData] = peopleInfophrases;
    const [, ccPeopleType] = ccParams.split(",");
    return { ccPeopleType, ccPeopleInfoData };
  };

  const isPhrase = (match: string) => {
    return match?.length >= 1 && !match.includes("'");
  };

  const generateCounterSignedApproverExpression = (
    taskPeopleType: string,
    value: string
  ) => {
    return `\${countersignService.queryTaskUsersOrGroups(execution,'${taskPeopleType}','DC_BRAIN','${value}')}`;
  };

  const generateOrSignedApproverExpression = (
    taskPeopleType: string,
    value: string
  ) => {
    return `\${taskUserService.queryTaskUsersOrGroups(execution,'${taskPeopleType}','DC_BRAIN','${value}')}`;
  };

  const generateCcPeopleExpression = (
    ccApprovalType: string,
    value: string
  ) => {
    return `\${processCcService.processCc(execution,'${ccApprovalType}','${value}')}`;
  };

  /**
   *
   * @description 调用bpm.modeling中的update方法，更新节点属性
   */
  const updateProperties = (properties: any) => {
    const modeling = modeler.get("modeling");
    modeling.updateProperties(element, properties);
  };
  /**
   *
   * @description 将输入框属性变化进行格式化，作为之后modeling中update方法的参数
   */
  const changeProperties = (event: any, type: string) => {
    const value = event.target.value;
    let properties = {} as any;
    properties[type] = value;
    element[type] = value;
    updateProperties(properties);
  };
  /**
   *
   * @description 将选择框属性变化进行格式化，作为之后modeling中update方法的参数
   */
  const changeSelectProperties = (value: string | null, type: string) => {
    let properties = {} as any;
    properties[type] = value;
    element[type] = value;
    updateProperties(properties);
  };

  const updateFlowType = (flowType: Sequence, element: any) => {
    let elementSource = element.source;
    let elementSourceRef = element.businessObject.sourceRef;

    // 正常条件类
    if (flowType === Sequence.Conditional) {
      let flowConditionRef = modeler
        .get("moddle")
        .create("bpmn:FormalExpression");
      modeler.get("modeling").updateProperties(element, {
        conditionExpression: flowConditionRef,
      });
      return;
    }
    // 默认路径
    if (flowType === Sequence.Default) {
      modeler.get("modeling").updateProperties(element, {
        conditionExpression: null,
      });
      modeler.get("modeling").updateProperties(elementSource, {
        default: element,
      });
      return;
    }
    // 正常路径，如果来源节点的默认路径是当前连线时，清除父元素的默认路径配置
    if (
      elementSourceRef?.default &&
      elementSourceRef.default?.id === element?.id
    ) {
      modeler.get("modeling").updateProperties(elementSource, {
        default: null,
      });
    }
    modeler.get("modeling").updateProperties(element, {
      conditionExpression: null,
    });
  };
  /**
   *
   * @description 更新会签节点的属性
   */
  const updateLoopCompletionCondition = (
    element: any,
    taskPeopleType: TaskPeople,
    value: string
  ) => {
    let completionCondition = null;
    completionCondition = modeler
      .get("moddle") // eslint-disable-next-line no-template-curly-in-string
      .create("bpmn:FormalExpression", {
        body: "${countersignTaskEndTag == 'FINISH'}",
      });

    modeler
      .get("modeling")
      .updateModdleProperties(
        element,
        element.businessObject.loopCharacteristics,
        {
          completionCondition,
          collection: generateCounterSignedApproverExpression(
            taskPeopleType,
            value
          ),
          elementVariable:
            taskPeopleType === TaskPeople.Groups ? "group" : "assignee",
          isSequential: false,
        }
      );
  };

  const updateConditionalFlowExpression = (
    element: any,
    expression: string
  ) => {
    modeler.get("modeling").updateProperties(element, {
      conditionExpression: modeler
        .get("moddle")
        .create("bpmn:FormalExpression", { body: expression }),
    });
  };

  const onFinish = () => {
    form.validateFields().then((val) => {
      // name属性是任务节点、抄送节点、顺序流节点共有的，因此不需要做条件判断
      changeProperties({ target: { value: val.name } }, "name");

      if (nodeType === NodeType.UserTask) {
        setUserTaskNode(
          val.isCounterSignedNode,
          val.taskPeopleType,
          val.shiftUser,
          val.director,
          val.candidateGroups,
          val.candidateUsers
        );
      } else if (nodeType === NodeType.Sequence) {
        updateFlowType(val.sequenceType, element);
        if (val.sequenceType === Sequence.Conditional) {
          updateConditionalFlowExpression(element, val.expression);
        }
        // eslint-disable-next-line no-template-curly-in-string
        if (val.expression === "${result == 0}") {
          changeProperties({ target: { value: "同意" } }, "name");
        }
        // eslint-disable-next-line no-template-curly-in-string
        else if (val.expression === "${result == 1}") {
          changeProperties({ target: { value: "拒绝" } }, "name");
        }
      } else if (nodeType === NodeType.CcTask) {
        const ccApprovalPeoples = form.getFieldValue(["ccPeoples"]);
        ccApprovalPeoples.forEach(
          (element: {
            type: string;
            codeList: ({ value: string } | string)[];
          }) => {
            if (element.type === TaskPeople.Assignee) {
              element.codeList = element.codeList.map((code) => {
                if (typeof code === "object") {
                  return code?.value;
                } else {
                  return code;
                }
              });
            }
          }
        );
        const ccApprovalType = form.getFieldValue(["ccApprovalType"]);
        refactorCcNodeId(element, ccApprovalType);
        setCcPeopleNode(ccApprovalType, JSON.stringify(ccApprovalPeoples));
      }
      message.success("保存成功！");
      setVisible(true);
    });
  };
  const refactorCcNodeId = (element: any, ccApprovalType: string) => {
    const value = element.businessObject.id.split("_");

    let pre =
      ccApprovalType === "APPROVAL_PASS_CC" ? ["CC_PASS"] : ["CC_APPROVAL"];
    if (value.length < 4) {
      pre = pre.concat(value);
      let newId = pre.join("_");

      modeler.get("modeling").updateProperties(element, {
        id: newId,
        di: { id: `${newId}_di` },
      });
    } else {
      let originId = [value[2], value[3]].join("_");
      pre = pre.concat(originId);
      let newId = pre.join("_");

      modeler.get("modeling").updateProperties(element, {
        id: newId,
        di: { id: `${newId}_di` },
      });
    }
  };
  const setCcPeopleNode = (
    ccApprovalType: string,
    ccApprovalPeoples: string
  ) => {
    changeSelectProperties(
      generateCcPeopleExpression(ccApprovalType, ccApprovalPeoples),
      "expression"
    );
  };

  const setUserTaskNode = (
    isCounterSignedNode: string,
    taskPeopleType: TaskPeople,
    shiftUser: string,
    director: string,
    candidateGroups: string,
    candidateUsers: NodeUser[]
  ) => {
    if (isCounterSignedNode === "COUNTER_SIGN") {
      setCounterSignedProcessNode(
        element,
        taskPeopleType,
        candidateUsers,
        candidateGroups,
        shiftUser,
        director
      );
    } else {
      setOrSignedProcessNode(
        element,
        taskPeopleType,
        candidateUsers,
        candidateGroups,
        shiftUser,
        director
      );
    }
  };

  const setOrSignedProcessNode = (
    element: any,
    taskPeopleType: TaskPeople,
    candidateUsers: string | NodeUser[],
    candidateGroups: string,
    shiftUser: string,
    director: string
  ) => {
    if (element.businessObject.loopCharacteristics) {
      modeler.get("modeling").updateProperties(element, {
        loopCharacteristics: null,
      });
    }
    // 用户
    if (taskPeopleType === TaskPeople.Assignee) {
      setOrSignedAssigneeNode(candidateUsers, taskPeopleType);
    }
    // 角色
    else if (taskPeopleType === TaskPeople.Groups) {
      setOrSignedCandidateGroupsNode(candidateGroups, taskPeopleType);
    } else if (taskPeopleType === TaskPeople.Variable) {
      setOrSignedVariableNode(taskPeopleType, shiftUser);
    } else {
      setOrSignedDirectorNode(taskPeopleType, director);
    }
  };

  const setOrSignedAssigneeNode = (
    candidateUsers: string | NodeUser[],
    taskPeopleType: TaskPeople
  ) => {
    let approvers = "";
    if (typeof candidateUsers !== "string" && candidateUsers.length > 1) {
      approvers = formatMultipleApproverExpression(candidateUsers);
      changeSelectProperties(
        generateOrSignedApproverExpression(taskPeopleType, approvers),
        "candidateUsers"
      );
      changeSelectProperties(null, "assignee");
      changeSelectProperties(null, "candidateGroups");
    } else if (
      typeof candidateUsers !== "string" &&
      candidateUsers.length === 1
    ) {
      approvers = "" + candidateUsers[0].key;
      changeSelectProperties(
        generateOrSignedApproverExpression(taskPeopleType, approvers),
        "assignee"
      );
      changeSelectProperties(null, "candidateUsers");
      changeSelectProperties(null, "candidateGroups");
    } else {
      changeSelectProperties(null, "candidateUsers");
      changeSelectProperties(null, "assignee");
    }
  };

  const setOrSignedCandidateGroupsNode = (
    candidateGroups: string,
    taskPeopleType: TaskPeople
  ) => {
    changeSelectProperties(
      generateOrSignedApproverExpression(taskPeopleType, candidateGroups),
      "candidateGroups"
    );
    changeSelectProperties(null, "assignee");
    changeSelectProperties(null, "candidateUsers");
  };

  const setOrSignedVariableNode = (
    taskPeopleType: TaskPeople,
    shiftUser: string
  ) => {
    changeSelectProperties(
      generateOrSignedApproverExpression(taskPeopleType, shiftUser),
      "candidateUsers"
    );
    changeSelectProperties(null, "assignee");
    changeSelectProperties(null, "candidateGroups");
  };

  const setOrSignedDirectorNode = (
    taskPeopleType: string,
    director: string
  ) => {
    changeSelectProperties(
      generateOrSignedApproverExpression(taskPeopleType, director),
      "candidateUsers"
    );
    changeSelectProperties(null, "assignee");
    changeSelectProperties(null, "candidateGroups");
  };

  const setCounterSignedProcessNode = (
    element: any,
    taskPeopleType: TaskPeople,
    candidateUsers: string | NodeUser[],
    candidateGroups: string,
    shiftUser: string,
    director: string
  ) => {
    const multiLoopInstance = modeler
      .get("moddle")
      .create("bpmn:MultiInstanceLoopCharacteristics");
    modeler.get("modeling").updateProperties(element, {
      loopCharacteristics: multiLoopInstance,
    });

    if (taskPeopleType === TaskPeople.Assignee) {
      setCounterSignedAssigneeNode(element, candidateUsers, taskPeopleType);
    } else if (taskPeopleType === TaskPeople.Groups) {
      setCounterSignedCandidateGroupsNode(
        element,
        candidateGroups,
        taskPeopleType
      );
    } else if (taskPeopleType === TaskPeople.Variable) {
      setCounterSignedVariableNode(element, shiftUser, taskPeopleType);
    } else {
      setCounterSignedDirectorNode(element, director, taskPeopleType);
    }
  };

  const setCounterSignedAssigneeNode = (
    element: any,
    candidateUsers: string | NodeUser[],
    taskPeopleType: TaskPeople
  ) => {
    let approvers = "";

    if (typeof candidateUsers !== "string" && candidateUsers.length > 1) {
      approvers = formatMultipleApproverExpression(candidateUsers);
      updateLoopCompletionCondition(element, taskPeopleType, approvers);
      // eslint-disable-next-line no-template-curly-in-string
      changeSelectProperties("${assignee}", "assignee");
      changeSelectProperties(null, "candidateUsers");
      changeSelectProperties(null, "candidateGroups");
    } else if (
      typeof candidateUsers !== "string" &&
      candidateUsers.length === 1
    ) {
      approvers = "" + candidateUsers[0].key;
      updateLoopCompletionCondition(element, taskPeopleType, approvers);
      // eslint-disable-next-line no-template-curly-in-string
      changeSelectProperties("${assignee}", "assignee");
      changeSelectProperties(null, "candidateUsers");
      changeSelectProperties(null, "candidateGroups");
    } else {
      changeSelectProperties(null, "candidateUsers");
      changeSelectProperties(null, "assignee");
    }
  };

  const setCounterSignedCandidateGroupsNode = (
    element: any,
    candidateGroups: string,
    taskPeopleType: TaskPeople
  ) => {
    updateLoopCompletionCondition(element, taskPeopleType, candidateGroups);
    // eslint-disable-next-line no-template-curly-in-string
    changeSelectProperties("${group}", "candidateGroups");
    changeSelectProperties(null, "assignee");
    changeSelectProperties(null, "candidateUsers");
  };

  const setCounterSignedVariableNode = (
    element: any,
    shiftUser: string,
    taskPeopleType: TaskPeople
  ) => {
    updateLoopCompletionCondition(element, taskPeopleType, shiftUser);
    // eslint-disable-next-line no-template-curly-in-string
    changeSelectProperties("${assignee}", "assignee");
    changeSelectProperties(null, "candidateUsers");
    changeSelectProperties(null, "candidateGroups");
  };

  const setCounterSignedDirectorNode = (
    element: any,
    director: string,
    taskPeopleType: TaskPeople
  ) => {
    updateLoopCompletionCondition(element, taskPeopleType, director);
    // eslint-disable-next-line no-template-curly-in-string
    changeSelectProperties("${assignee}", "assignee");
    changeSelectProperties(null, "candidateUsers");
    changeSelectProperties(null, "candidateGroups");
  };

  const formatMultipleApproverExpression = (approvers: NodeUser[]) => {
    let formattedExpression = "";
    for (let i = 0; i < approvers.length; i++) {
      if (approvers[i].key) {
        formattedExpression += `${approvers[i].key},`;
      }
    }
    return formattedExpression.substring(0, formattedExpression.length - 1);
  };
  const onClose = () => {
    setVisible(false);
  };
  const handleProcessNameClick = () => {
    if (processName === "") {
      message.error("流程名称不能为空");
    } else {
      setProcessName(processName);
      handleProcessName(processName);
      const allShapes = modeler.get("elementRegistry").getAll();
      const modeling = modeler.get("modeling");
      modeling.updateProperties(allShapes[0], { name: processName });
      setIsProcessNameSaved(true);
    }
  };
  const nodeName = locales.nodeType[nodeType];
  return (
    <>
      <Drawer
        forceRender
        title={nodeName}
        size="large"
        placement="right"
        onClose={onClose}
        open={visible}
        extra={
          <Space>
            <Button onClick={onClose}>取消</Button>
            <Button type="primary" onClick={onFinish}>
              保存
            </Button>
          </Space>
        }
      >
        <Form
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
          form={form}
          ref={formRef}
          // onFinish={onFinish}
        >
          <Card
            title={`${locales.setPrefix}${nodeName}${locales.title}`}
            bordered={false}
          >
            <Form.Item
              label={`${nodeName}${locales.title}`}
              rules={[
                {
                  required: isTaskNode(nodeType),
                  message: locales.titlePlaceholder,
                },
              ]}
              name="name"
            >
              <Input maxLength={12} style={{ width: "170px" }} />
            </Form.Item>
          </Card>
          {nodeType === NodeType.UserTask && <OrSignedPanel form={form} />}
          {nodeType === NodeType.CcTask && <CcPanel form={form} />}
          {nodeType === NodeType.Sequence && isStartNode(element) && (
            <SequencePanel form={form} element={element} />
          )}
        </Form>
      </Drawer>
      <Card id={styles.processName}>
        <Space>
          {`${locales.nodeType.PROCESS}${locales.title}:`}
          {!isProcessNameSaved ? (
            <Space>
              <Input
                value={processName}
                onChange={(e) => {
                  setProcessName(e.target.value);
                }}
                style={{ width: "170px" }}
                maxLength={15}
              />
              <SaveOutlined onClick={handleProcessNameClick} />
            </Space>
          ) : (
            <Space>
              {processName}
              <EditOutlined
                onClick={() => {
                  setIsProcessNameSaved(false);
                }}
              />
            </Space>
          )}
        </Space>
      </Card>
    </>
  );
}
const isStartNode = (element: any) => {
  return element?.businessObject?.sourceRef?.$type !== "bpmn:StartEvent";
};

const isTaskNode = (nodeType: NodeType) => {
  switch (nodeType) {
    case NodeType.UserTask:
      return true;
    case NodeType.Sequence:
      return false;
    case NodeType.CcTask:
      return true;
    default:
      return false;
  }
};
