const prompt = document.querySelector("#prompt")
// const btn = document.querySelector("#btn")
const chatContainer = document.querySelector(".chat-container")
const container = document.querySelector(".container")
const Api_Url = "'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyBCWKomnwEcahxuL4vIw4b_i84PIp6aXRo'"
const Api_Key = "AIzaSyBCWKomnwEcahxuL4vIw4b_i84PIp6aXRo"
let userMessage = null;

// const btnfunction=()=>{
//     userMessage=prompt.value.trim();
//     console.log(userMessage);
// }
// btn.addEventListener("click",btnfunction);


function createChatBox(html,className){
    let div = document.createElement("div")//create div in dom
    div.classList.add(className)
    div.innerHTML=html
    return div
}
async function getApiResponse(aiChatBox){
     let textElement = aiChatBox.querySelector(".text")
    try {//if request fullfilled write wt to do
        let response = await fetch(Api_Url,{
            method:"POST",
            headers:{"Content-Type": "application/json" ,"Authorization": `Bearer ${AIzaSyBCWKomnwEcahxuL4vIw4b_i84PIp6aXRo}`},
            body:JSON.stringify({
                contents:[
                    {"role": "user",
                    "parts":[{text:userMessage}]}
                ]
            })
        })
        let data = await response.json()
        // console.log(data)
        let apiResponse = data?.candidates[0].content.parts[0].text
        // console.log(apiResponse)
        textElement.innerText=apiResponse
    } catch (error) {
       console.log(error) //if response not fullfilled/exception throw like java
    }
    finally{
        aiChatBox.querySelector(".loading").style.display = "none"
    }
}
function showLoading(){
    let html = ` <div class="img"><img src="ai.svg" width="50"></div>
        <p class="text"></p>
        <p class="loading">awaiting response...</p>`;
        let aiChatBox =  createChatBox(html,"aichat-container")
        chatContainer.appendChild(aiChatBox)
        getApiResponse(aiChatBox)
}

function userMessages(){
    userMessage=prompt.value.trim()
    // console.log(userMessage)
    if(userMessage === ""){
        container.style.display = "flex"
        return
    }
        container.style.display = "none"
    
    // if(!userMessage)return;
    let html = ` <img src="user.svg" class="img" width="50">
        <p class="text"></p>`;
       let userChatBox =  createChatBox(html,"userchat-container")
       userChatBox.querySelector(".text").innerText = userMessage//access chat from user chatbox and change into usermessage
       chatContainer.appendChild(userChatBox)
       prompt.value = ""
       setTimeout(showLoading,500)

}
prompt.addEventListener("keypress",(e) =>{
    if(e.key === "Enter"){
        userMessages();
    }
})