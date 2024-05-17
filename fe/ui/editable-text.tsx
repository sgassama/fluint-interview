import React, { useEffect, useRef, useState } from 'react';

export type Comment = { _id?: string, data: string };

const EditableText = ({ comment, onUpdate, onDelete }: any) => {
  const input: React.RefObject<HTMLInputElement> = useRef<HTMLInputElement>(null);
  const [isEditing, setIsEditing]: [boolean, React.Dispatch<React.SetStateAction<boolean>>] = useState<boolean>(false);
  const [editText, setEditText]: [string, React.Dispatch<React.SetStateAction<string>>] = useState<string>(comment);

  useEffect(() => {
    input.current?.focus();
  })

  function handleOnClick(): void {
    setIsEditing(true);
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>): void {
    setEditText(event.target.value);
  }

  function handleSave(): void {
    setIsEditing(false);
    onUpdate(editText);
  }

  function handleOnDelete(): void {
    setIsEditing(false);
    onDelete();
  }

  return (
    <div className={`p-4 text-black flex flex-row items-center h-[60px]`}>
      {isEditing ? (
        <input className={`w-[90%] outline-none`}
               ref={input}
               type="text"
               value={editText}
               onChange={handleChange}
               onBlur={handleSave}/>
      ) : (
        <>
        <span className={`block w-full cursor-pointer hover:underline`}
              onClick={handleOnClick}>
          {comment}
        </span>
          <span className={`cursor-pointer z-50`}
                onClick={handleOnDelete}>
            &#x2715;
          </span>
        </>
      )}
    </div>
  );
};

export default EditableText;
