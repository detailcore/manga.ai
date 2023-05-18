module.exports = {
  apps: [
    {
      name: 'MangaMir',
      exec_mode: 'cluster',
      instances: 6, // 'max' or a number of instances
      script: './node_modules/nuxt/bin/nuxt.js',
      args: 'start'
    }
  ]
}
