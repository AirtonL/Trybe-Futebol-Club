import type { ErrorRequestHandler } from 'express';

const error: ErrorRequestHandler = (
  { isJoi },
  _req,
  res,
  _next,
) => {
  if (isJoi) return res.status(400).json({ message: 'All fields must be filled' });

  return res.status(500).json({ message: 'Server error' });
};

export default error;
