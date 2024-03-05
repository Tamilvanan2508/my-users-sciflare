import React, { useState } from "react";

const UserList = ({ data, onUpdate, onDelete }) => {
  const [editRowId, setEditRowId] = useState(null);
  const [editName, setEditName] = useState("");

  const handleEdit = (row) => {
    setEditRowId(row._id);
    setEditName(row.name);
  };

  const handleSave = (id) => {
    onUpdate(id, editName);
    setEditRowId(null);
    setEditName("");
  };

  return (
    <div className="overflow-x-auto">
      <table
        className="min-w-full text-sm text-left text-gray-500"
        style={{ tableLayout: "fixed" }}
      >
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" className="py-3 px-6" style={{ width: "50%" }}>
              Name
            </th>
            <th scope="col" className="py-3 px-6" style={{ width: "50%" }}>
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((row) => (
              <tr key={row._id} className="bg-white border-b">
                <td className="py-4 px-6">
                  {editRowId === row._id ? (
                    <input
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="px-2 py-1 border rounded w-full"
                    />
                  ) : (
                    row.name
                  )}
                </td>
                <td className="py-4 px-6">
                  {editRowId === row._id ? (
                    <>
                      <button
                        onClick={() => handleSave(row._id)}
                        className="font-medium text-blue-600 mr-2"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditRowId(null)}
                        className="font-medium text-gray-600"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => handleEdit(row)}
                        className="font-medium text-blue-600 mr-2"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => onDelete(row._id)}
                        className="font-medium text-red-600"
                      >
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="2" className="text-center py-4 px-6">
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
