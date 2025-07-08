import { useState } from "react";

export const ShareComponent = ({ data = [], refresh, onShare, resourceId }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!searchTerm.trim()) return;
    await refresh(searchTerm.trim());
  };

  const addUser = () => {
    setSelectedUsers((prev) => [...prev, { userId: "", accessType: "view" }]);
  };

  const removeUser = (index) => {
    setSelectedUsers((prev) => prev.filter((_, i) => i !== index));
  };

  const updateUser = (index, field, value) => {
    const updated = [...selectedUsers];
    updated[index][field] = value;
    setSelectedUsers(updated);
  };

  const handleShare = async () => {
    console.log(selectedUsers)
     const validUsers = selectedUsers
       .filter((u) => u.userId && u.accessType)
       .map((u) => ({
         userId: u.userId,
         accessType: u.accessType,
       }));
    console.log(validUsers)
     if (!validUsers.length) {
       alert("Please select at least one user.");
       return;
     }
   
     try {
       setLoading(true);
       await onShare(resourceId, validUsers);
       alert("Shared successfully.");
       setSelectedUsers([]);
     } catch (err) {
       alert("Failed to share.");
     } finally {
       setLoading(false);
     }
  };


  return (
    <div className="p-6 max-w-xl mx-auto bg-white rounded shadow space-y-4">
      <h2 className="text-lg font-semibold text-gray-800">Share Resource</h2>

      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Enter full name or email"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 border px-3 py-2 rounded"
        />
        <button
          onClick={handleSearch}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Search
        </button>
      </div>

      {selectedUsers.length === 0 && (
        <p className="text-sm text-gray-500">No users selected yet.</p>
      )}

      {selectedUsers.map((user, index) => (
        <div key={index} className="flex items-center gap-2">
          <select
            className="flex-1 border px-2 py-1 rounded"
            value={user.userId}
            onChange={(e) => updateUser(index, "userId", e.target.value)}
          >
            <option value="">Select User</option>
            {data.map((u) => (
              <option key={u._id} value={u._id}>
                {u.fullname} ({u.email})
              </option>
            ))}
          </select>

          <select
            className="w-28 border px-2 py-1 rounded"
            value={user.accessType}
            onChange={(e) => updateUser(index, "accessType", e.target.value)}
          >
            <option value="view">View</option>
            <option value="edit">Edit</option>
          </select>

          <button
            className="text-red-600 px-2 font-bold"
            onClick={() => removeUser(index)}
          >
            ✕
          </button>
        </div>
      ))}

      <div className="flex justify-between items-center pt-3">
        <button
          onClick={addUser}
          className="text-sm text-blue-600 hover:underline"
        >
          + Add User
        </button>

        <button
          onClick={handleShare}
          disabled={loading || selectedUsers.length === 0}
          className={`px-4 py-2 rounded text-white ${
            loading || selectedUsers.length === 0
              ? "bg-blue-300 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Sharing..." : "Share"}
        </button>
      </div>
    </div>
  );
};
