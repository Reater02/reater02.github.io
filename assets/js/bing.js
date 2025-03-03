const fs = require('fs');
const path = require('path');
const axios = require('axios');
const cheerio = require('cheerio');

async function fetchBingImages() {
  try {
    const response = await axios.get('https://www.bing.com/HPImageArchive.aspx?format=js&idx=0&n=8&mkt=zh-CN');
    const images = response.data.images.map(img => img.url);
    
    // 确保目录存在
    const jsonDir = path.join(__dirname, '../json');
    if (!fs.existsSync(jsonDir)) {
      fs.mkdirSync(jsonDir, { recursive: true });
    }
    
    // 写入标准JSON文件
    const outputPath = path.join(jsonDir, 'images.json');
    fs.writeFileSync(outputPath, JSON.stringify(images, null, 2));
    
    console.log('图片数据已保存至:', outputPath);
    
  } catch (error) {
    console.error('获取Bing图片失败:', error);
    process.exit(1);
  }
}

fetchBingImages();
