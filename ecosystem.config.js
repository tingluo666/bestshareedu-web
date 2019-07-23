const app = require('./package.json')

module.exports = {
  apps: [{
    name: app.name,
    script: 'server/index.js'
  }],

  deploy: {
    pro: {
      user: '', // 服务器用户名
      host: '', // 服务器地址
      ref: 'origin/master', // 代码分支
      repo: `root@47.112.118.235:lionparks/${app.name}.git`, // git地址
      path: `/home/zdlt01/www/${app.name}`, // 服务器上存放代码的路径
      'post-deploy': 'npm run build && pm2 startOrReload ecosystem.config.js', // 执行部署命令，服务器拉代码后，会执行的脚本
      env: { // 环境变量
        NODE_ENV: 'production',
        NODE_PATH: '/home/zdlt01/bin/node_modules', // node_modules访问路径，可以不配，默认是项目所在路径
        PORT: 3000 // 项目启动的端口
      }
    },
    dev: {
      user: 'root',
      host: '10.1.118.203',
      ref: 'origin/dev',
      repo: `root@47.112.118.235:lionparks/${app.name}.git`,
      path: `/home/app/${app.name}`,
      'post-deploy': 'npm run build && pm2 startOrReload ecosystem.config.js',
      env: {
        NODE_ENV: 'development',
        NODE_PATH: '/usr/local/lib/node_modules',
        PORT: 3000
      }
    }
  }
};
