---
title: "CentOS 7 笔记"
published: 2026-07-06
description: "CentOS 7 从零开始的完整教程"
image: https://static.swhosting.com/blog/wp-content/uploads/2024/07/12548_destacada_en.webp
category: 云计算
tags: [CentOS, Linux]
author: "xiaoH"
---

---
title: CentOS 7 笔记
published: 2026-07-06
description: CentOS 7 从零开始的完整教程
category: 云计算
tags:
  - CentOS
  - Linux
---

## 一、CentOS 镜像下载

### 1.1 官方镜像源

CentOS 官方镜像站：`https://vault.centos.org/`

由于 CentOS 7 已于 2024 年 6 月 30 日停止维护，官方镜像已迁移至 Vault 归档站。国内推荐使用以下镜像源：

| 镜像源  | 地址                                             |
| ---- | ---------------------------------------------- |
| 阿里云  | `https://mirrors.aliyun.com/centos/`           |
| 清华大学 | `https://mirrors.tuna.tsinghua.edu.cn/centos/` |
| 华为云  | `https://mirrors.huaweicloud.com/centos/`      |

### 1.2 CentOS 7 版本选择

| 版本                                  | 说明                  |
| ----------------------------------- | ------------------- |
| CentOS-7-x86_64-DVD-2009.iso        | 标准安装版，包含常用软件（推荐）    |
| CentOS-7-x86_64-Everything-2009.iso | 完整版，包含所有软件包（约 10GB） |
| CentOS-7-x86_64-Minimal-2009.iso    | 最小化安装，无图形界面（服务器推荐）  |
| CentOS-7-x86_64-NetInstall-2009.iso | 网络安装版，需联网下载         |

### 1.3 下载示例（以阿里云为例）

```bash
# 选择版本
https://mirrors.aliyun.com/centos/7/isos/x86_64/

# 浏览器下载 CentOS 7 标准版
https://mirrors.aliyun.com/centos/7/isos/x86_64/CentOS-7-x86_64-DVD-2009.iso

# 使用 wget 下载 CentOS 7 标准版
wget https://mirrors.aliyun.com/centos/7/isos/x86_64/CentOS-7-x86_64-DVD-2009.iso

```

---

## 二、虚拟机安装 CentOS 7

### 2.1 虚拟机软件选择

| 软件                     | 说明                   |
| ---------------------- | -------------------- |
| VMware Workstation Pro | 商业软件，功能强大（现已免费供个人使用） |
| VirtualBox             | 开源免费，跨平台             |

### 2.2 VMware 安装 CentOS 7 步骤

**第一步：创建新虚拟机**

1. 打开 VMware，点击 `文件 → 新建虚拟机`
2. 选择 `典型（推荐）`，点击 `下一步`
3. 选择 `安装程序光盘映像文件(iso)`，浏览选择下载好的 CentOS 7 ISO 文件
4. 填写虚拟机信息：
   - 虚拟机名称：自定义（如 `CentOS7-Server`）
   - 安装位置：选择非系统盘目录
5. 指定磁盘容量：
   - 最大磁盘大小：`20GB`（推荐）
   - 选择 `将虚拟磁盘拆分成多个文件`
6. 点击 `自定义硬件` 进行配置

**第二步：硬件资源配置**

| 硬件    | 最小配置   | 推荐配置     |
| ----- | ------ | -------- |
| 处理器   | 1 核    | 2 核及以上   |
| 内存    | 1GB    | 2GB 及以上  |
| 网络适配器 | NAT 模式 | NAT 模式   |
| 硬盘    | 20GB   | 40GB 及以上 |
| 显存    | 1GB    | 2GB      |

> [!TIP]
> 服务器环境建议选择最小化安装（Minimal），可节省资源并减少攻击面。

**第三步：安装 CentOS 7**

