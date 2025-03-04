'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import TicketForm from '@/components/TicketForm';
import Spinner from '@/components/Spinner';

export default function EditTicket({ params }) {
  const router = useRouter();
  const [state, setState] = useState({
    ticket: null,
    loading: true,
    error: null,
    submitting: false
  });

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        // Validate ID format
        if (!params.id || !/^[0-9a-fA-F]{24}$/.test(params.id)) {
          throw new Error('Invalid ticket ID format');
        }

        const res = await fetch(`/api/tickets/${params.id}`, {
          credentials: 'include'
        });
        
        const data = await res.json();
        
        if (!res.ok) {
          throw new Error(data.message || 'Failed to fetch ticket');
        }

        if (!data.data) {
          throw new Error('Ticket not found');
        }

        setState(prev => ({ 
          ...prev, 
          ticket: {
            ...data.data,
            createdAt: new Date(data.data.createdAt)
          },
          error: null
        }));
      } catch (error) {
        setState(prev => ({ 
          ...prev, 
          error: error.message,
          ticket: null
        }));
        console.error('Fetch error:', error);
      } finally {
        setState(prev => ({ ...prev, loading: false }));
      }
    };

    fetchTicket();
  }, [params.id]);

  const handleSubmit = async (formData) => {
    try {
      setState(prev => ({ ...prev, submitting: true, error: null }));
      
      const res = await fetch(`/api/tickets/${params.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
        credentials: 'include'
      });

      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.message || 'Failed to update ticket');
      }

      router.push('/dashboard/user');
    } catch (error) {
      setState(prev => ({ 
        ...prev, 
        error: error.message,
        submitting: false
      }));
      console.error('Update error:', error);
    }
  };

  if (state.loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner className="h-12 w-12 text-blue-600" />
        <span className="ml-2">Loading ticket...</span>
      </div>
    );
  }

  if (state.error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <div className="text-red-500 text-center max-w-md">
          <h2 className="text-2xl font-bold mb-4">Error Loading Ticket</h2>
          <p className="mb-4">{state.error}</p>
          <button
            onClick={() => router.push('/dashboard/user')}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Return to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Edit Ticket</h1>
        <p className="text-gray-500 mt-2">
          Last updated: {state.ticket.createdAt.toLocaleDateString()}
        </p>
      </div>
      
      <TicketForm 
        initialData={{
          title: state.ticket.title,
          description: state.ticket.description
        }}
        onSubmit={handleSubmit}
        loading={state.submitting}
        submitText="Save Changes"
      />

      {state.error && (
        <div className="mt-4 p-4 bg-red-50 text-red-700 rounded">
          {state.error}
        </div>
      )}

      {state.submitting && (
        <div className="mt-4 text-center text-gray-500">
          Saving changes...
        </div>
      )}
    </div>
  );
}