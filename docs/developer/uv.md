## 指定 `PYTHON` 镜像路径

```TOML title="pyproject.toml"
[tool.uv]
python-install-mirror = "file:///data/temp/uvtemp/"

[[tool.uv.index]]
url = "https://mirrors.aliyun.com/pypi/simple"
default = true
```

## 指定全局的镜像地址

如果是安装工具，会忽略本地配置，本地的用户配置路径 `~/.config/uv/uv.toml`

``` TOML title="uv.toml"
python-install-mirror = "file:///data/temp/uv/"

[[index]]
url = "https://mirrors.aliyun.com/pypi/simple"
default = true
```

[参考资料](https://docs.astral.sh/uv/configuration/files/#configuration-files)


## 服务器上执行下载很慢的解决方案

- 在本地下载好传上去
- 首先要下载 `uv` 和 `uvx` 命令 如：`uv-x86_64-unknown-linux-gnu.tar.gz`
- 下载得到的工具可以放到 `/usr/bin` 并且要添加可以执行权限，如：`755`
- 全局设置镜像地址，将 `python-install-mirror` 设置为本地路径，如：`python-install-mirror = "file:///data/temp/uv/"`
- 运行 `uv python install 3.xx` 会提示具体名称的文件不存在，然后去下载放到指定位置后重新执行


## Windows 系统 uv.toml 路径

- `%APPDATA%\uv\uv.toml` （没找到）
- `%SYSTEMDRIVE%\ProgramData\uv\uv.toml`（可以用）


## 疑难排除

- `VSCode` 打开默认是会识别到虚拟环境，不过某些目录就是无法识别，而且一直显示 `Reactivating terminals...`，可以使用 ++ctrl+shift+p++ 输入 `Python: Clear Workspace Interpreter Setting`