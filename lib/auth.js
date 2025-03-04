import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Generate token
export const generateToken = (id) => {
  return jwt.sign({ id }, JWT_SECRET, {
    expiresIn: '30d',
  });
};

// Verify token middleware
export const verifyToken = async (request) => {
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value;

  if (!token) {
    return null;
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded;
  } catch (error) {
    return null;
  }
};

// Protect route middleware
export const protectRoute = async (request) => {
  const decoded = await verifyToken(request);
  
  if (!decoded) {
    return NextResponse.json(
      { success: false, message: 'Not authorized, no token' },
      { status: 401 }
    );
  }
  
  return decoded;
};

// Admin route middleware
export const adminRoute = async (request) => {
  const decoded = await verifyToken(request);
  
  if (!decoded) {
    return NextResponse.json(
      { success: false, message: 'Not authorized, no token' },
      { status: 401 }
    );
  }
  
  const User = require('../models/User').default;
  const user = await User.findById(decoded.id);
  
  if (user.role !== 'admin') {
    return NextResponse.json(
      { success: false, message: 'Not authorized as an admin' },
      { status: 403 }
    );
  }
  
  return decoded;
};
