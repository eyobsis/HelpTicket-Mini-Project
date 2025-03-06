'use client';
import { useState, useEffect } from 'react';

export default function TicketForm({
  initialData = null,
  onSubmit,
  loading = false,
  error = '',
  success = ''
}) {
  const [formData, setFormData] = useState({
    title: '',
    description: ''
  });

  // Initialize form with existing data when editing
  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title,
        description: initialData.description
      });
    }
  }, [initialData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.description) return;
    await onSubmit(formData);
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md transition-all duration-300">
      <form onSubmit={handleSubmit}>
        {/* Title Field */}
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-yellow-300 font-medium mb-2">
            Title
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full px-4 py-2 border border-orange-400/50 dark:border-orange-500/30 rounded-lg bg-transparent focus:outline-none focus:ring-2 focus:ring-orange-500 dark:focus:ring-orange-400 text-gray-800 dark:text-yellow-300"
            required
          />
        </div>

        {/* Description Field */}
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-yellow-300 font-medium mb-2">
            Description
          </label>
          <textarea
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            className="w-full px-4 py-2 border border-orange-400/50 dark:border-orange-500/30 rounded-lg bg-transparent focus:outline-none focus:ring-2 focus:ring-orange-500 dark:focus:ring-orange-400 text-gray-800 dark:text-yellow-300"
            rows="4"
            required
          ></textarea>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 px-4 bg-orange-500 text-white rounded-lg hover:bg-orange-600 dark:hover:bg-orange-400 transition ${
            loading ? 'opacity-70 cursor-not-allowed' : ''
          }`}
        >
          {loading ? 'Saving...' : initialData ? 'Update Ticket' : 'Create Ticket'}
        </button>

        {/* Error & Success Messages */}
        {error && (
          <div className="mt-4 p-3 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-lg">
            {error}
          </div>
        )}

        {success && (
          <div className="mt-4 p-3 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-lg">
            {success}
          </div>
        )}
      </form>
    </div>
  );
}