1. 启动虚拟机，选择 `Install CentOS 7`
2. 语言选择：`中文 → 简体中文`（或 English）
3. 安装信息摘要中配置：
   - **安装位置**：选择自动分区或手动分区
   - **软件选择**：最小安装 / 带 GUI 的服务器
   - **网络和主机名**：开启网络连接，设置主机名
4. 设置 `root` 密码，创建普通用户
5. 等待安装完成后重启

**第四步：首次启动配置**

```bash
# 接受许可证
licensing-acceptance

# 创建初始用户（如未在安装时创建）
```

### 2.3 VirtualBox 安装 CentOS 7 步骤

```bash
# 1. 创建虚拟机（命令行方式，可选）
VBoxManage createvm --name "CentOS7" --ostype RedHat_64 --register

# 2. 配置内存和CPU
VBoxManage modifyvm "CentOS7" --memory 2048 --cpus 2

# 3. 创建虚拟硬盘
VBoxManage createmedium disk --filename CentOS7.vdi --size 20480

# 4. 添加 SATA 控制器和硬盘
VBoxManage storagectl "CentOS7" --name "SATA" --add sata --controller IntelAhci
VBoxManage storageattach "CentOS7" --storagectl "SATA" --port 0 --device 0 --type hdd --medium CentOS7.vdi

# 5. 挂载 ISO 镜像
VBoxManage storagectl "CentOS7" --name "IDE" --add ide
VBoxManage storageattach "CentOS7" --storagectl "IDE" --port 0 --device 0 --type dvddrive --medium /path/to/CentOS-7-x86_64-DVD-2009.iso

# 6. 配置网络（桥接模式）
VBoxManage modifyvm "CentOS7" --nic1 bridged --bridgeadapter1 "Ethernet"

# 7. 启动虚拟机
VBoxManage startvm "CentOS7"
```

### 2.4 网络模式说明

| 模式   | 说明                  | 适用场景        |
| ---- | ------------------- | ----------- |
| NAT  | 虚拟机通过宿主机上网，外部无法直接访问 | 开发测试（默认推荐）  |
| 桥接   | 虚拟机如同独立主机接入网络       | 需要外部访问虚拟机服务 |
| 仅主机  | 虚拟机与宿主机组成私有网络       | 隔离测试环境      |
| 内部网络 | 虚拟机之间互通，与宿主机隔离      | 多虚拟机集群测试    |

---

## 三、系统基础配置

### 3.1 切换图形化与字符界面

```bash
# 切换到图形化界面
systemctl isolate graphical.target

# 切换到命令行界面
systemctl isolate multi-user.target

# 设置默认启动为命令行
systemctl set-default multi-user.target

# 设置默认启动为图形化
systemctl set-default graphical.target

# 查看当前默认启动目标
systemctl get-default
```

### 3.2 设置主机名

```bash
# 临时修改（重启后失效）
hostname centos7-server

# 永久修改
sudo hostnamectl set-hostname centos7-server

# 查看主机名
hostnamectl
```

### 3.3 关闭防火墙

```bash
# 停止防火墙
systemctl stop firewalld

# 禁止开机启动
systemctl disable firewalld

# 查看防火墙状态
systemctl status firewalld

# 关闭 IPv6 防火墙
chkconfig ip6tables off
```

> [!WARNING]
> 生产环境不建议直接关闭防火墙，应根据业务需求开放对应端口。

### 3.4 关闭 SELinux

```bash
# 查看 SELinux 状态
getenforce

# 临时关闭（重启后失效）
setenforce 0

# 永久关闭（需重启）
vim /etc/selinux/config
# 将 SELINUX=enforcing 改为 SELINUX=disabled
```

### 3.5 配置静态 IP

编辑网络配置文件：

```bash
cd /etc/sysconfig/network-scripts
vim ifcfg-ens33
```

修改或添加以下内容：

```bash
BOOTPROTO=static
ONBOOT=yes
IPADDR=192.168.1.100
NETMASK=255.255.255.0
GATEWAY=192.168.1.1
DNS1=8.8.8.8
DNS2=114.114.114.114
```

重启网络服务：

