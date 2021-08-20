export const config = {
  //Server ENV
  env: process.env.NODE_ENV || 'development',
  host: process.env.NODE_HOST || 'localhost',
  port: process.env.NODE_PORT || 5000,
  // Password Salt ENV
  salt: parseInt(process.env.SALT_ROUNDS) || 10, 
  // Allowed Origins
  allowedOrigins: [process.env.CLIENT_URL, `http://${process.env.NODE_HOST}:${process.env.NODE_PORT}`],
};
