import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import adminApi from "./adminApi";
import AdminHeader from "./AdminHeader";

const LIMIT = 20;
const SUPABASE_URL =
  import.meta.env.VITE_SUPABASE_DASHBOARD_URL || "https://supabase.com/dashboard";

const formatCell = (value) => {
  if (value === null || value === undefined) return "—";
  if (typeof value === "object") return JSON.stringify(value);
  return String(value);
};

const TableView = ({ table }) => {
  const [rows, setRows] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    adminApi
      .get(`/${table}`, { params: { page, limit: LIMIT } })
      .then((res) => {
        if (cancelled) return;
        setRows(res.data.data);
        setTotal(res.data.total ?? 0);
      })
      .catch((error) => {
        if (!cancelled) toast.error(error.response?.data?.detail || "Failed to load data");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [table, page]);

  const columns = rows.length ? Object.keys(rows[0]) : [];
  const totalPages = Math.max(1, Math.ceil(total / LIMIT));

  return (
    <div>
      <AdminHeader />
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <Link to="/admin" className="text-sm text-gray-500 hover:underline">
              ← All tables
            </Link>
            <h2 className="text-2xl font-light capitalize">
              {table} <span className="text-gray-500 text-base">({total} rows)</span>
            </h2>
          </div>
          <a
            href={SUPABASE_URL}
            target="_blank"
            rel="noreferrer"
            className="text-sm bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition"
          >
            Edit in Supabase
          </a>
        </div>

        {loading ? (
          <p className="text-gray-500">Loading...</p>
        ) : rows.length === 0 ? (
          <p className="text-gray-500">No data.</p>
        ) : (
          <div className="overflow-x-auto border border-gray-200 rounded">
            <table className="min-w-full text-sm text-left">
              <thead className="bg-gray-100">
                <tr>
                  {columns.map((col) => (
                    <th key={col} className="px-4 py-2 font-medium whitespace-nowrap">
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row, i) => (
                  <tr key={row.id ?? i} className="border-t border-gray-200">
                    {columns.map((col) => (
                      <td
                        key={col}
                        title={formatCell(row[col])}
                        className="px-4 py-2 max-w-xs truncate"
                      >
                        {formatCell(row[col])}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="flex items-center justify-center gap-4 mt-6">
          <button
            onClick={() => setPage((p) => p - 1)}
            disabled={page <= 1}
            className="border border-gray-300 px-3 py-1 rounded disabled:opacity-40"
          >
            Prev
          </button>
          <span className="text-sm">
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => p + 1)}
            disabled={page >= totalPages}
            className="border border-gray-300 px-3 py-1 rounded disabled:opacity-40"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

const AdminTable = () => {
  const { table } = useParams();
  return <TableView key={table} table={table} />;
};

export default AdminTable;