```bash
systemctl restart network.service
# .service 后缀可省略
```

### 3.6 关闭 NetworkManager 冲突

如果 NetworkManager 与网络服务冲突：

```bash
service NetworkManager stop
chkconfig NetworkManager off
systemctl restart network
```

---

## 四、文件与目录操作

### 4.1 基本目录操作

```bash
# 切换目录
cd /home        # 切换到 /home 目录
cd ..           # 返回上级目录
cd ~            # 切换到用户主目录
cd -            # 切换到上一次所在目录
pwd             # 显示当前工作目录

# 列出文件
ls              # 列出当前目录文件
ls -l           # 长格式显示（含权限、大小、时间等）
ls -la          # 显示所有文件（含隐藏文件）
ls -lh          # 以人类可读方式显示文件大小
```

### 4.2 文件创建与修改时间

```bash
# 创建空文件
touch t1 t2 t3

# 修改文件的存取时间为指定日期
touch -d 20220323 file1.txt

# 修改文件的存取时间为 2020 年 9 月 25 日
touch -d 20200925 t1
ll t1
```

### 4.3 复制、移动、删除

```bash
# 复制文件（改名复制）
cp /etc/hosts /root/f1

# 复制目录（递归复制）
cp -r /etc/sysconfig /root/sysconfig_bak

# 移动文件
mv /etc/t2 /root/t2.txt

# 重命名文件
mv t1 t1.txt

# 删除文件（-r 删除文件夹，-f 强制删除）
rm -rf /tmp/testdir
rm -f file1.txt
```

### 4.4 链接文件

```bash
# 软链接（快捷方式），加 -s 参数
ln -s /root/f1 /tmp/test1

# 硬链接（不加 -s）
ln /root/f1 /tmp/hardlink1
```

### 4.5 文件查找

```bash
# 在 /etc 目录下查找文件名以 ".conf" 结尾的文件
find /etc -name "*.conf"

# 在根目录下查找名称为 bin 的所有目录
find / -type d -name bin

# 查找大于 100M 的文件
find / -size +100M

# 查找最近 7 天内修改过的文件
find /home -mtime -7

# 查找文件名为 passwd 的文件
locate passwd
```

### 4.6 查看文件内容

```bash
# 显示所有行（带行号）
cat -n /etc/hosts

# 显示非空行（带行号）
cat -b /etc/passwd

# 分页查看
more /etc/passwd
less -N /etc/passwd      # 加行号显示

# 显示前 10 行
head -10 /etc/passwd

# 显示后 20 行
tail -20 /etc/passwd

# 实时查看日志（常用）
tail -f /var/log/messages

# 在文件中查找包含 "ftp" 的行（-i 忽略大小写）
grep -i ftp /etc/passwd

# 递归查找目录中包含指定字符串的文件
grep -r "error" /var/log/
```

### 4.7 查看磁盘占用

```bash
# 以 K、M、G 等方式显示目录占用空间
du -h /root

# 查看当前磁盘使用情况
df -h

# 查看指定目录大小
du -sh /var/log
```

---

## 五、文件权限管理

### 5.1 查看文件权限

```bash
touch file1.txt
ll file1.txt
# 输出示例：-rw-r--r--. 1 root root 0 11月 15 09:32 file1.txt
```

权限说明：

| 权限位   | 字符  | 数字  | 含义  |
| ----- | --- | --- | --- |
| 第 1 位 | r   | 4   | 读取  |
| 第 2 位 | w   | 2   | 写入  |
| 第 3 位 | x   | 1   | 执行  |

### 5.2 使用数字修改权限

```bash
# 权限对应关系：r=4, w=2, x=1
# 644 = rw-r--r--
chmod 644 file1.txt

# 755 = rwxr-xr-x（常用于脚本文件）
chmod 755 script.sh

# 777 = rwxrwxrwx（慎用，所有人可读写执行）
chmod 777 file1.txt
```

### 5.3 使用字符修改权限

