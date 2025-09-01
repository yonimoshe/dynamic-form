import type { TechnicalErrorProps } from "../../types/props/TechnicalErrorProps";

export default function TechnicalError({
  message,
  onRetry,
}: TechnicalErrorProps) {
  return (
    <div style={{ textAlign: "center", color: "red", padding: "1.25em" }}>
      <p>⚠️ Technical Error: {message}</p>
      {onRetry && <button onClick={onRetry}>Retry</button>}
    </div>
  );
}
