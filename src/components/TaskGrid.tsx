'use client';

import { completeTodo, deleteTodo } from '@/lib/actions/taskAction';
import TaskCard from './cards/TaskCard';
import { useState } from 'react';
import { TaskDTO } from '@/model/task';

export default function TaskGrid({ tasks }: { tasks: Array<TaskDTO> }) {
  const [isLoading, setIsLoading] = useState(false);

  const handleToggle = async (slug: string, isCompleted: boolean) => {
    setIsLoading(true);
    await completeTodo(slug, isCompleted, '/');
    setIsLoading(false);
  };

  const handleDelete = async (slug: string, isDeleted: boolean) => {
    setIsLoading(true);
    await deleteTodo(slug, isDeleted, '/');
    setIsLoading(false);
  };

  return (
    <div className="grid grid-cols-1 items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {tasks.map((item, idx) => (
        <TaskCard
          key={`todo-card-${idx}`}
          slug={item.slug}
          title={item.title}
          description={item.description}
          isCompleted={item.isCompleted}
          isDeleted={item.isDeleted}
          disabled={isLoading}
          toggleAction={handleToggle}
          deleteAction={handleDelete}
        />
      ))}
    </div>
  );
}