

(function(root) {
    root._tt_config = true;
    root._taq = root._taq || [];
    var ta = document.createElement('script'); ta.type = 'text/javascript'; ta.async = true;
    ta.src = document.location.protocol + '//' + 's0.ipstatp.com/ad/business/track-log.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ta, s);
})(window);


var Jelly=function(){"use strict";var i=function(t,e){return(i=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(t,e)};function e(t,e){function n(){this.constructor=t}i(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}var o,t,a=["","webkit","Moz","MS","ms","o"],n=window,r=void 0!==function(t,e){var n,i,r=e[0].toUpperCase()+e.slice(1),s=0;for(;s<a.length;){if((i=(n=a[s])?n+r:e)in t)return t[i];s++}return}(n,"PointerEvent"),s="ontouchstart"in n;(t=o||(o={}))[t.Default=0]="Default",t[t.Start=1]="Start",t[t.Move=2]="Move",t[t.End=4]="End",t[t.Cancle=8]="Cancle";var c={pointer:{events:["pointerdown","pointermove","pointerup","pointercancel"],handler:function(t){var e=t.type,n={status:o.Default,timestamp:Date.now(),position:[t.clientX,t.clientY]};return e!==this.events[0]||0!==t.button&&"touch"!==t.pointerType?e===this.events[1]?n.status=o.Move:e===this.events[2]?n.status=o.End:e===this.events[3]&&(n.status=o.Cancle):n.status=o.Start,n}},touch:{events:["touchstart","touchmove","touchend","touchcancel"],handler:function(t){var e=t.type;if(1!==t.changedTouches.length)return null;var n={status:o.Default,timestamp:Date.now(),position:[t.changedTouches[0].clientX,t.changedTouches[0].clientY]};return e===this.events[0]?n.status=o.Start:e===this.events[1]?n.status=o.Move:e===this.events[2]?n.status=o.End:e===this.events[3]&&(n.status=o.Cancle),n.status===o.Default?null:n}},mouse:{events:["mousedown","mousemove","mouseup"],handler:function(t){var e=t.type,n={status:o.Default,timestamp:Date.now(),position:[t.clientX,t.clientY]};return e===this.events[0]&&0===t.button?n.status=o.Start:e===this.events[1]?n.status=o.Move:e===this.events[2]&&(n.status=o.End),n.status&o.Move&&1!==t.which&&(n.status=o.End),n.status===o.Default?null:n}}};"MSPointerEvent"in n&&!("PointerEvent"in n)&&(c.pointer.events=["MSPointerDown","MSPointerMove","MSPointerUp","MSPointerCancel"]);var l=250,u=9;function h(t,e,n){for(var i=0;i<t.length;i++)document.addEventListener(t[i],e,n)}var p=function(a,t){var e=function(n){var i,r,s;return function(t){var e=c[n].handler(t);if(null!==e){if(e.status&o.Start)return i=o.Start,r=e.timestamp,void(s=e.position);if(e.status&o.End)i&o.Start&&e.timestamp-r<l&&Math.sqrt(Math.pow(e.position[0]-s[0],2)+Math.pow(e.position[1]-s[1],2))<u&&a(t);else if(e.status&o.Move&&i&o.Start)return}s=[r=i=0,0]}};r?h(c.pointer.events,e("pointer"),t):s?h(c.touch.events,e("touch"),t):h(c.mouse.events,e("mouse"),t)},f=function(t,e,n){var i=document.querySelectorAll(e);for(var r in i)if(n){if(Object.is(r,t))return!0}else if(!Object.is(r,t))return!0;return!1},v=function(t){var e=document.createRange(),n=document.body?document.body:document.head;e.selectNode(n);var i=e.createContextualFragment(t);n.appendChild(i)},E=function(t,n,i){var r,e,s=(r={},e=new Promise(function(t,e){r.resolve=t,r.reject=e}),r.promise=e,r);return new IntersectionObserver(function(t,e){t.forEach(function(t){if(t.isIntersecting){var e={result:t.isIntersecting,curValue:n,condition:i};s.resolve(e)}}),console.log(t)},{root:null,rootMargin:"0px",threshold:.5}).observe(t),s.promise};function d(e){var n=history[e];return function(){n.apply(history,arguments);var t=new CustomEvent(e,{detail:arguments});window.dispatchEvent(t)}}String.prototype.startsWith||Object.defineProperty(String.prototype,"startsWith",{value:function(t,e){return e=!e||e<0?0:+e,this.substring(e,e+t.length)===t}}),String.prototype.endsWith||(String.prototype.endsWith=function(t,e){return(void 0===e||e>this.length)&&(e=this.length),this.substring(e-t.length,e)===t});var _=function(e,t,n,i){switch(t){case"EQUALS":if("ELEMENT"==i)try{for(var r=document.querySelectorAll(n),s=Array.prototype.slice.call(r),a=0;a<s.length;a++)if(s[a].contains(e))return!0}catch(t){return!1}if(0<n.split(";").filter(function(t){return e==t}).length)return!0;break;case"LT":if(e<n)return!0;break;case"GT":if(n<e)return!0;break;case"LT_OR_EQUAL":if(e<=n)return!0;break;case"GT_OR_EQUAL":if(n<=e)return!0;break;case"CONTAINS":if(0<n.split(";").filter(function(t){return-1<e.indexOf(t)}).length)return!0;break;case"DOES_NOT_EQUAL":if(0==n.split(";").filter(function(t){return e==t}).length)return!0;break;case"DOES_NOT_CONTAIN":if(-1==e.indexOf(n))return!0;break;case"STARTS_WITH":if(e.startsWith(n))return!0;break;case"ENDS_WITH":if(e.endsWith(n))return!0;break;case"MATCHES_REGEX":if(n.test(e))return!0;break;case"MATCHES_REGEX_IGNORE_CASE":if(!n.test(e))return!0;break;case"MATCHES_CSS_SELECTOR":if(f(e,n,!0))return!0;break;case"DOSE_NOT_MATCHES_CSS_SELECTOR":if(f(e,n,!1))return!0}return!1},y={click:["ELEMENT","ELEMENT_CLASSES","ELEMENT_ID","ELEMENT_TARGET","ElEMENT_URL","ELEMENT_TEXT"],pageview:["PAGE_URL","PAGE_HOSTNAME","PAGE_PATH","REFERRER"],visibility:["ELEMENT_CLASSES","ELEMENT_ID"],history_change:["NEW_HISTORY_FRAGMENT","OLD_HISTORY_FRAGMENT","NEW_HISTORY_STATE","OLD_HISTORY_STATE","HISTORY_SOURCE"]},b=function(){function t(){}return t.prototype.dispatcher=function(t,e,n,i){for(var r=e.variable_type,s=0,a="visibility"==t?["pageview","history_change","visibility"]:["pageview","history_change","click"];s<a.length;s++){var o=a[s];if(-1<y[o].indexOf(r)){var c=void 0;switch(o){case"click":c=this.click(r,n);break;case"pageview":c=this.pageview(r);break;case"history_change":c=this.history_change(r,n,i);case"visibility":c=this.visibility(r,e.value)}return c}}},t.prototype.click=function(t,e){var n;if(!e)return console.log("event is null"),!1;switch(t){case"ELEMENT":n=e.target;break;case"ELEMENT_CLASSES":n=e.target.className;case"ELEMENT_ID":n=e.target.id;break;case"ELEMENT_TARGET":n=e.target;break;case"ElEMENT_URL":n=e.target.href||e.target.src||"";break;case"ELEMENT_TEXT":n=e.target.text||"";break;default:n=null}return n},t.prototype.pageview=function(t){var e;switch(t){case"PAGE_URL":e=location.href;break;case"PAGE_HOSTNAME":e=location.hostname;break;case"PAGE_PATH":e=location.pathname;break;case"REFERRER":e=document.referrer;break;default:e=null}return e},t.prototype.history_change=function(t,e,n){var i;switch(t){case"NEW_HISTORY_FRAGMENT":i=location.hash;break;case"OLD_HISTORY_FRAGMENT":i=n.old_hash;break;case"NEW_HISTORY_STATE":i=history.state;break;case"OLD_HISTORY_STATE":i=n.old_state;break;case"HISTORY_SOURCE":i=e.type;break;default:i=null}return i},t.prototype.visibility=function(t,e){var n;switch(t){case"ELEMENT_ID":n="#"+e;break;case"ELEMENT_CLASS":n="."+e;break;default:n=null}return document.querySelector(n)},t}();var S,g,T=(function(t){function n(t){if(t)return function(t){for(var e in n.prototype)t[e]=n.prototype[e];return t}(t)}(t.exports=n).prototype.on=n.prototype.addEventListener=function(t,e){return this._callbacks=this._callbacks||{},(this._callbacks["$"+t]=this._callbacks["$"+t]||[]).push(e),this},n.prototype.once=function(t,e){function n(){this.off(t,n),e.apply(this,arguments)}return n.fn=e,this.on(t,n),this},n.prototype.off=n.prototype.removeListener=n.prototype.removeAllListeners=n.prototype.removeEventListener=function(t,e){if(this._callbacks=this._callbacks||{},0==arguments.length)return this._callbacks={},this;var n,i=this._callbacks["$"+t];if(!i)return this;if(1==arguments.length)return delete this._callbacks["$"+t],this;for(var r=0;r<i.length;r++)if((n=i[r])===e||n.fn===e){i.splice(r,1);break}return this},n.prototype.emit=function(t){this._callbacks=this._callbacks||{};var e=[].slice.call(arguments,1),n=this._callbacks["$"+t];if(n)for(var i=0,r=(n=n.slice(0)).length;i<r;++i)n[i].apply(this,e);return this},n.prototype.listeners=function(t){return this._callbacks=this._callbacks||{},this._callbacks["$"+t]||[]},n.prototype.hasListeners=function(t){return!!this.listeners(t).length}}(S={exports:{}},S.exports),S.exports),m=function(i){function t(t,e){var n=i.call(this)||this;return n.BaseConf=t,n.SDK_ID=e,n.BaseConf.forEach(function(t){t.id=t.code_id,t.conditions=t.conditions||[],t.conditions.forEach(function(t){t.result=!1})}),n}return e(t,i),t.prototype.sendDebugEvent=function(t,e,n){var i=this.BaseConf,r=[];i.forEach(function(t){t.code_id==e&&(t.conditions=n),r.push(t)});var s={sdk_id:this.SDK_ID,event_name:t,data:r};this.emit("jelly_message",s)},t}(T),k=new b,I=function(s){function t(t,e,n,i){var r=s.call(this)||this;return r.on("jelly_message",i),r.SendEvent=new m(e,n),r.SendEvent.on("jelly_message",function(t){r.emit("jelly_message",t)}),r.CLICK=t.CLICK||[],r.PAGEVIEW=t.PAGEVIEW||[],r.VISIBILITY=t.VISIBILITY||[],r.HISTORY_CHANGE=t.HISTORY_CHANGE||[],r.click(),r.pageview(),r.visibility(),r.history_change(),r}return e(t,s),t.prototype.dispatcher=function(t,e,n,i){if(e)for(var r=0,s=e;r<s.length;r++){for(var a=s[r],o=[],c=!0,l=0,u=a.conditions;l<u.length;l++){var h=u[l],p=k.dispatcher(t,h,n,i),f=_(p,h.operator,h.value,h.variable_type);f||(c=!1),o.push(Object.assign(h,{cur_value:p,result:f}))}c&&v(a.code),this.SendEvent.sendDebugEvent("jelly."+t,a.code_id,o)}},t.prototype.click=function(){var e=this;p(function(t){e.dispatcher("click",e.CLICK,t)},!0)},t.prototype.pageview=function(){this.dispatcher("pageview",this.PAGEVIEW),this.history_change(this.PAGEVIEW)},t.prototype.history_change=function(n){void 0===n&&(n=this.HISTORY_CHANGE);var i=this,r=history.state,s=location.hash;history.pushState=d("pushState"),history.replaceState=d("replaceState"),window.addEventListener("pushState",function(t){var e={old_state:r};i.dispatcher("history_change",n,t,e),r=history.state}),window.addEventListener("replaceState",function(t){var e={old_state:r};i.dispatcher("history_change",n,e),r=history.state}),window.addEventListener("popstate",function(t){var e={old_hash:s};i.dispatcher("history_change",n,t,e),s=location.hash})},t.prototype.visibility=function(){if(!(this.VISIBILITY.length<1)){var e=this.VISIBILITY,l={},u=this;new MutationObserver(function(t){e.forEach(function(s,t){var a=!0,o=[],c=[];s.conditions.forEach(function(t,e){if(-1<y.visibility.indexOf(t.variable_type)){var n="",i=k.dispatcher("visibility",t),r="_"+t.value;i&&function(t){if(!(t instanceof Element))throw Error("DomUtil: elem is not an element.");var e=getComputedStyle(t);return"none"!==e.display&&"visible"===e.visibility&&!(Number(e.opacity)<.1)}(i)&&!l[r]&&(o.push(E(i,n,t)),l[r]=!0)}else{n=k.dispatcher("visibility",t);var s=_(n,t.operator,t.value,t.variable_type);s||(a=!1),c.push(Object.assign(t,{cur_value:n,result:s}))}}),0<o.length&&Promise.all(o).then(function(t){for(var e=!0,n=0,i=t;n<i.length;n++){var r=i[n];c.push(Object.assign(r.condition,{cur_value:r.curValue,result:r.result})),r.result&&a||(e=!1)}e&&v(s.code),u.SendEvent.sendDebugEvent("jelly.visibility",s.code_id,c)},function(){console.log("does not exec code")})})}).observe(document,{childList:!0,characterData:!0,subtree:!0,attributes:!0})}},t}(T);return g=function(t){if(t.data&&t.data._bytedance_&&"main-init"===t.data.type){window.removeEventListener("message",g);var e=t.data._bytedance_,n=document.createElement("script");n.type="text/javascript",n.src="https://s0.ipstatp.com/jelly_config_fe_intl/static/js/pickup.js",n.async=!0,document.body.appendChild(n),window.parent.postMessage({_bytedance_:e,type:"loader-init",data:{}},"*")}},window.addEventListener("message",g),function(r){function t(t,e){var n=r.call(this)||this;if(n.BaseConf=e,n.SDK_ID=t,window.jelly_tool_events&&window.jelly_tool_events.length&&window.jelly_tool_events.forEach(function(t){n.on(t.name,t.callback)}),n.emit("jelly_event",{SDK_ID:t,BaseConf:e||[]}),n.BaseConf instanceof Array){if(self._jelly_sdks=self._jelly_sdks||{},self._jelly_sdks[t])return n;self._jelly_sdks[t]=!0;var i=n.dispatch(e);n.trigger=new I(i,e,t,function(t){n.emit("jelly_message",t)})}return n}return e(t,r),t.prototype.dispatch=function(t){var n={CLICK:[],PAGEVIEW:[],VISIBILITY:[],HISTORY_CHANGE:[]};return this.BaseConf.forEach(function(t){var e={code_id:t.code_id,code:t.code,conditions:t.conditions||[]};n[t.trigger_type]&&n[t.trigger_type].push(e)}),n},t}(T)}();
window.jelly = new Jelly("BL5U5815IEM1Q8BOC5F0", [{"trigger_name":"trigger-0","trigger_type":"CLICK","conditions":[{"variable_name":"ELEMENT","variable_type":"ELEMENT","operator":"EQUALS","value":"#__APP_ROOT__ \u003e div \u003e div:nth-of-type(1) \u003e div:nth-of-type(2) \u003e div:nth-of-type(1) \u003e span:nth-of-type(2) \u003e span"},{"variable_name":"PAGE_URL","variable_type":"PAGE_URL","operator":"EQUALS","value":"http://vm.tiktok.com/RnQmoo/"}],"code_id":49448,"code_name":"Follow","code":"\u003cscript\u003e_taq.push({convert_id:\"1641391912983557\", event_type:\"button\"})\u003c/script\u003e"},{"trigger_name":"trigger-0","trigger_type":"CLICK","conditions":[{"variable_name":"PAGE_URL","variable_type":"PAGE_URL","operator":"EQUALS","value":"https://www.tiktok.com/@tiktok.tv_channel?language=en\u0026sec_uid=MS4wLjABAAAAmV4aKpY0TYF1VG16-H9pLadNifFojitYPFVtBs68bpEkqjgyAIdgIL9QP6kq1G4c\u0026u_code=d60kb3ki1mjb0m\u0026utm_campaign=client_share\u0026app=musically\u0026utm_medium=ios\u0026user_id=6684809100376687622\u0026tt_from=copy\u0026utm_source=copy"},{"variable_name":"ELEMENT","variable_type":"ELEMENT","operator":"EQUALS","value":"Follow"}],"code_id":49449,"code_name":"Follow Test","code":"\u003cscript\u003e_taq.push({convert_id:\"1641392234964998\", event_type:\"button\"})\u003c/script\u003e"},{"trigger_name":"trigger-0","trigger_type":"CLICK","conditions":[{"variable_name":"ELEMENT","variable_type":"ELEMENT","operator":"EQUALS","value":"#__APP_ROOT__ \u003e div \u003e div:nth-of-type(1) \u003e div:nth-of-type(2) \u003e div:nth-of-type(1) \u003e span:nth-of-type(2) \u003e span"},{"variable_name":"PAGE_URL","variable_type":"PAGE_URL","operator":"EQUALS","value":"https://www.tiktok.com/@tiktok.tv_channel?language=en\u0026sec_uid=MS4wLjABAAAAmV4aKpY0TYF1VG16-H9pLadNifFojitYPFVtBs68bpEkqjgyAIdgIL9QP6kq1G4c\u0026u_code=d60kb3ki1mjb0m\u0026utm_campaign=client_share\u0026app=musically\u0026utm_medium=ios\u0026user_id=6684809100376687622\u0026tt_from=copy\u0026utm_source=copy\u0026langCountry=en"}],"code_id":49450,"code_name":"test1","code":"\u003cscript\u003e_taq.push({convert_id:\"1641498608664582\", event_type:\"button\"})\u003c/script\u003e"},{"trigger_name":"trigger-0","trigger_type":"CLICK","conditions":[{"variable_name":"ELEMENT","variable_type":"ELEMENT","operator":"EQUALS","value":"#__APP_ROOT__ \u003e div \u003e div:nth-of-type(1) \u003e div:nth-of-type(2) \u003e div:nth-of-type(1) \u003e span:nth-of-type(2) \u003e span"},{"variable_name":"PAGE_URL","variable_type":"PAGE_URL","operator":"EQUALS","value":"https://www.tiktok.com/@tiktok.tv_channel"}],"code_id":49451,"code_name":"test2","code":"\u003cscript\u003e_taq.push({convert_id:\"1641498786531333\", event_type:\"button\"})\u003c/script\u003e"},{"trigger_name":"trigger-0","trigger_type":"CLICK","conditions":[{"variable_name":"ELEMENT","variable_type":"ELEMENT","operator":"EQUALS","value":"#__APP_ROOT__ \u003e div \u003e div:nth-of-type(1) \u003e div:nth-of-type(2) \u003e div:nth-of-type(1) \u003e span:nth-of-type(2) \u003e span"},{"variable_name":"PAGE_URL","variable_type":"PAGE_URL","operator":"EQUALS","value":"https://www.tiktok.com/@tiktok.tv_channel"}],"code_id":49452,"code_name":"Follow Channel","code":"\u003cscript\u003e_taq.push({convert_id:\"1641560741580806\", event_type:\"button\"})\u003c/script\u003e"}])