```bash
# u=属主, g=属组, o=其他用户, a=所有用户
chmod u+x file1.txt          # 属主增加执行权限
chmod g=wx file1.txt          # 属组设置写入和执行权限
chmod o+w file1.txt           # 其他用户增加写入权限
chmod a+r file1.txt           # 所有用户增加读取权限
```

### 5.4 修改属主和属组

```bash
# 修改文件的属主和属组
chown zhang3:li4 file1.txt

# 递归修改目录的属主和属组
chown -R www:www /var/www/html

# 仅修改属主
chown zhang3 file1.txt

# 仅修改属组
chgrp li4 file1.txt
```

### 5.5 权限掩码 umask

```bash
# 查看当前权限掩码（默认 0022）
umask

# 文件默认权限 = 666 - umask = 644（rw-r--r--）
# 目录默认权限 = 777 - umask = 755（rwxr-xr-x）

# 修改权限掩码为 024
umask 024
# 此时新建文件权限为 642，目录权限为 753
```

---

## 六、用户与组管理

### 6.1 相关配置文件

| 文件             | 作用         |
| -------------- | ---------- |
| `/etc/passwd`  | 用户账号信息     |
| `/etc/shadow`  | 用户密码（加密存储） |
| `/etc/group`   | 组账号信息      |
| `/etc/gshadow` | 组密码信息      |

### 6.2 用户管理

```bash
# 新建用户
useradd zhang

# 为用户设置密码
passwd zhang

# 查看用户信息
tail -1 /etc/passwd
tail -1 /etc/shadow

# 修改用户的家目录
usermod -d /admin zhang

# 将用户加入附加组
usermod -G wheel zhang

# 锁定用户（禁止登录）
usermod -L zhang

# 解锁用户
usermod -U zhang

# 删除用户（-r 同时删除家目录）
userdel -r zhang

# 切换用户
su root              # 切换到 root 用户
su - root            # 切换并加载 root 环境变量
exit                 # 返回上一个用户
```

### 6.3 组管理

```bash
# 添加组（GID 为 1010，组名为 group1）
groupadd -g 1010 group1

# 查看组信息
tail -1 /etc/group

# 将多个用户同时加入组（zhang3 为管理员）
gpasswd -M zhang3,li4 group1
gpasswd -A zhang3 group1

# 将用户加入组
gpasswd -a zhang3 group1

# 将用户从组中删除
gpasswd -d zhang3 group1

# 修改组的 GID 和组名
groupmod -g 2000 -n group11 group1

# 删除组
groupdel group11

# 查看当前用户所属的组
groups zhang3
id zhang3
```

---

## 七、磁盘与分区管理

### 7.1 MBR 分区（fdisk）

```bash
# 查看磁盘信息
lsblk
fdisk -l

# 对新硬盘进行分区
fdisk /dev/sdb
# 常用操作：
# n  - 创建新分区
# d  - 删除分区
# p  - 显示分区表
# t  - 更改分区类型
# w  - 保存并退出
# q  - 不保存退出

# 刷新分区表
partprobe /dev/sdb
```

### 7.2 GPT 分区（gdisk）

```bash
# 对大于 2TB 的磁盘使用 GPT 分区
gdisk /dev/sdb
# 操作方式与 fdisk 类似
```

### 7.3 格式化与挂载

```bash
# 格式化分区为 xfs 文件系统
mkfs -t xfs /dev/sdb5

# 格式化为 ext4 文件系统
mkfs -t ext4 /dev/sdb5

# 创建挂载点并挂载
mkdir /data
mount /dev/sdb5 /data

# 查看挂载信息
mount
lsblk
```

### 7.4 永久挂载

```bash
# 编辑 fstab 配置文件实现开机自动挂载
vim /etc/fstab
# 添加如下行：
# /dev/sdb5    /data    xfs    defaults    0 0

# 使配置立即生效
mount -a

# 验证挂载
mount | grep -w /data
```

### 7.5 挂载 U 盘与光盘

