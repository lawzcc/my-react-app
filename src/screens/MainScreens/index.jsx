import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/card';
import { User, Lock, School } from 'lucide-react';
import TeacherInterface from '../TeacherInterface';
import AdminInterface from '../AdminInterface';
import ParentInterface from '../ParentInterface';

const MainScreens = () => {
  const [activeScreen, setActiveScreen] = useState('login');
  const [userType, setUserType] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // Simple login logic - in real app, add proper authentication
    if (username && password && userType === 'Teacher') {
      setActiveScreen('teacher');
    }
    if (username && password && userType === 'Administrator') {
      setActiveScreen('admin');
    }
    if (username && password && userType === 'Parent') {
      setActiveScreen('parent');
    }
  };

  const handleLogout = () => {
    setActiveScreen('login');
    setUsername('');
    setPassword('');
    setUserType('');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <School className="w-8 h-8 text-blue-600" />
            <span className="text-xl font-semibold">KinderCare Management System</span>
          </div>
        </div>
      </header>

      {activeScreen === 'login' && (
        <div className="flex-1 flex items-center justify-center p-4">
          <Card className="w-full max-w-md">
            <CardHeader className="text-center bg-blue-50">
              <CardTitle>Welcome Back</CardTitle>
              <p className="text-gray-600">Please login to access your account</p>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">User Type</label>
                  <select 
                    className="w-full p-2 border rounded"
                    value={userType}
                    onChange={(e) => setUserType(e.target.value)}
                  >
                    <option value="">Select Role</option>
                    <option value="Teacher">Teacher</option>
                    <option value="Parent">Parent</option>
                    <option value="Administrator">Administrator</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Username</label>
                  <div className="relative">
                    <User className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                    <input 
                      type="text" 
                      className="w-full pl-10 p-2 border rounded"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                    <input 
                      type="password" 
                      className="w-full pl-10 p-2 border rounded"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>
                <button 
                  type="submit" 
                  className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
                >
                  Login
                </button>
              </form>
            </CardContent>
          </Card>
        </div>
      )}

      {activeScreen === 'teacher' && (
        <div className="flex-1 p-6">
    <TeacherInterface onLogout={handleLogout} />
        </div>
      )}
      {activeScreen === 'admin' && (
  <div className="flex-1 p-6">
    <AdminInterface onLogout={handleLogout} />
  </div>
)}
      
      {activeScreen === 'parent' && (
        <div className="flex-1 p-6">
    <ParentInterface onLogout={handleLogout} />
        </div>
      )}
    </div>
  );
};


export default MainScreens;