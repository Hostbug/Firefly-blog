---
title: "Debian NAT 小鸡部署 Hysteria2 与 X-UI 面板"
published: 2026-06-24
description: "记录使用 NAT VPS 搭建 Hysteria2 节点和 X-UI 管理面板的完整过程，包括端口映射、节点配置及常见管理命令，实现vpn直连"
image: https://tse4.mm.bing.net/th/id/OIP.D-4N9gpG64E4fBCiAN8WvQHaEK?r=0&cb=thumbexpctl1&rs=1&pid=ImgDetMain&o=7&rm=3
category: server
tags: [VPN, Debian Linux, Hysteria2]
author: "xiaoH"
---

# Debian NAT VPS 搭建 Hysteria2 与 X-UI

## 前言

由于 NAT 类型服务器价格便宜、资源利用率高，因此受到不少个人用户欢迎。本文以一台 Debian 系统 NAT VPS 为例，演示如何完成端口映射、Hysteria2 节点部署以及 X-UI 面板安装等操作。

> NAT VPS 通常没有独立公网端口，需要提前在商家后台完成端口映射配置。

---

# 一、服务器准备

## 获取 VPS

购买完成后，需要记录以下信息：

* 服务器 IP
* SSH 用户名
* SSH 密码
* 映射后的公网端口

对于 NAT 类型 VPS，SSH 默认监听 22 端口，但外部无法直接访问，因此需要在控制面板进行端口转发。

例如：

| 外部端口  | 内部端口 |
| ----- | ---- |
| 13140 | 22   |

完成后即可通过如下命令连接：

```bash
ssh root@服务器IP -p 13140
```

若成功进入系统，则说明端口映射配置正确。

---

# 二、安装 Hysteria2

## 下载并运行安装脚本

执行以下命令：

```bash
wget -N --no-check-certificate https://raw.githubusercontent.com/flame1ce/hysteria2-install/main/hysteria2-install-main/hy2/hysteria.sh && bash hysteria.sh
```

脚本启动后会进入菜单界面。

选择：

```text
1. 安装 Hysteria2
```

---

## 配置证书

安装过程中需要指定 TLS 证书来源。

可选方式包括：

```text
1. 必应自签证书
2. Acme 自动申请证书
3. 自定义证书路径
```

一般测试环境可直接选择：

```text
1
```

随后系统会自动生成所需证书文件。

---

## 设置监听端口

示例：

```text
22233
```

当然也可以直接回车，由脚本随机生成。

建议：

* 避免使用常见端口
* 避免与面板端口冲突

---

## 选择工作模式

系统会提示：

```text
1. 单端口模式
2. 端口跳跃模式
```

对于大多数用户来说：

```text
1
```

即可满足需求。

---

## 设置认证密码

当提示输入密码时：

```text
直接回车
```

系统会自动生成随机密码。

若希望自行管理客户端配置，也可以手动设置一个复杂密码。

---

## 设置伪装域名

示例：

```text
www.bing.com
```

填写时无需携带：

```text
https://
```

最终生成的客户端配置中会自动作为 SNI 使用。

---

# 三、部署 X-UI 面板(可选)

为了方便后续节点管理，可以安装 X-UI。

执行命令：

```bash
bash <(curl -Ls https://raw.githubusercontent.com/FranzKafkaYu/x-ui/master/install.sh)
```

安装完成后，系统会输出：

* 登录地址
* 用户名
* 密码
* 面板端口

访问方式：

```text
http://服务器IP:面板端口
```

> 地址中的冒号必须使用英文符号，否则浏览器无法识别。

---

# 四、常用管理命令

安装完成后，可通过以下命令维护面板。

```bash
查看菜单：
    x-ui

启动面板：
    x-ui start

停止面板：
    x-ui stop

重启服务：
    x-ui restart

查看运行状态：
    x-ui status

启用开机启动：
    x-ui enable

关闭开机启动：
    x-ui disable

查看日志：
    x-ui log

升级面板：

    x-ui update

重新安装：
    x-ui install

卸载面板：
    x-ui uninstall

更新 GEO 数据：

    x-ui geo
```

---

# 五、常见问题

## SSH 无法连接

检查：

1. NAT 端口是否已映射
2. 防火墙是否放行
3. SSH 服务是否启动

查看状态：

```bash
service sshd status
```

---

## 面板打不开

查看服务状态：

```bash
x-ui status
```

若服务未运行：

```bash
x-ui restart
```

同时检查面板端口是否被防火墙拦截。

---

## Hysteria2 连接失败

重点检查：

* 端口是否开放
* 密码是否一致
* SNI 是否填写正确
* 客户端是否支持 Hysteria2

---

# 总结

本文介绍了 NAT VPS 从基础端口映射到 Hysteria2 节点部署，再到 X-UI 面板安装管理的完整流程。对于预算有限的用户而言，NAT VPS 配合 Hysteria2 能够以较低成本实现较好的网络体验。在实际使用过程中，建议按月续费并定期备份配置，以降低服务商异常导致的数据损失风险。

