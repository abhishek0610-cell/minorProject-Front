import React, { useState } from "react";
import { FaUser, FaGraduationCap, FaQuestionCircle, FaClock } from "react-icons/fa";
import { RiComputerLine } from "react-icons/ri";
import { toast } from "react-toastify";
import Layout from "../Layout/Layout";
// This is test line 
const StudentDashboard = () => {
  const [activeTab, setActiveTab] = useState("progress");
  const userData = JSON.parse(localStorage.getItem('userData'));
  
      if (!userData || !userData.token) {
        console.error('No user data or token found in localStorage');
        toast.error('No token found, please log in.');
        return;
      }
  const studentData = {
    name: "Arnay Joe",
    progress: 75,
    completedModules: 15,
    totalModules: 20,
    grade: "A-",
    quizzes: [
      { name: "BEE", score: 90, status: "Completed" },
      { name: "communication skills", score: 85, status: "Completed" },
      { name: "Engineering physics", score: null, status: "Pending" },
    ],
    lastActive: "2023-06-15T14:30:00Z",
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const renderProgressSection = () => (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-4">Progress Overview</h2>
      <div className="mb-4">
        <div className="flex justify-between mb-1">
          <span className="text-base font-medium text-blue-700">Course Progress</span>
          <span className="text-sm font-medium text-blue-700">{studentData.progress}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-blue-600 h-2.5 rounded-full"
            style={{ width: `${studentData.progress}%` }}
          ></div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-gray-600">Completed Modules</p>
          <p className="text-xl font-semibold">{studentData.completedModules}/{studentData.totalModules}</p>
        </div>
        <div>
          <p className="text-gray-600">Current Grade</p>
          <p className="text-xl font-semibold">{studentData.grade}</p>
        </div>
      </div>
    </div>
  );

  const renderQuizzesSection = () => (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-4">Subscribed Quizzes</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 text-left">Quiz Name</th>
              <th className="px-4 py-2 text-left">Score</th>
              <th className="px-4 py-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {studentData.quizzes.map((quiz, index) => (
              <tr key={index} className="border-b">
                <td className="px-4 py-2">{quiz.name}</td>
                <td className="px-4 py-2">{quiz.score !== null ? `${quiz.score}%` : "-"}</td>
                <td className="px-4 py-2">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      quiz.status === "Completed" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {quiz.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderActiveStatusSection = () => (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-4">Activity Status</h2>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <RiComputerLine className="text-3xl text-green-500 mr-2" />
          <span className="text-lg font-medium">Active Today</span>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-600">Last Active:</p>
          <p className="text-base font-medium">{formatDate(studentData.lastActive)}</p>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case "progress":
        return renderProgressSection();
      case "quizzes":
        return renderQuizzesSection();
      case "activity":
        return renderActiveStatusSection();
      default:
        return null;
    }
  };

  return (
    <Layout>

    
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl md:max-w-2xl lg:max-w-4xl xl:max-w-6xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div className="flex items-center space-x-5">
              <div className="h-14 w-14 bg-yellow-200 rounded-full flex items-center justify-center">
                <FaUser className="h-8 w-8 text-yellow-500" />
              </div>
              <div className="block pl-2 font-semibold text-xl self-start text-gray-700">
                <h2 className="leading-relaxed">{studentData.name}'s Dashboard</h2>
                <p className="text-sm text-gray-500 font-normal leading-relaxed">Welcome back to your learning journey!</p>
              </div>
            </div>
            <div className="divide-y divide-gray-200">
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <div className="flex justify-center space-x-4 mb-6">
                  <button
                    onClick={() => setActiveTab("progress")}
                    className={`flex items-center px-4 py-2 rounded-md ${
                      activeTab === "progress" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    <FaGraduationCap className="mr-2" /> Progress
                  </button>
                  <button
                    onClick={() => setActiveTab("quizzes")}
                    className={`flex items-center px-4 py-2 rounded-md ${
                      activeTab === "quizzes" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    <FaQuestionCircle className="mr-2" /> Quizzes
                  </button>
                  <button
                    onClick={() => setActiveTab("activity")}
                    className={`flex items-center px-4 py-2 rounded-md ${
                      activeTab === "activity" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    <FaClock className="mr-2" /> Activity
                  </button>
                </div>
                {renderContent()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </Layout>
  );
};

export default StudentDashboard;