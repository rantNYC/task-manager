import TaskCard from './cards/TaskCard';
import { Task } from '@/lib/db/entities/Task';
import { handleAction } from '@/lib/actions/taskAction';

export default function TaskGrid({ tasks }: { tasks: Array<Task> }) {
  const gridCols = tasks.length === 1 ? 'grid-cols-1' : 'grid-cols-2';
  return (
    <div className={`grid ${gridCols} items-stretch gap-4`}>
      {tasks.map((item, idx) => (
        <div key={`todo-card-${idx}`} className="h-full">
          <TaskCard task={item} handleAction={handleAction} />
        </div>
      ))}
    </div>
  );
}