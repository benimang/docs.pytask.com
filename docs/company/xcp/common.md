# 通用资料

## 更新注意事项

- 涉及到从 `kafka` 拉去数据的改动，需要修改数据表 `basic_config` 里面的字段 `is_stop_load_data_kafak=1` ，触发重启，否则更新无效果
- 涉及到 `kafka` 里面用到的 `topic` 不能随意添加，需要 `kafka` 后台添加（目前在 `xcp-api` 项目里的 `setting.yaml` 配置有用到）
- 新增其他游戏研发后台，前端项目需要新建环境变量文件（如：`.env.xcll` 和 `.env.xcll_demo` ），在 `package.json` 的 `scripts` 里添加对应的打包命令
- 涉及到以下文件的改动，是不会同步到服务器上打包，需要在服务器上直接改动
    - `xcp-vue/vue.config.js`
    - `xcp-server/config/*`
    - `xcp-server/**/*.yaml`
    - `xcp-api/**/*.yaml`
    - `xcp-dcs/local/classes/config.php`


## `xcp_api` 新增日志表无法入库

1. 检查 `setting.yaml` 配置，里面 `log-list` 需要配置表的名称，但不要包含 `log_` 前缀。
2. 检查 `setting.yaml` 配置，里面 `kafka-log-topic` 需要配置表明对应的 `topic` 名称，但这里的 `topic` 名称是不能随便新增的。
3. 检查 `setting.yaml` 是否有正常在服务器上面手动更新，因为这个文件在发布的时候是不会同步到服务器上的。
5. 检查 `log.go` 文件里面配置的 `POST` 映射，映射的函数名称必须是跟表明相关联的，不要前缀 `log_` 而且后面下划线改为驼峰写法。


## Server DAO

1. `xcp-server/config/config.yaml` 文件最下面的一段注释打开，修改服务器链接、表明、分组信息
2. `gf gen dao` 执行命令行生成


## 搭建步骤

1. 定义游戏名称（用在分支名称以及数据库名称）
1. 创建分支 `xcp-admin-xxx`（前后端代码）
1. 本地项目切换到新的分支
1. 基于现有的后台数据库进行克隆，其中 `SITE` 数据库可以完全克隆，`LOG` 数据库只克隆结构，`DATA` 数据库要特殊处理
1. 数据库 `DATA` 可以先只克隆结构，然后再将以下数据表的内容搬过去
    - basic_config
    - c_first_pay_time_range
    - c_online_range
    - c_pay_range
    - common_config
    - cp_api_url_config
1. `DATA` 数据库中的表 `cp_api_url_config` 里面的 `base_url` 需要研发提供，如果没提供需要修改成不存在的域名，避免误操作影响到其他游戏
1. 搭建阶段可以创建测试用的渠道 `c_channel_test` 以及服务器 `c_server` 方便测试，正式交付前再清空
1. `xcp-vue` 整理打包环境变量文件，将不需要用到的删除（`.env.xxx`）
1. `xcp-vue` `.env.development` 文件确保要保留修改成里面的名称
1. `xcp-vue` 整理打包脚本（修改 `package.json` 里面的 `build:xxx`）
1. `xcp-server` 本地后端使用新的数据库地址（`config/config.yaml`）
1. 测试本地是否能正常启动前后端并正常访问
1. 检查定时器是否正常设置并启动 `crontab -l` （192.168.1.153）
1. 检查定时器运行的输出目录是否存在（如果目录不存在会导致执行失败）
1. 使用本地工具测试 api post 能否正常请求将数据入库
2. 检查定时器是否能正常触发统计脚本并入库统计数据
3. 检查后台网址是否能正常进入
4. 检查后台的前后端打包，以及 `dcs` 以及 `api` 打包是否正常


## 查看 kafka 接收信息

1. 登录远程机器 `192.168.1.153`
2. 进入目录 `/opt/www/kafka-test`
3. 修改文件 `main.go` 修改
    - `groupID` 
    - `logTypeFilter` 
    - `gameKeyFilter` 
    - `readOrder` 
    - `maxMessages`
5. 执行查询 `go run main.go`


## 本地修改不提交文件

### xcp-dcs