```bash
# 挂载 U 盘
mount /dev/sdd1 /mnt/usb
ll /mnt/usb

# 挂载光盘
mkdir -p /mnt/cdrom1
mount /dev/cdrom /mnt/cdrom1
ll /mnt/cdrom1

# 卸载
umount /dev/cdrom
umount /mnt/usb
```

### 7.6 LVM 逻辑卷管理

> [!NOTE]
> LVM（Logical Volume Manager）允许动态调整磁盘分区大小，是生产环境中管理存储的推荐方案。

**创建 LVM 步骤：**

```bash
# 1. 检查是否安装 LVM
rpm -q lvm2

# 2. 将物理分区转换为物理卷（PV）
pvcreate /dev/sdb1 /dev/sdb5 /dev/sdc1
pvs                    # 查看物理卷
pvscan                 # 扫描物理卷

# 3. 创建卷组（VG）
vgcreate vg01 /dev/sdb1 /dev/sdb5
vgs                    # 查看卷组
vgdisplay              # 显示卷组详细信息

# 4. 创建逻辑卷（LV）
lvcreate -n lv01 -L 2.5G vg01
lvs                    # 查看逻辑卷

# 5. 格式化逻辑卷
mkfs -t xfs /dev/vg01/lv01

# 6. 挂载逻辑卷
mkdir -p /home/mylv
vim /etc/fstab
# 添加：/dev/vg01/lv01    /home/mylv    xfs    defaults    0 0
mount -a

# 7. 验证
echo "hello world" > /home/mylv/mylv.txt
cat /home/mylv/mylv.txt
```

**扩展 LVM：**

```bash
# 扩展卷组（添加新物理卷）
vgs vg01
vgextend vg01 /dev/sdc1

# 在线扩展逻辑卷（增加 3GB）
lvs /dev/vg01/lv01
lvextend -L +3G /dev/vg01/lv01

# 扩展文件系统（xfs 使用 xfs_growfs）
df -hT /home/mylv
xfs_growfs /home/mylv/

# 若为 ext4 文件系统
# resize2fs /dev/vg01/lv01
```

**删除 LVM（逆序操作）：**

```bash
# 先卸载
umount /dev/vg01/lv01

# 删除逻辑卷
lvremove /dev/vg01/lv01

# 删除卷组
vgremove vg01

# 删除物理卷
pvremove /dev/sdb1
```

---

## 八、软件包管理

### 8.1 RPM 包管理

```bash
# 查询是否已安装某个软件包
rpm -q openssh-server

# 显示全部已安装的 RPM 软件包
rpm -qa

# 分页浏览所有已安装的包
rpm -qa | less

# 显示软件包详细信息
rpm -qi openssh

# 显示软件包安装的文件列表
rpm -ql openssh | less

# 查询指定文件由哪个软件包产生
rpm -qf /etc/postfix/access

# 显示软件包的配置文件
rpm -qc postfix

# 安装 RPM 包
rpm -ivh package_name.rpm

# 升级 RPM 包
rpm -Uvh package_name.rpm

# 卸载 RPM 包
rpm -e package_name

# 查询未安装的 RPM 包信息
mount /dev/cdrom /mnt
rpm -qlp /mnt/Packages/ppp-2.4.5-33.el7.x86_64.rpm
```

### 8.2 YUM 包管理

```bash
# 安装软件包
yum -y install httpd

# 更新软件包
yum -y update

# 卸载软件包
yum -y remove httpd

# 搜索软件包
yum search nginx

# 查看已安装的软件包
yum list installed

# 查看软件包信息
yum info httpd

# 清除 YUM 缓存
yum clean all

# 重建 YUM 缓存
yum makecache

# 查看 YUM 源
yum repolist

# 查看可用的软件包组
yum grouplist

# 安装软件包组（如桌面环境）
yum groupinstall "GNOME Desktop"
```

### 8.3 配置本地 YUM 源

适用于无法联网的服务器环境：

