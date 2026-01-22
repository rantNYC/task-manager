type DeletedListProps = {
  items: { id: number; title: string; deleted_at: string }[];
};

export function DeletedList({ items }: DeletedListProps) {
  if (items.length === 0) {
    return <p className="text-sm text-gray-500">Trash is empty</p>;
  }

  return (
    <ul className="space-y-2">
      {items.map(todo => (
        <li key={todo.id} className="flex justify-between text-sm">
          <span className="text-gray-300">{todo.title}</span>
          <span className="text-gray-500">{todo.deleted_at}</span>
        </li>
      ))}
    </ul>
  );
}