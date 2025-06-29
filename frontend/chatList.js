document.addEventListener("DOMContentLoaded", () => {
  const user = JSON.parse(localStorage.getItem("loggedin"));
  if (!user) {
    alert("Please login first");
    window.location.href = "login.html";
    return;
  }

  const chatBox = document.getElementById("chatBox");
  const chatInput = document.getElementById("chatInput");
  const chatForm = document.getElementById("chatForm");

  async function loadChats() {
    const res = await fetch("http://localhost:5000/api/chats");
    const chats = await res.json();

    chatBox.innerHTML = "";
    chats.forEach(chat => {
      const msgDiv = document.createElement("div");
      msgDiv.className = "mb-2 p-2 border rounded bg-white";
      msgDiv.innerHTML = `
        <div><strong>${chat.user}</strong> <small class="text-muted">${new Date(chat.time).toLocaleString()}</small></div>
        <div>${chat.message}</div>
      `;
      chatBox.appendChild(msgDiv);
    });
    chatBox.scrollTop = chatBox.scrollHeight;
  }

  chatForm.addEventListener("submit", async function (e) {
    e.preventDefault();
    const message = chatInput.value.trim();
    if (!message) return alert("Message is required");

    const res = await fetch("http://localhost:5000/api/chats", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        user: user.email,
        message
      })
    });

    if (res.ok) {
      chatInput.value = "";
      loadChats();
    } else {
      alert("Message send failed");
    }
  });

  window.refreshChat = loadChats;
  loadChats();
});
