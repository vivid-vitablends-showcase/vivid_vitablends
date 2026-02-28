import config from '../config/index.js';

export const getDeviceInfo = (req) => {
  return req.headers['user-agent'] || 'Unknown';
};

export const getIpAddress = (req) => {
  return req.headers['x-forwarded-for']?.split(',')[0] || req.ip || 'Unknown';
};

const getCookieOptions = () => ({
  httpOnly: true,
  secure: config.nodeEnv === 'production',
  sameSite: config.nodeEnv === 'production' ? 'none' : 'lax',
  path: '/',
});

export const setRefreshTokenCookie = (res, refreshToken) => {
  res.cookie(config.refreshTokenCookieName, refreshToken, {
    ...getCookieOptions(),
    maxAge: config.refreshTokenCookieMaxAge,
  });
};

export const clearRefreshTokenCookie = (res) => {
  res.clearCookie(config.refreshTokenCookieName, getCookieOptions());
};
