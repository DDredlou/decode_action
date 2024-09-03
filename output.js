//Tue Sep 03 2024 04:40:50 GMT+0000 (Coordinated Universal Time)
//Base:https://github.com/echo094/decode-js
//Modify:https://github.com/smallfawn/decode_action
const Il1ii1 = $.isNode() ? require("./sendNotify") : "",
  illII1 = $.isNode() ? require("./jdCookie") : "",
  Il1iii = require("./utils/Rebels_3_0"),
  iIiii = require("./utils/Rebels_Token"),
  IIiIIl = require("./utils/Rebels_jdCommon");
console.log("");
console.log("==========" + $.name + "变量说明==========");
console.log("jd_wxMcLevelAndBirthGifts_activityUrl // 活动链接");
console.log("jd_wxMcLevelAndBirthGifts_openCard // 是否入会（true/false），默认不入会");
console.log("==========" + $.name + "提示结束==========");
console.log("");
let Il1iil = {},
  iIiil = "";
$.activityEnd = false;
let IIiIIi = ["未开始", "已结束", "来晚了", "非法操作", "京豆计划", "奖品发送失败", "发放完", "已发完", "已领完", "抢光了", "全部被领取", "余额不足"],
  lilI = [],
  ll111i = "",
  l1Ill1 = $.isNode() ? process.env.jd_wxMcLevelAndBirthGifts_openCard ? process.env.jd_wxMcLevelAndBirthGifts_openCard : false : $.getdata("jd_wxMcLevelAndBirthGifts_openCard") ? $.getdata("jd_wxMcLevelAndBirthGifts_openCard") : false,
  iiilI1 = process.env.jd_wxMcLevelAndBirthGifts_activityUrl ? process.env.jd_wxMcLevelAndBirthGifts_activityUrl : "";
