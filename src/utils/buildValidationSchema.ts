import * as yup from "yup";
import type { AnySchema } from "yup";
import type { FormSchema, Field } from "../types/schema";

function formatMessage(message: string, value: number | string) {
  return message.replace("{{value}}", String(value));
}

export function buildValidationSchema(schema: FormSchema) {
  const shape: Record<string, AnySchema> = {};

  schema.fields.forEach((field: Field) => {
    let validator: AnySchema;

    switch (field.type) {
      case "input":
      case "textarea":
        validator = yup.string();
        break;
      case "input_number":
        validator = yup.number().typeError("Must be a number");
        break;
      case "select":
        validator = yup.string();
        break;
      default:
        validator = yup.mixed();
    }

    if (field.rules.required?.value) {
      validator = validator.required(field.rules.required.error_message);
    }

    if (field.label.toLowerCase() === "email" && field.rules.regex?.value) {
      validator = (validator as yup.StringSchema).matches(
        new RegExp(field.rules.regex.value as string),
        field.rules.regex.error_message
      );
    } else {
      if (field.rules.min?.value) {
        validator =
          field.type === "input_number"
            ? (validator as yup.NumberSchema).min(
                field.rules.min.value as number,
                formatMessage(
                  field.rules.min.error_message,
                  field.rules.min.value as number
                )
              )
            : (validator as yup.StringSchema).min(
                field.rules.min.value as number,
                formatMessage(
                  field.rules.min.error_message,
                  field.rules.min.value as number
                )
              );
      }

      if (field.rules.max?.value) {
        validator =
          field.type === "input_number"
            ? (validator as yup.NumberSchema).max(
                field.rules.max.value as number,
                formatMessage(
                  field.rules.max.error_message,
                  field.rules.max.value as number
                )
              )
            : (validator as yup.StringSchema).max(
                field.rules.max.value as number,
                formatMessage(
                  field.rules.max.error_message,
                  field.rules.max.value as number
                )
              );
      }

      if (field.rules.regex?.value && field.type !== "input_number") {
        validator = (validator as yup.StringSchema).matches(
          new RegExp(field.rules.regex.value as string),
          field.rules.regex.error_message
        );
      }
    }

    shape[field.label] = validator;
  });

  return yup.object().shape(shape);
}
