import { store } from "../../services/state.js";
import { wsService } from "../../services/websocket.js";

/**
 * Chat Component - Dialogue Utilisateur / JARVIS
 */
export class Chat {
  constructor(elementId) {
    this.container = document.getElementById(elementId);
    this.render();
    this.box = this.container.querySelector(".chat-box");
    this.input = this.container.querySelector(".chat-input");
    this.sendBtn = this.container.querySelector(".chat-send-btn");
    this.init();
  }

  render() {
    this.container.innerHTML = `
      <div class="chat-container">
        <div class="chat-box"></div>
        <div class="chat-footer">
          <input type="text" class="chat-input" placeholder="ACCURATE INPUT COMMAND..." />
          <button class="chat-send-btn">➤</button>
        </div>
      </div>
    `;
  }

  init() {
    this.sendBtn.addEventListener("click", () => this.sendMessage());
    this.input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") this.sendMessage();
    });

    this.lastProcessedUser = null;
    this.lastProcessedJarvis = null;

    store.subscribe((state) => {
      // Uniquement si le message est nouveau et différent du dernier traité
      if (
        state.lastUserMessage &&
        state.lastUserMessage !== this.lastProcessedUser
      ) {
        this.addMessage(state.lastUserMessage, "user");
        this.lastProcessedUser = state.lastUserMessage;
      }

      if (
        state.lastJarvisMessage &&
        state.lastJarvisMessage !== this.lastProcessedJarvis
      ) {
        this.addMessage(state.lastJarvisMessage, "jarvis");
        this.lastProcessedJarvis = state.lastJarvisMessage;
      }
    });
  }

  sendMessage() {
    const text = this.input.value.trim();
    if (!text) return;

    wsService.send("ui.text_input", { text });
    this.input.value = "";
  }

  addMessage(text, sender) {
    // Éviter les doublons si le store renvoie le même message
    const lastMsg = this.box.lastElementChild;
    if (
      lastMsg &&
      lastMsg.textContent === text &&
      lastMsg.classList.contains(sender)
    )
      return;

    const div = document.createElement("div");
    div.className = `msg ${sender}`;
    div.textContent = text;
    this.box.appendChild(div);
    this.box.scrollTop = this.box.scrollHeight;

    // Animation stilted/stagger
    div.animate(
      [
        { opacity: 0, transform: "translateY(10px)" },
        { opacity: 1, transform: "translateY(0)" },
      ],
      { duration: 300, easing: "ease-out" },
    );
  }
}
