import User from '../models/User.js';
import { generateAccessToken, generateRefreshToken } from '../utils/token.js';

/**
 * Controller for User Registration
 * POST /api/auth/register
 */
export const register = async (request, reply) => {
  const { name, email, password, role, avatar } = request.body || {};

  // Input validation
  if (!name || !email || !password) {
    return reply.status(400).send({
      status: 'error',
      message: 'Name, email, and password are required fields',
    });
  }

  // Email format validation
  const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  if (!emailRegex.test(email)) {
    return reply.status(400).send({
      status: 'error',
      message: 'Please provide a valid email address',
    });
  }

  // Password length validation
  if (password.length < 6) {
    return reply.status(400).send({
      status: 'error',
      message: 'Password must be at least 6 characters long',
    });
  }

  // Role validation if provided
  if (role && !['admin', 'support', 'customer'].includes(role)) {
    return reply.status(400).send({
      status: 'error',
      message: 'Invalid user role specified. Must be admin, support, or customer',
    });
  }

  try {
    // Prevent duplicate emails
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return reply.status(400).send({
        status: 'error',
        message: 'A user with this email address already exists',
      });
    }

    // Create user. Mongoose pre-save hook will handle password hashing.
    const user = new User({
      name,
      email,
      password,
      role: role || 'customer',
      avatar: avatar || '',
      isActive: true,
      lastLogin: new Date(), // Set login timestamp on registration
    });

    await user.save();

    // Generate JWT Access Token and placeholder Refresh Token
    const tokenPayload = { id: user._id, email: user.email, role: user.role };
    const accessToken = generateAccessToken(request.server, tokenPayload);
    const refreshToken = generateRefreshToken(request.server, tokenPayload);

    // Format response, omit password field
    return reply.status(201).send({
      status: 'success',
      message: 'User registered successfully',
      data: {
        token: accessToken,
        refreshToken, // Placed here for future implementation expansion
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          avatar: user.avatar,
          isActive: user.isActive,
          lastLogin: user.lastLogin,
        },
      },
    });
  } catch (error) {
    request.log.error(error);
    return reply.status(500).send({
      status: 'error',
      message: 'Failed to register user due to an internal server error',
    });
  }
};

/**
 * Controller for User Login
 * POST /api/auth/login
 */
export const login = async (request, reply) => {
  const { email, password } = request.body || {};

  // Input validation
  if (!email || !password) {
    return reply.status(400).send({
      status: 'error',
      message: 'Email and password are required',
    });
  }

  try {
    // Find user by email and explicitly include password field
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return reply.status(401).send({
        status: 'error',
        message: 'Invalid email or password credentials',
      });
    }

    // Verify account state
    if (!user.isActive) {
      return reply.status(403).send({
        status: 'error',
        message: 'This user account has been deactivated',
      });
    }

    // Match password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return reply.status(401).send({
        status: 'error',
        message: 'Invalid email or password credentials',
      });
    }

    // Automatically update the user's lastLogin field with current timestamp
    user.lastLogin = new Date();
    await user.save();

    // Generate JWT Access Token and placeholder Refresh Token
    const tokenPayload = { id: user._id, email: user.email, role: user.role };
    const accessToken = generateAccessToken(request.server, tokenPayload);
    const refreshToken = generateRefreshToken(request.server, tokenPayload);

    return reply.status(200).send({
      status: 'success',
      message: 'Logged in successfully',
      data: {
        token: accessToken,
        refreshToken, // Placed here for future implementation expansion
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          avatar: user.avatar,
          isActive: user.isActive,
          lastLogin: user.lastLogin,
        },
      },
    });
  } catch (error) {
    request.log.error(error);
    return reply.status(500).send({
      status: 'error',
      message: 'Failed to process login due to an internal server error',
    });
  }
};

/**
 * Controller for User Profile Fetching (Protected)
 * GET /api/auth/profile
 */
export const getProfile = async (request, reply) => {
  try {
    // request.user is set by authentication middleware
    const user = await User.findById(request.user.id);
    if (!user) {
      return reply.status(404).send({
        status: 'error',
        message: 'User profile not found',
      });
    }

    return reply.status(200).send({
      status: 'success',
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          avatar: user.avatar,
          isActive: user.isActive,
          lastLogin: user.lastLogin,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        },
      },
    });
  } catch (error) {
    request.log.error(error);
    return reply.status(500).send({
      status: 'error',
      message: 'Failed to retrieve profile due to an internal server error',
    });
  }
};