``` php title="xcp-dcs/local/classes/config.php" linenums="1" hl_lines="2 3 7 8"
<?php
!defined('GAME_NAME') && define('GAME_NAME', '测试横扫山河'); //游戏名称
!defined('GAME_KEY') && define('GAME_KEY', 'test-xc01'); //游戏名称
!defined('GAME_SECRET') && define('GAME_SECRET', 'testsecret'); //游戏名称


!defined('DB_LOG') && define('DB_LOG', 'xcp_xc01_log'); //数据库log
!defined('DB_DATA') && define('DB_DATA', 'xcp_xc01_data'); //数据库data
!defined('MYSQL_HOST') && define('MYSQL_HOST', '192.168.1.153');
!defined('MYSQL_USERNAME') && define('MYSQL_USERNAME', 'cpdatamysqlu');
!defined('MYSQL_PASSWORD') && define('MYSQL_PASSWORD', 'xcproot@lmy');
!defined('MYSQL_PORT') && define('MYSQL_PORT', '3306');
!defined('KAFKA_HOST') && define('KAFKA_HOST', '47.112.209.178');
!defined('KAFKA_GROUP_ID') && define('KAFKA_GROUP_ID', 'load_log_kafka');


// !defined('DB_LOG') && define('DB_LOG', 'xcp_log'); //数据库log
// !defined('DB_DATA') && define('DB_DATA', 'xcp_data'); //数据库data
// !defined('MYSQL_HOST') && define('MYSQL_HOST', '120.78.223.213');
// !defined('MYSQL_USERNAME') && define('MYSQL_USERNAME', 'root');
// !defined('MYSQL_PASSWORD') && define('MYSQL_PASSWORD', 'hywltest01');
// !defined('MYSQL_PORT') && define('MYSQL_PORT', '3306');


return array(
	//游戏数据库
 	'db_datapark'=> array(
		'dbHost' => MYSQL_HOST,
		'dbPort' => MYSQL_PORT,
		'dbUser' => MYSQL_USERNAME,
		'dbPwd' => MYSQL_PASSWORD,
		'dbName' => DB_LOG,
		'driverOptions' => array(
		PDO::MYSQL_ATTR_INIT_COMMAND=>'SET character_set_client=binary, character_set_connection=\'utf8\', character_set_results=\'utf8\'',
		PDO::ATTR_PERSISTENT=>false,
		)
	),
	//游戏统计库
	'db_data'=> array(
		'dbHost' => MYSQL_HOST,
		'dbPort' => MYSQL_PORT,
		'dbUser' => MYSQL_USERNAME,
		'dbPwd' => MYSQL_PASSWORD,
		'dbName' => DB_DATA,
		'driverOptions' => array(
		PDO::MYSQL_ATTR_INIT_COMMAND=>'SET character_set_client=binary, character_set_connection=\'utf8\', character_set_results=\'utf8\'',
		PDO::ATTR_PERSISTENT=>false,
		)
	),
	'log_config'=>array(
		'game_log_dir' => "/opt/log/game_admin_log/logReady/", //未处理日志存放目录
		'game_log_dir_error' => "/opt/log/game_admin_log/logError/", //处理出错日志存放目录
		'lock_dir' => "/opt/log/game_admin_log/logLock/", //进程锁文件存放位置
        'logDir' => dirname(dirname(dirname(__FILE__)))."/log/", //执行日志
        'log_server_arr' => ['s1'], //服务器id列表数组
	),
);
```


``` php title="xcp-dcs/local/classes/loglock.php" linenums="1" hl_lines="31-33 40-42"
<?php
/*
   检查进程是否存在，存在返回1，不存在返回0
 */
class LogLock {
	private static $_instance = null;
	public function getlock($name) {
		$lock = $name.".lock";
		if (file_exists($lock)) {
			$check_pid = file_get_contents($lock);
			system("kill -CHLD " . $check_pid . " 1> /dev/null 2> /dev/null", $check_pid_return);
			if($check_pid_return == 1)
			{
				//存在已经假死的进程,或进程不存在
				return 0;
			}
			else {
				//已存在正在运行的进程
				return 1;
			}
		} else {
			//不存在锁文件
			return 0;
		}
	}
	/*
	   给当前进程上锁
	 */
	public function lockit($name)
	{
		// todo 当前windows开发，屏蔽锁操作，代码提交前必须要还原
		// $lock = $name.".lock";
		// file_put_contents($lock,getmypid());
	}
	/*
	   删除进程锁
	 */
	public function unlock($name)
	{
		// todo 当前windows开发，屏蔽锁操作，代码提交前必须要还原
		// $lock = $name.".lock";
		// @unlink($lock);
	}
	/**
	 * 获取单例
	 *
	 * @return Sylogbase
	 */
	public static function getInstance()
	{
		if (self::$_instance instanceof self) {
			return self::$_instance;
		}
		return new self();
	}
}
```


### xcp-server


