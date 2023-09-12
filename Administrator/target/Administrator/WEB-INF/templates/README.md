# newStart
必须检查URL是否正确

借用李欣哲的界面要修改
还有token没添加
教务端发布消息：`/create`  

  **Message --- 0/1**
DataManage相关的都需要加上token

去掉了一些实际不必要的部分
token已添加，但没有token过期处理可能会出问题
添加附件传的是formData,其余都是自定义的对象
需要大改才能在electron使用cookie，选择直接用URL传递token