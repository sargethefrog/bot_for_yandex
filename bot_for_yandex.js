// ==UserScript==
// @name         Bot for Yandex
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://yandex.ru/*
// @icon         https://www.google.com/s2/favicons?domain=tampermonkey.net
// @grant        none
// ==/UserScript==

let keywords = ["Как звучит флейта","Валторна","Тромбон","Кларнет","Фагот","Гобой","Саксофон"];
let randomIndex = Math.floor(Math.random()*keywords.length);
let keyword = keywords[randomIndex];
let yandexText = document.getElementById("text");
let yandexSearchBtn = document.querySelector(".button.mini-suggest__button.button_theme_websearch.button_size_ws-head.i-bem");
if(!document.getElementById("search-result")){
    let i = 0;
    yandexText.focus();
    yandexText.value = "";
    let timerId = setInterval(function(){
        yandexText.value += keyword[i++];
        if(i >= keyword.length){
            clearInterval(timerId);
            yandexSearchBtn.click();
        }
},300);
} else {
    let links = document.querySelectorAll("#search-result a");
    let nextYandexPage = true;
    for(let i = 0;i < links.length;i++){
        let link = links[i];
        if(link.href.indexOf("xn----7sbab5aqcbiddtdj1e1g.xn--p1ai") != -1){
            nextYandexPage = false;
            link.removeAttribute("target");
            link.click();
            break;
        }
    }
    if(nextYandexPage){
        document.querySelector(".pager__item_kind_next").click();
    }
}
