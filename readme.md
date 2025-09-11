<img width="2560" height="1192" alt="image" src="https://github.com/user-attachments/assets/9671b764-a166-4706-9068-0d942fffd3d3" />


# 使用方法
1. 获取审批地址
2. 添加一个等待审批节点
3. 等待审批地址访问后工作流继续执行

## 安装
- 转到设置>社区节点。
- 选择安装。
- 在输入 npm 包名称中输入 n8n-nodes-approve。
- 同意使用社区节点的风险：选择我了解从公共来源安装未经验证的代码的风险。
- 选择安装。

# 功能
- 获取审批地址
  - 审批通过地址
  - 审批拒绝地址
- 等待审批

# 审批工作流案例
> 获取审批地址 和 等待审批 中间可以加入任意操作
```json
{"nodes":[{"parameters":{},"type":"n8n-nodes-base.manualTrigger","typeVersion":1,"position":[-384,0],"id":"833b7d5d-aa5f-4731-8518-6ebb48e94e2d","name":"When clicking ‘Execute workflow’"},{"parameters":{"resource":"approve","operation":"approve:getApproveUrl","nodeId":"8503c660-32d4-4c75-a60a-05035ab9e837"},"type":"n8n-nodes-approve.approveNode","typeVersion":1,"position":[-160,0],"id":"b0a757ef-3465-4fa0-9258-1f45f861ea0a","name":"Approve:getApproveUrl approve","webhookId":"4d959d4e-9ce0-40d8-88cb-f5e60a617208"},{"parameters":{"resource":"approve","operation":"approve:waitApprove","options":{"limitWaitTime":{"values":{"resumeAmount":45,"resumeUnit":"minutes"}}}},"type":"n8n-nodes-approve.approveNode","typeVersion":1,"position":[320,0],"id":"8503c660-32d4-4c75-a60a-05035ab9e837","name":"Approve:waitApprove approve","webhookId":"2c84c543-efe9-451c-957b-92cd8b6fcf7f"},{"parameters":{"url":"https://bing.com","options":{}},"type":"n8n-nodes-base.httpRequest","typeVersion":4.2,"position":[48,0],"id":"4da7460c-0f10-44c3-a8fc-a0dddc1eb2f8","name":"HTTP Request"},{"parameters":{},"type":"n8n-nodes-base.noOp","typeVersion":1,"position":[528,0],"id":"a16ef4c8-9706-4600-9059-803b05b73d9a","name":"No Operation, do nothing"}],"connections":{"When clicking ‘Execute workflow’":{"main":[[{"node":"Approve:getApproveUrl approve","type":"main","index":0}]]},"Approve:getApproveUrl approve":{"main":[[{"node":"HTTP Request","type":"main","index":0}]]},"Approve:waitApprove approve":{"main":[[{"node":"No Operation, do nothing","type":"main","index":0}]]},"HTTP Request":{"main":[[{"node":"Approve:waitApprove approve","type":"main","index":0}]]}},"pinData":{},"meta":{"templateCredsSetupCompleted":true,"instanceId":"0df765b3d0993112e88e19d04d39f740e9de5a025e7bc18393c83fe1ab44211e"}}
```
