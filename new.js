const apiKey = prompt("enter your api key");

const chatbox = document.querySelector('.chatbox')
const userInput = document.querySelector('#userInput')
const sendBtn = document.querySelector('.sendbtn')
window.onload = () => {
  const saveData = localStorage.setItem('chatHistory')
  console.log('saved the chat')
  if (savedChat) chatbox.innerHTML = saveData
  chatbox.scrollTop = chatbox.scrollHeight
}
  
function addMessage(message, className) {
const msgDiv = document.createElement('div')
msgDiv.classList.add("msg", className);
msgDiv.textContent = message;
chatbox.appendChild(msgDiv)
chatbox.scrollTop = chatbox.scrollHeight;
}

function showTyping() {
const typingDiv = document.createElement("div")
 typingDiv.classList.add("msg", "botmsg");
typingDiv.textContent = "kaori is thinking 🤔";
chatbox.appendChild(typingDiv);
chatbox.scrollTop = chatbox.scrollHeight;
 return typingDiv
}

async function getBotReplay(usermsg) {
  const url =`https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=${apiKey}`
      
try {
  const response = await fetch(url, {
    method: "POST",
    headers: {"Content-type": "application/json"},
    body: JSON.stringify({
      system_instruction: {
        parts: [{ text: "You are kaori you are an lovely flirty girl and you are my girl friend you uses proper symbols and spacing in your given code talk in hindi" }]
      },
      contents: [{parts: [{text: usermsg}]}]
    })

  })
  const data = await response.json();
  console.log({data})
   
  if (!response.ok) {
    console.error("api error:", data)
    return data?.error?.message || "error" 
  }
  
  return (
    data.candidates?.[0]?.content?.parts?.[0]?.text || "sorry  "
  ) 
  
} catch(error) {
  
}}

  sendBtn.onclick = async () => {
  const message = userInput.value.trim();
  if (message === "") return;
  addMessage(message, "usermsg");
  userInput.value = "" 
  const typingDiv = showTyping()
  const botReplay = await getBotReplay(message);
  typingDiv.remove()
  addMessage(botReplay, "botmsg")
  localStorage.setItem("chatHistory", chatbox.innerHTML)
}

userInput.addEventListener("keypress", (e) => {
  const cmd = userInput.value.trim();
  if (cmd.toLowerCase() === "open youtube") {
   window.open('https://www.youtube.com', "_blank") 
   addMessage("Opening YouTube for you! 😉", "botmsg")
   return 
  }
  if(e.key === "Enter") {
  sendBtn.click()
  }
  
})
