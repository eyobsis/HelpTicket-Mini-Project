'use client';
import { useRouter } from 'next/navigation';
import { TrashIcon, PencilSquareIcon } from '@heroicons/react/24/outline';
import Spinner from '@/components/Spinner';

export default function TicketList({
  tickets = [],
  isAdmin = false,
  onStatusChange,
  onDelete,
  processingId
}) {
  const router = useRouter();

  const getStatusColor = (status) => {
    switch (status) {
      case 'open':
        return 'bg-red-900/30 text-red-300 border-red-500';
      case 'in progress':
        return 'bg-yellow-900/30 text-yellow-300 border-yellow-500';
      case 'closed':
        return 'bg-green-900/30 text-green-300 border-green-500';
      default:
        return 'bg-gray-900/30 text-gray-300 border-gray-500';
    }
  };

  return (
    <div className="space-y-4">
      {tickets.map((ticket) => (
        <div
          key={ticket._id}
          className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow transition-all hover:shadow-lg hover:scale-[1.02] duration-300"
        >
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-green-300">
                {ticket.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm mt-2 line-clamp-2">
                {ticket.description}
              </p>
            </div>

            <div className="flex items-center gap-2 ml-4">
              {isAdmin ? (
                <select
                  value={ticket.status}
                  onChange={(e) => onStatusChange(ticket._id, e.target.value)}
                  disabled={processingId === ticket._id}
                  className={`px-2 py-1 text-sm rounded-lg border ${getStatusColor(ticket.status)} ${
                    processingId === ticket._id ? 'opacity-50 cursor-not-allowed' : ''
                  } bg-transparent focus:outline-none focus:ring-2 focus:ring-orange-500`}
                >
                  <option value="open" className="dark:bg-gray-700">
                    Open
                  </option>
                  <option value="in progress" className="dark:bg-gray-700">
                    In Progress
                  </option>
                  <option value="closed" className="dark:bg-gray-700">
                    Closed
                  </option>
                </select>
              ) : (
                <span className={`px-2 py-1 text-sm rounded-full border ${getStatusColor(ticket.status)}`}>
                  {ticket.status}
                </span>
              )}
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between text-sm">
            <div className="text-gray-500 dark:text-gray-400">
              <p className="text-xs">
                Created: {new Date(ticket.createdAt).toLocaleDateString()}
              </p>
              {isAdmin && (
                <p className="text-xs mt-1">
                  Author: {ticket.user?.name || 'Unknown'}
                </p>
              )}
            </div>

            <div className="flex gap-2">
              {!isAdmin && (
                <button
                  onClick={() => router.push(`/tickets/${ticket._id}/edit`)}
                  disabled={processingId === ticket._id}
                  className="text-orange-500 hover:text-orange-400 disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Edit ticket"
                >
                  {processingId === ticket._id ? (
                    <Spinner className="h-5 w-5 animate-spin" />
                  ) : (
                    <PencilSquareIcon className="h-5 w-5" />
                  )}
                </button>
              )}

              <button
                onClick={() => onDelete(ticket._id)}
                disabled={processingId === ticket._id}
                className="text-red-500 hover:text-red-400 disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Delete ticket"
              >
                {processingId === ticket._id ? (
                  <Spinner className="h-5 w-5 animate-spin" />
                ) : (
                  <TrashIcon className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}