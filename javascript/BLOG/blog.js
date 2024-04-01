//部落格
var title = document.getElementById("title");
var content = document.getElementById("content");
var btn = document.getElementById("btn");
var list = document.getElementById("list");

btn.addEventListener("click", function(){ //監聽有沒有按下按鈕
    
    //list.innerHTML裡面的html內容
    list.innerHTML = list.innerHTML +` 
    <div class="article">
        <h2>${title.value}</h2>
        <p>${content.value}</p>
    </div>
    `;
    title.value =""; //按下送出後，改為空字串
    content.value ="";

})