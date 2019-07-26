if (process.env.NODE_ENV == 'development') { //开发环境
  module.exports =  {
    title: '优享教育',
    baseUrl: 'http://localhost:5840/#/'   //java项目接口地址
  }
}else if (process.env.NODE_ENV == 'testing') {  //测试环境
  module.exports =  {
    title: '优享教育',
    baseUrl: 'http://106.15.39.80:5840/'  //java项目接口地址
  }
}else {
  module.exports =  {   //默认生产环境
    title: '优享教育',
    baseUrl: 'http://120.55.167.34:5840/api/'   //java项目接口地址
  }
}
