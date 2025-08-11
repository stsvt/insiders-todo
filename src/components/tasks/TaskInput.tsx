type TaskInputProps = {
  newTask: string;
  setNewTask: React.Dispatch<React.SetStateAction<string>>;
  onAddTask: () => void;
};

export default function TaskInput({
  newTask,
  setNewTask,
  onAddTask,
}: TaskInputProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-4">
      <div className="flex items-center mb-4">
        <input
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="text"
          placeholder="Add a new task"
        />
        <button
          onClick={onAddTask}
          className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Add
        </button>
      </div>
    </div>
  );
}
