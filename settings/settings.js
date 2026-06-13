export function renderSettings(container) {
  container.innerHTML = `
    <div class="grid">
      <div class="card">
        <h3>Theme Settings</h3>
        <p>Current theme: <span class="status">Light · White + Green</span></p>
      </div>
      <div class="card">
        <h3>System Information</h3>
        <p>Prototype mode: <span class="status">Offline First</span></p>
        <p>Data mode: <span class="status">Mock Data Enabled</span></p>
      </div>
      <div class="card">
        <h3>Model Status</h3>
        <p>Current model: <strong>No model connected</strong></p>
        <p>Current vector database: <strong>Not configured</strong></p>
        <p>Current OCR: <strong>Disabled</strong></p>
      </div>
    </div>
  `;
}
