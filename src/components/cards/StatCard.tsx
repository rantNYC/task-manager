type StatCardProps = {
  title: string;
  value: string | number;
};

export function StatCard({ title, value }: StatCardProps) {
  return (
    <div className="rounded-xl border border-gray-800 bg-gray-900 p-4 text-center shadow-sm transition hover:border-gray-700 hover:shadow-md">
      <p className="text-sm text-gray-400">{title}</p>
      <p className="mt-1 text-center text-2xl font-semibold text-white">{value}</p>
    </div>
  );
}