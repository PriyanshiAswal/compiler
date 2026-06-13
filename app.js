import { renderSidebar } from './components/sidebar.js';
import { renderDashboard } from './dashboard/dashboard.js';
import { renderDocuments } from './documents/documents.js';
import { renderFeedback } from './feedback/feedback.js';
import { renderChatbot } from './chatbot/chatbot.js';
import { renderReports } from './reports/reports.js';
import { renderSettings } from './settings/settings.js';

const appRoot = document.getElementById('app');
const sidebarRoot = document.getElementById('sidebar');

const routes = {
  Dashboard: renderDashboard,
  Documents: renderDocuments,
  'Feedback Analysis': renderFeedback,
  'AI Assistant': renderChatbot,
  Reports: renderReports,
  Settings: renderSettings
};

let currentPage = 'Dashboard';

function renderApp() {
  renderSidebar(sidebarRoot, currentPage, (nextPage) => {
    currentPage = nextPage;
    renderApp();
  });
  routes[currentPage](appRoot);
}

renderApp();
