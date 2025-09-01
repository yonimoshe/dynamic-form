import type { Field } from "../../types/schema";
import type { UseFormRegister, FieldValues } from "react-hook-form";

type TextareaFieldProps = {
  field: Field;
  register: UseFormRegister<FieldValues>;
  error?: string;
};

export function TextareaField({ field, register, error }: TextareaFieldProps) {
  return (
    <div style={{ marginBottom: "1em" }}>
      <label>{field.label}</label>
      <textarea {...register(field.label)} placeholder={field.label}></textarea>
      {error && <p style={{ color: "red", fontSize: "0.75em" }}>{error}</p>}
    </div>
  );
}
