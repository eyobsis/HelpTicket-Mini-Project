import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import connectToDatabase from '@/lib/db';
import Ticket from '@/models/Ticket';
import User from '@/models/User';
import { protectRoute } from '@/lib/auth';

export async function GET(request, { params }) {
  try {
    const decoded = await protectRoute(request);
    if (!decoded) return NextResponse.json(
      { success: false, message: 'Not authorized' },
      { status: 401 }
    );

    if (!params.id || !mongoose.Types.ObjectId.isValid(params.id)) {
      return NextResponse.json(
        { success: false, message: 'Invalid ticket ID' },
        { status: 400 }
      );
    }

    await connectToDatabase();
    const ticket = await Ticket.findById(params.id).populate('user', 'name email');

    if (!ticket) return NextResponse.json(
      { success: false, message: 'Ticket not found' },
      { status: 404 }
    );

    return NextResponse.json({ success: true, data: ticket });
  } catch (error) {
    console.error('Get ticket error:', error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  try {
    const decoded = await protectRoute(request);
    if (!decoded) return NextResponse.json(
      { success: false, message: 'Not authorized' },
      { status: 401 }
    );

    if (!params.id || !mongoose.Types.ObjectId.isValid(params.id)) {
      return NextResponse.json(
        { success: false, message: 'Invalid ticket ID' },
        { status: 400 }
      );
    }

    await connectToDatabase();
    const { id } = params;
    const updateData = await request.json();
    
    const ticket = await Ticket.findById(id);
    if (!ticket) return NextResponse.json(
      { success: false, message: 'Ticket not found' },
      { status: 404 }
    );

    const user = await User.findById(decoded.id);
    let allowedUpdates = {};

    if (user.role === 'admin') {
      if (updateData.status) allowedUpdates.status = updateData.status;
    } else if (ticket.user.equals(user._id)) {
      if (updateData.title) allowedUpdates.title = updateData.title;
      if (updateData.description) allowedUpdates.description = updateData.description;
    } else {
      return NextResponse.json(
        { success: false, message: 'Not authorized to update ticket' },
        { status: 403 }
      );
    }

    const updatedTicket = await Ticket.findByIdAndUpdate(
      id,
      allowedUpdates,
      { new: true, runValidators: true }
    ).populate('user', 'name email');

    return NextResponse.json({ success: true, data: updatedTicket });
  } catch (error) {
    console.error('Update ticket error:', error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const decoded = await protectRoute(request);
    if (!decoded) return NextResponse.json(
      { success: false, message: 'Not authorized' },
      { status: 401 }
    );

    if (!params.id || !mongoose.Types.ObjectId.isValid(params.id)) {
      return NextResponse.json(
        { success: false, message: 'Invalid ticket ID' },
        { status: 400 }
      );
    }

    await connectToDatabase();
    const ticket = await Ticket.findById(params.id);
    if (!ticket) return NextResponse.json(
      { success: false, message: 'Ticket not found' },
      { status: 404 }
    );

    const user = await User.findById(decoded.id);
    if (user.role !== 'admin' && !ticket.user.equals(user._id)) {
      return NextResponse.json(
        { success: false, message: 'Not authorized to delete ticket' },
        { status: 403 }
      );
    }

    await Ticket.findByIdAndDelete(params.id);
    return NextResponse.json({ success: true, message: 'Ticket deleted' });
  } catch (error) {
    console.error('Delete ticket error:', error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}