``` yaml title="xcp-server/config/config.yaml" linenums="1" hl_lines="21-26 29 31-35 45-57 91"
# HTTP Server
server:
  address: ':8888'
  log-path: './logs/server'
  dump-router-map: false
  access-log-enabled: true
  error-log-enabled: true
  graceful: true  # 是否开启平滑重启特性，开启时将会在本地增加10000的本地TCP端口用于进程间通信。默认false
  gracefulTimeout: 15      # 父进程在平滑重启后多少秒退出，默认2秒。若请求耗时大于该值，可能会导致请求中断
  bin-name: 'go_ops_admin'

# Logger
logger:
  path: './logs/log'
  level: 'info'
  stdout: true

# 数据库连接信息
dbInfo: &dbInfo
  type: mysql
  # 测试机器
  # host: 192.168.1.153
  # port: 3306
  # user: cpdatamysqlu
  # pass: xcproot@lmy
  # 横扫山河、屠龙仙缘（只读）
  # host: 192.168.1.154
  # port: 3306
  # user: xcpdataread
  # pass: xcp@ihdic20a
  # 消除（只读）
  host: 192.168.2.101
  port: 3307
  user: xcllmysqlread
  pass: xcll@read1362
  maxIdle: 50
  maxOpen: 100
  debug: false

# 数据库列表
dbList:
  # site: &site xcp_site
  # data: &data xcp_data
  # log: &log xcp_log
  # 消除来了
  site: &site xcp_xcll_site
  data: &data xcp_xcll_data
  log: &log xcp_xcll_log
  # 横扫山河
  # site: &site xcp_hssh_site
  # data: &data xcp_hssh_data
  # log: &log xcp_hssh_log
  # 消除01
  # site: &site xcp_xc01_site
  # data: &data xcp_xc01_data
  # log: &log xcp_xc01_log
  

# database 配置(复用上面配置的信息)
database:
  default: # 默认启动Mysql配置
    #link: "mysql:root:hywltest01@tcp(120.78.223.213:3306)/xdgo_site"
    <<: *dbInfo
    # maxIdle: 20 #可以覆盖dbExtInfo里的配置
    name: *site
    debug: true
  site: # 默认启动Mysql配置
    #link: "mysql:root:hywltest01@tcp(120.78.223.213:3306)/xdgo_site"
    <<: *dbInfo
    # maxIdle: 20 #可以覆盖dbExtInfo里的配置
    name: *site
  data:
    <<: *dbInfo
    name: *data
    debug: true
  log:
    <<: *dbInfo
    name: *log
    debug: true
  logger: # Database logger.
    path: './logs/sql'
    level: 'all'
    stdout: true

# host:port[,db,pass?maxIdle=x&maxActive=x&idleTimeout=x&maxConnLifetime=x]
# maxIdl	        允许闲置的连接数(0表示不限制)
# maxActive	    最大连接数量限制(0表示不限制)
# idleTimeout	连接最大空闲时间(单位秒,不允许设置为0)
# maxConnLifetime 连接最长存活时间(单位秒,不允许设置为0)
redis:
  default: 127.0.0.1:6379,0,?maxIdle=10&maxActive=100

gToken:
  system:
    CacheMode: 2
    CacheKey: "GToken:"
    Timeout: 86400
    MaxRefresh: 604800
    TokenDelimiter: _
    EncryptKey: koi29a83idakguqjq29asd9asd8a7jhq
    AuthFailMsg: 登录超时，请重新登录
    MultiLogin: false

# 命令行工具（GoFrame CLI Tool v1.15.4）可以在svn上获取
# svn://192.168.1.148:11002/xcp_sdk/doc/tools/gf.exe.7z
gfcli:
  gen:
    dao:
      #- link: mysql:cpdatamysqlu:xcproot@lmy@tcp(192.168.1.153:3306)/xcp_demo_data
      #  group: data
      #  tables: "c_first_pay_time_range" #指定当前数据库中需要执行代码生成的数据表。如果为空，表示数据库的所有表都会生成
      #  tablesEx: "" #需要排除代码生成的数据表
      # -
      #   link: mysql:cpdatamysqlu:xcproot@lmy@tcp(192.168.1.153:3306)/xcp_demo_log
      #   group: log
      #   tables: "log_enter_game,log_order_create,log_order_finish,log_coin_change,log_goods_change" #指定当前数据库中需要执行代码生成的数据表。如果为空，表示数据库的所有表都会生成
      #   tablesEx: "" #需要排除代码生成的数据表
      # -
      #   link: mysql:cpdatamysqlu:xcproot@lmy@tcp(192.168.1.153:3306)/xcp_demo_site
      #   tables: "admins" #指定当前数据库中需要执行代码生成的数据表。如果为空，表示数据库的所有表都会生成
      #   tablesEx: "" #需要排除代码生成的数据表
      -
#        link: mysql:cpdatamysqlu:xcproot@lmy@tcp(192.168.1.153:3306)/xcp_demo_data
#        group: data
#        jsonCase: Snake
#        tables: "r_s_coin_day" #指定当前数据库中需要执行代码生成的数据表。如果为空，表示数据库的所有表都会生成
#        tablesEx: "" #需要排除代码生成的数据表
```


