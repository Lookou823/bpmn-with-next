
import zhCN from './zh-CN';

export type { BpmInstanceLocales } from './type';

export function getBpmInstanceLocales(localeCode: any = 'zh-CN') {
  switch (localeCode) {
    case 'zh-CN':
      return zhCN;
    default:
      return zhCN;
  }
}
