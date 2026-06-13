import { documentService } from '../services/document_service.js';
import { chatService } from '../services/chat_service.js';

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

export function renderDocuments(container) {
  let selectedId = null;
  let activeRows = documentService.list();
  let chatLog = [];

  container.innerHTML = `
    <div class="grid">
      <div class="card">
        <h3>Manage Documents</h3>
        <div class="actions">
          <input type="file" id="doc-upload" accept=".pdf,.docx" />
          <input type="text" id="doc-search" placeholder="Search documents..." />
        </div>
      </div>

      <div class="two-col">
        <div class="card">
          <h3>Document List</h3>
          <div class="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Name</th><th>Type</th><th>Department</th><th>Uploaded</th><th>Actions</th>
                </tr>
              </thead>
              <tbody id="docs-table"></tbody>
            </table>
          </div>
        </div>

        <div class="card">
          <h3>Preview & Ask Question</h3>
          <div id="doc-preview" class="kicker">Select a document to preview details.</div>
          <div style="margin-top:0.8rem" class="actions">
            <button class="secondary" id="ask-sample-leave">What is the leave policy?</button>
            <button class="secondary" id="ask-sample-attendance">What are attendance rules?</button>
            <button class="secondary" id="ask-sample-cyber">Summarize cybersecurity guidelines.</button>
          </div>
          <div style="margin-top:0.8rem">
            <input type="text" id="doc-chat-input" placeholder="Ask a document question..." />
            <button id="doc-chat-send" style="margin-top:0.5rem">Ask Question</button>
          </div>
          <div id="doc-chat" class="chat-box" style="margin-top:0.8rem"></div>
        </div>
      </div>
    </div>
  `;

  const table = container.querySelector('#docs-table');
  const preview = container.querySelector('#doc-preview');
  const chatBox = container.querySelector('#doc-chat');
  const chatInput = container.querySelector('#doc-chat-input');

  const renderChat = () => {
    chatBox.innerHTML = chatLog
      .map(
        (entry) =>
          `<div class="msg user">You: ${escapeHtml(entry.q)}</div><div class="msg assistant">Assistant: ${escapeHtml(entry.a)}</div>`
      )
      .join('');
    chatBox.scrollTop = chatBox.scrollHeight;
  };

  const ask = (question) => {
    if (!question.trim()) return;
    const answer = chatService.askDocumentQuestion(question);
    chatLog.push({ q: question, a: answer });
    renderChat();
  };

  const renderTable = (rows) => {
    table.innerHTML = rows
      .map(
        (doc) => `
      <tr>
        <td>${escapeHtml(doc.name)}</td>
        <td>${escapeHtml(doc.type)}</td>
        <td>${escapeHtml(doc.department)}</td>
        <td>${escapeHtml(doc.uploadedAt)}</td>
        <td>
          <div class="actions">
            <button class="secondary" data-preview="${doc.id}">Preview</button>
            <button class="danger" data-delete="${doc.id}">Delete</button>
          </div>
        </td>
      </tr>`
      )
      .join('');

    table.querySelectorAll('[data-preview]').forEach((btn) => {
      btn.addEventListener('click', () => {
        selectedId = Number(btn.dataset.preview);
        const doc = documentService.getById(selectedId);
        preview.innerHTML = doc
          ? `<strong>${escapeHtml(doc.name)}</strong><br/>Type: ${escapeHtml(doc.type)} · Dept: ${escapeHtml(
              doc.department
            )}<br/>Size: ${escapeHtml(doc.sizeKb)} KB<br/>${escapeHtml(doc.summary)}`
          : 'Document not found.';
      });
    });

    table.querySelectorAll('[data-delete]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const id = Number(btn.dataset.delete);
        documentService.remove(id);
        activeRows = documentService.list();
        renderTable(activeRows);
        if (selectedId === id) {
          selectedId = null;
          preview.textContent = 'Select a document to preview details.';
        }
      });
    });
  };

  renderTable(activeRows);

  container.querySelector('#doc-search').addEventListener('input', (e) => {
    activeRows = documentService.search(e.target.value);
    renderTable(activeRows);
  });

  container.querySelector('#doc-upload').addEventListener('change', (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    documentService.upload(file.name);
    activeRows = documentService.list();
    renderTable(activeRows);
  });

  container.querySelector('#doc-chat-send').addEventListener('click', () => {
    ask(chatInput.value);
    chatInput.value = '';
  });

  container.querySelector('#ask-sample-leave').addEventListener('click', () => ask('What is the leave policy?'));
  container.querySelector('#ask-sample-attendance').addEventListener('click', () => ask('What are attendance rules?'));
  container.querySelector('#ask-sample-cyber').addEventListener('click', () => ask('Summarize cybersecurity guidelines.'));
}
