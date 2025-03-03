const https = require('https')
const fs = require('fs')
const path = require('path')

// 创建目标目录
const jsonDir = path.join(__dirname, 'assets', 'json')
if (!fs.existsSync(jsonDir)) {
  fs.mkdirSync(jsonDir, { recursive: true })
}

const options = {
  hostname: 'www.bing.com',
  port: 443,
  path: '/HPImageArchive.aspx?format=js&idx=0&n=8&mkt=zh-CN',
  method: 'GET'
}

const req = https.request(options, bing_res => {
  let bing_body = []
  bing_res.on('data', chunk => bing_body.push(chunk))
  
  bing_res.on('end', () => {
    try {
      // 解析原始数据
      const bing_data = JSON.parse(Buffer.concat(bing_body).toString())
      
      // 处理图片数据
      const images = bing_data.images.map(img => ({
        url: `https://www.bing.com${img.url}`,    // 补全完整URL
        copyright: img.copyright.replace(/(^\s*©\s*)|(\s*$)/g, ''), // 清理版权信息
        title: img.title,
        date: img.enddate.slice(0,4) + '-' + img.enddate.slice(4,6) + '-' + img.enddate.slice(6,8)
      }))

      // 生成标准JSON文件
      const output = {
        updateTime: new Date().toISOString(),
        images: images
      }

      // 写入文件
      fs.writeFileSync(
        path.join(jsonDir, 'images.json'),
        JSON.stringify(output, null, 2),
        'utf8'
      )
      
      console.log('成功生成图片数据:', output.images.length, '张')
      
    } catch (error) {
      console.error('数据处理失败:', error)
      process.exit(1)
    }
  })
})

req.on('error', error => {
  console.error('请求失败:', error)
  process.exit(1)
})

req.end()
