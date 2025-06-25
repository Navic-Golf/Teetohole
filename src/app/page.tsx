'use client';

import { useState } from 'react';

export default function HomePage() {
  const [improvement, setImprovement] = useState('');
  const [strengths, setStrengths] = useState('');
  const [weaknesses, setWeaknesses] = useState('');
  const [aiFeedback, setAiFeedback] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    setAiFeedback('');

    const response = await fetch('/api/ai-feedback', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ improvement, strengths, weaknesses }),
    });

    const data = await response.json();
    setAiFeedback(data.feedback || 'No feedback received.');
    setLoading(false);
  };

  return (
    <main className="relative min-h-screen p-4 flex items-center justify-center">
      {/* 🔳 Valfri mörk overlay (kan kommenteras bort) */}
      <div className="absolute inset-0 bg-black opacity-40 z-0" />

      {/* 🧾 Själva formuläret */}
      <div className="relative z-10 w-full max-w-xl bg-white bg-opacity-80 backdrop-blur-md p-6 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800 drop-shadow-md">
          GreenGolf AI Coach
        </h2>

        <div className="mb-4">
          <label className="block mb-1 font-medium text-gray-700">What do you want to improve?</label>
          <input
            type="text"
            className="w-full p-3 border rounded-lg"
            placeholder="e.g., shoot straighter"
            value={improvement}
            onChange={(e) => setImprovement(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium text-gray-700">Your Strengths</label>
          <textarea
            className="w-full p-3 border rounded-lg"
            rows={2}
            value={strengths}
            onChange={(e) => setStrengths(e.target.value)}
            placeholder="e.g., Driving distance, consistent putting..."
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium text-gray-700">Your Weaknesses</label>
          <textarea
            className="w-full p-3 border rounded-lg"
            rows={2}
            value={weaknesses}
            onChange={(e) => setWeaknesses(e.target.value)}
            placeholder="e.g., 3-putting, slice with driver..."
          />
        </div>

        <button
          onClick={handleSubmit}
          className="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
        >
          Get AI Feedback and Tips
        </button>

        {loading && (
          <p className="mt-4 text-center text-gray-500">Loading AI feedback...</p>
        )}

        {aiFeedback && !loading && (
          <div className="mt-6 p-4 bg-gray-100 rounded-xl text-gray-800 whitespace-pre-wrap">
            {aiFeedback}
          </div>
        )}
      </div>
    </main>
  );
}
