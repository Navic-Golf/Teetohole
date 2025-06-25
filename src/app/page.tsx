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
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ improvement, strengths, weaknesses }),
    });

    const data = await response.json();
    setAiFeedback(data.feedback || 'No feedback received.');
    setLoading(false);
  };

  return (
    <main className="min-h-screen p-4 flex items-center justify-center">
      <div className="w-full max-w-xl bg-white bg-opacity-90 backdrop-blur-md p-6 rounded-2xl shadow-lg space-y-4 sm:space-y-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800">GreenGolf AI Coach</h2>

        <div>
          <label className="block mb-1 font-medium text-gray-700 text-sm sm:text-base">
            What do you want to improve?
          </label>
          <input
            type="text"
            className="w-full p-3 border rounded-lg text-sm sm:text-base"
            placeholder="e.g., shoot straighter"
            value={improvement}
            onChange={(e) => setImprovement(e.target.value)}
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700 text-sm sm:text-base">
            Your Strengths
          </label>
          <textarea
            className="w-full p-3 border rounded-lg text-sm sm:text-base"
            rows={2}
            value={strengths}
            onChange={(e) => setStrengths(e.target.value)}
            placeholder="e.g., Driving distance, consistent putting..."
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700 text-sm sm:text-base">
            Your Weaknesses
          </label>
          <textarea
            className="w-full p-3 border rounded-lg text-sm sm:text-base"
            rows={2}
            value={weaknesses}
            onChange={(e) => setWeaknesses(e.target.value)}
            placeholder="e.g., 3-putting, slice with driver..."
          />
        </div>

        <button
          onClick={handleSubmit}
          className="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition text-sm sm:text-base"
        >
          Get AI Feedback and Tips
        </button>

        {loading && (
          <p className="text-center text-gray-500 text-sm sm:text-base">
            Loading AI feedback...
          </p>
        )}

        {aiFeedback && !loading && (
          <div className="p-4 bg-gray-100 rounded-xl text-gray-800 whitespace-pre-wrap text-sm sm:text-base">
            {aiFeedback}
          </div>
        )}
      </div>
    </main>
  );
}
