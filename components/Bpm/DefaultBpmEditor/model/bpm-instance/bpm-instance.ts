// import type { LocaleCode } from 'react-intl';
import {cloneDeep} from 'lodash';

import type {
  ApprovalStatus,
  BackendBpmInstance,
  FormattedContent,
  ProcessRecord,
} from './backend-bpm-instance';
import { getBpmInstanceLocales } from './locales';
import type { BpmInstanceLocales } from './locales';

export type BpmInstanceJSON<F = any> = {
  code: string /**BpmInstance code */;
  title: string;
  bizId: string;
  bizType: string;
  content: string | null;
  oaType: string;
  idc: string | null;
  blockGuid: string | null;
  room: string | null;
  reason: string | null;
  formJson: F | null /**解析后的json数据 */;
  status: ApprovalStatus;
  applyUser: number;
  applyUserName: string;
  creatorId: number;
  creatorName: string;
  applyTime: number;
  operationRecords: ProcessRecord[];
  xml: string;
  sla: number;
  bizTypeSla: number;
  msgId?: string | null;
  msgParentType?: string | null;
  msgSecondType?: string | null;
  formattedContent?: FormattedContent[];
  attachmentType?: string | null;
};
export class BpmInstance<F = any> {
  static fromApiObject<F = any>(object: BackendBpmInstance) {
    const copy = cloneDeep(object);

    return new BpmInstance<F>(
      (copy.processInstanceCode || copy.instId)!,
      copy.title,
      copy.bizId,
      copy.bizType,
      copy.content,
      copy.oaType,
      copy.idcTag,
      copy.blockGuid,
      copy.roomTag,
      (copy.reason || copy.approvalReason)!,
      BpmInstance.getParsedFromJSON<F>(copy.formJson),
      (copy.status || copy.instStatus)!,
      (copy.applyUserId ?? copy.applicantId)!,
      (copy.applyUserName || copy.applicantName)!,
      copy.creatorId,
      copy.creatorName,
      (copy.applyTime || copy.gmtCreate)!,
      copy.operationRecords,
      copy.processXml,
      copy.sla,
      copy.bizTypeSla,
      copy.attachmentType,
      copy.msgId,
      copy.msgParentType,
      copy.msgSecondType,
      copy.instId,
      copy.taskId,
      BpmInstance.getFormattedContent(copy.content)
    );
  }

  static fromJSON(json: BpmInstanceJSON) {
    const copy = cloneDeep(json);

    return (
      copy.code,
      copy.title,
      copy.bizId,
      copy.bizType,
      copy.content,
      copy.oaType,
      copy.idc,
      copy.blockGuid,
      copy.room,
      copy.reason,
      copy.formJson,
      copy.status,
      copy.applyUser,
      copy.applyUserName,
      copy.creatorId,
      copy.creatorName,
      copy.applyTime,
      copy.operationRecords,
      copy.xml,
      copy.sla,
      copy.bizTypeSla,
      copy.msgId,
      copy.msgParentType,
      copy.msgSecondType,
      copy.attachmentType,
      copy.content
    );
  }

  private _localeCode: any = 'zh-CN';
  private _locales: BpmInstanceLocales;

  constructor(
    public code: string /**BpmInstance code */,
    public title: string,
    public bizId: string,
    public bizType: string,
    public content: string | null,
    public oaType: string,
    public idc: string | null,
    public blockGuid: string | null,
    public room: string | null,
    public reason: string | null,
    /** 解析后的json数据 */
    public formJson: F | null,
    public status: ApprovalStatus,
    public applyUser: number,
    public applyUserName: string,
    public creatorId: number,
    public creatorName: string,
    public applyTime: number,
    public operationRecords: ProcessRecord[],
    public xml: string,
    public sla: number,
    public bizTypeSla: number,
    public attachmentType: string | null,
    public msgId?: string | null,
    public msgParentType?: string | null,
    public msgSecondType?: string | null,
    public instId?: string,
    public taskId?: string,
    public formattedContent?: FormattedContent[]
  ) {
    this._locales = getBpmInstanceLocales(this._localeCode);
  }

