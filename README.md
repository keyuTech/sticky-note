# express-sticky-note

### 接口
1. 获取所有的note：GET  /api/notes  req:{}  res: {status: 0, data: [{}, {}]}  {status: 1, errorMsg:"失败的原因"}
2. 创建note：POST  /api/note/create  req:{note: 'hello world'}  res: {status: 0}  {status: 1, errorMsg: "失败的原因"}
3. 修改note: POST  /api/note/modify  req:{note: 'new note', id: xxx}  res: {status: 0}  {status: 1, errorMsg: "失败的原因"}
4. 删除note: POST  /api/note/dalete  req:{id: xxx}  res: {status: 0}  {status: 1, errorMsg: "失败的原因"}