```bash
# 1. 挂载光盘镜像
mkdir -p /opt/centos
mount /dev/cdrom /mnt

# 2. 复制软件包到本地目录
cp -rvf /mnt/* /opt/centos/
ls -l /opt/centos/

# 3. 删除系统自带的 YUM 配置
rm -rf /etc/yum.repos.d/*

# 4. 创建本地 YUM 源配置文件
cat > /etc/yum.repos.d/local.repo << 'EOF'
[centos]
name=centos
baseurl=file:///opt/centos
enabled=1
gpgcheck=0
EOF

# 5. 生成 YUM 缓存
yum clean all
makecache
yum repolist

# 6. 测试安装
yum -y install httpd
```

---

## 九、网络配置

### 9.1 网络管理工具

```bash
# 查看网络接口信息
ip addr show
ifconfig

# 查看路由表
ip route show
route -n

# 查看网络连接状态
ss -tlnp               # 查看监听的 TCP 端口
netstat -tlnp           # 同上（需安装 net-tools）

# 测试网络连通性
ping -c 4 8.8.8.8
ping -c 4 www.baidu.com

# DNS 查询
nslookup www.baidu.com
dig www.baidu.com

# 跟踪路由
traceroute www.baidu.com
```

### 9.2 配置静态 IP

```bash
vim /etc/sysconfig/network-scripts/ifcfg-ens33
```

完整配置示例：

```bash
TYPE=Ethernet
BOOTPROTO=static
NAME=ens33
DEVICE=ens33
ONBOOT=yes
IPADDR=192.168.1.100
NETMASK=255.255.255.0
GATEWAY=192.168.1.1
DNS1=8.8.8.8
DNS2=114.114.114.114
```

```bash
# 重启网络
systemctl restart network
```

### 9.3 配置 DNS

```bash
# 编辑 DNS 配置
vim /etc/resolv.conf
# 添加：
# nameserver 8.8.8.8
# nameserver 114.114.114.114
```

### 9.4 配置 hosts 文件

```bash
# 编辑 hosts 文件实现本地域名解析
vim /etc/hosts
# 添加：
# 192.168.1.100  web01.example.com
```

---

## 十、重定向与管道

### 10.1 重定向

```bash
# 覆盖写入（>）
echo "this is web" > /usr/t1

# 追加写入（>>）
echo "new line" >> /usr/t1

# 合并多个文件内容
cat t1 t2 > t3.txt

# 正确信息写入 t4，错误信息写入 t5
cat t1 t2 t3 > t4 2 > t5
cat t4
cat t5
```

### 10.2 管道

```bash
# 管道符 | 将前一个命令的输出作为后一个命令的输入
ls -al | more

# 查看内存使用前 10 名的进程
ps aux | sort -rnk4 | head -10

# 查找特定进程
ps aux | grep nginx

# 统计行数
cat /etc/passwd | wc -l
```

---

## 十一、服务管理

### 11.1 systemctl 基本操作

```bash
# 启动服务
systemctl start httpd

# 停止服务
systemctl stop httpd

# 重启服务
systemctl restart httpd

# 查看服务状态
systemctl status httpd

# 设置开机自启
systemctl enable httpd

# 取消开机自启
systemctl disable httpd

# 查看所有运行中的服务
systemctl list-units --type=service --state=running

# 查看所有已注册的服务
systemctl list-unit-files --type=service
```

### 11.2 服务进程管理

```bash
# 查看所有进程
ps aux
ps -ef

# 动态查看进程
top

# 按名称查找进程
ps aux | grep httpd

# 终止进程
kill PID                # 正常终止
kill -9 PID             # 强制终止
pkill httpd             # 按名称终止
killall httpd           # 按名称终止所有同名进程
```

### 11.3 定时任务（Crontab）

```bash
# 编辑当前用户的定时任务
crontab -e

# 查看定时任务
crontab -l

# 删除所有定时任务
crontab -r

# cron 表达式格式：
# 分  时  日  月  周  命令
# *   *   *   *   *   command

# 示例：每天凌晨 2 点执行备份脚本
# 0 2 * * * /root/backup.sh

# 示例：每 5 分钟检查服务状态
# */5 * * * * /root/check_service.sh
```

