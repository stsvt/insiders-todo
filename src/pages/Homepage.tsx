import { useState, useEffect } from "react";
import ListContainer from "../components/lists/ListContainer";
import {
  addTask,
  deleteTask,
  fetchTasks,
  updateTask,
} from "../services/apiTasks";
import Tasks from "../components/tasks/Tasks";
import TaskInput from "../components/tasks/TaskInput";
import type { Task } from "../types/tasks";
import Header from "../components/common/Header";

type ActiveList = {
  id?: string;
  title: string;
};

function Homepage() {
  const [activeList, setActiveList] = useState<ActiveList>({ title: "" });
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    const loadTasks = async () => {
      if (!activeList.id) {
        setTasks([]);
        return;
      }
      try {
        const data = await fetchTasks(String(activeList.id));
        setTasks(data);
      } catch (err) {
        console.error(err);
      }
    };
    loadTasks();
  }, [activeList]);

  const handleAddTask = async () => {
    if (!newTask.trim() || !activeList.id) return;
    try {
      const created = await addTask(newTask, "", activeList.id);
      setTasks((prev) => [...prev, created[0]]);
      setNewTask("");
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteTask = async (id: string) => {
    try {
      await deleteTask(id);
      setTasks((prev) => prev.filter((task) => task.id !== id));
    } catch (err) {
      console.error("Failed to delete task:", err);
    }
  };

  const handleToggleComplete = async (id: string, isCompleted: boolean) => {
    try {
      await updateTask(id, isCompleted);
      setTasks((prev) =>
        prev.map((task) =>
          task.id === id ? { ...task, is_completed: isCompleted } : task
        )
      );
    } catch (err) {
      console.error("Failed to update task:", err);
    }
  };

  return (
    <div className="h-screen bg-gray-100 flex p-4 ">
      <ListContainer setActiveList={setActiveList} activeList={activeList} />
      <div className="flex-1">
        <Header />
        {activeList.id ? (
          <>
            <TaskInput
              newTask={newTask}
              setNewTask={setNewTask}
              onAddTask={handleAddTask}
            />
            <Tasks
              tasks={tasks}
              activeListTitle={activeList.title}
              onToggleComplete={handleToggleComplete}
              onDeleteTask={handleDeleteTask}
            />
          </>
        ) : (
          <p className="text-gray-500 italic">
            Choose list to start trackering tasks
          </p>
        )}
      </div>
    </div>
  );
}

export default Homepage;
