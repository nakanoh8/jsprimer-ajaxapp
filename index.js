// import { response } from "express";
console.log("index.js: loaded");

const heading = document.querySelector("h2");
const headingText = heading.textContent;
console.log(headingText);

const button = document.createElement("button");
button.textContent = "Push Me";
document.body.appendChild(button);

async function main(){
    // fetchUserInfo('nananakano000')
    //     .then((userInfo) => createView(userInfo))
    //     .then((view) => displayView(view))
    //     .catch((error) => {
    //         console.error("エラーレスポンス(main())", error);
    //     });
    try {
        const userInfo = await fetchUserInfo(getUserId());
        const view = createView(userInfo);
        displayView(view);
    } catch (error) {
        console.error(`エラーが発生しました(${error})`);
    }
}

function fetchUserInfo(userId){
    return fetch(`https://api.github.com/users/${encodeURIComponent(userId)}`)
    .then(response => {
        console.log(response.status);
        if(!response.ok){
            console.error("エラーレスポンス(fetchUserInfo())", response);
            return Promise.reject(new Error(`${response.status} : ${response.statusText}`));

        }else{
            return response.json();
        }
    });
}

function getUserId() {
    const value = document.getElementById("userId").value;
    return encodeURIComponent(value);
}

function createView(userInfo) {
    return escapeHTML`
    <h4>${userInfo.name} (@${userInfo.login})</h4>
    <img src="${userInfo.avatar_url}" alt="${userInfo.login}" height="100">
    <dl>
        <dt>Location</dt>
        <dd>${userInfo.location}</dd>
        <dt>Repositories</dt>
        <dd>${userInfo.public_repos}</dd>
    </dl>
    `;
}

function displayView(view) {
    const result = document.getElementById("result");
    result.innerHTML = view;
}

function escapeSpecialChars(str) {
    return str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

function escapeHTML(strings, ...values) {
    return strings.reduce((result, str, i) => {
        const value = values[i - 1];
        if (typeof value === "string") {
            return result + escapeSpecialChars(value) + str;
        } else {
            return result + String(value) + str;
        }
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

function openYouTube(){
    window.open('https://www.youtube.com/feed/trending', '_blank');
}

console.log("Start!");