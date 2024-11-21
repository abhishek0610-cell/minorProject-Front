import React, { useState } from "react";
import { FaBook, FaComments, FaStickyNote } from "react-icons/fa";
import Layout from "../Layout/Layout";
import semester1 from "../assets/image/Semester1/mid2.jpg";
import semester2 from "../assets/image/Semester2/mid2.jpg";
import semester3 from "../assets/image/Semester3/mid2.jpg";
import semester4Pdfs from "../assets/pdfs/4th-sem.pdf"; // Example PDF for Semester 4
import semester5Pdfs from "../assets/pdfs/5th-sem.pdf"; // Example PDF for Semester 5
import semester6Pdfs from "../assets/pdfs/6th-sem.pdf"; // Example PDF for Semester 6

const StudyTerminal = () => {
  const [selectedSemester, setSelectedSemester] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [activeTab, setActiveTab] = useState("questionPaper");
  const [discussions, setDiscussions] = useState({});
  const [newDiscussion, setNewDiscussion] = useState("");
  const [notes, setNotes] = useState({});
  const [newNote, setNewNote] = useState("");

  const semesters = [
    {
      name: "Semester 1",
      subjects: [
        { name: "Mathematics", pdfs: [semester1] },
        { name: "Physics", pdfs: [] },
      ],
    },
    {
      name: "Semester 2",
      subjects: [
        { name: "Chemistry", pdfs: [semester2] },
        { name: "Programming", pdfs: [] },
      ],
    },
    {
      name: "Semester 3",
      subjects: [
        { name: "Data Structures", pdfs: [semester3] },
        { name: "Algorithms", pdfs: [] },
      ],
    },
    {
      name: "Semester 4",
      subjects: [
        { name: "Database Systems", pdfs: [semester4Pdfs] },
        { name: "Operating Systems", pdfs: [] },
      ],
    },
    {
      name: "Semester 5",
      subjects: [
        { name: "Software Engineering", pdfs: [semester5Pdfs] },
        { name: "Networks", pdfs: [] },
      ],
    },
    {
      name: "Semester 6",
      subjects: [
        { name: "AI", pdfs: [semester6Pdfs] },
        { name: "Machine Learning", pdfs: [] },
      ],
    },
  ];

  const handleSemesterChange = (e) => {
    setSelectedSemester(e.target.value);
    setSelectedSubject("");
  };

  const handleSubjectChange = (e) => {
    setSelectedSubject(e.target.value);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleDiscussionSubmit = (e) => {
    e.preventDefault();
    if (newDiscussion.trim() !== "" && selectedSubject) {
      setDiscussions((prev) => ({
        ...prev,
        [`${selectedSemester}-${selectedSubject}`]: [
          ...(prev[`${selectedSemester}-${selectedSubject}`] || []),
          { id: Date.now(), text: newDiscussion },
        ],
      }));
      setNewDiscussion("");
    }
  };

  const handleNoteSubmit = (e) => {
    e.preventDefault();
    if (newNote.trim() !== "" && selectedSubject) {
      setNotes((prevNotes) => ({
        ...prevNotes,
        [`${selectedSemester}-${selectedSubject}`]: [
          ...(prevNotes[`${selectedSemester}-${selectedSubject}`] || []),
          { id: Date.now(), text: newNote },
        ],
      }));
      setNewNote("");
    }
  };

  const getSelectedContent = () => {
    const semester = semesters.find((sem) => sem.name === selectedSemester);
    if (!semester) return {};
    const subject = semester.subjects.find((sub) => sub.name === selectedSubject);
    return subject ? subject : {};
  };

  const { pdfs } = getSelectedContent();

  return (
    <Layout>
      <div className="min-h-screen bg-gray-100 p-8">
        <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-blue-600 text-white p-6">
            <h1 className="text-3xl font-bold">B.Tech CSE Study Terminal</h1>
            <p className="text-gray-200">
              Select a semester and subject to access resources, discussions, and notes.
            </p>
          </div>

          {/* Semester and Subject Selection */}
          <div className="p-6 flex flex-col lg:flex-row lg:space-x-8">
            <div className="mb-4 lg:mb-0 lg:w-1/2">
              <label
                htmlFor="semester"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Select Semester
              </label>
              <select
                id="semester"
                value={selectedSemester}
                onChange={handleSemesterChange}
                className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Choose a semester</option>
                {semesters.map((semester) => (
                  <option key={semester.name} value={semester.name}>
                    {semester.name}
                  </option>
                ))}
              </select>
            </div>
            {selectedSemester && (
              <div className="lg:w-1/2">
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Select Subject
                </label>
                <select
                  id="subject"
                  value={selectedSubject}
                  onChange={handleSubjectChange}
                  className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Choose a subject</option>
                  {semesters
                    .find((sem) => sem.name === selectedSemester)
                    .subjects.map((subject) => (
                      <option key={subject.name} value={subject.name}>
                        {subject.name}
                      </option>
                    ))}
                </select>
              </div>
            )}
          </div>

          {/* Tabs for Question Papers, Discussions, and Notes */}
          {selectedSemester && selectedSubject && (
            <>
              <div className="mb-6">
                <div className="flex border-b-2">
                  <button
                    onClick={() => handleTabChange("questionPaper")}
                    className={`flex-1 py-2 text-center ${
                      activeTab === "questionPaper"
                        ? "border-blue-600 text-blue-600 font-bold"
                        : "hover:bg-gray-200 text-gray-600"
                    }`}
                  >
                    <FaBook className="inline mr-2" />
                    Question Papers
                  </button>
                  <button
                    onClick={() => handleTabChange("discussion")}
                    className={`flex-1 py-2 text-center ${
                      activeTab === "discussion"
                        ? "border-blue-600 text-blue-600 font-bold"
                        : "hover:bg-gray-200 text-gray-600"
                    }`}
                  >
                    <FaComments className="inline mr-2" />
                    Discussions
                  </button>
                  <button
                    onClick={() => handleTabChange("notes")}
                    className={`flex-1 py-2 text-center ${
                      activeTab === "notes"
                        ? "border-blue-600 text-blue-600 font-bold"
                        : "hover:bg-gray-200 text-gray-600"
                    }`}
                  >
                    <FaStickyNote className="inline mr-2" />
                    Notes
                  </button>
                </div>

                {/* Tab Content */}
                {activeTab === "questionPaper" && (
                  <div className="mt-4">
                    <h3 className="text-lg font-bold text-gray-800 mb-4">
                      Question Papers for {selectedSubject} - {selectedSemester}
                    </h3>
                    <div className="space-y-4 max-h-64 overflow-y-auto">
                      {pdfs && pdfs.length > 0 ? (
                        pdfs.map((pdf, index) => (
                          <div
                            key={index}
                            className="bg-gray-100 p-3 rounded-lg shadow"
                          >
                            <a
                              href={pdf}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:underline"
                            >
                              Download PDF
                            </a>
                          </div>
                        ))
                      ) : (
                        <p className="text-gray-500">No question papers available.</p>
                      )}
                    </div>
                  </div>
                )}

                {activeTab === "discussion" && (
                  <div className="mt-4">
                    <div className="bg-white p-4 rounded-lg shadow-lg">
                      <h3 className="text-lg font-bold text-gray-800 mb-4">
                        Discussions for {selectedSubject} - {selectedSemester}
                      </h3>
                      <div className="space-y-4 max-h-64 overflow-y-auto">
                        {discussions[`${selectedSemester}-${selectedSubject}`]?.length >
                        0 ? (
                          discussions[
                            `${selectedSemester}-${selectedSubject}`
                          ].map((discussion) => (
                            <div
                              key={discussion.id}
                              className="bg-gray-100 p-3 rounded-lg shadow"
                            >
                              {discussion.text}
                            </div>
                          ))
                        ) : (
                          <p className="text-gray-500">No discussions yet.</p>
                        )}
                      </div>
                      <form
                        onSubmit={handleDiscussionSubmit}
                        className="mt-4 flex items-center"
                      >
                        <input
                          type="text"
                          value={newDiscussion}
                          onChange={(e) => setNewDiscussion(e.target.value)}
                          placeholder="Type your message here..."
                          className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                          type="submit"
                          className="ml-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-500"
                        >
                          Send
                        </button>
                      </form>
                    </div>
                  </div>
                )}

                {activeTab === "notes" && (
                  <div className="mt-4">
                    <div className="bg-white p-4 rounded-lg shadow-lg">
                      <h3 className="text-lg font-bold text-gray-800 mb-4">
                        Notes for {selectedSubject} - {selectedSemester}
                      </h3>
                      <div className="space-y-4 max-h-64 overflow-y-auto">
                        {notes[`${selectedSemester}-${selectedSubject}`]?.length >
                        0 ? (
                          notes[`${selectedSemester}-${selectedSubject}`].map(
                            (note) => (
                              <div
                                key={note.id}
                                className="bg-gray-100 p-3 rounded-lg shadow"
                              >
                                {note.text}
                              </div>
                            )
                          )
                        ) : (
                          <p className="text-gray-500">No notes available.</p>
                        )}
                      </div>
                      <form
                        onSubmit={handleNoteSubmit}
                        className="mt-4 flex items-center"
                      >
                        <input
                          type="text"
                          value={newNote}
                          onChange={(e) => setNewNote(e.target.value)}
                          placeholder="Type your note here..."
                          className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                          type="submit"
                          className="ml-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-500"
                        >
                          Add Note
                        </button>
                      </form>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default StudyTerminal;
