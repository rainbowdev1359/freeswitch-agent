module.exports = {
  apps: [
    {
      name: 'https-dev',
      script: 'npm',
      args: 'run dev',
      env: {
        HTTPS: 'true',
        SSL_CRT_FILE: './cert.pem',
        SSL_KEY_FILE: './key.pem',
        NODE_ENV: 'development'
      }
    }
  ]
};
