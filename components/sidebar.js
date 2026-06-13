const pages = ['Dashboard', 'Documents', 'Feedback Analysis', 'AI Assistant', 'Reports', 'Settings'];

export function renderSidebar(container, activePage, onChange) {
  container.innerHTML = `
    <nav class="sidebar">
      <h2>Navigation</h2>
      ${pages
        .map(
          (page) =>
            `<button class="nav-btn ${activePage === page ? 'active' : ''}" data-page="${page}">${page}</button>`
        )
        .join('')}
    </nav>
  `;

  container.querySelectorAll('.nav-btn').forEach((btn) => {
    btn.addEventListener('click', () => onChange(btn.dataset.page));
  });
}
