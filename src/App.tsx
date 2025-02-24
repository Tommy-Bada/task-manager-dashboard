import { Route, Routes } from "react-router-dom";
import "./index.css";
import AllTasksScreen from "./screens/AllTasksScreen";
import TaskCategoryScreen from "./screens/TaskCategoryScreen";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<AllTasksScreen />} />
        <Route
          path="/to-do"
          element={<TaskCategoryScreen title="To-Do Tasks" status="To-Do" />}
        />
        <Route
          path="/in-progress"
          element={
            <TaskCategoryScreen
              title="In Progress Tasks"
              status="In Progress"
            />
          }
        />
        <Route
          path="/completed"
          element={
            <TaskCategoryScreen title="Completed Tasks" status="Completed" />
          }
        />
      </Routes>
    </>
  );
}

export default App;
