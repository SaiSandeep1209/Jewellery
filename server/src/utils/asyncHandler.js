/** Wrap an async route handler so thrown/rejected errors reach Express. */
export const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next)
