import type { Field } from "../../types/schema";
import type { UseFormRegister, FieldValues } from "react-hook-form";

type SelectFieldProps = {
  field: Field;
  register: UseFormRegister<FieldValues>;
  error?: string;
};

export function SelectField({ field, register, error }: SelectFieldProps) {
  return (
    <div style={{ marginBottom: "1em" }}>
      <label>{field.label}</label>
      <select {...register(field.label)}>
        <option value="">Select...</option>
        {field.options?.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.key}
          </option>
        ))}
      </select>
      {error && <p style={{ color: "red", fontSize: "0.75em" }}>{error}</p>}
    </div>
  );
}
