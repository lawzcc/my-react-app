import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/card';
import { Search, Edit2, Download, Settings, UserPlus, Trash2, X, Bell } from 'lucide-react';

const AdminInterface = ({ onLogout }) => {
  // State Management
  const [users, setUsers] = useState([
    { id: 1, name: 'Sarah Johnson', role: 'Teacher', email: 'sarah@school.com', status: 'Active' },
    { id: 2, name: 'John Smith', role: 'Parent', email: 'john@email.com', status: 'Active' },
  ]);

  const [showAddUser, setShowAddUser] = useState(false);
  const [showEditUser, setShowEditUser] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showSettings, setShowSettings] = useState(false);

  // System Settings State
  const [settings, setSettings] = useState({
    enableNotifications: true,
    autoGenerateReports: false,
    maintenanceMode: false,
  });

  // Handlers
  const handleAddUser = (e) => {
    e.preventDefault();
    const newUser = {
      id: Date.now(),
      name: e.target.name.value,
      role: e.target.role.value,
      email: e.target.email.value,
      status: 'Active'
    };
    setUsers([...users, newUser]);
    setShowAddUser(false);
  };

  const handleDeleteUser = (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setUsers(users.filter(user => user.id !== userId));
    }
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setShowEditUser(true);
  };

  const handleUpdateUser = (e) => {
    e.preventDefault();
    setUsers(users.map(user =>
      user.id === selectedUser.id
        ? {
            ...user,
            name: e.target.name.value,
            role: e.target.role.value,
            email: e.target.email.value,
          }
        : user
    ));
    setShowEditUser(false);
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 p-6">
      {/* Admin Dashboard Header */}
      <Card className="w-full">
        <CardHeader className="bg-blue-50">
          <CardTitle className="flex justify-between items-center">
            <div>Administrator Dashboard</div>
            <div className="flex gap-4 items-center">
              <Bell className="w-5 h-5" />
              <div className="text-sm">Admin</div>
              <button
                onClick={onLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full text-sm transition-colors"
              >
                Logout
              </button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-3 gap-6">
            <Card className="p-4 bg-blue-100">
              <div className="font-bold mb-2">Total Users</div>
              <div className="text-2xl">{users.length}</div>
            </Card>
            <Card className="p-4 bg-green-100">
              <div className="font-bold mb-2">Active Users</div>
              <div className="text-2xl">
                {users.filter(user => user.status === 'Active').length}
              </div>
            </Card>
            <Card className="p-4 bg-purple-100">
              <div className="font-bold mb-2">System Status</div>
              <div className="text-2xl">Online</div>
            </Card>
          </div>
        </CardContent>
      </Card>

      {/* User Management */}
      <Card className="w-full">
        <CardHeader className="bg-blue-50">
          <CardTitle className="flex justify-between items-center">
            <span>User Management</span>
            <button 
              onClick={() => setShowAddUser(true)}
              className="bg-blue-500 text-white px-4 py-2 rounded text-sm flex items-center gap-2"
            >
              <UserPlus className="w-4 h-4" />
              Add User
            </button>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex justify-between mb-4">
            <div className="flex gap-2">
              <input 
                type="text" 
                placeholder="Search users..." 
                className="border p-2 rounded"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="w-5 h-5 mt-2" />
            </div>
          </div>
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-2 text-left">Name</th>
                <th className="p-2 text-left">Role</th>
                <th className="p-2 text-left">Email</th>
                <th className="p-2 text-left">Status</th>
                <th className="p-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id} className="border-b">
                  <td className="p-2">{user.name}</td>
                  <td className="p-2">{user.role}</td>
                  <td className="p-2">{user.email}</td>
                  <td className="p-2">
                    <span className={`px-2 py-1 rounded text-sm ${
                      user.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="p-2">
                    <div className="flex gap-2">
                      <button onClick={() => handleEditUser(user)}>
                        <Edit2 className="w-5 h-5 text-blue-500" />
                      </button>
                      <button onClick={() => handleDeleteUser(user.id)}>
                        <Trash2 className="w-5 h-5 text-red-500" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

      {/* System Configuration */}
      <Card className="w-full">
        <CardHeader className="bg-blue-50">
          <CardTitle>System Configuration</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="font-bold mb-4">General Settings</h3>
              <div className="space-y-2">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={settings.enableNotifications}
                    onChange={(e) => setSettings({...settings, enableNotifications: e.target.checked})}
                  />
                  Enable Email Notifications
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={settings.autoGenerateReports}
                    onChange={(e) => setSettings({...settings, autoGenerateReports: e.target.checked})}
                  />
                  Auto-generate Monthly Reports
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={settings.maintenanceMode}
                    onChange={(e) => setSettings({...settings, maintenanceMode: e.target.checked})}
                  />
                  Maintenance Mode
                </label>
              </div>
            </div>
            <div className="border-l pl-6">
              <h3 className="font-bold mb-4">System Status</h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                  <span>Database Status</span>
                  <span className="text-green-500">Connected</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                  <span>Last Backup</span>
                  <span>2024-01-20 10:30 AM</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                  <span>System Version</span>
                  <span>1.0.0</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Add User Modal */}
      {showAddUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Add New User</h3>
              <button onClick={() => setShowAddUser(false)}>
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleAddUser} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <input
                  name="name"
                  type="text"
                  required
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Role</label>
                <select name="role" className="w-full p-2 border rounded" required>
                  <option value="Teacher">Teacher</option>
                  <option value="Parent">Parent</option>
                  <option value="Administrator">Administrator</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  name="email"
                  type="email"
                  required
                  className="w-full p-2 border rounded"
                />
              </div>
              <button 
                type="submit"
                className="w-full bg-blue-600 text-white p-2 rounded"
              >
                Add User
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Edit User Modal */}
      {showEditUser && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Edit User</h3>
              <button onClick={() => setShowEditUser(false)}>
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleUpdateUser} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <input
                  name="name"
                  type="text"
                  defaultValue={selectedUser.name}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Role</label>
                <select 
                  name="role" 
                  defaultValue={selectedUser.role}
                  className="w-full p-2 border rounded"
                >
                  <option value="Teacher">Teacher</option>
                  <option value="Parent">Parent</option>
                  <option value="Administrator">Administrator</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  name="email"
                  type="email"
                  defaultValue={selectedUser.email}
                  className="w-full p-2 border rounded"
                />
              </div>
              <button 
                type="submit"
                className="w-full bg-blue-600 text-white p-2 rounded"
              >
                Update User
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminInterface;