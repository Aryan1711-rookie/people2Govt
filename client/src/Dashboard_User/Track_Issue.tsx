import { useEffect, useState } from "react";
import { CheckCircle, Clock, FileText } from "lucide-react";

const formatStatus = (status: string) => {
  if (!status) return "Pending";
  return status
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

const getStatusColor = (status: "pending" | "in-progress" | "resolved") => {
  switch (status) {
    case "resolved":
      return "text-green-600 bg-green-100";
    case "in-progress":
      return "text-blue-600 bg-blue-100";
    case "pending":
      return "text-yellow-600 bg-yellow-100";
    default:
      return "text-gray-600 bg-gray-100";
  }
};

type Issue = {
  _id: string;
  title: string;
  description: string;
  status: "pending" | "in-progress" | "resolved";
  createdAt: string;
};

const Track_Issue = () => {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        setLoading(true);
        const res = await fetch("http://localhost:5000/api/v1/reports/");
        if (!res.ok) throw new Error("Failed to fetch data");

        const data = await res.json();
        setIssues(Array.isArray(data) ? data : data.data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unknown error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchIssues();
  }, []);

  if (loading) return <p className="text-center text-gray-600">Loading your issues...</p>;
  if (error) return <p className="text-center text-red-600">Error: {error}</p>;

  return (
    <div>
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 text-center">
        Your Reported Issues
      </h2>
      <p className="text-center text-gray-600 mb-8">
        Track the status of your civic reports.
      </p>

      <div className="space-y-6">
        {issues.length === 0 ? (
          <p className="text-center text-gray-500">You have not reported any issues yet.</p>
        ) : (
          issues.map((issue) => {
            const displayStatus = formatStatus(issue.status);

            return (
              <div
                key={issue._id}
                className="p-6 bg-gray-50 border border-gray-200 rounded-xl shadow-md flex items-start space-x-4"
              >
                <div className={`p-3 rounded-full ${getStatusColor(issue.status)}`}>
                  {issue.status === "resolved" && <CheckCircle className="w-6 h-6" />}
                  {issue.status === "in-progress" && <Clock className="w-6 h-6" />}
                  {issue.status === "pending" && <FileText className="w-6 h-6" />}
                </div>

                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h3 className="text-xl font-semibold text-gray-800">{issue.title}</h3>
                    <span
                      className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(
                        issue.status
                      )}`}
                    >
                      {displayStatus}
                    </span>
                  </div>

                  <p className="text-sm text-gray-500 mt-1">
                    Reported on {new Date(issue.createdAt).toLocaleDateString()}
                  </p>

                  <p className="mt-2 text-gray-600">{issue.description}</p>
                  {/* 🚫 Status bar removed for now */}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Track_Issue;
