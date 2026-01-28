type Props = {
  tags: string[];
  statuses: string[];
  searchParams: {
    sort?: string;
    role?: string;
    tag?: string;
    status?: string;
  };
};

export default function TaskFilters({ statuses, searchParams }: Props) {
  const currentStatus = searchParams.status ?? "";

  const buildUrl = (params: Record<string, string | null>) => {
    const url = new URLSearchParams(searchParams as Record<string, string>);
    Object.entries(params).forEach(([key, value]) =>
      value === null ? url.delete(key) : url.set(key, value)
    );
    return url.toString();
  };

  return (
    <form method="GET">
      <label htmlFor="status">Status</label>
      <select
        id="status"
        name="status"
        defaultValue={searchParams.status ?? ""}
      >
        <option value="">All</option>
        {statuses.map((status) => (
          <option key={status} value={status}>
            {status}
          </option>
        ))}
      </select>

      <button type="submit">Apply</button>

      {Object.entries(searchParams).map(([key, value]) => {
        if (key === "status") return null;
        if (!value) return null;
        return <input key={key} type="hidden" name={key} value={value} />;
      })}
    </form>

  );
}