  public set locales(locales: BpmInstanceLocales) {
    this._locales = locales;
  }

  public get locales() {
    return this._locales;
  }

  public toApiObject(): BackendBpmInstance {
    return cloneDeep({
      processInstanceCode: this.code,
      title: this.title,
      bizId: this.bizId,
      bizType: this.bizType,
      content: this.content ?? '',
      oaType: this.oaType,
      idcTag: this.idc,
      blockGuid: this.blockGuid,
      roomTag: this.room,
      reason: this.reason,
      formJson: JSON.stringify(this.formJson),
      status: this.status,
      instStatus: this.status,
      applyUserId: this.applyUser,
      applyUserName: this.applyUserName,
      creatorId: this.creatorId,
      creatorName: this.creatorName,
      applyTime: this.applyTime,
      operationRecords: this.operationRecords,
      processXml: this.xml,
      sla: this.sla,
      bizTypeSla: this.bizTypeSla,
      msgId: this.msgId,
      msgParentType: this.msgParentType,
      msgSecondType: this.msgSecondType,
      taskId: this.taskId,
      instId: this.instId,
      approvalReason: this.reason ?? '',
      gmtCreate: this.applyTime,
      attachmentType: this.attachmentType,
    });
  }

  public toJSON(): BpmInstanceJSON {
    return cloneDeep({
      code: this.code,
      title: this.title,
      bizId: this.bizId,
      bizType: this.bizType,
      content: this.content,
      oaType: this.oaType,
      idc: this.idc,
      blockGuid: this.blockGuid,
      room: this.room,
      reason: this.reason,
      formJson: this.formJson /**解析后的json数据 */,
      status: this.status,
      applyUser: this.applyUser,
      applyUserName: this.applyUserName,
      creatorId: this.creatorId,
      creatorName: this.creatorName,
      applyTime: this.applyTime,
      operationRecords: this.operationRecords,
      xml: this.xml,
      sla: this.sla,
      bizTypeSla: this.bizTypeSla,
      attachmentType: this.attachmentType,
      msgId: this.msgId,
      msgParentType: this.msgParentType,
      msgSecondType: this.msgSecondType,
      instId: this.instId,
      taskId: this.taskId,
      formattedContent: this.formattedContent,
    });
  }

  static getParsedFromJSON<F = any>(formJson: string | null): F | null {
    if (formJson == null) {
      return null;
    }
    try {
      return JSON.parse(formJson);
    } catch (e) {
      return null;
    }
  }
  /**
   *
   * @param content
   * @example
   * ```ts
   * content:'目标设备_\\c_B1-1冷却水泵配电柜03_\\n_上下线类型_\\c_上线'
   * //result
   * [{label: "目标设备",value: "B1-1冷却水泵配电柜03"},{label: "上下线类型",value: "上线"}]
   * ```
   * @returns
   */
  static getFormattedContent(content: string) {
    const n = '_\\n_';
    const old_n = '，';
    const c = '_\\c_';
    const old_c = '：';
    const nRegex = /_\\n_/g;
    const old_nRegex = /，/g;
    const endRegex = /;/g;
    const newContent = content.replace(endRegex, '');

    let firstText;
    let firstRegex;
    let second: string;
    if (content.includes(n) && content.includes(c)) {
      firstRegex = nRegex;
      second = c;
    } else if (content.includes(old_n) && content.includes(old_c)) {
      firstRegex = old_nRegex;
      second = old_c;
    }
    if (firstRegex) {
      firstText = newContent.split(firstRegex);
      return firstText.map((text: string) => {
        const [label, ...rest] = text.split(second);

        return {
          label,
          value: rest.join(old_c),
        };
      });
    }
    second = content.includes(c) ? c : old_c;
    const [label, ...rest] = newContent.split(second);

    return [
      {
        label,
        value: rest.join(old_c),
      },
    ];
  }
}
