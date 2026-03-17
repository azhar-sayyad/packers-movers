interface RateLimitStore {
  [ip: string]: {
    count: number;
    resetTime: number;
  };
}

const store: RateLimitStore = {};

export function checkRateLimit(
  ip: string,
  limit: number = 10,
  windowMs: number = 60000
): { success: boolean; remaining: number } {
  const now = Date.now();

  // Clean up expired entries periodically
  if (!store[ip] || store[ip].resetTime < now) {
    store[ip] = {
      count: 1,
      resetTime: now + windowMs,
    };
    return { success: true, remaining: limit - 1 };
  }

  if (store[ip].count >= limit) {
    return { success: false, remaining: 0 };
  }

  store[ip].count += 1;
  return { success: true, remaining: limit - store[ip].count };
}
