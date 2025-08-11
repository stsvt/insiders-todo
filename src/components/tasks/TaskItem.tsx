import type { Task } from "../../types/tasks";

type TaskItemProps = {
  task: Task;
  onToggleComplete: (id: string, isCompleted: boolean) => void;
  onDeleteTask: (id: string) => void;
};

function TaskItem({ task, onToggleComplete, onDeleteTask }: TaskItemProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onToggleComplete(task.id, e.target.checked);
  };

  const handleDelete = () => {
    onDeleteTask(task.id);
  };

  return (
    <li className="py-3 flex items-center justify-between">
      <div className="flex items-center">
        <input
          type="checkbox"
          className="mr-2"
          checked={task.is_completed}
          onChange={handleChange}
        />
        <span>{task.title}</span>
      </div>
      <button
        onClick={handleDelete}
        className="text-red-500 hover:text-red-600 cursor-pointer"
        aria-label={`Delete task ${task.title}`}
      >
        Delete
      </button>
    </li>
  );
}

export default TaskItem;
