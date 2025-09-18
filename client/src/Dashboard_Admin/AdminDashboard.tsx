import { useEffect, useState } from "react";
import { FileText, Clock, CheckCircle, Search, Filter } from "lucide-react";

import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import Navbar1 from "../components/Navbar1";
import Footer from "../components/Footer";

interface Issue {
  createdAt: string | number | Date;
  _id: string;
  title: string;
  description: string;
  status: string;
  department: string;
  reportedOn: string;
  lat?: number;
  lng?: number;
  photos?: string[];
}



const AdminDashboard = () => {
  const [filters, setFilters] = useState({
    search: "",
    status: "all",
    department: "all",
  });
  const [issues, setIssues] = useState<Issue[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedIssue, setSelectedIssue] = useState<Issue | null>(null);
  const openModal = (issue: Issue) => setSelectedIssue(issue);
  const closeModal = () => setSelectedIssue(null);
  const [zoomedPhoto, setZoomedPhoto] = useState<string | null>(null);


  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/v1/reports/");
        if (!res.ok) throw new Error("Failed to fetch issues");
        const data = await res.json();
        setIssues(Array.isArray(data) ? data : data.data || []);
        console.log(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };
    fetchIssues();
  }, []);

  const handleFilterChange = (e: any) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };

  const filteredIssues = issues.filter((issue) => {
    const matchesSearch =
      issue.title.toLowerCase().includes(filters.search.toLowerCase()) ||
      issue.description.toLowerCase().includes(filters.search.toLowerCase());
    const matchesStatus =
      filters.status === "all" || issue.status === filters.status;
    const matchesDepartment =
      filters.department === "all" || issue.department === filters.department;
    return matchesSearch && matchesStatus && matchesDepartment;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Resolved":
        return "bg-green-100 text-green-800";
      case "In Progress":
        return "bg-blue-100 text-blue-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleStatusChange = async (newStatus: string) => {
    if (!selectedIssue) return;

    // Update UI immediately
    setSelectedIssue({ ...selectedIssue, status: newStatus });
    setIssues((prev) =>
      prev.map((issue) =>
        issue._id === selectedIssue._id
          ? { ...issue, status: newStatus }
          : issue
      )
    );

    // Update backend
    try {
      const res = await fetch(
        `http://localhost:5000/api/v1/reports/${selectedIssue._id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: newStatus }),
        }
      );
      if (!res.ok) throw new Error("Failed to update status");
    } catch (err) {
      console.error(err);
      alert("Failed to update status on server");
    }
  };

  if (loading) return <p className="text-center mt-6">Loading issues...</p>;
  if (error)
    return <p className="text-center mt-6 text-red-600">Error: {error}</p>;

  const issuesByDepartment = issues.reduce(
    (acc: { [key: string]: number }, issue) => {
      acc[issue.department] = (acc[issue.department] || 0) + 1;
      return acc;
    },
    {}
  );

  const chartDataDepartments = Object.keys(issuesByDepartment).map((key) => ({
    name: key,
    Issues: issuesByDepartment[key],
  }));

  const issuesByStatus = issues.reduce(
    (acc: { [key: string]: number }, issue) => {
      acc[issue.status] = (acc[issue.status] || 0) + 1;
      return acc;
    },
    {}
  );
  const chartDataStatus = Object.keys(issuesByStatus).map((key) => ({
    name: key,
    value: issuesByStatus[key],
  }));
  const COLORS = ["#facc15", "#3b82f6", "#22c55e"];

  return (
    <>
      <Navbar1 />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 p-8">
        <div className="max-w-7xl mx-auto space-y-10">
          {/* Header */}
          <h1 className="text-4xl font-extrabold text-gray-800 tracking-tight text-center">
            Administrative Dashboard
          </h1>

          {/* Key Metrics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: <FileText className="h-6 w-6 text-blue-600" />,
                bg: "bg-blue-50",
                label: "Total Issues",
                value: issues.length,
              },
              {
                icon: <Clock className="h-6 w-6 text-yellow-600" />,
                bg: "bg-yellow-50",
                label: "Pending",
                value: issues.filter((i) => i.status === "Pending").length,
              },
              {
                icon: <CheckCircle className="h-6 w-6 text-green-600" />,
                bg: "bg-green-50",
                label: "Resolved",
                value: issues.filter((i) => i.status === "Resolved").length,
              },
            ].map((card, idx) => (
              <div
                key={idx}
                className={`rounded-2xl shadow-md ${card.bg} p-6 flex items-center space-x-4 hover:shadow-lg transition-shadow duration-300`}
              >
                <div className="p-3 rounded-full bg-white shadow-sm">
                  {card.icon}
                </div>
                <div>
                  <p className="text-gray-600 text-sm">{card.label}</p>
                  <p className="text-3xl font-bold">{card.value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Charts Section */}
          <div className="bg-white rounded-2xl shadow-md p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              Issue Analytics
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div>
                <h3 className="text-lg font-medium text-gray-700 mb-4">
                  Issues by Department
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={chartDataDepartments}>
                    <XAxis dataKey="name" />
                    <YAxis allowDecimals={false} />
                    <Tooltip />
                    <Bar
                      dataKey="Issues"
                      radius={[6, 6, 0, 0]}
                      fill="#3b82f6"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-700 mb-4">
                  Issues by Status
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={chartDataStatus}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      label
                    >
                      {chartDataStatus.map((_, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          

          {/* Filters */}
          <div className="bg-white rounded-2xl shadow-md p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Filter Issues
            </h2>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  name="search"
                  value={filters.search}
                  onChange={handleFilterChange}
                  placeholder="Search by title or description"
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div className="relative flex-1">
                <Filter className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <select
                  name="status"
                  value={filters.status}
                  onChange={handleFilterChange}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-green-500"
                >
                  <option value="all">All Statuses</option>
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Resolved">Resolved</option>
                </select>
              </div>
              <div className="relative flex-1">
                <Filter className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <select
                  name="department"
                  value={filters.department}
                  onChange={handleFilterChange}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-green-500"
                >
                  <option value="all">All Departments</option>
                  <option value="Public Works">Public Works</option>
                  <option value="Sanitation">Sanitation</option>
                  <option value="Electricity">Electricity</option>
                </select>
              </div>
            </div>
          </div>

          {/* Issues Table */}
          <div className="bg-white rounded-2xl shadow-md p-6 mt-8">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Issues List
            </h2>
            <table className="min-w-full">
              <thead>
                <tr>
                  <th className="text-left py-2 px-4">Title</th>
                  <th className="text-left py-2 px-4">Status</th>
                  <th className="text-left py-2 px-4">Department</th>
                  <th className="text-left py-2 px-4">Reported On</th>
                  <th className="text-left py-2 px-4">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredIssues.map((issue) => (
                  <tr key={issue._id} className="hover:bg-gray-50">
                    <td className="py-2 px-4">{issue.title}</td>
                    <td className="py-2 px-4">
                      <span
                        className={`inline-block px-2 py-1 rounded ${getStatusColor(
                          issue.status
                        )}`}
                      >
                        {issue.status}
                      </span>
                    </td>
                    <td className="py-2 px-4">
                      {issue.department || "General"}
                    </td>
                    <td className="py-2 px-4">
                      {issue.createdAt
                        ? new Date(issue.createdAt).toLocaleDateString()
                        : "-"}
                    </td>
                    <td className="py-2 px-4">
                      <button
                        onClick={() => openModal(issue)}
                        className="text-green-600 hover:text-green-800 font-medium"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Google Map Section */}
          <div className="bg-white rounded-2xl shadow-md p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
               Jharkhand Map
            </h2>
            <div className="w-full h-[400px] rounded-xl overflow-hidden shadow-md">
              <iframe
                title="Jharkhand"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d456676.51433101773!2d85.068808!3d23.610182!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f15b11789f1c1b%3A0x6bb42d6372e18f6d!2sJharkhand%2C%20India!5e0!3m2!1sen!2sin!4v1729450000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
          
{/* Modal */}
{selectedIssue && (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
    <div className="bg-white rounded-2xl shadow-xl w-11/12 md:w-3/4 max-w-2xl p-6 relative overflow-y-auto max-h-[90vh]">
      <button
        onClick={closeModal}
        className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 text-2xl font-bold"
      >
        ×
      </button>
      <h2 className="text-2xl font-bold mb-2">{selectedIssue.title}</h2>
      <p className="text-gray-700 mb-4">{selectedIssue.description}</p>
      <p className="mb-2">
        <strong>Department:</strong> {selectedIssue.department}
      </p>
      <p className="mb-4">
        <strong>Reported On:</strong>{" "}
        {new Date(selectedIssue.createdAt || "").toLocaleDateString()}
      </p>

      {/* Photos Section with Zoom */}
      {selectedIssue.photos && selectedIssue.photos.length > 0 && (
        <div className="mb-4">
          <strong>Photos:</strong>
          <div className="mt-2 flex flex-wrap gap-2">
            {selectedIssue.photos.map((photoUrl: string, idx: number) => (
              <img
                key={idx}
                src={photoUrl}
                alt={`Issue photo ${idx + 1}`}
                className="w-24 h-24 object-cover rounded-md border cursor-pointer transition-transform duration-200 hover:scale-105"
                onClick={() => setZoomedPhoto(photoUrl)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Zoom Modal */}
      {zoomedPhoto && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
          onClick={() => setZoomedPhoto(null)}
        >
          <img
            src={zoomedPhoto}
            alt="Zoomed"
            className="max-w-[90%] max-h-[90%] rounded-md shadow-lg"
          />
        </div>
      )}

      {/* Status Dropdown */}
      <div className="mb-4">
        <label className="block font-medium mb-1">Status:</label>
        <select
          value={selectedIssue.status.replace("-", " ")}
          onChange={(e) => handleStatusChange(e.target.value)}
          className="w-full border border-gray-300 rounded-xl px-3 py-2 focus:ring-2 focus:ring-green-500"
        >
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Resolved">Resolved</option>
        </select>
      </div>

      {/* Map */}
      <div className="w-full h-64 rounded-xl overflow-hidden shadow-md">
        <iframe
          title="Issue Location"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          loading="lazy"
          allowFullScreen
          src={`https://www.google.com/maps?q=${
            selectedIssue.lat || 24.8166469
          },${selectedIssue.lng || 88.7610699}&hl=es;z=14&output=embed`}
        ></iframe>
      </div>
    </div>
  </div>
)}


        </div>
      </div>
      <Footer />
    </>
  );
};

export default AdminDashboard;
