export type FieldType = "input" | "input_number" | "select" | "textarea";

export interface RuleConfig {
  value: string | number | boolean | null;
  error_message: string;
}

export interface FieldRules {
  required?: RuleConfig;
  min?: RuleConfig;
  max?: RuleConfig;
  regex?: RuleConfig;
}

export interface FieldOption {
  key: string;
  value: string;
}

export interface Field {
  type: FieldType;
  label: string;
  rules: FieldRules;
  options?: FieldOption[];
}

export interface FormSchema {
  title: string;
  fields: Field[];
}
