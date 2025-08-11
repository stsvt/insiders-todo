// ListContainer.tsx
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import {
  createTodoList,
  deleteTodoList,
  fetchTodoLists,
  updateTodoList,
} from "../../services/apiLists";
import { supabase } from "../../services/supabase";
import type { TodoList } from "../../types/task-lists";
import DeleteButton from "../common/DeleteButton";
import EditButton from "../common/EditButton";

type ListContainerProps = {
  activeList: TodoList;
  setActiveList: React.Dispatch<React.SetStateAction<TodoList>>;
};

function ListContainer({ activeList, setActiveList }: ListContainerProps) {
  const [title, setTitle] = useState("");
  const [lists, setLists] = useState<TodoList[]>([]);
  const [listToEdit, setListToEdit] = useState<TodoList | null>(null);

  const { token } = useAuth();

  useEffect(() => {
    const loadLists = async () => {
      try {
        const data = await fetchTodoLists();
        setLists(data);
      } catch (err) {
        console.error(err);
      }
    };
    loadLists();
  }, []);

  const handleCreateList = async function () {
    if (!token) {
      console.error("User is not authenticated");
      return;
    }

    if (!title.trim()) {
      console.warn("Title is empty");
      return;
    }

    const { data: userData, error: userError } =
      await supabase.auth.getUser(token);

    if (userError || !userData?.user) {
      console.error("Failed to get user", userError);
      return;
    }

    const userId = userData.user.id;

    const newList = await createTodoList(title, userId);

    const insertedList = newList[0];

    setLists((prev) => [
      ...prev,
      { id: insertedList.id, title: insertedList.title },
    ]);
    setTitle("");
  };

  const handleSelectList = (id: string, title: string) => {
    setActiveList({ id, title });
  };

  const handleDeleteList = async (id: string) => {
    try {
      await deleteTodoList(id);
      setLists((prev) => prev.filter((list) => list.id !== id));

      if (activeList.id === id) {
        setActiveList({ title: "" });
      }
    } catch (error) {
      console.error("Failed to delete list", error);
      alert("Failed to delete the list");
    }
  };

  const handleEditClick = (id: string, currentTitle: string) => {
    setListToEdit({ id, title: currentTitle });
  };

  const handleEditChange = (newTitle: string) => {
    setListToEdit((prev) => (prev ? { ...prev, title: newTitle } : prev));
  };

  const handleEditSave = async () => {
    if (!listToEdit?.id || !listToEdit.title.trim()) return;

    try {
      await updateTodoList(listToEdit.id, listToEdit.title);

      const updatedTitle = listToEdit.title;

      setLists((prev) =>
        prev.map((list) =>
          list.id === listToEdit.id ? { ...list, title: updatedTitle } : list
        )
      );

      if (activeList.id === listToEdit.id) {
        setActiveList({ id: listToEdit.id, title: updatedTitle });
      }

      setListToEdit(null);
    } catch (error) {
      console.error("Failed to update list", error);
    }
  };

  const handleEditCancel = () => {
    setListToEdit(null);
  };

  return (
    <aside className="bg-white shadow-md p-4 mr-4 w-64">
      <h2 className="text-xl font-semibold mb-4">Lists</h2>

      <input
        type="text"
        placeholder="Enter list title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="mb-2 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
      />

      <button
        onClick={handleCreateList}
        className="flex w-full justify-center mb-4 cursor-pointer rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold text-white shadow-xs hover:bg-green-700 focus-visible:outline-2 focus-visible:outline-offset-2"
      >
        Add
      </button>

      <ul
        className="space-y-2 overflow-y-auto flex-1 pr-1"
        style={{ maxHeight: "calc(100vh - 200px)" }}
      >
        {lists.map((list) => (
          <li key={list.id} className="flex items-center justify-between">
            {listToEdit?.id === list.id ? (
              <>
                <input
                  type="text"
                  value={listToEdit?.title}
                  onChange={(e) => handleEditChange(e.target.value)}
                  className="w-full px-3 py-1 border border-gray-300 rounded-md focus:outline-none "
                  autoFocus
                />
                <div className="flex space-x-1 ml-2">
                  <button
                    onClick={handleEditSave}
                    className="flex-1 px-2 py-1 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600"
                  >
                    Save
                  </button>
                  <button
                    onClick={handleEditCancel}
                    className="flex-1 px-2 py-1 text-sm bg-gray-300 rounded-md hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                <button
                  onClick={() => handleSelectList(list.id!, list.title)}
                  className={`flex-1 text-left px-4 py-2 rounded-md cursor-pointer
                ${
                  activeList.id === list.id
                    ? "bg-blue-500 text-white font-semibold"
                    : "bg-gray-200 text-gray-800"
                }`}
                >
                  {list.title}
                </button>

                <EditButton
                  onClick={() => handleEditClick(list.id!, list.title)}
                >
                  ✎
                </EditButton>
                <DeleteButton onClick={() => handleDeleteList(list.id!)}>
                  &times;
                </DeleteButton>
              </>
            )}
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default ListContainer;
