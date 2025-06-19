# `WSL2` 在 `Windows` 安装 `Linux` 子系统

## 电脑开启虚拟功能

每个电脑的主板设置都不一样，通常都是在开机的时候进入 `BIOS设置` 找到虚拟化选项，开启即可。

## 开启 Windows 功能

系统最好是 Windows 11 以后的版本，之前的版本部分功能支持不完整

![Image title](/images/bc525b4a.webp)

## 家庭版 Hyper-V

如果是 `Windows 家庭版` 可能在上一步功能开启的时候无法看到 `Hyper-V` 选项，可以复制下面代码以管理员权限运行，运行后会提示重启电脑，然后就可以出现了。

``` bat title="hyper.cmd"
pushd "%~dp0"
dir /b %SystemRoot%\servicing\Packages\*Hyper-V*.mum >hyper-v.txt
for /f %%i in ('findstr /i . hyper-v.txt 2^>nul') do dism /online /norestart /add-package:"%SystemRoot%\servicing\Packages\%%i"
del hyper-v.txt
Dism /online /enable-feature /featurename:Microsoft-Hyper-V-All /LimitAccess /ALL
```

## 安装 WSL2

需要在 `Microsoft Store` 下载安装 `Windows Subsystem for Linux` 如果不安装的话不确定是不是 `WSL2` 版本，而且安装前命令行执行 `wsl --version` 无法输出版本号。在 `Microsoft Store` 如果无法找到，可以直接复制这个链接在浏览器打开 [https://aka.ms/wslstorepage](https://aka.ms/wslstorepage)，会触发打开 `Microsoft Store`。

## 安装 Linux 发行版

可以直接在 `Microsoft Store` 搜索 `Ubuntu` `Debian` 或其他下载安装。

也可以使用命令行安装，`wsl --list --online` 查看可以安装的发行版，然后执行 `wsl --install Xxxxx` 安装。

> [!WARNING]
> 如果使用命令行需要翻墙才行。


## wsl.conf 配置

可选配置，其中这两个很实用，一个是支持 `systemclt`，一个是默认 `root` 账号登录。

具体配置可以查看文档 [wsl.conf 配置](https://learn.microsoft.com/zh-cn/windows/wsl/wsl-config)

``` toml title="wsl.conf"
[boot]
systemd=true

[user]
default=root
```