import type {
  ApprovalStatus,
  BackendBpmEventType,
  BackendCarbonCopyApprovalType,
  BackendConditionalSequenceType,
  BackendSequenceType,
  BackendTaskPeopleType,
  NodeType,
} from '../backend-bpm-instance';

export type BpmInstanceLocales = {
  title: string;
  setPrefix: string;
  role: string;
  user: string;
  viriable: string;
  director: string;
  content: string;
  titlePlaceholder: string;
  eventTypePlaceholder: string;
  taskPeopleTypePlaceholder: string;
  userPlaceholder: string;
  rolePlaceholder: string;
  viriablePlaceholder: string;
  multipleApprovalType: string;
  createdBy: {
    __self: string;
    id: string;
    name: string;
  };
  createdAt: string;
  modifiedAt: string;
  comment: {
    __self: string;
    inBusinessOrder: string;
    placeholder: string;
  };
  sequenceType: Record<'__self' | BackendSequenceType | 'placeholder', string>;
  taskPeopleType: Record<'__self' | BackendTaskPeopleType, string>;
  eventType: Record<'__self' | BackendBpmEventType, string>;
  nodeType: Record<'__self' | NodeType, string>;
  conditionalSequenceType: Record<
    '__self' | BackendConditionalSequenceType | 'placeholder',
    string
  >;
  approvalStatus: Record<'__self' | ApprovalStatus, string>;
  carbonCopyNode: Record<'__self' | BackendCarbonCopyApprovalType | 'placeholder', string>;
  carbonCopyPeople: Record<'__self' | 'type' | 'placeholder' | 'isNotNull', string>;
  expression: Record<'__self' | 'placeholder' | 'isNotNull' | 'isErrorFormat', string>;
};
