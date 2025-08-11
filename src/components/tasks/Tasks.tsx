import type { Task } from "../../types/tasks";
import TaskItem from "./TaskItem";

type TaskListProps = {
  tasks: Task[];
  activeListTitle: string;
  onToggleComplete: (id: string, isCompleted: boolean) => void;
  onDeleteTask: (id: string) => void;
};

function Tasks({
  tasks,
  activeListTitle,
  onToggleComplete,
  onDeleteTask,
}: TaskListProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">{activeListTitle}</h2>
      <ul className="divide-y divide-gray-200">
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onToggleComplete={onToggleComplete}
            onDeleteTask={onDeleteTask}
          />
        ))}
      </ul>
    </div>
  );
}

export default Tasks;
