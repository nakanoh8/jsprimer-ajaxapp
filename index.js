// import { response } from "express";

console.log("index.js: loaded");

const heading = document.querySelector("h2");
const headingText = heading.textContent;
console.log(headingText);

const button = document.createElement("button");
button.textContent = "Push Me";
document.body.appendChild(button);

function fetchUserInfo(userId){
    fetch(`https://api.github.com/users/${encodeURIComponent(userId)}`)
    .then(response => {
        console.log(response.status);
        if(!response.ok){
            console.error("エラーレスポンス", response);
        }else{
            return response.json().then(userInfo => {
                console.log(userInfo);
            });
        }
    }).catch(error => {
        console.error(error);
    });
}

function fetchUserInfoByXHR(userId){
    const req = new XMLHttpRequest();
    req.open("GET", `https://api.github.com/users/${encodeURIComponent(userId)}`);
    req.addEventListener("load", () => {
        if(req.status >= 200 && req.status < 300){
            const userInfo = JSON.parse(req.responseText);
            console.log(userInfo);
        }else{
            console.error("エラーレスポンス", req.statusText);
        }
    });
    req.addEventListener("error", () => {
        console.error("ネットワークエラー");
    });

    req.send();
}