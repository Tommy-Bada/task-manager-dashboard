import "./index.css";
import Sidebar from "./components/layout/Sidebar";
import TaskCard from "./components/task/TaskCard";
import TaskForm from "./components/task/TaskForm";

function App() {
  return (
    <>
      <Sidebar />
      <TaskCard
        priority="medium"
        title="Publish First Book"
        visual="/taskImage.png"
        description="Write a blog post outlining the top 10 productivity tips for busy professionals. The post should be engaging, informative, and include actionable advice. Target word count: 1,200 words."
        flag="new"
        date="Aug 26th 2024"
        time="2:00pm"
        status="inProgress"
      />
      <TaskForm />
    </>
  );
}

export default App;
