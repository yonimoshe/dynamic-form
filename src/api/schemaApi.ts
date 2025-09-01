import type { FormSchema } from "../types/schema";

const SCHEMA_URL = import.meta.env.VITE_SCHEMA_URL as string;

export async function fetchSchema(): Promise<FormSchema[]> {
  const res = await fetch(SCHEMA_URL, {
    headers: {
      Accept: "application/json",
    },
  });
  if (!res.ok) {
    throw new Error(`Failed to fetch schema: ${res.statusText}`);
  }
  const data: FormSchema[] = await res.json();
  return data;
}
