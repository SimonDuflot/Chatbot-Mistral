const conversationArr = [
    {
        role: "system",
        content: "You are a useful assistant. That can answer in both english and french depending on the language used by the user."
    }
];

const chatbotConversation = document.getElementById("chatbot-conversation");

document.addEventListener("submit", async e => {
    e.preventDefault()

    const userInput = document.getElementById("user-input");

    const userSpeechBubble = document.createElement("div");

    userSpeechBubble.classList.add("speech", "speech-human");

    chatbotConversation.appendChild(userSpeechBubble);

    userSpeechBubble.textContent = userInput.value;

    conversationArr.push({
        role: "user",
        content: userInput.value
    })

    try {
        const response = await fetch("https://chatbot-mistral.onrender.com/api/chat", {
            method: "POST",
            headers: {
                "Content-type" : "application/json"
            },
            body: JSON.stringify({message: userInput.value})
        });

        const data = await response.json();

        const botSpeechBubble = document.createElement("div");
        botSpeechBubble.classList.add("speech", "speech-ai");
        chatbotConversation.appendChild(botSpeechBubble);

        botSpeechBubble.textContent = data.response;

        conversationArr.push({
            role: "assistant",
            content: data.response
        });
    } catch (error) {
        console.error("Error detected", error);
        const botSpeechError = document.createElement("div");
        botSpeechError.classList.add("speech", "speech-bot");
        botSpeechError.textContent= "Error while talking with Mistral Mini, sorry !"
    }

    userInput.value = "";
    chatbotConversation.scrollTop = chatbotConversation.scrollHeight;
})