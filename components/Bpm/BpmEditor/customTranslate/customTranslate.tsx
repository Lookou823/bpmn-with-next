import translations from './translations';

export default function customTranslate(template: string, replacements: any) {
  replacements = replacements || {};

  // Translate
  template = translations[template] || template;

  // Replace
  return template.replace(/{([^}]+)}/g, function (_: any, key: string) {
    return replacements[key] || '{' + key + '}';
  });
}
