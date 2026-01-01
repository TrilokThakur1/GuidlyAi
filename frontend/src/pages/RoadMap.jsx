import React, { useState } from "react";
import axios from "axios";

const RoadMap = () => {
  const [roadmap, setRoadmap] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    const prompt = e.target.roadmap.value;

    try {
      setLoading(true);
      const res = await axios.post("http://localhost:8000/api/roadmap/plan", {
        prompt,
      });
      setRoadmap(res.data);
    } catch (err) {
      console.error(err);
      alert("Something went wrong!");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      
      {/* FORM */}
      <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow-md">
        <h1 className="text-2xl font-bold text-center mb-4">
          Learning Roadmap Generator 🚀
        </h1>

        <form onSubmit={handleSubmit} className="flex gap-3">
          <input
            type="text"
            name="roadmap"
            placeholder="What do you want to learn?"
            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            {loading ? "Loading..." : "Submit"}
          </button>
        </form>
      </div>

      {/* OUTPUT */}
      {roadmap && (
        <div className="max-w-4xl mx-auto mt-10 bg-white p-8 rounded-xl shadow-lg">

          <h2 className="text-3xl font-bold mb-2 text-blue-600">
            {roadmap.greetings}
          </h2>

          <p className="text-gray-700 mb-6">
            {roadmap.roadmapDesc}
          </p>

          {/* ROADMAP STEPS */}
          <h3 className="text-2xl font-semibold mb-4">📌 Roadmap Steps</h3>
          <div className="space-y-4">
            {roadmap.roadmapSteps?.map((step, index) => (
              <div
                key={index}
                className="border-l-4 border-blue-500 bg-blue-50 p-4 rounded-md"
              >
                <h4 className="text-lg font-semibold">
                  {index + 1}. {step.stepTitle}
                </h4>
                <p className="text-gray-700 mt-1">{step.stepDesc}</p>
                <p className="text-sm text-gray-500 mt-2">
                  ⏳ {step.stepEstimatedTime}
                </p>
              </div>
            ))}
          </div>

          {/* BOOKS */}
          <h3 className="text-2xl font-semibold mt-8 mb-4">📚 Books</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {roadmap.resources?.books?.map((book, index) => (
              <div
                key={index}
                className="border p-4 rounded-lg hover:shadow transition"
              >
                <h4 className="font-semibold">{book.bookTitle}</h4>
                <p className="text-sm text-gray-500">
                  Author: {book.bookAuthor}
                </p>
                <p className="text-gray-700 mt-2">{book.bookDesc}</p>
              </div>
            ))}
          </div>

          {/* VIDEOS */}
          <h3 className="text-2xl font-semibold mt-8 mb-4">🎥 Videos</h3>
          <ul className="list-disc list-inside space-y-2">
            {roadmap.resources?.videos?.map((video, index) => (
              <li key={index}>
                <a
                  href={video}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  {video}
                </a>
              </li>
            ))}
          </ul>

          {/* LAST WORDS */}
          <div className="mt-10 p-4 bg-green-50 border-l-4 border-green-500 rounded">
            <p className="font-semibold text-green-700">
              {roadmap.lastWords}
            </p>
          </div>

        </div>
      )}
    </div>
  );
};

export default RoadMap;
