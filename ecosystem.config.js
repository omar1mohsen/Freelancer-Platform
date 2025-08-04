module.exports = {
  apps: [
    {
      name: 'majar_989_website',
   
      exec_mode: 'cluster',
      autorestart: true,
      watch: false,
      args: "start -p 6900",

      script: "node_modules/next/dist/bin/next",
      env: {
        NODE_ENV: "production",
        PORT:6900
      }
    }

  ],
};
