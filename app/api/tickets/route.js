import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import Ticket from '@/models/Ticket';
import User from '@/models/User';
import { protectRoute, verifyToken } from '@/lib/auth';

// Get tickets
export async function GET(request) {
  try {
    const decoded = await protectRoute(request);
    
    if (!decoded) {
      return NextResponse.json(
        { success: false, message: 'Not authorized' },
        { status: 401 }
      );
    }
    
    await connectToDatabase();
    
    const user = await User.findById(decoded.id);
    
    let tickets;
    
    // If admin, get all tickets, otherwise get only user's tickets
    if (user.role === 'admin') {
      tickets = await Ticket.find().populate('user', 'name email');
    } else {
      tickets = await Ticket.find({ user: user._id });
    }
    
    return NextResponse.json(
      { success: true, count: tickets.length, data: tickets },
      { status: 200 }
    );
  } catch (error) {
    console.error('Get tickets error:', error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

// Create ticket
export async function POST(request) {
  try {
    const decoded = await protectRoute(request);
    
    if (!decoded) {
      return NextResponse.json(
        { success: false, message: 'Not authorized' },
        { status: 401 }
      );
    }
    
    await connectToDatabase();
    
    const { title, description } = await request.json();
    
    const ticket = await Ticket.create({
      title,
      description,
      user: decoded.id,
    });
    
    return NextResponse.json(
      { success: true, data: ticket },
      { status: 201 }
    );
  } catch (error) {
    console.error('Create ticket error:', error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const decoded = await protectRoute(request);
    if (!decoded) {
      return NextResponse.json(
        { success: false, message: 'Not authorized' },
        { status: 401 }
      );
    }

    await connectToDatabase();
    const { id } = params;

    // Validate ticket ID format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, message: 'Invalid ticket ID' },
        { status: 400 }
      );
    }

    const ticket = await Ticket.findById(id);
    
    if (!ticket) {
      return NextResponse.json(
        { success: false, message: 'Ticket not found' },
        { status: 404 }
      );
    }

    // Check authorization
    const user = await User.findById(decoded.id);
    if (user.role !== 'admin' && ticket.user.toString() !== decoded.id) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized to delete this ticket' },
        { status: 403 }
      );
    }

    // Perform deletion
    await Ticket.findByIdAndDelete(id);

    return NextResponse.json(
      { success: true, message: 'Ticket deleted successfully' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Delete error:', error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
export async function PUT(request, { params }) {
  try {
    const decoded = await protectRoute(request);
    if (!decoded) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    await connectToDatabase();
    const { id } = params;
    const { title, description, status } = await request.json();
    const user = await User.findById(decoded.id);
    const ticket = await Ticket.findById(id);

    if (!ticket) return NextResponse.json({ error: 'Ticket not found' }, { status: 404 });

    // Authorization check
    if (user.role !== 'admin' && ticket.user.toString() !== decoded.id) {
      return NextResponse.json(
        { error: 'Unauthorized to update this ticket' },
        { status: 403 }
      );
    }

    // Update logic
    const updates = {};
    if (title) updates.title = title;
    if (description) updates.description = description;
    if (status && user.role === 'admin') updates.status = status;

    const updatedTicket = await Ticket.findByIdAndUpdate(
      id,
      updates,
      { new: true, runValidators: true }
    ).populate('user', 'name email');

    return NextResponse.json({
      success: true,
      data: {
        id: updatedTicket._id,
        title: updatedTicket.title,
        description: updatedTicket.description,
        status: updatedTicket.status,
        createdAt: updatedTicket.createdAt
      }
    });

  } catch (error) {
    return NextResponse.json(
      { error: error.message.includes('validation') ? 'Invalid data' : error.message },
      { status: 400 }
    );
  }
}