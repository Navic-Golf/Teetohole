'use client';

import { useState } from 'react';

export default function HomePage() {
  const [improvement, setImprovement] = useState('');
  const [strengths, setStrengths] = useState('');
  const [weaknesses, setWeaknesses] = useState('');
  const [aiFeedback, setAiFeedback] = useState('');
  const [loading, setLoading] = useState(false);

  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [feedbackName, setFeedbackName] = useState('');
  const [feedbackMessage, setFeedbackMessage] = useState('');

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

  const handleFeedbackSubmit = async () => {
    await fetch('/api/save-feedback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: feedbackName,
        message: feedbackMessage,
      }),
    });

    setFeedbackName('');
    setFeedbackMessage('');
    setShowFeedbackForm(false);
    alert('Thanks for your feedback!');
  };

  return (
    <main className="min-h-screen p-4 flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: "url('/images/golf-bg.jpg')" }}>
      <div className="w-full max-w-xl bg-white bg-opacity-90 backdrop-blur-md p-6 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">GreenGolf AI Coach</h2>

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

      {/* Feedback Modal */}
      {showFeedbackForm && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-80 shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Send us feedback</h3>
            <input
              type="text"
              placeholder="Your name (optional)"
              className="w-full p-2 border rounded mb-3"
              value={feedbackName}
              onChange={(e) => setFeedbackName(e.target.value)}
            />
            <textarea
              placeholder="Your message"
              className="w-full p-2 border rounded mb-3"
              rows={4}
              value={feedbackMessage}
              onChange={(e) => setFeedbackMessage(e.target.value)}
            />
            <div className="flex justify-end gap-2">
              <button onClick={() => setShowFeedbackForm(false)} className="text-gray-500">Cancel</button>
              <button onClick={handleFeedbackSubmit} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Send</button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Feedback Button */}
      <button
        onClick={() => setShowFeedbackForm(true)}
        className="fixed bottom-6 right-6 bg-green-600 text-white p-4 rounded-full shadow-lg z-40 hover:bg-green-700"
      >
        Leave Feedback
      </button>
    </main>
  );
}
