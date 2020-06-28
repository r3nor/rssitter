const rss_list = [`nitter.net/Trezor/rss`, 'nitter.net/Bitcoin/rss'];
const proxyurl = "https://cors-anywhere.herokuapp.com/";
const hideRetweets = false;
let myJson = [];
let keys = [];

function showSettings(){
    $('.mini.modal').modal('show')
;
}

function fetchTweets(rss){
    fetch(proxyurl+rss)
    .then(response => response.text())
    .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
    .then(data => {
        let profilePic = data.querySelector("channel").querySelector("image").querySelector("url").innerHTML;
        const items = data.querySelectorAll("item");
        const fetchingAccount = data.querySelector("title").innerHTML.split("/")[1];
        let html = ``;
        items.forEach(el => {
            const rawTime = getRawTime(new Date(el.querySelector("pubDate").innerHTML));
            const time = getTimeString(new Date(el.querySelector("pubDate").innerHTML));
            const originalPoster = el.querySelector("creator").innerHTML;
            let rtString = `RT by${fetchingAccount}:`
            let content = el.querySelector("title").innerHTML.replace(rtString, "");
            const isRt = isRetweet(el);
            const show = isValid(el);
            const urlToPost = el.querySelector("link").innerHTML
            buildmyJson(rawTime, originalPoster, profilePic, fetchingAccount, content, urlToPost, time, isRt, show);
        });
    });
}

function buildmyJson(rawTime, originalPoster, profilePic, fetchingAccount, content, urlToPost, time, isRt, show){
    if(isRt){
        console.log("is rt")
        profilePic = `images/${Math.floor(Math.random() * (10 - 1) +1)}.png`
    }
    myJson.push({
        originalPoster: originalPoster,
        profilePic: profilePic,
        fetchingAccount: fetchingAccount,
        content: content,
        urlToPost: urlToPost,
        time: time,
        isRt: isRt,
        show: show,
        rawTime: rawTime
    });
}

function buildFeed(){
    console.log("Building feed")
    let html = ``
    for(const element of myJson){
        if(element.isRt && !element.hideRetweets && element.show){
            html+=`
            <div class="column"> <!--Start tweet-->
            <div class="ui centered card">
            <div class="content">
            <div class="extra content">
            <div class="left floated author">
            <img class="ui avatar image" src="${element.profilePic}">
            </div>
            </div>
            <div class="header" id="author"><a href="${element.urlToPost}">${element.originalPoster}</a></div>
            <div class="meta">
            <span class="category" id="time"><i class="clock icon"></i> ${element.time} </span>
            <span class="category"><i class="retweet icon"></i> ${element.fetchingAccount} retwitted</span>      
            </div>
            <div class="description">
            <p>${element.content}</p>
            </div>
            </div>
            <!--<div class="extra content">
            <i class="like icon"></i> 1000
            <span> ·  · </span>
            <i class="retweet icon"></i> 20
            </div>-->
            </div>
            </div> <!--End tweet-->   
            
            `;
        }
        else if(!element.isRt && element.show){
            html+=`
            <div class="column"> <!--Start tweet-->
            <div class="ui centered card">
            <div class="content">
            <div class="extra content">
            <div class="left floated author">
            <img class="ui avatar image" src="${element.profilePic}">
            </div>
            </div>
            <div class="header" id="author">${element.originalPoster}</div>
            <div class="meta">
            <span class="category" id="time"><i class="clock icon"></i> ${element.time} </span>
            </div>
            <div class="description">
            <p>${element.content}</p>
            </div>
            </div>
            <!--<div class="extra content">
            <i class="like icon"></i> 1000
            <span> ·  · </span>
            <i class="retweet icon"></i> 20
            </div>-->
            </div>
            </div> <!--End tweet-->
            `
        }

    }
    document.getElementById("card-container").insertAdjacentHTML("beforeend", html);
}

function getTimeString(date1){
    const today = new Date;
    let time = 0;
    let timeString = "0m"
    const diffTime = Math.abs(today - date1);
    time = Math.abs(diffTime/1000);
    timeString = String(time+"s");
    if(time > 59){
        time = Math.floor(time/60);
        timeString = String(time+"m");
    }
    if(time > 59){
        time = Math.floor(time/60);
        timeString = String(time+"h");
    }
    if(time > 23){
        time = Math.floor(time/24);
        timeString = String(time+"d");
    }
    return timeString;
}

function getRawTime(date1){
    const today = new Date;
    const diffTime = Math.abs(today - date1);
    return diffTime;
}

function isRetweet(tweet){
    return(tweet.querySelector("title").innerHTML.includes("RT by"));    
}

function isValid(tweet){
    return(!tweet.querySelector("title").innerHTML.includes("Pinned"));    
}

function comparator(a,b){
    return a.rawTime-b.rawTime;
}

function sorter(a,b){
    return a-b;
}

function sortJson(s){
    myJson.sort(comparator);
    console.log("Json sorted...")
}

function fetchFeed(callback){
    rss_list.forEach(feed=>{
        fetchTweets(feed);
    });
    console.log("Feed was fetched correctly...")
    sortJson();
}

function main(callback){
    fetchFeed(sortJson);
    setTimeout(buildFeed, 500);
    setTimeout(buildFeed, 1000);
    setTimeout(buildFeed, 1500);
    setTimeout(buildFeed, 2000);
    setTimeout(buildFeed, 3000);
    setTimeout(buildFeed, 5000);
}

main();