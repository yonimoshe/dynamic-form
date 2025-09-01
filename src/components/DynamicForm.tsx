import { useState } from "react";
import {
  useForm,
  type UseFormRegister,
  type FieldValues,
} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { buildValidationSchema } from "../utils/buildValidationSchema";

import type { Field } from "../types/schema";
import type { JSX } from "react";
import type { DynamicFormProps } from "../types/props/DynamicFormProps";

import { InputField } from "./fields/InputField";
import { NumberField } from "./fields/NumberField";
import { SelectField } from "./fields/SelectField";
import { TextareaField } from "./fields/TextareaField";
import { Modal } from "./UIElements/Modal";
import "../styles/Form.css";

type FieldComponentProps = {
  field: Field;
  register: UseFormRegister<FieldValues>;
  error?: string;
};

const fieldComponentMap: Record<
  string,
  (props: FieldComponentProps) => JSX.Element
> = {
  input: InputField,
  input_number: NumberField,
  select: SelectField,
  textarea: TextareaField,
};

export default function DynamicForm({ schema }: DynamicFormProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submittedData, setSubmittedData] = useState<FieldValues | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<FieldValues>({
    resolver: yupResolver(buildValidationSchema(schema)) as any,
    mode: "onChange",
  });

  const onSubmit = (data: FieldValues) => {
    setSubmittedData(data);
    setIsModalOpen(true);
    reset();
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2>{schema.title}</h2>

        {schema.fields.map((field) => {
          const Component = fieldComponentMap[field.type];
          return Component ? (
            <Component
              key={field.label}
              field={field}
              register={register}
              error={errors[field.label]?.message as string | undefined}
            />
          ) : null;
        })}

        <button type="submit" disabled={!isValid}>
          Submit
        </button>
      </form>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h3>Your Personal Information received successfully!</h3>
        <ul style={{ listStyle: "none", padding: 0 }}>
          {Object.entries(submittedData || {}).map(([key, value]) => (
            <li key={key} style={{ marginBottom: "0.5em" }}>
              <strong>{key}:</strong> {String(value)}
            </li>
          ))}
        </ul>
      </Modal>
    </>
  );
}
