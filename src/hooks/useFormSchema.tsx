import { useEffect, useState } from "react";
import { fetchSchema } from "../api/schemaApi";
import type { FormSchema } from "../types/schema";

function getErrorMessage(err: unknown): string {
  if (err instanceof Error) return err.message;
  return "Unknown error";
}

export function useFormSchema() {
  const [schema, setSchema] = useState<FormSchema[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadSchema = async () => {
      try {
        const data = await fetchSchema();
        setSchema(data);
        setError(null);
      } catch (err: unknown) {
        setError(getErrorMessage(err));
      } finally {
        setLoading(false);
      }
    };

    loadSchema();
  }, []);

  return { schema, loading, error };
}
