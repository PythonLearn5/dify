# Dify Chatbot UI

基于 React 的 Dify 聊天机器人自定义界面。

## 🚀 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 配置 API

编辑 `src/App.js` 文件，修改以下配置：

```javascript
const DIFY_API_URL = 'http://localhost/v1';  // 你的 Dify API 地址
const DIFY_API_KEY = 'app-your-api-key-here'; // 替换为你的 Dify API Key
```

### 3. 启动开发服务器

```bash
npm start
```

浏览器会自动打开 `http://localhost:3000`

### 4. 构建生产版本

```bash
npm run build
```

## 📋 功能特性

- ✅ 实时聊天界面
- ✅ 消息历史记录
- ✅ 流畅的动画效果
- ✅ 响应式设计（支持移动端）
- ✅ 清空对话功能
- ✅ 加载状态指示器
- ✅ 错误处理

## 🔧 技术栈

- React 18
- Axios（HTTP 请求）
- UUID（消息 ID 生成）
- CSS3（渐变、动画）

## 📝 使用说明

1. 确保 Dify 服务正在运行
2. 获取 Dify 应用的 API Key（在 Dify 应用设置中）
3. 在 `App.js` 中配置 API 地址和 Key
4. 启动应用并开始聊天

## 🎨 自定义

### 修改主题颜色

编辑 `src/App.css` 中的渐变颜色：

```css
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
```

### 修改 API 地址

在 `src/App.js` 中修改 `DIFY_API_URL` 和 `DIFY_API_KEY`

## 📄 项目结构

```
robot/
├── public/
│   └── index.html
├── src/
│   ├── App.js          # 主组件
│   ├── App.css         # 样式
│   ├── index.js        # 入口文件
│   └── index.css       # 全局样式
├── package.json
└── README.md
```

## 🛠️ 常见问题

### Q: 连接 Dify 失败？
A: 检查：
- Dify 服务是否运行
- API URL 和 Key 是否正确
- 是否有 CORS 问题（可能需要配置 Dify 允许跨域）

### Q: 如何获取 API Key？
A: 在 Dify 应用页面 -> 设置 -> API 访问 -> 创建 API Key

## 📞 支持

如有问题，请联系 WinClaw 技术支持。

---

**Made with ❤️ by WinClaw AI**
