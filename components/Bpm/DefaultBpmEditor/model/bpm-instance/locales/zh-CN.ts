import type { BpmInstanceLocales } from './type';

export const zhCN: BpmInstanceLocales = {
  title: '名称',
  setPrefix: '设置',
  role: '角色选择',
  user: '用户选择',
  viriable: '变量',
  director: '发起人的',
  content: '内容',
  titlePlaceholder: '请输入名称',
  eventTypePlaceholder: '请选择事件类型',
  taskPeopleTypePlaceholder: '请选择审批人类型',
  multipleApprovalType: '多人审批时采用的审批方式',
  userPlaceholder: '请选择用户',
  rolePlaceholder: '请选择角色',
  viriablePlaceholder: '请输入变量名称',
  createdBy: {
    __self: '创建人',
    id: '创建人 ID',
    name: '创建人姓名',
  },
  createdAt: '创建于',
  modifiedAt: '修改于',
  comment: { __self: '评论', inBusinessOrder: '审批评论', placeholder: '发表评论' },
  sequenceType: {
    __self: '顺序流类型',
    DEFAULT: '默认顺序流',
    NORMAL: '普通顺序流',
    CONDITIONAL: '条件顺序流',
    placeholder: '请选择顺序流类型',
  },
  taskPeopleType: {
    __self: '审批人类型',
    ASSIGNEE: '用户',
    GROUPS: '角色',
    VARIABLE: '变量',
    APPLICANT_DIRECTOR: '上级主管',
  },
  eventType: {
    __self: '事件类型',
    COUNTER_SIGN: '会签',
    OR_SIGN: '或签',
  },
  nodeType: {
    __self: '节点类型',
    USER_TASK: '用户任务节点',
    CC_TASK: '抄送节点',
    SEQUENCE: '顺序流',
    START_NODE: '开始节点',
    END_NODE: '结束节点',
    GATEWAY_NODE: '网关',
    PROCESS: '流程',
    DEFAULT: '默认',
    COMMENT_NODE: '评论节点',
  },
  conditionalSequenceType: {
    __self: '分支类型',
    AGREE_BRANCH: '同意分支',
    REFUSE_BRANCH: '拒绝分支',
    placeholder: '请选择分支类型',
  },
  approvalStatus: {
    __self: '审批状态',
    APPROVING: '审批中',
    PASS: '审批通过',
    REFUSE: '审批拒绝',
    REVOKE: '已撤回',
  },
  carbonCopyNode: {
    __self: '抄送节点类型',
    APPROVAL_CC: '审批中抄送',
    APPROVAL_PASS_CC: '审批结束抄送',
    placeholder: '请选择抄送节点类型',
  },
  carbonCopyPeople: {
    __self: '抄送人',
    type: '抄送人类型',
    isNotNull: '请至少选择一种抄送人类型',
    placeholder: '请选择抄送人类型',
  },
  expression: {
    __self: '顺序流',
    placeholder: '请输入条件表达式',
    isNotNull: '请输入条件表达式!',
    isErrorFormat: '请输入正确的条件表达式！',
  },
};

export default zhCN;
