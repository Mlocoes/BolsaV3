
import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import type { User } from '../types';
import HandsontableWrapper from '../components/HandsontableWrapper';

const Users: React.FC = () => {
  const { token, user } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsersData = async () => {
      if (!token) return;
      setLoading(true);
      try {
        const data = await api.fetchUsers(token);
        setUsers(data);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsersData();
  }, [token]);

  if (!user?.is_admin) {
    return <div className="text-red-500">Access Denied. Admin only.</div>
  }

  const userColumns = [
    { data: 'username', title: 'Username' },
    { data: 'email', title: 'Email' },
    { data: 'is_admin', title: 'Is Admin', type: 'checkbox', className: 'htCenter' },
    { data: 'active', title: 'Is Active', type: 'checkbox', className: 'htCenter' },
  ];

  return (
    <div className="space-y-6">
       <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">User Management</h1>
        <button className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-colors">Save Changes</button>
      </div>
      
      <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
        {loading ? <p>Loading users...</p> : (
          <HandsontableWrapper
            data={users}
            colHeaders={userColumns.map(c => c.title)}
            columns={userColumns}
            readOnly={false}
            minSpareRows={1}
          />
        )}
      </div>
    </div>
  );
};

export default Users;
