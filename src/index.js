function getValue(obj, str) {
  return str.split('/').reduce((prev, next) => {
    return prev[next] || '';
  }, obj);
}

function setValue(obj, str, value) {
  const list = str.split('/');
  list.reduce((prev, next, index) => {
    if (index === list.length - 1 && prev) {
      prev[next] = value;
      return false;
    }
    return prev[next] || '';
  }, obj);
}

export default function vuexAlong({
  cacheList = [],
  cacheType = 'session',
  cacheName = 'VUEXALONG'
} = {}) {
  return function (store) {
    let _cacheList;
    // 判断是否缓存列表为空，空的话默认缓存所有
    if (cacheList.length === 0 || !cacheList) {
      _cacheList = Object.keys(store.state);
    } else {
      _cacheList = cacheList;
    }
    const vuexState = store.state;
    const cacheStorage = window[`${cacheType}Storage`];
    let cacheState = null;
    try {
      cacheState = JSON.parse(cacheStorage.getItem(cacheName));
    } catch (error) {}
    if (cacheState && cacheState.hasCach) {
      _cacheList.forEach((item) => {
        const newVal = getValue(cacheState, item);
        setValue(vuexState, item, newVal);
      });
    } else {
      cacheState = {};
      _cacheList.forEach((item) => {
        item.split('/').reduce((prev, next) => {
          if (!prev[next]) {
            prev[next] = {};
          }
          return prev[next];
        }, cacheState);
      });
    }
    // 每次执行mutation里面函数后执行
    store.subscribe((mutation, state) => {
      _cacheList.forEach((item) => {
        const newVal = getValue(state, item);
        setValue(cacheState, item, newVal);
      });
      if (_cacheList.length > 0) {
        cacheState.hasCach = true;
        cacheStorage.setItem(cacheName, JSON.stringify(cacheState));
      }
    });
  };
}