if ($.isNode()) {
  if (JSON.stringify(process.env).indexOf("GITHUB") > -1) process.exit(0);
  Object.keys(illII1).forEach(Il1ilI => {
    lilI.push(illII1[Il1ilI]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else lilI = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...$.toObj($.getdata("CookiesJD") || "[]").map(iIliIl => iIliIl.cookie)].filter(l1Illi => !!l1Illi);
let ll111l = typeof $request !== "undefined";
ll111l && (GetCookie(), $.done());
if (iiilI1) activityId = iiilIl("" + iiilI1, "activityId"), $.domain = iiilI1.match(/https?:\/\/([^/]+)/)[1];else {
  console.log("\n请先定义必要的环境变量后再运行脚本");
}
let lil1 = "https://" + $.domain;
!(async () => {
  if (!activityId) {
    console.log("活动id不存在！");
    return;
  }
  console.log("活动入口：" + iiilI1);
  if (!lilI[0]) {
    $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/", {
      "open-url": "https://bean.m.jd.com/"
    });
    return;
  }
  let l1Illl = false;
  for (let l11li = 0; l11li < lilI.length; l11li++) {
    if (l1Illl) return;
    if (lilI[l11li]) {
      ll111i = lilI[l11li];
      originCookie = lilI[l11li];
      $.UserName = decodeURIComponent(ll111i.match(/pt_pin=(.+?);/) && ll111i.match(/pt_pin=(.+?);/)[1]);
      $.index = l11li + 1;
      $.isLogin = true;
      $.nickName = "";
      console.log("\n开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "\n");
      if (!$.isLogin) {
        $.msg($.name, "【提示】cookie已失效", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/", {
          "open-url": "https://bean.m.jd.com/"
        });
        $.isNode() && (await Il1ii1.sendNotify($.name + "cookie已失效 - " + $.UserName, "京东账号" + $.index + " " + $.UserName + "\n请重新登录获取cookie"));
        continue;
      }
      $.UA = IIiIIl.genUA($.UserName);
      await illIII();
      await $.wait(4000);
      if ($.hasEnd || $.maxcountnum || $.outFlag || $.activityEnd) {
        break;
      }
    }
  }
})().catch(iIlll => {
  $.log("", " " + $.name + ", 失败! 原因: " + iIlll + "!", "");
}).finally(() => {
  $.done();
});
async function illIII() {
  $.notx == false;
  $.sid = "";
  $.Token = "";
  $.Pin = "";
  $.hisPin = "";
  $.card = [];
  await ii1iIi();
  if ($.outFlag) {
    console.log("此ip已被限制！[493]\n");
    return;
  }
  $.Token = await iIiii(originCookie, "https://cjhy-isv.isvjcloud.com");
  if ($.Token == "") {
    console.log("获取[token]失败！");
    return;
  }
  $.index == 1 && (await $.wait(1000), await iliI1l());
  if ($.userId) {
    await $.wait(1000);
    if ($.Token) await iliI1i();
    if (!$.Pin) {
      console.log("获取[Pin]失败！");
      return;
    }
    await lIi11();
    await $.wait(1000);
    await l1iiiI();
    await $.wait(1000);
    if (!$.openedCard) {
      console.log("还不是店铺会员哦~");
      if (l1Ill1) {
        $.shopactivityId = "";
        $.joinVenderId = $.userId;
        await l1iii1();
        for (let I1III1 = 0; I1III1 < Array(5).length; I1III1++) {
          if (I1III1 > 0) console.log("第" + I1III1 + "次 重新开卡");
          await I111lI();
          await $.wait(1000);
          if ($.errorJoinShop.indexOf("活动太火爆，请稍后再试") == -1) break;
        }
        await l1iiiI();
        await $.wait(1000);
      } else console.log("如需入会请设置环境变量 [jd_wxMcLevelAndBirthGifts_openCard]，变量值为 true");
    }
    if (!$.openedCard) return;
    await Ill1l1();
    await $.wait(1000);
    await Ilili1();
    await $.wait(1000);
    if ($.index === 1) {
      $.content = JSON.parse($.content);
      let l11li1 = "";
      for (let i1I = 0; i1I < $.content.length; i1I++) {
        const liII1I = $.content[i1I].name,
          iIiIiI = $.content[i1I].type,
          iIlil = $.content[i1I].id,
          lIiII1 = $.content[i1I]?.["realvalue"] || $.content[i1I]?.["value"];
        if (iIlil === 0 || iIiIiI === 0) {
          l11li1 += "谢谢参与";
          break;
        } else l11li1 += "" + (iIiIiI === 6 || iIiIiI === 9 ? lIiII1 : "") + liII1I + (iIiIiI === 8 ? "[专享价]" : iIiIiI === 7 ? "[实物]" : ""), i1I !== $.content.length - 1 && (l11li1 += "，");
      }
      console.log("活动奖品：" + l11li1);
    }
    switch ($.activityType) {
      case 103:
        if ($.index == 1) console.log("活动类型：生日礼包");
        await ii1iIl(), await $.wait(1000), await i11III(), await $.wait(1000), await iIiiI(), await $.wait(1000);
        break;
      case 104:
        if ($.index == 1) console.log("活动类型：会员等级礼包");
        await Ii111i(), await $.wait(1000);
        break;
      case 119:
        console.log("暂未适配升级有礼活动..."), exit_mark = true;
        break;
      default:
        console.log("未知活动类型..."), exit_mark = true;
        break;
    }
  } else console.log("【京东账号" + $.index + "】 未能获取活动信息");
}
function iliI1l() {
  return new Promise(li11Ii => {
    let i1i = "activityId=" + activityId;
    $.post(Ii111l("/customer/getSimpleActInfoVo", i1i), async (ll1III, ll1II1, l11lii) => {
      try {
        ll1III ? (console.log("" + $.toStr(ll1III)), console.log($.name + " getSimpleActInfoVo API请求失败，请检查网路重试")) : l11lii && Ilill1(l11lii) && (l11lii = JSON.parse(l11lii), l11lii.data ? ($.shopId = l11lii.data.shopId, $.userId = l11lii.data.venderId, $.activityType = l11lii.data.activityType) : console.log("异常1：" + JSON.stringify(l11lii)));
      } catch (iIllli) {
        $.logErr(iIllli, ll1II1);
      } finally {
        li11Ii();
      }
    });
  });
}
function ii1iIi() {
  return new Promise(IlIiIl => {
    let iIlliI = {
      "url": lil1 + "/mc/wxMcLevelAndBirthGifts/activity?activityId=" + activityId,
      "headers": {
        "Cookie": ll111i,
        "User-Agent": $.UA
      }
    };
    $.get(iIlliI, async (IIlIiI, l11lll, i1iiI1) => {
      try {
        IIlIiI ? (l11lll && typeof l11lll.statusCode != "undefined" && l11lll.statusCode == 493 && (console.log("此ip已被限制，请过10分钟后再执行脚本\n"), $.outFlag = true), console.log("" + JSON.stringify(IIlIiI)), console.log($.name + " cookie API请求失败，请检查网路重试")) : l11lll.status == 200 && i11II1(l11lll);
      } catch (i1IIiI) {
        $.logErr(i1IIiI, l11lll);
      } finally {
        IlIiIl();
      }
    });
  });
}
function iliI1i() {
  return new Promise(iI1iI1 => {
    let il1lIi = "userId=" + $.userId + "&token=" + $.Token + "&fromType=APP";
    $.post(Ii111l("/customer/getMyPing", il1lIi), async (Ili1, ii11iI, i1IIl1) => {
      try {
        if (Ili1) console.log("" + JSON.stringify(Ili1)), console.log($.name + " 3 API请求失败，请检查网路重试");else {
          ii11iI.status == 200 && i11II1(ii11iI);
          if (Ilill1(i1IIl1)) {
            i1IIl1 = JSON.parse(i1IIl1);
            if (i1IIl1.result && i1IIl1.data) {
              $.Pin = i1IIl1.data.secretPin;
              $.AUTH_C_USER = $.Pin;
              $.attrTouXiang = i1IIl1.data.yunMidImageUrl ? i1IIl1.data.yunMidImageUrl : "https://img10.360buyimg.com/imgzone/jfs/t1/21383/2/6633/3879/5c5138d8E0967ccf2/91da57c5e2166005.jpg";
              $.nickName = i1IIl1.data.pin;
            } else {}
          }
        }
      } catch (il1lII) {
        $.logErr(il1lII, ii11iI);
      } finally {
        iI1iI1();
      }
    });
  });
}
function IIl11i() {
  return new Promise(Ilii => {
    let I1l11 = "pin=" + encodeURIComponent(encodeURIComponent($.Pin));
    $.post(Ii111l("/wxActionCommon/getUserInfo", I1l11), async (lIl11I, lIiIIi, IiIl11) => {
      try {
        lIl11I ? (console.log("" + JSON.stringify(lIl11I)), console.log($.name + " 6-1 API请求失败，请检查网路重试")) : Ilill1(IiIl11) && (IiIl11 = JSON.parse(IiIl11), IiIl11.result && IiIl11.data ? $.attrTouXiang = IiIl11.data.yunMidImageUrl ? IiIl11.data.yunMidImageUrl : "https://img10.360buyimg.com/imgzone/jfs/t1/21383/2/6633/3879/5c5138d8E0967ccf2/91da57c5e2166005.jpg" : console.log("异常6-2：" + JSON.stringify(IiIl11)));
      } catch (ilI1i) {
        $.logErr(ilI1i, lIiIIi);
      } finally {
        Ilii();
      }
    });
  });
}
function i11III(ii11li = 0) {
  return new Promise(i111il => {
    let lI11i = encodeURIComponent(encodeURIComponent($.Pin));
    var ilI11 = new Date(),
      li1llI = ilI11.getFullYear(),
      lIil11 = ilI11.getMonth() + 1;
    lIil11 = lIil11 < 10 ? "0" + lIil11 : lIil11;
    var iIilII = ilI11.getDate();
    iIilII = iIilII < 10 ? "0" + iIilII : iIilII;
    $.birthDays = li1llI + "-" + lIil11 + "-" + iIilII;
    if ($.index == 1) console.log("登记当前日期：" + $.birthDays);
    let lIlI1 = "venderId=" + $.userId + "&pin=" + lI11i + "&birthDay=" + $.birthDays;
    $.post(Ii111l("/mc/wxMcLevelAndBirthGifts/saveBirthDay", lIlI1), async (Ill1, lI1i1i, il1IiI) => {
      try {
        Ill1 ? (console.log("" + JSON.stringify(Ill1)), console.log($.name + "saveBirthDay 请求失败，请检查网路重试")) : (lI1i1i.status == 200 && i11II1(lI1i1i), Ilill1(il1IiI) && (il1IiI = JSON.parse(il1IiI)));
      } catch (IiIIII) {
        $.logErr(IiIIII, lI1i1i);
      } finally {
        i111il();
      }
    });
  });
}
function ii1iIl(IIilIl = 0) {
  return new Promise(Illi => {
    let l1IiiI = encodeURIComponent(encodeURIComponent($.Pin)),
      II1iI1 = "venderId=" + $.userId + "&pin=" + l1IiiI;
    $.post(Ii111l("/mc/wxMcLevelAndBirthGifts/getBirthInfo", II1iI1), async (iI1i1, il11Il, IIiI1) => {
      try {
        iI1i1 ? (console.log("" + JSON.stringify(iI1i1)), console.log($.name + "getBirthInfo 请求失败，请检查网路重试")) : Ilill1(IIiI1) && (IIiI1 = JSON.parse(IIiI1), !IIiI1.result && $.notx == true);
      } catch (i1ii11) {
        $.logErr(i1ii11, il11Il);
      } finally {
        Illi();
      }
    });
  });
}
function Ill1l1(ill1i = 0) {
  return new Promise(ilII1i => {
    let IIilII = encodeURIComponent(encodeURIComponent($.Pin)),
      l1Iil1 = "venderId=" + $.userId + "&pin=" + IIilII;
    $.post(Ii111l("/mc/wxMcLevelAndBirthGifts/getMemberLevel", l1Iil1), async (IIiIl, iiiiI1, IIiIi) => {
      try {
        IIiIl ? (console.log("" + JSON.stringify(IIiIl)), console.log($.name + "getMemberLevel 请求失败，请检查网路重试")) : Ilill1(IIiIi) && (IIiIi = JSON.parse(IIiIi), IIiIi.result && IIiIi.data ? ($.level = IIiIi.data.level, $.levelName = IIiIi.data.levelName) : console.log(IIiIi.errorMessage || ""));
      } catch (iiii) {
        $.logErr(iiii, iiiiI1);
      } finally {
        ilII1i();
      }
    });
  });
}
function Ilili1(iiil = 0) {
  return new Promise(iiIIl1 => {
    let iili = encodeURIComponent(encodeURIComponent($.Pin)),
      IIl1Ii = "activityId=" + activityId + "&pin=" + iili + "&level=" + $.level;
    $.post(Ii111l("/mc/wxMcLevelAndBirthGifts/activityContent", IIl1Ii), async (ilIIl, I11ll1, lIIII) => {
      try {
        ilIIl ? (console.log("" + JSON.stringify(ilIIl)), console.log($.name + "activityContent 请求失败，请检查网路重试")) : Ilill1(lIIII) && (lIIII = JSON.parse(lIIII), lIIII.result && lIIII.data ? ($.actName = lIIII.data.actName, $.content = lIIII.data.content) : console.log(lIIII.errorMessage || ""));
      } catch (IiII1i) {
        $.logErr(IiII1i, I11ll1);
      } finally {
        iiIIl1();
      }
    });
  });
}
function iIiiI(lIlIlI = 0) {
  return new Promise(I1li1i => {
    let Ii11II = encodeURIComponent(encodeURIComponent($.Pin)),
      iiI11 = "venderId=" + $.userId + "&activityId=" + activityId + "&pin=" + Ii11II + "&level=" + $.level;
    $.post(Ii111l("/mc/wxMcLevelAndBirthGifts/sendBirthGifts", iiI11), async (iIlIl1, lli1iI, I1II1I) => {
      try {
        if (iIlIl1) console.log("" + JSON.stringify(iIlIl1)), console.log($.name + "sendBirthGifts 请求失败，请检查网路重试");else {
          if (Ilill1(I1II1I)) {
            I1II1I = JSON.parse(I1II1I);
            if (I1II1I.result && I1II1I.data) {
              $.birthdayData = I1II1I.data.birthdayData;
              for (o of $.birthdayData) {
                $.beanNum = o.beanNum;
                $.names = o.name;
                console.log("获得：" + $.beanNum + $.names);
              }
            } else {
              errorMessage = I1II1I.errorMessage || I1II1I.data.birthdayError;
              if (errorMessage) {
                console.log(errorMessage);
                for (let liIiiI of IIiIIi) {
                  if (errorMessage.includes(liIiiI)) {
                    $.activityEnd = true;
                    break;
                  }
                }
              } else console.log(I1II1I);
            }
          }
        }
      } catch (IIllii) {
        $.logErr(IIllii, lli1iI);
      } finally {
        I1li1i();
      }
    });
  });
}
function Ii111i(IIllil = 0) {
  return new Promise(iIlIil => {
    let lIl1l = encodeURIComponent(encodeURIComponent($.Pin)),
      iIlIii = "venderId=" + $.userId + "&activityId=" + activityId + "&pin=" + lIl1l + "&level=" + $.level;
    $.post(Ii111l("/mc/wxMcLevelAndBirthGifts/sendLevelGifts", iIlIii), async (iiI111, lIi111, iIlIi1) => {
      try {
        if (iiI111) console.log("" + JSON.stringify(iiI111)), console.log($.name + "sendLevelGifts 请求失败，请检查网路重试");else {
          if (Ilill1(iIlIi1)) {
            iIlIi1 = JSON.parse(iIlIi1);
            if (iIlIi1.result && iIlIi1.data) {
              $.levelData = iIlIi1.data.levelData;
              for (o of $.levelData) {
                $.beanNum = o.beanNum;
                $.names = o.name;
                console.log("获得：" + $.beanNum + $.names);
              }
            } else iIlIi1.errorMessage || iIlIi1.data.levelError ? console.log(iIlIi1.errorMessage || iIlIi1.data.levelError || "") : console.log(JSON.stringify(iIlIi1));
          }
        }
      } catch (iIl) {
        $.logErr(iIl, lIi111);
      } finally {
        iIlIil();
      }
    });
  });
}
function l1iiiI() {
  return new Promise(ll1I => {
    let iiI11i = "activityType=" + $.activityType + "&venderId=" + $.userId + "&buyerPin=" + encodeURIComponent(encodeURIComponent($.Pin));
    $.post(Ii111l("/mc/new/brandCard/common/shopAndBrand/getOpenCardInfo", iiI11i), async (Il1II1, iiilI, Il1IIi) => {
      try {
        if (Il1II1) console.log("" + JSON.stringify(Il1II1)), console.log($.getOpenCardInfo + "API请求失败，请检查网路重试");else {
          if (Ilill1(Il1IIi)) {
            Il1IIi = JSON.parse(Il1IIi);
            if (Il1IIi.result && Il1IIi.data) {
              $.openedCard = Il1IIi.data.openedCard || false;
              if (Il1IIi.data.openCardLink) $.channel = Il1IIi.data.openCardLink.match(/channel=(\d+)/)[1], $.joinVenderId = Il1IIi.data.openCardLink.match(/venderId=(\d+)/)[1];else {}
            }
          }
        }
      } catch (Il1IIl) {
        $.logErr(Il1IIl, iiilI);
      } finally {
        ll1I();
      }
    });
  });
}
function Ii111l(lli1lI, Ii1liI) {
  return {
    "url": "" + lil1 + lli1lI,
    "body": Ii1liI,
    "headers": {
      "Accept": "application/json",
      "Accept-Encoding": "gzip, deflate, br",
      "Accept-Language": "zh-cn",
      "Connection": "keep-alive",
      "Host": "cjhydz-isv.isvjcloud.com",
      "Origin": "https://cjhydz-isv.isvjcloud.com",
      "Content-Type": "application/x-www-form-urlencoded",
      "Referer": iiilI1,
      "Cookie": iIiil + ";IsvToken=" + $.Token + ";AUTH_C_USER=" + $.AUTH_C_USER,
      "User-Agent": $.UA
    }
  };
}
function iI11li(lli1l1, lii1l) {
  return {
    "url": "https://api.m.jd.com/client.action" + lli1l1,
    "body": lii1l,
    "headers": {
      "Accept": "*/*",
      "Accept-Encoding": "gzip, deflate, br",
      "Accept-Language": "zh-cn",
      "Connection": "keep-alive",
      "Content-Type": "application/x-www-form-urlencoded",
      "Host": "api.m.jd.com",
      "Cookie": ll111i,
      "User-Agent": $.UA
    }
  };
}
function lIi11() {
  return new Promise(async Il1l11 => {
    const I1II1i = {
      "url": "https://cjhydz-isv.isvjcloud.com/common/accessLog",
      "headers": {
        "Accept": "application/json",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-cn",
        "Connection": "keep-alive",
        "Host": "cjhydz-isv.isvjcloud.com",
        "Origin": "https://cjhydz-isv.isvjcloud.com",
        "Content-Type": "application/x-www-form-urlencoded",
        "Referer": iiilI1,
        "Cookie": iIiil + ";IsvToken=" + $.Token + ";AUTH_C_USER=" + $.AUTH_C_USER,
        "User-Agent": $.UA
      },
      "body": "venderId=" + $.userId + "&code=40&pin=" + encodeURIComponent(encodeURIComponent($.Pin)) + "&activityId=" + activityId + "&pageUrl=https%3A%2F%2F$cjhydz-isv.isvjcloud.com%2FmicroDz%2Finvite%2Factivity%2Fwx%2Fview%2Findex%3FactivityId%3D" + activityId + "&subType=app"
    };
    $.post(I1II1i, (lli1il, lii1I, IIiIiI) => {
      try {
        lli1il ? (console.log("" + JSON.stringify(lli1il)), console.log($.name + " API请求失败，请检查网路重试")) : lii1I.status == 200 && i11II1(lii1I);
      } catch (iIlIll) {
        $.logErr(iIlIll, lii1I);
      } finally {
        Il1l11();
      }
    });
  });
}
function i11II1(lll1i1) {
  if (lll1i1) {
    if (lll1i1.headers["set-cookie"]) {
      ll111i = "" + originCookie;
      for (let iIiIIi of lll1i1.headers["set-cookie"]) {
        Il1iil[iIiIIi.split(";")[0].substr(0, iIiIIi.split(";")[0].indexOf("="))] = iIiIIi.split(";")[0].substr(iIiIIi.split(";")[0].indexOf("=") + 1);
      }
      for (const iiI1I1 of Object.keys(Il1iil)) {
        ll111i += iiI1I1 + "=" + Il1iil[iiI1I1] + ";";
      }
      iIiil = ll111i;
    }
  }
}
function Ilill1(IlIili) {
  try {
    if (typeof JSON.parse(IlIili) == "object") return true;
  } catch (lIIli1) {
    return console.log(lIIli1), console.log("京东服务器访问数据为空，请检查自身设备网络情况"), false;
  }
}
async function I111lI() {
  if (!$.joinVenderId) return;
  return new Promise(async i11lii => {
    $.errorJoinShop = "活动太火爆，请稍后再试";
    let iiI1II = "";
    if ($.shopactivityId) iiI1II = ",\"activityId\":" + $.shopactivityId;
    const iIl11I = "{\"venderId\":\"" + $.joinVenderId + "\",\"shopId\":\"" + $.joinVenderId + "\",\"bindByVerifyCodeFlag\":1,\"registerExtend\":{},\"writeChildFlag\":0" + iiI1II + ",\"channel\":406}",
      lIiii1 = {
        "appid": "shopmember_m_jd_com",
        "functionId": "bindWithVender",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(iIl11I)
      },
      iIlII = await Il1iii("27004", lIiii1),
      iIiII1 = {
        "url": "https://api.m.jd.com/client.action?appid=shopmember_m_jd_com&functionId=bindWithVender&body=" + iIl11I + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(iIlII),
        "headers": {
          "Content-Type": "application/json;charset=utf-8",
          "Origin": "https://api.m.jd.com",
          "Host": "api.m.jd.com",
          "accept": "*/*",
          "User-Agent": $.UA,
          "Cookie": ll111i
        }
      };
    $.get(iIiII1, async (lIIlll, ll1ii1, i11li1) => {
      try {
        if (lIIlll) console.log(lIIlll);else {
          const ilIIII = JSON.parse(i11li1);
          if (typeof ilIIII === "object") {
            if (ilIIII.success === true) {
              console.log(ilIIII.message);
              $.errorJoinShop = ilIIII.message;
              if (ilIIII.result && ilIIII.result.giftInfo) for (let iIllIi of ilIIII.result.giftInfo.giftList) {
                console.log("入会获得：" + iIllIi.discountString + iIllIi.prizeName + iIllIi.secondLineDesc);
              }
            } else typeof ilIIII == "object" && ilIIII.message ? ($.errorJoinShop = ilIIII.message, console.log("" + (ilIIII.message || ""))) : console.log(i11li1);
          } else console.log(i11li1);
        }
      } catch (llili1) {
        $.logErr(llili1, ll1ii1);
      } finally {
        i11lii();
      }
    });
  });
}
async function l1iii1() {
  return new Promise(async lll1il => {
    let IiI11l = "{\"venderId\":\"" + $.joinVenderId + "\",\"channel\":406,\"payUpShop\":true}";
    const iI1i1I = {
        "appid": "shopmember_m_jd_com",
        "functionId": "getShopOpenCardInfo",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(IiI11l)
      },
      iIil1i = await Il1iii("27004", iI1i1I),
      IiI11i = {
        "url": "https://api.m.jd.com/client.action?appid=shopmember_m_jd_com&functionId=getShopOpenCardInfo&body=" + IiI11l + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(iIil1i),
        "headers": {
          "Content-Type": "application/json;charset=utf-8",
          "Origin": "https://api.m.jd.com",
          "Host": "api.m.jd.com",
          "accept": "*/*",
          "User-Agent": $.UA,
          "Cookie": ll111i
        }
      };
    $.get(IiI11i, async (iIil1l, iIil11, l1li1) => {
      try {
        if (iIil1l) console.log(iIil1l);else {
          const lIIlii = JSON.parse(l1li1);
          if (typeof lIIlii === "object") {
            if (lIIlii.success === true) {
              console.log("去加入：" + (lIIlii.result.shopMemberCardInfo.venderCardName || "未知"));
              $.shopactivityId = lIIlii.result.interestsRuleList && lIIlii.result.interestsRuleList[0] && lIIlii.result.interestsRuleList[0].interestsInfo && lIIlii.result.interestsRuleList[0].interestsInfo.activityId || "";
              $.openCardStatus = lIIlii.result.userInfo.openCardStatus;
            }
          } else console.log(l1li1);
        }
      } catch (iI1i1i) {
        $.logErr(iI1i1i, iIil11);
      } finally {
        lll1il();
      }
    });
  });
}
function iiilIl(ll1ili, il1liI) {
  let llilll = new RegExp("(^|[&?])" + il1liI + "=([^&]*)(&|$)"),
    ll1ill = ll1ili.match(llilll);
  if (ll1ill != null) return decodeURIComponent(ll1ill[2]);
  return "";
}