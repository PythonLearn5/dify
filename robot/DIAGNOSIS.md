# Dify API 连接诊断

## 测试结论

通过 curl/PowerShell 测试，发现以下信息：

### ✅ 正确的 API 端点
```
http://localhost/v1/chat-messages
```

### ❌ 当前问题
API 返回错误：`"Authorization is required in input form"`

这说明你的 Dify 聊天工作流的"用户输入"节点需要以下参数：
- `networking` (数字类型，默认值：1)
- `Authorization` (字符串类型，应该是 API Key)

### 🔍 需要检查的配置

#### 1. 检查 Dify 工作流配置
打开 http://localhost/apps，进入你的应用，检查：

**聊天工作流 → 用户输入节点**
- 确认输入参数名称是否为 `networking` 和 `Authorization`
- 确认参数类型（数字/文本）
- 确认是否有默认值设置

#### 2. Authorization 参数应该传什么？

根据错误信息，有两种可能：

**方案 A：传 API Key**
```json
{
  "inputs": {
    "networking": 1,
    "Authorization": "app-RGN1grBSQREbnbP6p3h8UTm2"
  }
}
```

**方案 B：传用户登录 Token**
```json
{
  "inputs": {
    "networking": 1,
    "Authorization": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9..."
  }
}
```

#### 3. HTTP Header 也需要 Authorization

测试发现，HTTP 请求头也需要：
```
Authorization: Bearer app-RGN1grBSQREbnbP6p3h8UTm2
```

## 📝 建议的修改

### 方式 1：修改 Dify 工作流（推荐）
1. 打开 Dify 应用配置
2. 找到"用户输入"节点
3. 检查参数配置
4. 如果不需要 Authorization 参数，删除它
5. 重新发布应用

### 方式 2：修改代码适配工作流
如果工作流确实需要这些参数，代码应该这样配置：

```javascript
const requestBody = {
  inputs: {
    networking: 1,
    Authorization: "app-RGN1grBSQREbnbP6p3h8UTm2"  // 或你的 Token
  },
  query: message,
  response_mode: 'blocking',
  user: 'chatbot-user'
};

// HTTP Header 也需要
headers: {
  'Authorization': 'Bearer app-RGN1grBSQREbnbP6p3h8UTm2',
  'Content-Type': 'application/json'
}
```

## 🧪 手动测试命令

在 PowerShell 中运行以下命令测试：

```powershell
$body = @{
    inputs = @{
        networking = 1
        Authorization = "app-RGN1grBSQREbnbP6p3h8UTm2"
    }
    query = "你好"
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
    -UseBasicParsing
```

## 📞 下一步

1. **检查 Dify 工作流配置** - 确认"用户输入"节点需要的参数
2. **告诉我参数应该传什么值** - 我会更新代码
3. **或者修改工作流** - 删除不需要的参数

## 📂 当前配置

- API URL: `http://localhost/v1`
- API Key: `app-RGN1grBSQREbnbP6p3h8UTm2`
- 用户 Token: `eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...`

---

**创建时间**: 2026-04-10 16:40
