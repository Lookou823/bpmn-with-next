
export type FormattedContent = { label: string; value: string };
export type TaskRedirectInfo = { sourceUserId: number; targetUserId: number; redirectTime: number };

export type ProcessUser = {
  id: string;
  userName: string;
  /** 工号 */
  jobNo: string | null;
  mobile: string | null;
  email: string | null;
};

export enum ApprovalStatus {
  Pass = 'PASS',
  Approving = 'APPROVING',
  Refuse = 'REFUSE',
  Revoke = 'REVOKE',
}
export type OaType = 'LOCAL';
export enum NodeStatus {
  AlreadyExecute = 'ALREADY_EXECUTE',
  Execute = 'EXECUTE',
  NotExecute = 'NOT_EXECUTE',
  Refuse = 'REFUSE',
}
export enum BatchOperationResult {
  Passed,
  Rejected,
}

export type CcUser = ProcessUser & {
  ccMsgIsRead: boolean;
};

export enum NodeType {
  /** 用户任务节点 */
  UserTask = 'USER_TASK',
  /** 抄送任务节点 */
  CcTask = 'CC_TASK',
  /** 顺序流节点 */
  Sequence = 'SEQUENCE',
  /** 流程节点 */
  Process = 'PROCESS',
  /** 流程开始节点 */
  StartNode = 'START_NODE',
  /** 流程结束节点 */
  EndNode = 'END_NODE',
  /** 网关 */
  GatewayNode = 'GATEWAY_NODE',
  /** 默认 */
  Default = 'DEFAULT',
  /** 评论节点 */
  CommentNode = 'COMMENT_NODE',
}
export enum TaskPeople {
  /** 用户 */
  Assignee = 'ASSIGNEE',
  /** 角色 */
  Groups = 'GROUPS',
  /** 变量 */
  Variable = 'VARIABLE',
  /** 上级主管 */
  Supervisor = 'APPLICANT_DIRECTOR',
}
export enum Sequence {
  /** 默认顺序流 */
  Default = 'DEFAULT',
  /** 普通顺序流 */
  Normal = 'NORMAL',
  /** 条件顺序流 */
  Conditional = 'CONDITIONAL',
}
export type BackendSequenceType = `${Sequence}`;
export type BackendTaskPeopleType = `${TaskPeople}`;

export type BackendBpmEventType = 'COUNTER_SIGN' /** 会签 */ | 'OR_SIGN' /** 或签 */;
export type MissUserType =
  | 'NO_ROLE' /** 没有配置任何角色，对应missId为null */
  | 'MISS_USER' /** 配置用户不存在或者离职，对应missId为用户id，多个missId通过 ',' 分隔，currId为当前关注人Id */
  | 'MISS_ROLE' /** 角色不存在或者角色下的人员不存在，对应missId为角色code，currId为当前关注人Id */;
export type BackendConditionalSequenceType =
  | 'AGREE_BRANCH' /** 同意分支 */
  | 'REFUSE_BRANCH'; /** 拒绝分支 */
export type BackendCarbonCopyApprovalType =
  | 'APPROVAL_CC' /** 审批中抄送 */
  | 'APPROVAL_PASS_CC' /** 审批结束抄送 */;

export type ProcessTask = {
  date: string;
  // 流程节点状态的新字段
  taskResult: string | null;
  remark: string | null;
  taskId: string | null;
  /** 是否属于异常节点 */
  missUser: boolean;
  /** 异常节点信息，包括类型、提示信息 */
  missUserInfo: { type: MissUserType; missId: string; currId: string }[];
  // 因为要实现会签，所以该字段变成数组类型
  userList: ProcessUser[];
  taskRedirectInfoList: TaskRedirectInfo[];
  taskFileInfoList: any[];
};
export type ProcessCommentInfo = {
  commentTime: number;
  content: string;
  deleteTime: number | null;
  id: number;
  isDeleted: boolean;
  personId: number;
  personName: string;
};
export type ProcessRecord = {
  operationName: string | null;
  operationType: string;
  operationTasks: ProcessTask[] | null;
  nodeId: string;
  ccUserList: CcUser[] | null;
  isCountersignNode: boolean;
  nodeType: string;
  processCommentInfo: ProcessCommentInfo | null;
};
export type BackendBpmInstance = {
  processInstanceCode: string;
  title: string;
  bizId: string;
  bizType: string;
  content: string;
  oaType: string;
  idcTag: string | null;
  blockGuid: string | null;
  roomTag: string | null;
  reason: string | null;
  formJson: string | null;
  status: ApprovalStatus;
  applyUserId: number;
  applyUserName: string;
  creatorId: number;
  creatorName: string;
  applyTime: number;
  operationRecords: ProcessRecord[];
  processXml: string;
  sla: number;
  bizTypeSla: number;
  msgId?: string | null;
  msgParentType?: string | null;
  msgSecondType?: string | null;
  instId?: string;
  taskId?: string;
  approvalReason?: string;
  gmtCreate?: number;
  instStatus?: string;
  applicantId?: number;
  applicantName?: string;
  attachmentType: string | null;
};
