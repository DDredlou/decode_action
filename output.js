//Sat Aug 17 2024 02:12:14 GMT+0000 (Coordinated Universal Time)
//Base:https://github.com/echo094/decode-js
//Modify:https://github.com/smallfawn/decode_action
const _0x4ee382 = $.isNode() ? require("./jdCookie.js") : "",
  _0x1e6eb9 = $.isNode() ? require("./sendNotify") : "";
let _0x10e4ef = [],
  _0x4447ca = "",
  _0x49e2e9 = {};
if (process.env.DY_PROXY) {
  const _0x15413b = process.env.PERMIT_API ? (process.env.PERMIT_API + "&test").split("&") : "";
  if (_0x15413b == "") try {
    require("https-proxy-agent");
    _0x49e2e9 = require("./function/proxy.js");
    $.dget = _0x49e2e9.intoRequest($.get.bind($));
    $.dpost = _0x49e2e9.intoRequest($.post.bind($));
  } catch {
    $.log("未安装https-proxy-agent依赖，无法启用代理");
    $.dget = $.get;
    $.dpost = $.post;
  } else {
    if (_0x15413b.filter(_0x53f107 => process.mainModule.filename.includes(_0x53f107)).length != 0) try {
      require("https-proxy-agent");
      _0x49e2e9 = require("./function/proxy.js");
      $.dget = _0x49e2e9.intoRequest($.get.bind($));
      $.dpost = _0x49e2e9.intoRequest($.post.bind($));
    } catch {
      $.log("未安装https-proxy-agent依赖，无法启用代理");
      $.dget = $.get;
      $.dpost = $.post;
    } else $.dpost = $.post, $.dget = $.get;
  }
} else $.dpost = $.post, $.dget = $.get;
if ($.isNode()) {
  Object.keys(_0x4ee382).forEach(_0x215d40 => {
    _0x10e4ef.push(_0x4ee382[_0x215d40]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else _0x10e4ef = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ..._0x507ea6($.getdata("CookiesJD") || "[]").map(_0x330f60 => _0x330f60.cookie)].filter(_0x159e2a => !!_0x159e2a);
let _0x47c86f = {
  "except": process.env.XH_UNSUB_EXCEPT && process.env.XH_UNSUB_EXCEPT.split("@") || [],
  "isRun": process.env.JD_UNSUB === "true" || true,
  "isNotify": process.env.JD_UNSUB_NOTIFY === "true" || false,
  "goodPageSize": process.env.JD_UNSUB_GPAGESIZE * 1 || 20,
  "shopPageSize": process.env.JD_UNSUB_SPAGESIZE * 1 || 20,
  "goodsKeyWords": process.env.JD_UNSUB_GKEYWORDS && process.env.JD_UNSUB_GKEYWORDS.split("@") || [],
  "shopKeyWords": process.env.JD_UNSUB_SKEYWORDS && process.env.JD_UNSUB_SKEYWORDS.split("@") || [],
  "unSubscribeInterval": process.env.JD_UNSUB_INTERVAL * 1 || 2000,
  "printLog": process.env.JD_UNSUB_PLOG === "true" || true,
  "failTimes": process.env.JD_UNSUB_FAILTIMES || 3
};
const _0x3bf1fe = $.isNode() ? require("./function/dylib.js") : "",
  _0x3b4286 = require("./function/dylans.js");
!(async () => {
  if (_0x47c86f.isRun) {
    !_0x10e4ef[0] && $.msg("【京东账号一】取关京东店铺商品失败", "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/bean/signIndex.action", {
      "open-url": "https://bean.m.jd.com/bean/signIndex.action"
    });
    console.log("Tips：容易403");
    await _0xe8d037();
    for (let _0x197c0f = 0; _0x197c0f < _0x10e4ef.length; _0x197c0f++) {
      if (_0x10e4ef[_0x197c0f]) {
        _0x4447ca = _0x10e4ef[_0x197c0f];
        $.UserName = decodeURIComponent(_0x4447ca.match(/pt_pin=([^; ]+)(?=;?)/) && _0x4447ca.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
        $.index = _0x197c0f + 1;
        $.isLogin = true;
        $.nickName = "";
        console.log("\n****开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "*****\n");
        if (_0x47c86f.except.includes($.UserName)) {
          console.log("跳过账号：" + ($.nickName || $.UserName));
          continue;
        }
        if (!$.isLogin) {
          $.msg($.name, "【提示】cookie已失效", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action", {
            "open-url": "https://bean.m.jd.com/bean/signIndex.action"
          });
          $.isNode() && (await _0x1e6eb9.sendNotify($.name + "cookie已失效 - " + $.UserName, "京东账号" + $.index + " " + $.UserName + "\n请重新登录获取cookie"));
          continue;
        }
        $.shopsKeyWordsNum = 0;
        $.failnum = 0;
        $.goodsKeyWordsNum = 0;
        $.unsubscribeGoodsNum = 0;
        $.unsubscribeShopsNum = 0;
        $.goodsTotalNum = 0;
        $.shopsTotalNum = 0;
        $.commIdList = "";
        $.shopIdList = "";
        $.endGoods = $.endShops = false;
        $.failTimes = 0;
        await _0x12fa3c();
        console.log("当前已关注商品：" + $.goodsTotalNum + "个");
        let _0x1f1ed3 = parseInt($.goodsTotalNum / 10) + 1;
        if (_0x1f1ed3 > 1) {
          console.log("获取商品ing...");
          for (let _0x72c546 = 2; _0x72c546 < _0x1f1ed3 + 1; _0x72c546++) {
            await _0x12fa3c(_0x72c546);
            if ($.failnum > 3) break;
            await $.wait(2000);
          }
        }
        await $.wait(_0x47c86f.unSubscribeInterval);
        if (!$.endGoods && parseInt($.goodsTotalNum) !== parseInt($.goodsKeyWordsNum)) {
          let _0x5d88a5 = $.commIdList.split(",").filter(_0x2cf791 => !!_0x2cf791);
          $.log("\n开始取关商品...\n");
          for (let _0x4704bf = 0; _0x4704bf < 20; _0x4704bf++) {
            if ($.failnum > 3) break;
            if (_0x5d88a5.length === 0) break;
            $.log("第" + (_0x4704bf + 1) + "次取关商品->");
            let _0x1c6752 = _0x5d88a5.splice(0, 20);
            _0x1c6752 = _0x1c6752.join(",");
            let _0x4473d4 = await _0x3bb281(_0x1c6752);
            _0x4473d4 && ($.goodsTotalNum = $.goodsTotalNum - _0x1c6752.split(",").length);
            await $.wait(2000);
          }
        } else console.log("不执行取消收藏商品\n");
        await $.wait(_0x47c86f.unSubscribeInterval);
        await _0x272775();
        await $.wait(_0x47c86f.unSubscribeInterval);
        if (!$.endShops && parseInt($.shopsTotalNum) !== parseInt($.shopsKeyWordsNum)) await _0x41fe2e();else console.log("不执行取消收藏店铺\n");
        do {
          if (parseInt($.shopsTotalNum) === 0) break;else {
            if (parseInt($.shopsTotalNum) === parseInt($.shopsKeyWordsNum)) break;else {
              $.shopIdList = "";
              await _0x272775();
              await $.wait(_0x47c86f.unSubscribeInterval);
              if (!$.endShops && parseInt($.shopsTotalNum) !== parseInt($.shopsKeyWordsNum)) await _0x41fe2e();else console.log("不执行取消收藏店铺\n");
            }
          }
          if ($.failTimes >= _0x47c86f.failTimes || $.failnum > 3) {
            console.log("失败次数到达设定值，触发防死循环机制，该帐号已跳过");
            break;
          }
        } while (true);
        await _0x311f97();
      }
    }
  } else $.log("\n默认不执行,请设置变量JD_UNSUB = 'true'");
})().catch(_0x3d45b2 => {
  $.log("", "❌ " + $.name + ", 失败! 原因: " + _0x3d45b2 + "!", "");
}).finally(() => {
  $.done();
});
function _0xe8d037() {
  return new Promise(_0x19232f => {
    if ($.isNode() && process.env.JD_UNSUB) {
      console.log("=====环境变量配置如下=====");
      console.log("except: " + typeof _0x47c86f.except + ", " + _0x47c86f.except);
      console.log("isNotify: " + typeof _0x47c86f.isNotify + ", " + _0x47c86f.isNotify);
      console.log("goodPageSize: " + typeof _0x47c86f.goodPageSize + ", " + _0x47c86f.goodPageSize);
      console.log("shopPageSize: " + typeof _0x47c86f.shopPageSize + ", " + _0x47c86f.shopPageSize);
      console.log("goodsKeyWords: " + typeof _0x47c86f.goodsKeyWords + ", " + _0x47c86f.goodsKeyWords);
      console.log("shopKeyWords: " + typeof _0x47c86f.shopKeyWords + ", " + _0x47c86f.shopKeyWords);
      console.log("unSubscribeInterval: " + typeof _0x47c86f.unSubscribeInterval + ", " + _0x47c86f.unSubscribeInterval);
      console.log("printLog: " + typeof _0x47c86f.printLog + ", " + _0x47c86f.printLog);
      console.log("failTimes: " + typeof _0x47c86f.failTimes + ", " + _0x47c86f.failTimes);
      console.log("=======================");
    }
    _0x19232f();
  });
}
function _0x311f97() {
  _0x47c86f.isNotify ? $.msg($.name, "", "【京东账号" + $.index + "】" + $.nickName + "\n【还剩关注店铺】" + $.shopsTotalNum + "个\n【还剩关注商品】" + $.goodsTotalNum + "个") : $.log("【京东账号" + $.index + "】" + $.nickName + "\n【还剩关注店铺】" + $.shopsTotalNum + "个\n【还剩关注商品】" + $.goodsTotalNum + "个");
}
function _0x7aaa16(_0x3922c3, _0x591268, _0x379c53) {
  let _0x525388 = _0x3922c3.indexOf(_0x591268),
    _0x152dc9 = _0x3922c3.indexOf(_0x379c53, _0x525388);
  if (_0x525388 < 0 || _0x152dc9 < _0x525388) return "";
  return _0x3922c3.substring(_0x525388 + _0x591268.length, _0x152dc9);
}
async function _0x12fa3c(_0x202854 = 1) {
  $.UA = "Mozilla/5.0 (Linux; Android 12; 22 Build/SKQ1.211006.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/111.0.5563.116 Mobile Safari/537.36 XWEB/1110053 MMWEBSDK/20230202 MMWEBID/8970 MicroMessenger/8.0.33.2320(0x28002151) WeChat/arm64 Weixin NetType/WIFI Language/zh_CN ABI/arm64 MiniProgramEnv/android";
  let _0x24345a = {
      "cp": _0x202854,
      "pageSize": 10,
      "category": "",
      "promote": 0,
      "cutPrice": 0,
      "coupon": 0,
      "stock": 0,
      "area": "0_0_0_0",
      "tenantCode": "jgminise",
      "bizModelCode": "6",
      "bizModeClientType": "WxMiniProgram",
      "externalLoginType": "1"
    },
    _0x5eaad1 = {
      "appId": "c420a",
      "functionId": "queryFollowProduct",
      "body": _0x24345a,
      "appid": "jd-cphdeveloper-m",
      "user": $.UserName,
      "code": 1,
      "ua": $.UA
    };
  _0x24345a = await _0x3b4286.getbody(_0x5eaad1);
  if (!_0x24345a) return;
  let _0x1829c1 = {
    "url": "https://api.m.jd.com/api?loginType=2&" + _0x24345a,
    "headers": {
      "Host": "api.m.jd.com",
      "Origin": "https://my.m.jd.com",
      "Referer": "https://my.m.jd.com/",
      "User-Agent": $.UA,
      "Cookie": _0x4447ca
    },
    "ciphers": _0x3bf1fe.cpstr
  };
  return new Promise(async _0x180c32 => {
    $.dget(_0x1829c1, async (_0x5cd922, _0x5d2066, _0x2a3028) => {
      try {
        if (_0x5cd922) {
          console.log(_0x5cd922);
          if (_0x5cd922.includes("403")) $.failnum++;
        } else {
          _0x2a3028 = JSON.parse(_0x2a3028);
          if (_0x2a3028.code === "0") {
            if (_0x2a3028.totalNum !== 0) {
              $.goodsTotalNum = parseInt(_0x2a3028.totalNum);
              $.goodsKeyWordsNum = 0;
              for (let _0x40d1b5 of _0x2a3028.followProductList) {
                _0x47c86f.goodsKeyWords.some(_0x42d7ee => _0x40d1b5.commTitle.includes(_0x42d7ee)) ? (_0x47c86f.printLog ? console.log(_0x40d1b5.commTitle + " ") : "", _0x47c86f.printLog ? console.log("商品被过滤，含有关键词\n") : "", $.goodsKeyWordsNum += 1) : ($.commIdList += _0x40d1b5.commId + ",", $.unsubscribeGoodsNum++);
              }
            } else {
              $.endGoods = true;
              console.log("无商品需要取关\n");
            }
          } else {
            console.log(JSON.stringify(_0x2a3028));
            $.failnum++;
          }
        }
      } catch (_0x91d62d) {
        $.logErr(_0x91d62d, _0x5d2066);
      } finally {
        _0x180c32(_0x2a3028);
      }
    });
  });
}
function _0x3bb281(_0x4dd528) {
  return new Promise(_0x4c16ff => {
    let _0x31a297 = {
      "commId": _0x4dd528,
      "tenantCode": "jgminise",
      "bizModelCode": "6",
      "bizModeClientType": "WxMiniProgram",
      "externalLoginType": ""
    };
    const _0x2bd293 = {
      "url": "https://api.m.jd.com/api?appid=jd-cphdeveloper-m&functionId=delFollowProduct&body=" + encodeURIComponent(JSON.stringify(_0x31a297)) + "&loginType=2&g_login_type=2&g_tk=891942062&g_ty=ajax&appCode=msd95910c4",
      "headers": {
        "Host": "api.m.jd.com",
        "Origin": "https://my.m.jd.com",
        "Referer": "https://my.m.jd.com/",
        "User-Agent": $.UA,
        "Cookie": _0x4447ca
      },
      "ciphers": _0x3bf1fe.cpstr
    };
    let _0x26b676 = false;
    $.dget(_0x2bd293, (_0x383c43, _0x58afbf, _0xdcacc6) => {
      try {
        if (_0x383c43) {
          console.log(_0x383c43);
          if (_0x383c43.includes("403")) $.failnum++;
        } else $.failnum = 0, _0xdcacc6 = JSON.parse(_0xdcacc6), _0xdcacc6.errorCode === 0 ? (console.log("成功取关商品：" + _0x4dd528.split(",").length + "个\n"), $.failTimes = 0, _0x26b676 = true) : console.log("批量取关商品失败，失败次数：" + ++$.failTimes + "\n", JSON.stringify(_0xdcacc6));
      } catch (_0x169ab8) {
        $.logErr(_0x169ab8, _0x58afbf);
      } finally {
        _0x4c16ff(_0x26b676);
      }
    });
  });
}
function _0x272775() {
  return new Promise(_0x3d346e => {
    console.log("正在获取已关注的店铺...");
    const _0x27feeb = {
      "url": "https://api.m.jd.com/client.action?functionId=getFollowShop&body=%7B%22page%22%3A1%2C%22activityStatus%22%3A1%2C%22refresh%22%3Afalse%2C%22pageSize%22%3A20%2C%22channel%22%3A%22jg_shop%22%7D&t=" + Date.now() + "&appid=shop_m_jd_com&clientVersion=13.1.2&client=wh5&screen=1081*2401&loginType=2&loginWQBiz=mshop-smart",
      "headers": {
        "Cookie": _0x4447ca,
        "User-Agent": "Mozilla/5.0 (Linux; Android 12; XIAOMI; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/122.0.6261.120 Mobile Safari/537.36 XWEB/1220133 MMWEBSDK/20231202 MMWEBID/8970 MicroMessenger/8.0.47.2560(0x28002F51) WeChat/arm64 Weixin NetType/WIFI Language/zh_CN ABI/arm64 miniProgram/wx91d27dbf599dff74",
        "Referer": "https://shop.m.jd.com/"
      },
      "ciphers": _0x3bf1fe.cpstr
    };
    $.dget(_0x27feeb, (_0x2d650d, _0x1c334f, _0x51bda9) => {
      try {
        if (_0x2d650d) {
          console.log(_0x2d650d);
          if (_0x2d650d.includes("403")) $.failnum++;
        } else {
          _0x51bda9 = JSON.parse(_0x51bda9);
          if (_0x51bda9.code === "0") {
            $.shopsTotalNum = parseInt(_0x51bda9.result.totalCount);
            console.log("当前已关注店铺：" + $.shopsTotalNum + "个");
            const {
              floorSuperMarketShops = [],
              showShopList: _0x1b74d0,
              floorClosedShops = []
            } = _0x51bda9.result;
            let _0x78d692 = [...new Set([...floorSuperMarketShops, ..._0x1b74d0, ...floorClosedShops])];
            if (_0x78d692.length > 0) {
              $.shopsKeyWordsNum = 0;
              for (let _0x41cef1 of _0x78d692) {
                if (_0x47c86f.shopKeyWords.some(_0x2fe252 => _0x41cef1.shopName.includes(_0x2fe252))) {
                  _0x47c86f.printLog ? console.log("店铺被过滤，含有关键词") : "";
                  _0x47c86f.printLog ? console.log(_0x41cef1.shopName + "\n") : "";
                  $.shopsKeyWordsNum += 1;
                } else $.shopIdList += _0x41cef1.shopId + ",", $.unsubscribeShopsNum++;
              }
            } else $.endShops = true, console.log("无店铺可取消关注\n");
          } else console.log("获取已关注店铺失败：" + JSON.stringify(_0x51bda9));
        }
      } catch (_0x5ef37) {
        $.logErr(_0x5ef37, _0x1c334f);
      } finally {
        _0x3d346e(_0x51bda9);
      }
    });
  });
}
function _0x41fe2e() {
  return new Promise(_0x4a6bb4 => {
    console.log("正在执行批量取消关注店铺...");
    let _0x5b6453 = {
      "shopId": $.shopIdList,
      "follow": false,
      "sourceRpc": "shop_app_myollows_shop"
    };
    const _0x1e765b = {
      "url": "https://api.m.jd.com/client.action?functionId=followShop&body=" + encodeURIComponent(JSON.stringify(_0x5b6453)) + "&t=1720937028813&appid=shop_m_jd_com&clientVersion=13.1.2&client=wh5&area=0&screen=1081*2401&loginType=2&loginWQBiz=mshop-smart",
      "headers": {
        "Cookie": _0x4447ca,
        "User-Agent": "Mozilla/5.0 (Linux; Android 12; XIAOMI; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/122.0.6261.120 Mobile Safari/537.36 XWEB/1220133 MMWEBSDK/20231202 MMWEBID/8970 MicroMessenger/8.0.47.2560(0x28002F51) WeChat/arm64 Weixin NetType/WIFI Language/zh_CN ABI/arm64 miniProgram/wx91d27dbf599dff74",
        "Referer": "https://shop.m.jd.com/"
      },
      "ciphers": _0x3bf1fe.cpstr
    };
    $.dget(_0x1e765b, (_0x536814, _0x528e92, _0x13a164) => {
      try {
        if (_0x536814) {
          console.log(_0x536814);
          if (_0x536814.includes("403")) $.failnum++;
        } else $.failnum = 0, _0x13a164 = JSON.parse(_0x13a164), _0x13a164.code === "0" ? (console.log("已成功取消关注店铺：" + $.unsubscribeShopsNum + "个\n"), $.failTimes = 0) : console.log("批量取消关注店铺失败，失败次数：" + ++$.failTimes + "\n");
      } catch (_0x4dff3c) {
        $.logErr(_0x4dff3c, _0x528e92);
      } finally {
        _0x4a6bb4(_0x13a164);
      }
    });
  });
}
function _0x6c0c48() {
  return new Promise(async _0x2484e4 => {
    const _0x13e921 = {
      "url": "https://wq.jd.com/user/info/QueryJDUserInfo?sceneval=2",
      "headers": {
        "Accept": "application/json,text/plain, */*",
        "Content-Type": "application/x-www-form-urlencoded",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-cn",
        "Connection": "keep-alive",
        "Cookie": _0x4447ca,
        "Referer": "https://wqs.jd.com/my/jingdou/my.shtml?sceneval=2",
        "User-Agent": $.isNode() ? process.env.JD_USER_AGENT ? process.env.JD_USER_AGENT : require("./USER_AGENTS").USER_AGENT : $.getdata("JDUA") ? $.getdata("JDUA") : "jdapp;iPhone;9.4.4;14.3;network/4g;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1"
      }
    };
    $.post(_0x13e921, (_0x4d8f02, _0x3d65c0, _0x589298) => {
      try {
        if (_0x4d8f02) console.log("" + JSON.stringify(_0x4d8f02)), console.log($.name + " API请求失败，请检查网路重试");else {
          if (_0x589298) {
            _0x589298 = JSON.parse(_0x589298);
            if (_0x589298.retcode === 13) {
              $.isLogin = false;
              return;
            }
            _0x589298.retcode === 0 ? $.nickName = _0x589298.base && _0x589298.base.nickname || $.UserName : $.nickName = $.UserName;
          } else {
            console.log("京东服务器返回空数据");
          }
        }
      } catch (_0x126500) {
        $.logErr(_0x126500, _0x3d65c0);
      } finally {
        _0x2484e4();
      }
    });
  });
}
function _0x507ea6(_0x4718f1) {
  if (typeof _0x4718f1 == "string") try {
    return JSON.parse(_0x4718f1);
  } catch (_0x430e1d) {
    return console.log(_0x430e1d), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
  }
}