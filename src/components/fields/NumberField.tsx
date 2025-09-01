import type { Field } from "../../types/schema";
import type { UseFormRegister, FieldValues } from "react-hook-form";

type NumberFieldProps = {
  field: Field;
  register: UseFormRegister<FieldValues>;
  error?: string;
};

export function NumberField({ field, register, error }: NumberFieldProps) {
  return (
    <div style={{ marginBottom: "1em" }}>
      <label>{field.label}</label>
      <input
        {...register(field.label)}
        type="number"
        placeholder={field.label}
      />
      {error && <p style={{ color: "red", fontSize: "0.75em" }}>{error}</p>}
    </div>
  );
}
