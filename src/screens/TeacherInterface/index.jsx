import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/card';
import { Search, Edit2, Download, Clock, Calendar, Bell, X } from 'lucide-react';

const TeacherInterface = ({ onLogout }) => {
  // State Management
  const [students, setStudents] = useState([
    { id: 1, name: 'John Smith', class: 'Class A', guardian: 'Mrs. Smith' },
    { id: 2, name: 'Jane Doe', class: 'Class B', guardian: 'Mr. Doe' }
  ]);

  const [assessments, setAssessments] = useState([
    { id: 1, student: 'John Smith', subject: 'Mathematics', score: '85%', date: '2025-01-10' }
  ]);

  const [showEditStudent, setShowEditStudent] = useState(false);
  const [showAddAssessment, setShowAddAssessment] = useState(false);
  const [showReportPreview, setShowReportPreview] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [editForm, setEditForm] = useState({ name: '', class: '', guardian: '' });
  const [searchTerm, setSearchTerm] = useState('');
   // Add these state variables after other useState declarations
  const [showEditAssessment, setShowEditAssessment] = useState(false);
  const [selectedAssessment, setSelectedAssessment] = useState(null);
  
  // Add these handlers after other handler functions
  const handleEditAssessment = (assessment) => {
    setSelectedAssessment(assessment);
    setShowEditAssessment(true);
  };
  
  const handleUpdateAssessment = (e) => {
    e.preventDefault();
    setAssessments(assessments.map(assessment =>
      assessment.id === selectedAssessment.id
        ? {
            ...assessment,
            subject: e.target.subject.value,
            score: e.target.score.value,
            date: e.target.date.value
          }
        : assessment
    ));
    setShowEditAssessment(false);
  };
  
// Replace the Assessment Management Card section with:
<Card className="w-full">
  <CardHeader className="bg-blue-50">
    <CardTitle className="flex justify-between items-center">
      <span>Assessment Management</span>
      <button 
        onClick={() => setShowAddAssessment(true)}
        className="bg-blue-500 text-white px-4 py-2 rounded text-sm"
      >
        Add Assessment
      </button>
    </CardTitle>
  </CardHeader>
  <CardContent className="p-6">
    <table className="w-full">
      <thead className="bg-gray-50">
        <tr>
          <th className="p-2 text-left">Student</th>
          <th className="p-2 text-left">Subject</th>
          <th className="p-2 text-left">Score</th>
          <th className="p-2 text-left">Date</th>
          <th className="p-2 text-left">Actions</th>
        </tr>
      </thead>
      <tbody>
        {assessments.map((assessment) => (
          <tr key={assessment.id} className="border-b">
            <td className="p-2">{assessment.student}</td>
            <td className="p-2">{assessment.subject}</td>
            <td className="p-2">{assessment.score}</td>
            <td className="p-2">{assessment.date}</td>
            <td className="p-2">
              <button onClick={() => handleEditAssessment(assessment)}>
                <Edit2 className="w-5 h-5 cursor-pointer text-blue-500" />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </CardContent>
</Card>
  
 // Add this modal before the closing div
{showEditAssessment && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded-lg w-96">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Edit Assessment</h3>
        <button onClick={() => setShowEditAssessment(false)}>
          <X className="w-5 h-5" />
        </button>
      </div>
      <form onSubmit={handleUpdateAssessment} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Student</label>
          <input
            type="text"
            value={selectedAssessment.student}
            disabled
            className="w-full p-2 border rounded bg-gray-50"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Subject</label>
          <select 
            name="subject"
            defaultValue={selectedAssessment.subject}
            className="w-full p-2 border rounded"
          >
            <option value="Mathematics">Mathematics</option>
            <option value="Language">Language</option>
            <option value="Science">Science</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Score</label>
          <input
            name="score"
            type="text"
            defaultValue={selectedAssessment.score}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Date</label>
          <input
            name="date"
            type="date"
            defaultValue={selectedAssessment.date}
            className="w-full p-2 border rounded"
          />
        </div>
        <button 
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded"
        >
          Update Assessment
        </button>
      </form>
    </div>
  </div>
)}

  // Handlers
  const handleEditStudent = (student) => {
    setSelectedStudent(student);
    setEditForm(student);
    setShowEditStudent(true);
  };

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    setStudents(students.map(student => 
      student.id === selectedStudent.id ? { ...student, ...editForm } : student
    ));
    setShowEditStudent(false);
  };

  const handleAddAssessment = (e) => {
    e.preventDefault();
    const newAssessment = {
      id: Date.now(),
      student: e.target.student.value,
      subject: e.target.subject.value,
      score: e.target.score.value,
      date: e.target.date.value
    };
    setAssessments([...assessments, newAssessment]);
    setShowAddAssessment(false);
  };

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.class.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 p-6">
      {/* Dashboard Stats */}
      <Card className="w-full">
        <CardHeader className="bg-blue-50">
          <CardTitle className="flex justify-between items-center">
            <div>Teacher Dashboard</div>
            <div className="flex gap-4 items-center">
              <Bell className="w-5 h-5" />
              <div className="text-sm">Ms. Sarah Johnson</div>
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
            <Card className="p-4 bg-blue-50">
              <div className="font-bold mb-2">Total Students</div>
              <div className="text-2xl">{students.length}</div>
            </Card>
            <Card className="p-4 bg-green-50">
              <div className="font-bold mb-2">Today's Attendance</div>
              <div className="text-2xl">{students.length}/25</div>
            </Card>
            <Card className="p-4 bg-purple-50">
              <div className="font-bold mb-2">Pending Assessments</div>
              <div className="text-2xl">{assessments.length}</div>
            </Card>
          </div>
        </CardContent>
      </Card>

      {/* Student Profiles */}
      <Card className="w-full">
        <CardHeader className="bg-blue-50">
          <CardTitle>Student Profiles</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex justify-between mb-4">
            <div className="flex gap-2">
              <input 
                type="text" 
                placeholder="Search students..." 
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
                <th className="p-2 text-left">Class</th>
                <th className="p-2 text-left">Guardian</th>
                <th className="p-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student) => (
                <tr key={student.id} className="border-b">
                  <td className="p-2">{student.name}</td>
                  <td className="p-2">{student.class}</td>
                  <td className="p-2">{student.guardian}</td>
                  <td className="p-2">
                    <button onClick={() => handleEditStudent(student)}>
                      <Edit2 className="w-5 h-5 cursor-pointer text-blue-500" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

      {/* Assessment Management */}
      <Card className="w-full">
        <CardHeader className="bg-blue-50">
          <CardTitle>Assessment Management</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex justify-between mb-4">
            <button 
              onClick={() => setShowAddAssessment(true)}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Add Assessment
            </button>
          </div>
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-2 text-left">Student</th>
                <th className="p-2 text-left">Subject</th>
                <th className="p-2 text-left">Score</th>
                <th className="p-2 text-left">Date</th>
              </tr>
            </thead>
            <tbody>
              {assessments.map((assessment) => (
                <tr key={assessment.id} className="border-b">
                  <td className="p-2">{assessment.student}</td>
                  <td className="p-2">{assessment.subject}</td>
                  <td className="p-2">{assessment.score}</td>
                  <td className="p-2">{assessment.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

      {/* Edit Student Modal */}
      {showEditStudent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Edit Student Profile</h3>
              <button onClick={() => setShowEditStudent(false)}>
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleUpdateProfile} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <input
                  type="text"
                  value={editForm.name}
                  onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Class</label>
                <input
                  type="text"
                  value={editForm.class}
                  onChange={(e) => setEditForm({...editForm, class: e.target.value})}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Guardian</label>
                <input
                  type="text"
                  value={editForm.guardian}
                  onChange={(e) => setEditForm({...editForm, guardian: e.target.value})}
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

      {/* Add Assessment Modal */}
      {showAddAssessment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Add Assessment</h3>
              <button onClick={() => setShowAddAssessment(false)}>
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleAddAssessment} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Student</label>
                <select name="student" className="w-full p-2 border rounded">
                  {students.map(student => (
                    <option key={student.id} value={student.name}>{student.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Subject</label>
                <select name="subject" className="w-full p-2 border rounded">
                  <option value="Mathematics">Mathematics</option>
                  <option value="Language">Language</option>
                  <option value="Science">Science</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Score</label>
                <input
                  name="score"
                  type="text"
                  className="w-full p-2 border rounded"
                  placeholder="Enter score"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Date</label>
                <input
                  name="date"
                  type="date"
                  className="w-full p-2 border rounded"
                />
              </div>
              <button 
                type="submit"
                className="w-full bg-blue-600 text-white p-2 rounded"
              >
                Add Assessment
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Generate Reports Section */}
      <Card className="w-full">
        <CardHeader className="bg-blue-50">
          <CardTitle>Generate Reports</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <h3 className="font-bold mb-4">Report Settings</h3>
              <div className="space-y-4">
                <select className="w-full border p-2 rounded">
                  <option value="">Select Student</option>
                  {students.map(student => (
                    <option key={student.id} value={student.id}>{student.name}</option>
                  ))}
                </select>
                <select className="w-full border p-2 rounded">
                  <option>Progress Report</option>
                  <option>Assessment Summary</option>
                </select>
                <button 
                  onClick={() => setShowReportPreview(true)}
                  className="bg-blue-500 text-white px-4 py-2 rounded flex gap-2 items-center"
                >
                  <Download className="w-5 h-5" />
                  Generate Report
                </button>
              </div>
            </div>
            <div className="border-l pl-6">
              <h3 className="font-bold mb-4">Recent Reports</h3>
              <div className="space-y-2">
                {assessments.map((assessment) => (
                  <div key={assessment.id} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                    <div>{assessment.student} - {assessment.subject}</div>
                    <Download className="w-5 h-5 cursor-pointer text-blue-500" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Report Preview Modal */}
      {showReportPreview && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-[800px]">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Report Preview</h3>
              <button onClick={() => setShowReportPreview(false)}>
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div className="border p-4 rounded">
                <h4 className="font-semibold">Student Progress Report</h4>
                <p>Generated on: {new Date().toLocaleDateString()}</p>
                <div className="mt-4">
                  <h5 className="font-medium">Assessment Summary</h5>
                  <table className="w-full mt-2">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="p-2 text-left">Subject</th>
                        <th className="p-2 text-left">Score</th>
                        <th className="p-2 text-left">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {assessments.map((assessment) => (
                        <tr key={assessment.id} className="border-b">
                          <td className="p-2">{assessment.subject}</td>
                          <td className="p-2">{assessment.score}</td>
                          <td className="p-2">{assessment.date}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <button 
                className="w-full bg-blue-600 text-white p-2 rounded"
                onClick={() => setShowReportPreview(false)}
              >
                Download Report
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeacherInterface;