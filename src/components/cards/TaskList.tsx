import { TaskInformation } from '@/model/stats';

type DeletedListProps = {
  items: TaskInformation[];
};

export function TaskList({ items }: DeletedListProps) {
  if (items.length === 0) {
    return <p className="text-sm text-gray-500">Trash is empty</p>;
  }

  return (
    <ul className="space-y-2">
      {items.map(todo => (
        <li key={todo.id} className="flex justify-between text-sm">
          <span className="text-gray-300">{todo.title}</span>
          <span className="text-gray-500">{todo.localized}</span>
        </li>
      ))}
    </ul>
  );
}