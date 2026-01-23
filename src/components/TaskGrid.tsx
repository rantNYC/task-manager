import { completeTodo, deleteTodo } from '@/lib/actions/taskAction';
import TaskCard from './cards/TaskCard';
import { TaskDTO } from '@/model/task';

export default function TaskGrid({ tasks }: { tasks: Array<TaskDTO> }) {
  const handleToggle = async (slug: string, isCompleted: boolean) => {
    'use server';
    await completeTodo(slug, isCompleted, '/');
  };

  const handleDelete = async (slug: string, isDeleted: boolean) => {
    'use server';
    await deleteTodo(slug, isDeleted, '/');
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
          toggleAction={handleToggle}
          deleteAction={handleDelete}
        />
      ))}
    </div>
  );
}