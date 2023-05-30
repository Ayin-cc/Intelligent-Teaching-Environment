## 必看
electron的本体须使用以下命令安装：
`npm install --save-dev electron`

含有preload.js

## 目前实现的功能：
1. 主界面
	基本框架
1. 签到
	倒计时，停止
	二维码对应的随机数（只能根据一串字符串生成二维码，在test/qrcode里）
	签到尚未实现与服务器端、网页端的对接
3. 消息接收与呈现
	通知显示已经完成
	在`main.js`中使用`showMessage("title","body","icon")`在windows发出通知
	
	`message.html`的呈现框架
1. 其它功能

## 目前尚未实现：
1. 主界面
	homepage
	设置，刷新
	登录等一系列功能
2. 签到
	开始签到时，改变`index.html`左侧对应链接为`sign-in.html`
	结束签到时，再变回`sign-in-select.html`
	二维码对应的随机数（只能根据一串字符串生成二维码，再test/qrcode里）
	签到尚未实现与服务器端、网页端的对接
3. 消息接收与呈现
	但消息呈现在`message.html`的功能尚未实现
4. 其它功能


N. 教师端(完全没有考虑)
	可能需要：签到导出，互动情况导出等功能
	
