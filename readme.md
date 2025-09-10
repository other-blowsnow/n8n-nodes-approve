# 安装
Go to Settings > Community Nodes.

Select Install.

Enter `n8n-nodes-approve` in Enter npm package name.

Agree to the risks of using community nodes: select I understand the risks of installing unverified code from a public source.

Select Install.

# 功能
- 获取审批地址
  - 审批通过地址
  - 审批拒绝地址
- 等待审批

# 审批JSON
> 获取审批地址 和 等待审批 中间可以加入任意操作
```json
{
  "nodes": [
    {
      "parameters": {
        "resource": "approve",
        "operation": "approve:getApproveUrl",
        "nodeId": "9082b798-3cb8-4ab4-bf48-3050e9f9338f"
      },
      "type": "CUSTOM.approveNode",
      "typeVersion": 1,
      "position": [
        208,
        0
      ],
      "id": "2f32a934-e2af-4181-902e-531eabec1109",
      "name": "Approve:getApproveUrl approve"
    },
    {
      "parameters": {
        "resource": "approve",
        "operation": "approve:waitApprove"
      },
      "type": "CUSTOM.approveNode",
      "typeVersion": 1,
      "position": [
        416,
        0
      ],
      "id": "9082b798-3cb8-4ab4-bf48-3050e9f9338f",
      "name": "Approve:waitApprove approve"
    }
  ],
  "connections": {
    "Approve:getApproveUrl approve": {
      "main": [
        [
          {
            "node": "Approve:waitApprove approve",
            "type": "main",
            "index": 0
          }
        ]
      ]
    }
  },
  "pinData": {},
  "meta": {
    "instanceId": "02b4f549b31e5afb7ac0434f27e8e1e51494096eb26622aff0d1c16686021c54"
  }
}
```
