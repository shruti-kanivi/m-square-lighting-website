// PM2 Ecosystem Configuration
// This file is used for production deployment with PM2

module.exports = {
  apps: [
    {
      name: 'msquare-lighting',
      script: './server/app.js',
      instances: 'max', // Use all available CPU cores
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'development',
        PORT: 5000
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: 5000
      },
      error_file: './logs/err.log',
      out_file: './logs/out.log',
      log_file: './logs/combined.log',
      time: true,
      max_memory_restart: '500M',
      autorestart: true,
      watch: false,
      ignore_watch: ['node_modules', 'logs', 'client'],
      max_restarts: 10,
      min_uptime: '10s'
    }
  ]
};
