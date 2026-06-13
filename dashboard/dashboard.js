import { documents, trainingBatches, activities } from '../data/mock_data.js';
import { feedbackService } from '../services/feedback_service.js';
import { renderBars, renderPie, renderTrend } from '../utils/charts.js';

export function renderDashboard(container) {
  const sentiment = feedbackService.sentimentSummary();
  const avgSatisfaction = feedbackService.averageSatisfaction();

  container.innerHTML = `
    <div class="grid cards">
      <article class="card"><h3>Total Documents</h3><div class="metric">${documents.length}</div></article>
      <article class="card"><h3>Total Feedback Records</h3><div class="metric">${feedbackService.list().length}</div></article>
      <article class="card"><h3>Total Training Batches</h3><div class="metric">${trainingBatches.length}</div></article>
      <article class="card"><h3>Average Satisfaction Score</h3><div class="metric">${avgSatisfaction}/5</div></article>
    </div>

    <div class="grid" style="margin-top:1rem">
      <div class="card">
        <h3>Batch-wise Ratings</h3>
        <div id="batch-rating-chart"></div>
      </div>
      <div class="two-col">
        <div class="card">
          <h3>Positive vs Negative Feedback</h3>
          <div id="sentiment-chart"></div>
        </div>
        <div class="card">
          <h3>Monthly Training Statistics</h3>
          <div id="monthly-chart"></div>
        </div>
      </div>
      <div class="card">
        <h3>Recent Activities</h3>
        <ul class="list">${activities.map((item) => `<li>${item}</li>`).join('')}</ul>
      </div>
    </div>
  `;

  renderBars(container.querySelector('#batch-rating-chart'), feedbackService.batchWiseRatings(), 5);
  renderPie(container.querySelector('#sentiment-chart'), [
    { label: 'Positive', value: sentiment.positive },
    { label: 'Negative', value: sentiment.negative }
  ]);
  renderTrend(container.querySelector('#monthly-chart'), feedbackService.monthlyStats(), 'feedback', 25);
}
