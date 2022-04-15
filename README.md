# vuex-long-cache
vuex缓存插件，解决页面刷新后vuex中state状态被初始化问题

# install
```
  npm i vuex-long-cache -S
```

# basic usage
```javascript
  ...
  import vuexLongCache from "vuex-long-cache"

  new Vuex.Store({
    ...
    plugins: [
      vuexLongCache()
    ]
  });
```

# params
vuexLongCache函数参数为一个`对象`, 参数说明如下：

## 参数列表
|      param      |  type  | remark |
|  -------------  | ------ | ------ |
| cacheType       | String | 缓存类型，可选值'session'、'local'，'session'对应'sessionStorage'，'local'对应'localStorage'，默认值为`session` |
| cacheName       | String | 浏览器缓存键名称，默认`VUEXALONG` |
| cacheList       | Array  | 需要缓存的数据列表，默认缓存所有数据对象 |

## 使用详细说明
如果使用到vuex中的modules，并需要缓存其中的数据，示例如下：
```javascript
  // 缓存user下所有数据
  new Vuex.Store({
    ...
    modules: {
      user: {
        state: {
          name: 'caob',
          age: 18
        }
      }
    },
     plugins: [
      vuexLongCache({
        cacheList: [
          'user'
        ]
      })
    ]
  });

  // 缓存user下name字段数据
  new Vuex.Store({
    ...
    modules: {
      user: {
        state: {
          name: 'caob',
          age: 18
        }
      }
    },
     plugins: [
      vuexLongCache({
        cacheList: [
          'user/name'
        ]
      })
    ]
  });
```