import { BASE_URL } from '@/config';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import EditableText, { Comment } from './editable-text';

const EditableList = () => {
  const [comments, setComments]: [Comment[], React.Dispatch<React.SetStateAction<Comment[]>>] = useState<Comment[]>([]);
  const [newComment, setNewComment]: [string, React.Dispatch<React.SetStateAction<string>>] = useState('');
  const [loadData, setLoadData]: [boolean, React.Dispatch<React.SetStateAction<boolean>>] = useState(true);

  useEffect(() => {
    if (!loadData) return;

    setLoadData(false)
    revalidatedData()
      .then(res => {
        setComments(res?.data || []);
      })
      .catch(err => {
        console.log(err)
      });
  })

  const revalidatedData = async () => {
    const result = await axios(`${BASE_URL}/data`, {
      method: 'GET',
    });

    return result;
  }

  const handleAddComment = async () => {
    if (newComment.trim()) {
      setComments([...comments, { data: newComment }]);
      setNewComment('');
    }
    const result = await axios(`${BASE_URL}/data/`, {
      method: 'POST',
      data: { data: newComment },
    });

    setComments([...comments, result.data] || []);
  };

  const handleCommentUpdate = async (comment: Comment, updatedText: string) => {
    const updatedComments = [...comments]; // set new array
    comment.data = updatedText;
    setComments(updatedComments);

    await axios(`${BASE_URL}/data/${comment._id}`, {
      method: 'PUT',
      data: comment,
    });
  };

  async function handleCommentDelete(comment: Comment) {
    await axios(`${BASE_URL}/data/${comment._id}`, {
      method: 'DELETE',
    });
    const c = comments.filter(c => c._id !== comment._id);
    setComments(c || []);
  }

  return (
    <div>
      <h1>Comments</h1>
      <ul className={`bg-white overflow-hidden mx-auto my-8 divide-gray-400 divide-2 divide-y`}>
        {comments?.map((comment: Comment, index: number) => (
          <EditableText key={index}
                        comment={comment.data}
                        onUpdate={(text: string) => handleCommentUpdate(comment, text)}
                        onDelete={() => handleCommentDelete(comment)}
          />
        ))}

      </ul>
      <input
        className={`flex-1 p-2 outline-none text-black`}
        type="text"
        placeholder="Add new comment..."
        value={newComment}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => setNewComment(event.target.value)}
      />
      <button
        className={`ml-2 py-2 px-8 bg-green-500 text-green-100 font-bold disabled:opacity-50 disabled:cursor-not-allowed`}
        disabled={!newComment}
        onClick={() => handleAddComment()}>
        Add Comment
      </button>
    </div>
  );
};

export default EditableList;
