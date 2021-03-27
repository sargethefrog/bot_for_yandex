// ==UserScript==
// @name         Bot for Yandex
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://yandex.ru/*
// @match        https://crushdrummers.ru/*
// @match        xn----7sbab5aqcbiddtdj1e1g.xn--p1ai/*
// @icon         https://www.google.com/s2/favicons?domain=tampermonkey.net
// @grant        none
// ==/UserScript==

function getCookie(name) {
  let matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

let sites = {
    "xn----7sbab5aqcbiddtdj1e1g.xn--p1ai" : ["Как звучит флейта","Валторна","Тромбон","Кларнет","Фагот","Гобой","Саксофон"],
    "https://crushdrummers.ru/" : ["Барабанное шоу","Заказать шоу барабанщиков","Барабанное шоу в Москве"]
};
let keys = Object.keys(sites);
let key = keys[Math.floor(Math.random() * keys.length)];
let site = Object.keys(sites)[Math.floor(Math.random() * Object.keys(sites).length)];
let keywords = sites[site];
//let keywords = ["Как звучит флейта","Валторна","Тромбон","Кларнет","Фагот","Гобой","Саксофон"];
let randomIndex = Math.floor(Math.random()*keywords.length);
let keyword = keywords[randomIndex];
let yandexText = document.getElementById("text");
let yandexSearchBtn = document.querySelector(".button.mini-suggest__button.button_theme_websearch.button_size_ws-head.i-bem");
if(!document.getElementById("search-result") && location.hostname == "yandex.ru"){
    document.cookie = `site=${site}`;
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
} else if(location.hostname == "yandex.ru"){
    site = getCookie("site");
    let currentYandexPage = document.querySelector("span.pager__item_current_yes").textContent;
    let links = document.querySelectorAll("#search-result a");
    let nextYandexPage = true;
    for(let i = 0;i < links.length;i++){
        let link = links[i];
        if(link.href.indexOf(site) != -1){
            nextYandexPage = false;
            link.removeAttribute("target");
            link.click();
            break;
        }
    }
    if(nextYandexPage && currentYandexPage < 11){
        setTimeout(() => {document.querySelector(".pager__item_kind_next").click();},1500);
    } else if(currentYandexPage == 11){
        location.href = "https://yandex.ru/";
    }
} else {
    let links = document.links;
    setInterval(() => {
        if(Math.random() >= 0.8){
            location.href = "https://yandex.ru/";
        }
        let link = links[Math.floor(Math.random() * links.length)];
        if(link.href.indexOf(location.hostname) != -1){
            link.click();
        }
    },3000);

}
