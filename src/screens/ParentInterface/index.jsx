import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/card';
import { MessageCircle, User, Book, Bell, Calendar, Edit2, Send, X } from 'lucide-react';

const ParentInterface = ({ onLogout }) => {
  // State Management
  const [childProfile, setChildProfile] = useState({
    id: 1,
    name: 'Alex Smith',
    class: 'Class 5A',
    teacher: 'Ms. Sarah Johnson',
    age: 10,
    attendance: '95%'
  });

  const [assessments, setAssessments] = useState([
    { id: 1, subject: 'Mathematics', score: 85, date: '2024-01-15', feedback: 'Good progress' },
    { id: 2, subject: 'English', score: 90, date: '2024-01-20', feedback: 'Excellent work' },
    { id: 3, subject: 'Science', score: 88, date: '2024-01-25', feedback: 'Very good understanding' }
  ]);

  const [messages, setMessages] = useState([
    { id: 1, from: 'Ms. Sarah Johnson', content: 'Alex is doing well in class', date: '2024-01-20', read: true },
    { id: 2, from: 'Mr. James Wilson', content: 'Please check homework details', date: '2024-01-22', read: false }
  ]);

  const [showMessageModal, setShowMessageModal] = useState(false);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [newMessage, setNewMessage] = useState('');

  // Handlers
  const handleSendMessage = (e) => {
    e.preventDefault();
    const message = {
      id: Date.now(),
      from: 'Parent',
      content: newMessage,
      date: new Date().toISOString().split('T')[0],
      read: true
    };
    setMessages([...messages, message]);
    setNewMessage('');
    setShowMessageModal(false);
  };

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    setChildProfile({
      ...childProfile,
      name: e.target.name.value,
      age: e.target.age.value
    });
    setShowEditProfile(false);
  };

  return (
    <div className="space-y-8 p-6">
      {/* Parent Dashboard Header */}
      <Card className="w-full">
  <CardHeader className="bg-blue-50">
    <CardTitle className="flex justify-between items-center">
      <div>Parent Dashboard</div>
      <div className="flex gap-4 items-center">
        <Bell className="w-5 h-5" />
        <div className="text-sm">Welcome, Mr. Smith</div>
        <button
          onClick={onLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full text-sm transition-colors"
        >
          Logout
        </button>
      </div>
    </CardTitle>
  </CardHeader>
        
        {/* Quick Stats */}
        <CardContent className="p-6">
          <div className="grid grid-cols-3 gap-6">
            <Card className="p-4 bg-blue-100 border border-blue-200">
              <div className="font-bold mb-2">Current Grade</div>
              <div className="text-2xl">5th Grade</div>
            </Card>
            <Card className="p-4 bg-green-100 border border-green-200">
              <div className="font-bold mb-2">Attendance</div>
              <div className="text-2xl">{childProfile.attendance}</div>
            </Card>
            <Card className="p-4 bg-purple-100 border border-purple-200">
              <div className="font-bold mb-2">Unread Messages</div>
              <div className="text-2xl">{messages.filter(m => !m.read).length}</div>
            </Card>
          </div>
        </CardContent>
      </Card>

      {/* Child Profile */}
      <Card className="w-full">
        <CardHeader className="bg-blue-50">
          <CardTitle className="flex justify-between items-center">
            <span>Child Profile</span>
            <button
              onClick={() => setShowEditProfile(true)}
              className="bg-blue-500 text-white px-4 py-2 rounded text-sm flex items-center gap-2"
            >
              <Edit2 className="w-4 h-4" />
              Edit Profile
            </button>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <h3 className="font-bold mb-4">Personal Information</h3>
              <div className="space-y-2">
                <p><span className="font-semibold">Name:</span> {childProfile.name}</p>
                <p><span className="font-semibold">Class:</span> {childProfile.class}</p>
                <p><span className="font-semibold">Age:</span> {childProfile.age}</p>
                <p><span className="font-semibold">Teacher:</span> {childProfile.teacher}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Academic Progress */}
      <Card className="w-full">
        <CardHeader className="bg-blue-50">
          <CardTitle>Academic Progress</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            <h3 className="font-bold mb-4">Recent Assessments</h3>
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="p-2 text-left">Subject</th>
                  <th className="p-2 text-left">Score</th>
                  <th className="p-2 text-left">Date</th>
                  <th className="p-2 text-left">Feedback</th>
                </tr>
              </thead>
              <tbody>
                {assessments.map((assessment) => (
                  <tr key={assessment.id} className="border-b">
                    <td className="p-2">{assessment.subject}</td>
                    <td className="p-2">{assessment.score}%</td>
                    <td className="p-2">{assessment.date}</td>
                    <td className="p-2">{assessment.feedback}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Messages */}
      <Card className="w-full">
        <CardHeader className="bg-blue-50">
          <CardTitle className="flex justify-between items-center">
            <span>Messages</span>
            <button
              onClick={() => setShowMessageModal(true)}
              className="bg-blue-500 text-white px-4 py-2 rounded text-sm flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              New Message
            </button>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`p-4 rounded-lg ${
                  message.read ? 'bg-gray-50' : 'bg-blue-50'
                }`}
              >
                <div className="flex justify-between mb-2">
                  <span className="font-semibold">{message.from}</span>
                  <span className="text-sm text-gray-500">{message.date}</span>
                </div>
                <p>{message.content}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* New Message Modal */}
      {showMessageModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">New Message</h3>
              <button onClick={() => setShowMessageModal(false)}>
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSendMessage} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">To</label>
                <select className="w-full p-2 border rounded">
                  <option value="Ms. Sarah Johnson">Ms. Sarah Johnson</option>
                  <option value="Mr. James Wilson">Mr. James Wilson</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Message</label>
                <textarea
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="w-full p-2 border rounded h-32"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white p-2 rounded flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                Send Message
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Edit Profile Modal */}
      {showEditProfile && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Edit Profile</h3>
              <button onClick={() => setShowEditProfile(false)}>
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleProfileUpdate} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <input
                  name="name"
                  type="text"
                  defaultValue={childProfile.name}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Age</label>
                <input
                  name="age"
                  type="number"
                  defaultValue={childProfile.age}
                  className="w-full p-2 border rounded"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white p-2 rounded"
              >
                Update Profile
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};


export default ParentInterface;