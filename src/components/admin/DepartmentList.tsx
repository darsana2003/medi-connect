/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { FaEdit, FaEye, FaTrash, FaPlus } from "react-icons/fa";
import { toast, Toaster } from "react-hot-toast";
import {
  collection,
  doc,
  getDoc,
  updateDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../firebase/config";
import { getAuth } from "firebase/auth";

export default function DepartmentList() {
  const [departments, setDepartments] = useState<any[]>([]);
  const [hospitalName, setHospitalName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [viewDepartment, setViewDepartment] = useState<any>(null);
  const [editDepartment, setEditDepartment] = useState<any>(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [departmentToDelete, setDepartmentToDelete] = useState<string | null>(
    null
  );
  const [newDepartment, setNewDepartment] = useState({
    name: "",
    head: "",
    totalStaff: 0,
    facilities: "",
    status: "Active",
  });
  const [loading, setLoading] = useState(true);

  // Fetch departments on component mount
  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    try {
      setLoading(true);
      const auth = getAuth();
      const currentUser = auth.currentUser;

      if (!currentUser) {
        toast.error("You must be logged in");
        return;
      }

      // Get hospital for current admin
      const adminsRef = collection(db, "admins");
      const adminQuery = query(
        adminsRef,
        where("email", "==", currentUser.email)
      );
      const adminSnapshot = await getDocs(adminQuery);

      if (adminSnapshot.empty) {
        toast.error("Admin not found");
        return;
      }

      const adminData = adminSnapshot.docs[0].data();
      const hospital = adminData.hospitalName;
      setHospitalName(hospital);

      // Get hospital document
      const hospitalRef = doc(db, "hospitals", hospital);
      const hospitalDoc = await getDoc(hospitalRef);

      if (!hospitalDoc.exists()) {
        toast.error("Hospital not found");
        return;
      }

      const hospitalData = hospitalDoc.data();
      const departmentsMap = hospitalData.departments || {};

      // Convert departments map to array
      const departmentsArray = Object.keys(departmentsMap).map((id) => ({
        id,
        ...departmentsMap[id],
      }));

      setDepartments(departmentsArray);
    } catch (error) {
      console.error("Error fetching departments:", error);
      toast.error("Failed to load departments");
    } finally {
      setLoading(false);
    }
  };

  // Filter departments based on search term
  const filteredDepartments = departments.filter(
    (department) =>
      department.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      department.head.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle view department details
  const handleViewDetails = (department: any) => {
    setViewDepartment(department);
    setShowViewModal(true);
  };

  // Handle edit department
  const handleEdit = (department: any) => {
    setEditDepartment({ ...department });
    setShowEditModal(true);
  };

  // Handle delete confirmation
  const handleDeleteConfirmation = (id: string) => {
    setDepartmentToDelete(id);
    setShowDeleteModal(true);
  };

  // Handle save new department
  const handleAddDepartment = async () => {
    try {
      if (!newDepartment.name || !newDepartment.head) {
        toast.error("Department name and head are required");
        return;
      }

      const hospitalRef = doc(db, "hospitals", hospitalName);

      // Generate a unique ID for the department
      const departmentId = `D${Date.now()}`;

      // Update Firestore
      await updateDoc(hospitalRef, {
        [`departments.${departmentId}`]: {
          name: newDepartment.name,
          head: newDepartment.head,
          totalStaff: newDepartment.totalStaff,
          facilities: newDepartment.facilities,
          status: newDepartment.status,
        },
      });

      // Update local state
      setDepartments([
        ...departments,
        {
          id: departmentId,
          ...newDepartment,
        },
      ]);

      // Reset and close modal
      setNewDepartment({
        name: "",
        head: "",
        totalStaff: 0,
        facilities: "",
        status: "Active",
      });
      setShowAddModal(false);
      toast.success("Department added successfully");
    } catch (error) {
      console.error("Error adding department:", error);
      toast.error("Failed to add department");
    }
  };

  // Handle delete department
  const handleDelete = async () => {
    if (departmentToDelete) {
      try {
        const hospitalRef = doc(db, "hospitals", hospitalName);

        // Update Firestore - remove the department
        await updateDoc(hospitalRef, {
          [`departments.${departmentToDelete}`]: null,
        });

        // Update local state
        setDepartments(
          departments.filter((dept) => dept.id !== departmentToDelete)
        );
        setShowDeleteModal(false);
        setDepartmentToDelete(null);
        toast.success("Department deleted successfully");
      } catch (error) {
        console.error("Error deleting department:", error);
        toast.error("Failed to delete department");
      }
    }
  };

  // Handle save edit
  const handleSaveEdit = async () => {
    if (editDepartment) {
      try {
        const hospitalRef = doc(db, "hospitals", hospitalName);

        // Update Firestore
        await updateDoc(hospitalRef, {
          [`departments.${editDepartment.id}`]: {
            name: editDepartment.name,
            head: editDepartment.head,
            totalStaff: editDepartment.totalStaff,
            facilities: editDepartment.facilities,
            status: editDepartment.status,
          },
        });

        // Update local state
        setDepartments(
          departments.map((dept) =>
            dept.id === editDepartment.id ? editDepartment : dept
          )
        );
        setShowEditModal(false);
        setEditDepartment(null);
        toast.success("Department updated successfully");
      } catch (error) {
        console.error("Error updating department:", error);
        toast.error("Failed to update department");
      }
    }
  };

  return (
    <div>
      <Toaster position="top-right" />
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-black">Department Lists</h2>
        <div className="flex gap-4">
          <div className="w-64">
            <input
              type="text"
              placeholder="Search departments..."
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0D6C7E] text-black"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 bg-[#0D6C7E] text-white rounded-md hover:bg-[#0A5A6B] flex items-center gap-2"
          >
            <FaPlus /> Add Department
          </button>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-4">Loading departments...</div>
      ) : (
        <>
          {/* Departments Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">
                    Department
                  </th>
                  <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">
                    Head of Department
                  </th>
                  <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">
                    Total Staff
                  </th>
                  <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">
                    Available Facilities
                  </th>
                  <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredDepartments.map((department) => (
                  <tr key={department.id} className="hover:bg-gray-50">
                    <td className="py-3 px-4 text-sm text-gray-700">
                      {department.name}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-700">
                      {department.head}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-700">
                      {department.totalStaff}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-700">
                      <div
                        className="max-w-xs truncate"
                        title={department.facilities}
                      >
                        {department.facilities}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleViewDetails(department)}
                          className="p-1 bg-blue-100 text-blue-600 rounded hover:bg-blue-200 transition-colors"
                          title="View Details"
                        >
                          <FaEye />
                        </button>
                        <button
                          onClick={() => handleEdit(department)}
                          className="p-1 bg-yellow-100 text-yellow-600 rounded hover:bg-yellow-200 transition-colors"
                          title="Edit"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() =>
                            handleDeleteConfirmation(department.id)
                          }
                          className="p-1 bg-red-100 text-red-600 rounded hover:bg-red-200 transition-colors"
                          title="Delete"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredDepartments.length === 0 && (
            <div className="text-center py-4">
              {searchTerm
                ? "No departments match your search"
                : "No departments found"}
            </div>
          )}
        </>
      )}

      {/* Add Department Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold mb-4">Add New Department</h3>
            <div className="grid grid-cols-1 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Department Name*
                </label>
                <input
                  type="text"
                  value={newDepartment.name}
                  onChange={(e) =>
                    setNewDepartment({
                      ...newDepartment,
                      name: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0D6C7E]"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Head of Department*
                </label>
                <input
                  type="text"
                  value={newDepartment.head}
                  onChange={(e) =>
                    setNewDepartment({
                      ...newDepartment,
                      head: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0D6C7E]"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Total Staff
                </label>
                <input
                  type="number"
                  value={newDepartment.totalStaff}
                  onChange={(e) =>
                    setNewDepartment({
                      ...newDepartment,
                      totalStaff: parseInt(e.target.value) || 0,
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0D6C7E]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Available Facilities
                </label>
                <textarea
                  value={newDepartment.facilities}
                  onChange={(e) =>
                    setNewDepartment({
                      ...newDepartment,
                      facilities: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0D6C7E]"
                  rows={3}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  value={newDepartment.status}
                  onChange={(e) =>
                    setNewDepartment({
                      ...newDepartment,
                      status: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0D6C7E]"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleAddDepartment}
                className="px-4 py-2 bg-[#0D6C7E] text-white rounded hover:bg-[#0A5A6B]"
              >
                Add Department
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View Department Modal */}
      {showViewModal && viewDepartment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold mb-4">Department Details</h3>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <p className="text-sm text-gray-500">Department ID</p>
                <p className="font-medium">{viewDepartment.id}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Department Name</p>
                <p className="font-medium">{viewDepartment.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Head of Department</p>
                <p className="font-medium">{viewDepartment.head}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Staff</p>
                <p className="font-medium">{viewDepartment.totalStaff}</p>
              </div>
              <div className="col-span-2">
                <p className="text-sm text-gray-500">Available Facilities</p>
                <p className="font-medium">{viewDepartment.facilities}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Status</p>
                <p
                  className={`font-medium ${
                    viewDepartment.status === "Active"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {viewDepartment.status}
                </p>
              </div>
            </div>
            <div className="flex justify-end">
              <button
                onClick={() => setShowViewModal(false)}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Department Modal */}
      {showEditModal && editDepartment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold mb-4">Edit Department</h3>
            <div className="grid grid-cols-1 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Department Name
                </label>
                <input
                  type="text"
                  value={editDepartment.name}
                  onChange={(e) =>
                    setEditDepartment({
                      ...editDepartment,
                      name: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0D6C7E]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Head of Department
                </label>
                <input
                  type="text"
                  value={editDepartment.head}
                  onChange={(e) =>
                    setEditDepartment({
                      ...editDepartment,
                      head: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0D6C7E]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Total Staff
                </label>
                <input
                  type="number"
                  value={editDepartment.totalStaff}
                  onChange={(e) =>
                    setEditDepartment({
                      ...editDepartment,
                      totalStaff: parseInt(e.target.value) || 0,
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0D6C7E]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Available Facilities
                </label>
                <textarea
                  value={editDepartment.facilities}
                  onChange={(e) =>
                    setEditDepartment({
                      ...editDepartment,
                      facilities: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0D6C7E]"
                  rows={3}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  value={editDepartment.status}
                  onChange={(e) =>
                    setEditDepartment({
                      ...editDepartment,
                      status: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0D6C7E]"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowEditModal(false)}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEdit}
                className="px-4 py-2 bg-[#0D6C7E] text-white rounded hover:bg-[#0A5A6B]"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">Confirm Delete</h3>
            <p className="mb-6">
              Are you sure you want to delete this department? This action
              cannot be undone.
            </p>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
