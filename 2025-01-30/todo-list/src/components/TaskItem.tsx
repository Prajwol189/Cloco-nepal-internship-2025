
import React, { useState } from 'react';

type TaskItemProps = {
  task: string;
  onDelete: () => void;
  onEdit: (newText: string) => void;
};

const TaskItem: React.FC<TaskItemProps> = ({ task, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task);

  const handleSave = () => {
    if (editText.trim()) {
      onEdit(editText);
      setIsEditing(false);
    }
  };

  return (
    <li>
      {isEditing ? (
        <>
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
          />
          <button onClick={handleSave}>Save</button>
        </>
      ) : (
        <>
          {task}
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button onClick={onDelete}>Delete</button>
        </>
      )}
    </li>
  );
};

export default TaskItem;