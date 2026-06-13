export function renderBars(container, items, max = 5) {
  container.innerHTML = `<div class="chart-bars">${items
    .map(
      (item) => `
      <div class="bar-row">
        <div class="kicker">${item.label}: <strong>${item.value}</strong></div>
        <div class="bar"><span style="width:${Math.min((item.value / max) * 100, 100)}%"></span></div>
      </div>`
    )
    .join('')}</div>`;
}

export function renderPie(container, items) {
  const total = items.reduce((sum, i) => sum + i.value, 0) || 1;
  let current = 0;
  const colors = ['#2e7d32', '#7dbb81', '#b4dcb7', '#e4f2e5'];
  const parts = items
    .map((item, idx) => {
      const start = (current / total) * 360;
      current += item.value;
      const end = (current / total) * 360;
      return `${colors[idx % colors.length]} ${start}deg ${end}deg`;
    })
    .join(', ');

  container.innerHTML = `
    <div class="pie" style="background: conic-gradient(${parts})"></div>
    <div class="legend">
      ${items
        .map(
          (item, idx) => `<div class="legend-item"><span class="dot" style="background:${colors[idx % colors.length]}"></span>${item.label}: ${item.value}</div>`
        )
        .join('')}
    </div>
  `;
}

export function renderTrend(container, points, valueKey, max = 100) {
  const width = 520;
  const height = 170;
  const pad = 18;
  const step = points.length > 1 ? (width - pad * 2) / (points.length - 1) : 0;

  const coords = points
    .map((p, idx) => {
      const x = pad + idx * step;
      const y = height - pad - (p[valueKey] / max) * (height - pad * 2);
      return `${x},${y}`;
    })
    .join(' ');

  container.innerHTML = `
    <svg viewBox="0 0 ${width} ${height}" class="line-chart" role="img" aria-label="Trend chart">
      <polyline fill="none" stroke="#2e7d32" stroke-width="3" points="${coords}" />
      ${points
        .map((p, idx) => {
          const x = pad + idx * step;
          const y = height - pad - (p[valueKey] / max) * (height - pad * 2);
          return `<circle cx="${x}" cy="${y}" r="3.2" fill="#2e7d32" />`;
        })
        .join('')}
    </svg>
    <div class="kicker">${points.map((p) => `${p.month}: ${p[valueKey]}`).join(' · ')}</div>
  `;
}
