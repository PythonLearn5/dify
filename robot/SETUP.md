# 🚀 Dify Chatbot 配置说明

## ✅ 当前配置

### API 设置
```javascript
API URL: http://localhost/v1
API Key: app-RGN1grBSQREbnbP6p3h8UTm2
Endpoint: /chat-messages
```

### 请求结构
代码现在同时配置了两处认证：

**1. HTTP Header**
```
Authorization: Bearer app-RGN1grBSQREbnbP6p3h8UTm2
```

**2. 请求体 inputs**
```json
{
  "inputs": {
    "networking": 1,
    "Authorization": "app-RGN1grBSQREbnbP6p3h8UTm2"
  }
}
```

## 📦 启动应用

### 方式 1：双击启动（推荐）
```
双击 D:\GITHUB_python\dify\robot\start.bat
```

### 方式 2：命令行启动
```bash
cd D:\GITHUB_python\dify\robot
npm start
```

浏览器会自动打开 http://localhost:3000

## 🔧 修改配置

如果工作流参数发生变化，编辑 `src/App.js`：

```javascript
// 第 7-11 行
const DIFY_API_URL = 'http://localhost/v1';
const DIFY_API_KEY = '你的 API Key';
const DEFAULT_NETWORKING = 1; // 修改 networking 默认值
```

## 🐛 故障排查

### 问题 1: "Authorization is required in input form"
**原因**: 工作流的"用户输入"节点需要 Authorization 参数  
**解决**: 代码已配置，如果仍报错，检查 Dify 工作流配置

### 问题 2: "Access token is invalid"  
**原因**: API Key 错误或过期  
**解决**: 
1. 打开 http://localhost/apps
2. 进入应用设置 → API 访问
3. 重新生成 API Key
4. 更新 `src/App.js` 第 8 行

### 问题 3: "Not Found"
**原因**: API 端点错误  
**解决**: 确认 Dify 服务运行在 http://localhost

### 问题 4: CORS 错误
**原因**: 浏览器跨域限制  
**解决**: 
1. 确认 Dify 服务已启动
2. 检查 Dify 是否允许跨域访问
3. 或使用开发模式禁用 CORS（仅测试用）

## 📊 查看错误详情

1. 打开浏览器（Chrome/Edge）
2. 按 F12 打开开发者工具
3. 切换到 Console 标签
4. 查看红色错误信息

## 🧪 测试 API 连接

在 PowerShell 中运行：

```powershell
$body = @{
    inputs = @{
        networking = 1
        Authorization = "app-RGN1grBSQREbnbP6p3h8UTm2"
    }
    query = "测试消息"
    response_mode = "blocking"
    user = "test-user"
} | ConvertTo-Json

$headers = @{
    "Authorization" = "Bearer app-RGN1grBSQREbnbP6p3h8UTm2"
    "Content-Type" = "application/json"
}

Invoke-WebRequest -Uri "http://localhost/v1/chat-messages" `
    -Method POST `
    -Body $body `
    -Headers $headers `
    -UseBasicParsing | Select-Object -ExpandProperty Content
```

## 📝 文件清单

```
D:\GITHUB_python\dify\robot\
├── src/
│   ├── App.js          ✅ 主组件（已配置 API）
│   ├── App.css         ✅ 样式
│   ├── index.js        ✅ 入口
│   └── index.css       ✅ 全局样式
├── public/
│   └── index.html      ✅ HTML 模板
├── package.json        ✅ 依赖配置
├── start.bat           ✅ 启动脚本
├── README.md           ✅ 使用文档
├── CONFIG.md           ✅ 配置说明
└── DIAGNOSIS.md        ✅ 诊断报告
```

## 🎯 下一步

1. ✅ 运行 `start.bat` 启动应用
2. ✅ 在浏览器中测试聊天
3. ❓ 如果仍有问题，查看浏览器控制台错误信息
4. ❓ 或告诉我具体的错误提示

---

**更新时间**: 2026-04-10 16:47  
**状态**: 已配置双认证（Header + Inputs）
