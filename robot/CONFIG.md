# Dify Chatbot 配置说明

## 📋 已完成的配置

### API 配置（已更新）
- **API 地址**: `http://localhost/console/api`
- **API Key**: 已配置（你的 Bearer Token）

## 🚀 启动方式

### 方式 1：直接运行（推荐）
```bash
cd D:\GITHUB_python\dify\robot
npm start
```

### 方式 2：使用启动脚本
双击运行 `start.bat`（已创建）

## ⚙️ 当前配置

打开 `src/App.js` 查看以下配置：

```javascript
const DIFY_API_URL = 'http://localhost/console/api';
const DIFY_API_KEY = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...';
```

## 📝 使用说明

1. **启动应用**
   ```bash
   cd D:\GITHUB_python\dify\robot
   npm start
   ```
   浏览器会自动打开 http://localhost:3000

2. **开始聊天**
   - 在输入框输入消息
   - 按 Enter 或点击发送按钮
   - 查看 AI 回复

3. **清空对话**
   - 点击右上角 "🗑️ 清空对话" 按钮

## 🔧 常见问题

### Q: 启动时报错？
A: 确保已安装 Node.js 和 npm，然后运行：
```bash
cd D:\GITHUB_python\dify\robot
npm install
npm start
```

### Q: 连接 Dify 失败？
A: 检查：
- Dify 服务是否运行在 http://localhost
- API Key 是否有效
- 浏览器控制台是否有 CORS 错误

### Q: 如何修改 API 地址？
A: 编辑 `src/App.js` 第一行的 `DIFY_API_URL`

## 📂 项目文件

```
robot/
├── src/
│   ├── App.js          # 主程序（包含 API 配置）
│   ├── App.css         # 样式文件
│   └── index.js        # 入口文件
├── public/
│   └── index.html
├── package.json
├── README.md
└── CONFIG.md           # 本文档
```

## 🎨 界面预览

- 紫色渐变主题
- 响应式设计（支持手机）
- 实时消息显示
- 加载动画

---

**配置时间**: 2026-04-10 16:28
**状态**: ✅ API 配置完成，等待启动
