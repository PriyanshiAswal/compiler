import { feedbackService } from '../services/feedback_service.js';
import { renderBars, renderPie, renderTrend } from '../utils/charts.js';

export function renderFeedback(container) {
  const averages = feedbackService.averageRatings();
  const sentiment = feedbackService.sentimentSummary();

  container.innerHTML = `
    <div class="grid">
      <div class="card">
        <h3>Average Ratings (1-5)</h3>
        <div class="grid cards">
          <article class="card"><h4>Content Quality</h4><div class="metric">${averages.contentQuality}</div></article>
          <article class="card"><h4>Trainer Effectiveness</h4><div class="metric">${averages.trainerEffectiveness}</div></article>
          <article class="card"><h4>Practical Sessions</h4><div class="metric">${averages.practicalSessions}</div></article>
          <article class="card"><h4>Infrastructure</h4><div class="metric">${averages.infrastructure}</div></article>
        </div>
      </div>

      <div class="two-col">
        <div class="card">
          <h3>Batch Rating Distribution</h3>
          <div id="feedback-bar"></div>
        </div>
        <div class="card">
          <h3>Feedback Sentiment Split</h3>
          <div id="feedback-pie"></div>
        </div>
      </div>

      <div class="card">
        <h3>Trend Chart (Monthly Feedback Volume)</h3>
        <div id="feedback-trend"></div>
      </div>

      <div class="two-col">
        <div class="card">
          <h3>Top Strengths</h3>
          <ul class="list">
            <li>Trainer communication</li>
            <li>Content quality</li>
          </ul>
        </div>
        <div class="card">
          <h3>Improvement Areas</h3>
          <ul class="list">
            <li>Practical sessions</li>
            <li>More examples</li>
            <li>Longer labs</li>
          </ul>
        </div>
      </div>

      <div class="card">
        <h3>Executive Summary</h3>
        <p>${feedbackService.executiveSummary()}</p>
      </div>
    </div>
  `;

  renderBars(container.querySelector('#feedback-bar'), feedbackService.batchWiseRatings(), 5);
  renderPie(container.querySelector('#feedback-pie'), [
    { label: 'Positive', value: sentiment.positive },
    { label: 'Negative', value: sentiment.negative }
  ]);
  renderTrend(container.querySelector('#feedback-trend'), feedbackService.monthlyStats(), 'feedback', 25);
}
