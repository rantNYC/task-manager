export default function Loading() {
  return (
    <div className="w-full max-w-3xl animate-pulse space-y-10 pt-4">
      <div className="space-y-2 text-center">
        <div className="mx-auto h-8 w-48 rounded bg-gray-800" />
        <div className="mx-auto h-4 w-64 rounded bg-gray-800" />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="h-20 rounded-lg bg-gray-800" />
        ))}
      </div>

      <div className="flex justify-center">
        <div className="h-10 w-40 rounded-lg bg-gray-800" />
      </div>

      <div className="space-y-4">
        <div className="h-6 w-40 rounded bg-gray-800" />

        <div className="h-16 rounded-lg bg-gray-800" />
        <div className="h-16 rounded-lg bg-gray-800" />
        <div className="h-16 rounded-lg bg-gray-800" />
      </div>
    </div>
  );
}