``` yaml title="xcp-server/config/setting.yaml" linenums="1" hl_lines="2"
cpInfo:
  secert: testxcll4bd7ef52f7b3dee68d4a6f11
  isUeditor: true

siteInfo:
  aeskey: "7894651784ASDJKH"
```


### xcp-vue


``` js title="xcp-vue/vue.config.js" linenums="1" hl_lines="28"
'use strict'

const path = require('path')
const buildConf = require('./build.config')
const packageConf = require('./package.json')
const Timestamp = new Date().getTime();
function resolve(dir) {
    return path.join(__dirname, dir)
}
module.exports = {
    // 基础配置 详情看文档
    publicPath: './',
    outputDir: 'dist',
    assetsDir: 'static',
    lintOnSave: process.env.NODE_ENV === 'development',
    productionSourceMap: false,
    devServer: {
        port: 8080,
        open: false,
        overlay: {
            warnings: false,
            errors: true
        },
        proxy: {
            // 把key的路径代理到target位置
            // detail: https://cli.vuejs.org/config/#devserver-proxy
            [process.env.VUE_APP_BASE_API]: { //需要代理的路径   例如 '/api'
                target: `http://127.0.0.1:8888/`, //代理到 目标路径
                //target: `http://192.168.1.165:8888/`,
                changeOrigin: true,
                pathRewrite: { // 修改路径数据
                    ['^' + process.env.VUE_APP_BASE_API]: '' // 举例 '^/api:""' 把路径中的/api字符串删除
                }
            }
        },
    },
    configureWebpack: {
        //    @路径走src文件夹
        resolve: {
            alias: {
                '@': resolve('src')
            }
        }
    },
    chainWebpack(config) {
        config.output.filename('js/[name].' + Timestamp + '.js').end();
        config.output.chunkFilename('js/[name].' + Timestamp + '.js').end();
        // set preserveWhitespace
        config.module
            .rule('vue')
            .use('vue-loader')
            .loader('vue-loader')
            .tap(options => {
                options.compilerOptions.preserveWhitespace = true
                return options
            })
            .end()
        config
            // https://webpack.js.org/configuration/devtool/#development
            .when(process.env.NODE_ENV === 'development',
                config => config.devtool('cheap-source-map')
            )

        config
            .when(process.env.NODE_ENV !== 'development',
                config => {

                    // 不打包 begin
                    // 1.目前已经测试通过[vue,axios,echarts]可以cdn引用，其它组件测试通过后可继续添加
                    // 2.此处添加不打包后，需在public/index.html head中添加相应cdn资源链接
                    config.set('externals', buildConf.cdns.reduce((p, a) => {
                        p[a.name] = a.scope
                        return p
                    }, {}))
                    // 不打包 end

                    config.plugin('html')
                        .tap(args => {
                            if (buildConf.title) {
                                args[0].title = buildConf.title
                            }
                            if (buildConf.cdns.length > 0) {
                                args[0].cdns = buildConf.cdns.map(conf => {
                                    if (conf.path) {
                                        conf.js = `${buildConf.baseCdnUrl}${conf.path}`
                                    } else {
                                        conf.js = `${buildConf.baseCdnUrl}/${conf.name}/${packageConf.dependencies[conf.name].replace('^', '')}/${conf.name}.min.js`
                                    }

                                    return conf
                                })
                            }
                            return args
                        })

                    config
                        .plugin('ScriptExtHtmlWebpackPlugin')
                        .after('html')
                        .use('script-ext-html-webpack-plugin', [{
                            // `runtime` must same as runtimeChunk name. default is `runtime`
                            inline: /single\..*\.js$/
                        }])
                        .end()
                    config
                        .optimization.splitChunks({
                            chunks: 'all',
                            cacheGroups: {
                                libs: {
                                    name: 'chunk-libs',
                                    test: /[\\/]node_modules[\\/]/,
                                    priority: 10,
                                    chunks: 'initial' // only package third parties that are initially dependent
                                },
                                elementUI: {
                                    name: 'chunk-elementUI', // split elementUI into a single package
                                    priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
                                    test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // in order to adapt to cnpm
                                },
                                commons: {
                                    name: 'chunk-commons',
                                    test: resolve('src/components'), // can customize your rules
                                    minChunks: 3, //  minimum common number
                                    priority: 5,
                                    reuseExistingChunk: true
                                }
                            }
                        })
                    config.optimization.runtimeChunk('single')
                }
            )
    }
}
```