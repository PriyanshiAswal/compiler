import { reportService } from '../services/report_service.js';

export function renderReports(container) {
  const reports = reportService.list();

  container.innerHTML = `
    <div class="grid cards">
      ${reports
        .map(
          (report) => `
        <article class="card">
          <h3>${report.title}</h3>
          <p class="kicker">${report.period}</p>
          <p>${report.summary}</p>
          <div class="actions">
            <button class="secondary" data-preview="${report.id}">Preview</button>
            <button data-download="${report.id}">Download PDF</button>
          </div>
          <div id="report-msg-${report.id}" class="kicker" style="margin-top:0.5rem"></div>
        </article>
      `
        )
        .join('')}
    </div>
  `;

  container.querySelectorAll('[data-preview]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = Number(btn.dataset.preview);
      const cardMsg = container.querySelector(`#report-msg-${id}`);
      cardMsg.textContent = 'Preview opened (demo): visual report card and summary shown.';
    });
  });

  container.querySelectorAll('[data-download]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = Number(btn.dataset.download);
      const cardMsg = container.querySelector(`#report-msg-${id}`);
      cardMsg.textContent = reportService.download(id);
    });
  });
}
