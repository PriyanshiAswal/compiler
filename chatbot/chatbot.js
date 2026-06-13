import { chatService } from '../services/chat_service.js';

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

export function renderChatbot(container) {
  let log = [
    {
      q: 'How was Batch A rated?',
      a: chatService.askAssistant('How was Batch A rated?')
    }
  ];

  container.innerHTML = `
    <div class="card">
      <h3>AI Assistant</h3>
      <p class="kicker">Demo responses are hardcoded; architecture is ready for local LLM/RAG integration.</p>
      <div class="actions" style="margin-bottom:0.6rem">
        <button class="secondary" data-q="What is the leave policy?">What is the leave policy?</button>
        <button class="secondary" data-q="What complaints were repeated?">What complaints were repeated?</button>
        <button class="secondary" data-q="Compare Batch A and Batch B.">Compare Batch A and Batch B.</button>
        <button class="secondary" data-q="What suggestions were most common?">What suggestions were most common?</button>
      </div>
      <div id="assistant-chat" class="chat-box"></div>
      <div style="margin-top:0.7rem">
        <input id="assistant-input" type="text" placeholder="Ask about documents or feedback..." />
        <button id="assistant-send" style="margin-top:0.5rem">Send</button>
      </div>
    </div>
  `;

  const chat = container.querySelector('#assistant-chat');
  const input = container.querySelector('#assistant-input');

  const render = () => {
    chat.innerHTML = log
      .map(
        (m) =>
          `<div class="msg user">You: ${escapeHtml(m.q)}</div><div class="msg assistant">Assistant: ${escapeHtml(m.a)}</div>`
      )
      .join('');
    chat.scrollTop = chat.scrollHeight;
  };

  const ask = (q) => {
    if (!q.trim()) return;
    log.push({ q, a: chatService.askAssistant(q) });
    render();
  };

  render();

  container.querySelector('#assistant-send').addEventListener('click', () => {
    ask(input.value);
    input.value = '';
  });

  container.querySelectorAll('[data-q]').forEach((btn) => {
    btn.addEventListener('click', () => ask(btn.dataset.q));
  });
}
