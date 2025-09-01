import Loader from "./components/UIElements/Loader";
import TechnicalError from "./components/UIElements/TechnicalError";
import DynamicForm from "./components/DynamicForm";
import { useFormSchema } from "./hooks/useFormSchema";

function App() {
  const { schema, loading, error } = useFormSchema();

  if (loading) return <Loader />;
  if (error)
    return (
      <TechnicalError
        message={error}
        onRetry={() => window.location.reload()}
      />
    );
  if (!schema) return <TechnicalError message="No schema found" />;

  return <DynamicForm schema={schema[0]} />;
}

export default App;
