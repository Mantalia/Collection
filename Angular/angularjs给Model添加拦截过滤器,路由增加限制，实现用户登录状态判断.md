使用angularjs的但页面应用时，由于是本地路由在控制页面跳转，但是有的时候我们需要判断用户是否登录来判断用户是否能进入界面。

angularjs是mvc架构所以实现起来很容易也很灵活，我们只MainController里增加一个路由事件侦听并判断，这样就可以避免未登录用户直接输入路由地址来跳转到登录界面地址了

#### 代码中的 $rootScope.user是登录后把用户信息放到了全局rootScope上，方便其他地方使用，$rootScope.defaultPage也是默认主页面，初始化的时候写死到rootScope里的。

```
$rootScope.$on('$stateChangeStart',function(event, toState, toParams, fromState, fromParams){
	if(toState.name=='login')return;// 如果是进入登录界面则允许
	// 如果用户不存在
	if(!$rootScope.user || !$rootScope.user.token){
		event.preventDefault();// 取消默认跳转行为
		$state.go("login",{from:fromState.name,w:'notLogin'});//跳转到登录界面
	}
});
```

另外还有用户已经登录，但是登录超时了，还有就是增加后台接口的判断来增强安全性。不能完全依靠本地逻辑

我们在model里面增加一个用户拦截器,在rensponseError中判断错误码，抛出事件让Contoller或view来处理

```
app.factory('UserInterceptor', ["$q","$rootScope",function ($q,$rootScope) {
	return {
        request:function(config){
            config.headers["TOKEN"] = $rootScope.user.token;
            return config;
        },
        responseError: function (response) {
            var data = response.data;
			// 判断错误码，如果是未登录
            if(data["errorCode"] == "500999"){
				// 清空用户本地token存储的信息，如果
                $rootScope.user = {token:""};
				// 全局事件，方便其他view获取该事件，并给以相应的提示或处理
                $rootScope.$emit("userIntercepted","notLogin",response);
            }
			// 如果是登录超时
			if(data["errorCode"] == "500998"){
                $rootScope.$emit("userIntercepted","sessionOut",response);
            }
            return $q.reject(response);
        }
    };
}]);
```

别忘了要注册拦截器到angularjs的config中哦

```
app.config(function ($httpProvider) {
    $httpProvider.interceptors.push('UserInterceptor');
});
```

最后在controller中处理错误事件

```
$rootScope.$on('userIntercepted',function(errorType){
	// 跳转到登录界面，这里我记录了一个from，这样可以在登录后自动跳转到未登录之前的那个界面
	$state.go("login",{from:$state.current.name,w:errorType});
});
```

最后还可以在loginController中做更多的细节处理

```
// 如果用户已经登录了，则立即跳转到一个默认主页上去，无需再登录
if($rootScope.user.token){
	$state.go($rootScope.defaultPage);
	return;
}
```

另外在登录成功回调后还可以跳转到上一次界面，也就是上面记录的from

```
var from = $stateParams["from"];
$state.go(from && from != "login" ? from : $rootScope.defaultPage);
```