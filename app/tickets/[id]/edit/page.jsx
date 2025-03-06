'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import TicketForm from '@/components/TicketForm';
import Spinner from '@/components/Spinner';
import { notFound } from 'next/navigation';

export default function EditTicket({ params }) {


 const TicketId = params.id
  
  if (!TicketId) {
    notFound();
  }
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
        if (!params.id) throw new Error('Missing ticket ID');
        
        const res = await fetch(`/api/tickets/${params.id}`, {
          credentials: 'include'
        });
        const data = await res.json();
        
        if (!res.ok) throw new Error(data.message || 'Failed to fetch ticket');
        if (!data.data) throw new Error('Ticket not found');

        setState(prev => ({ ...prev, ticket: data.data }));
      } catch (error) {
        setState(prev => ({ ...prev, error: error.message }));
        router.push('/dashboard/user');
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
      if (!res.ok) throw new Error(data.message || 'Update failed');

      router.push('/dashboard/user');
    } catch (error) {
      setState(prev => ({ ...prev, error: error.message }));
    } finally {
      setState(prev => ({ ...prev, submitting: false }));
    }
  };

  if (state.loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner className="h-12 w-12 text-blue-600" />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Edit Ticket</h1>
      {state.ticket && (
        <TicketForm
          initialData={state.ticket}
          onSubmit={handleSubmit}
          loading={state.submitting}
          error={state.error}
        />
      )}
    </div>
  );
}