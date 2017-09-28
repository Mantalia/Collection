用户名：phinney 密码：1

sudo apt-get install packagename		安装一个软件包

sudo apt-get install packagename --reinstall	重新安装软件包

sudo apt-get -f install   			修复安装软件包

sudo apt-get remove packagename 		卸载一个已安装的软件包（保留配置文档）

sudo apt-get remove packagename --purge 	卸载一个已安装的软件包（删除配置文档）

sudo apt-get autoremove packagename		删除包及其依赖的软件包

sudo apt-get autoremove packagname --purge	删除包及其依赖的软件包和配置文件

sudo apt-get clean				删除所有软件的备份（软件包）

sudo apt-get autoclean				删除已卸载软件的备份（软件包）

sudo apt-get update				更新源

sudo apt-get -u upgrade				更新已安装的软件包

sudo apt-get dist-upgrade			将系统升级到新版本

sudo apt-get build-dep packagename		安装相关的编译环境

sudo apt-get source packagename			下载该包的源代码

sudo apt-get check				检查是否有损坏的依赖

sudo apt-get install apt-file			安装apt-file

sudo apt-file update				更新apt-file

sudo apt-file search filename			查找包含特定文档的软件包（不一定是已安装的）
						sudo apt-file search filename | grep /bin/
						sudo apt-file search filename | grep -w filename

sudo apt-cache search packagename		搜索软件包

sudo apt-cache show packagename			获取软件包的相关信息

sudo apt-cache showpkg pkgs			显示软件包信息

sudo apt-cache show pkgs			显示软件包记录

sudo apt-cache pkgnames				打印软件包列表中任何软件包的名称

sudo apt-cache dumpavail			打印可用软件包列表

sudo apt-cache depends packagename		了解使用该软件包依赖那些软件包

sudo apt-cache rdepends packagename		查看该软件包被哪些软件包依赖

sudo aptitude					周详查看已安装或可用的软件包(安装/卸载）

sudo dpkg --force-all --purge packagename	卸载难卸载软件（有点冒险）

sudo dpkg -l package-name-pattern		列出任何和模式相匹配的软件包

sudo dpkg -S file				这个文档属于哪个已安装软件包

sudo dpkg -L package				列出软件包中的任何文档

sudo dpkg -l					列出所有已安装的软件包


桌面快捷方式目录：/usr/share/applications

查询：dkpg -l

卸载：dkpg -r 文件名


安装ssh：sudo apt-get install ssh（安装客户端）
	 apt-get install openssh-client（安装客户端失败时安装这个）
	 apt-get install openssh-server（安装服务器）

安装yum：sudo apt install yum

安装gdebi：sudo apt install gdebi-core

安装git：sudo apt-get install git

配置node：sudo ln -s /opt/node/bin/node /usr/bin/node
	  sudo ln -s /opt/node/bin/npm /usr/bin/npm

安装mongodb：
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 0C49F3730359A14518585931BC711F9BA15703C6
echo "deb [ arch=amd64,arm64 ] http://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/3.4 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.4.list
sudo apt-get update
sudo apt-get install -y mongodb-org

Start MongoDB： 		sudo service mongod start	
Stop MongoDB：			sudo service mongod stop
Restart MongoDB：		sudo service mongod restart
Remove Packages：		sudo apt-get purge mongodb-org*
Remove Data Directories：	sudo rm -r /var/log/mongodb
				sudo rm -r /var/lib/mongodb

Linux下的tar压缩解压缩命令详解

tar

-c: 建立压缩档案
-x：解压
-t：查看内容
-r：向压缩归档文件末尾追加文件
-u：更新原压缩包中的文件

这五个是独立的命令，压缩解压都要用到其中一个，可以和别的命令连用但只能用其中一个。下面的参数是根据需要在压缩或解压档案时可选的。

-z：有gzip属性的
-j：有bz2属性的
-Z：有compress属性的
-v：显示所有过程
-O：将文件解开到标准输出

下面的参数-f是必须的

-f: 使用档案名字，切记，这个参数是最后一个参数，后面只能接档案名。

# tar -cf all.tar *.jpg
这条命令是将所有.jpg的文件打成一个名为all.tar的包。-c是表示产生新的包，-f指定包的文件名。

# tar -rf all.tar *.gif
这条命令是将所有.gif的文件增加到all.tar的包里面去。-r是表示增加文件的意思。

# tar -uf all.tar logo.gif
这条命令是更新原来tar包all.tar中logo.gif文件，-u是表示更新文件的意思。

# tar -tf all.tar
这条命令是列出all.tar包中所有文件，-t是列出文件的意思

# tar -xf all.tar
这条命令是解出all.tar包中所有文件，-t是解开的意思

压缩

tar -cvf jpg.tar *.jpg //将目录里所有jpg文件打包成tar.jpg 

tar -czf jpg.tar.gz *.jpg   //将目录里所有jpg文件打包成jpg.tar后，并且将其用gzip压缩，生成一个gzip压缩过的包，命名为jpg.tar.gz

 tar -cjf jpg.tar.bz2 *.jpg //将目录里所有jpg文件打包成jpg.tar后，并且将其用bzip2压缩，生成一个bzip2压缩过的包，命名为jpg.tar.bz2

tar -cZf jpg.tar.Z *.jpg   //将目录里所有jpg文件打包成jpg.tar后，并且将其用compress压缩，生成一个umcompress压缩过的包，命名为jpg.tar.Z

rar a jpg.rar *.jpg //rar格式的压缩，需要先下载rar for linux

zip jpg.zip *.jpg //zip格式的压缩，需要先下载zip for linux

解压

tar -xvf file.tar //解压 tar包

tar -xzvf file.tar.gz //解压tar.gz

tar -xjvf file.tar.bz2   //解压 tar.bz2

tar -xZvf file.tar.Z   //解压tar.Z

unrar e file.rar //解压rar

unzip file.zip //解压zip

总结

1、*.tar 用 tar -xvf 解压

2、*.gz 用 gzip -d或者gunzip 解压

3、*.tar.gz和*.tgz 用 tar -xzf 解压

4、*.bz2 用 bzip2 -d或者用bunzip2 解压

5、*.tar.bz2用tar -xjf 解压

6、*.Z 用 uncompress 解压

7、*.tar.Z 用tar -xZf 解压

8、*.rar 用 unrar e解压

9、*.zip 用 unzip 解压


ABP安装:https://adblockplus.org/zh_CN