---

## 十二、Apache（httpd）服务部署

```bash
# 安装 Apache
yum -y install httpd

# 启动服务
systemctl start httpd

# 设置开机自启
systemctl enable httpd

# 关闭 SELinux（如已关闭可跳过）
setenforce 0

# 关闭防火墙或开放 80 端口
systemctl stop firewalld
# 或：firewall-cmd --permanent --add-service=http
#      firewall-cmd --reload

# 测试访问
curl http://localhost

# 配置文件路径
# 主配置文件：/etc/httpd/conf/httpd.conf
# 网站根目录：/var/www/html
# 错误日志：  /var/log/httpd/error_log
# 访问日志：  /var/log/httpd/access_log

# 修改网站根目录
vim /etc/httpd/conf/httpd.conf
# 找到 DocumentRoot 修改路径
```

---

## 十三、vim 文本编辑器

### 13.1 基本操作

```bash
# 打开文件
vim /etc/passwd

# 三种模式切换：
# 按 i        → 进入插入模式（编辑）
# 按 Esc       → 返回普通模式
# 输入 :wq     → 保存并退出
# 输入 :q!     → 不保存强制退出
# 输入 :w      → 仅保存
```

### 13.2 常用快捷键

| 按键              | 作用                     |
| --------------- | ---------------------- |
| `i` / `a` / `o` | 在光标前 / 后 / 下方新建行进入插入模式 |
| `dd`            | 删除当前行                  |
| `yy`            | 复制当前行                  |
| `p`             | 粘贴                     |
| `u`             | 撤销上一步操作                |
| `Ctrl + r`      | 重做（恢复撤销）               |
| `/keyword`      | 向下搜索关键字                |
| `?keyword`      | 向上搜索关键字                |
| `n` / `N`       | 下一个 / 上一个匹配项           |
| `:set nu`       | 显示行号                   |
| `:set nonu`     | 取消行号                   |
| `G`             | 跳转到文件末尾                |
| `gg`            | 跳转到文件开头                |
| `:%s/old/new/g` | 全局替换                   |

---

## 十四、系统监控与日志

### 14.1 系统信息查看

```bash
# 查看系统版本
cat /etc/redhat-release
uname -a

# 查看系统资源使用
top                       # 实时监控进程和资源
htop                      # 增强版 top（需安装）

# 查看内存使用
free -h

# 查看磁盘使用
df -h

# 查看 CPU 信息
lscpu
cat /proc/cpuinfo

# 查看系统运行时间和负载
uptime
w
```

### 14.2 日志管理

```bash
# 系统日志目录
ls /var/log/

# 实时查看系统日志
tail -f /var/log/messages

# 查看启动日志
dmesg | tail -20

# 查看登录记录
last
lastlog

# 查看安全日志
cat /var/log/secure
```

---

## 十五、SSH 远程管理

```bash
# SSH 连接远程服务器
ssh root@192.168.1.100
ssh -p 22 zhang@192.168.1.100

# SSH 免密登录配置
ssh-keygen -t rsa                          # 生成密钥对
ssh-copy-id root@192.168.1.100             # 分发公钥

# 远程复制文件（SCP）
scp /local/file.txt root@192.168.1.100:/remote/path/
scp -r /local/dir root@192.168.1.100:/remote/path/

# 从远程服务器下载文件
scp root@192.168.1.100:/remote/file.txt /local/path/

# SSH 配置文件
vim /etc/ssh/sshd_config
# 修改端口：Port 2222
# 禁用密码登录：PasswordAuthentication no
# 禁用 root 远程登录：PermitRootLogin no
```

---

> [!NOTE]
> 本文档持续更新中，涵盖 CentOS 7 从安装到日常运维的核心知识点。如有补充或修正，欢迎提交反馈。
