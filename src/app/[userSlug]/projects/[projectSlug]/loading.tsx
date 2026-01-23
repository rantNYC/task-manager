export default function Loading() {
  return (
    <div className="grid animate-pulse grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
      <div className="col-span-full h-8 w-64 rounded bg-gray-800" />

      <div className="h-24 rounded-lg bg-gray-800" />
      <div className="h-24 rounded-lg bg-gray-800" />
      <div className="h-24 rounded-lg bg-gray-800" />
      <div className="h-24 rounded-lg bg-gray-800" />

      <div className="col-span-1 h-24 rounded-xl border border-gray-800 bg-gray-900 md:col-span-2 xl:col-span-4" />
      <div className="col-span-1 h-24 rounded-xl border border-gray-800 bg-gray-900 md:col-span-2 xl:col-span-4" />
      <div className="col-span-1 h-24 rounded-xl border border-gray-800 bg-gray-900 md:col-span-2 xl:col-span-4" />
    </div>
  );
}