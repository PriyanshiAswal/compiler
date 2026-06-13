import { feedbackRecords, trainingBatches } from '../data/mock_data.js';

const dims = ['contentQuality', 'trainerEffectiveness', 'practicalSessions', 'infrastructure'];

function average(list, key) {
  if (!list.length) return 0;
  return list.reduce((sum, item) => sum + item.ratings[key], 0) / list.length;
}

export const feedbackService = {
  list() {
    return feedbackRecords;
  },
  averageRatings() {
    return dims.reduce((acc, key) => {
      acc[key] = Number(average(feedbackRecords, key).toFixed(2));
      return acc;
    }, {});
  },
  averageSatisfaction() {
    const all = feedbackRecords.flatMap((f) => Object.values(f.ratings));
    return Number((all.reduce((a, b) => a + b, 0) / all.length).toFixed(2));
  },
  batchWiseRatings() {
    return trainingBatches.map((batch) => {
      const records = feedbackRecords.filter((f) => f.batchId === batch.id);
      const score = records.length
        ? records.reduce((sum, r) => sum + Object.values(r.ratings).reduce((a, b) => a + b, 0) / 4, 0) / records.length
        : 0;
      return { label: batch.name.replace(' - ', ': '), value: Number(score.toFixed(2)) };
    });
  },
  sentimentSummary() {
    let positive = 0;
    let negative = 0;
    feedbackRecords.forEach((record) => {
      const avg = Object.values(record.ratings).reduce((a, b) => a + b, 0) / 4;
      if (avg >= 3.5) positive += 1;
      else negative += 1;
    });
    return { positive, negative };
  },
  monthlyStats() {
    const counts = Array.from({ length: 6 }, (_, i) => ({ month: `2026-${String(i + 1).padStart(2, '0')}`, trainings: 0, feedback: 0 }));
    feedbackRecords.forEach((record) => {
      const m = Number(record.date.slice(5, 7)) - 1;
      if (counts[m]) counts[m].feedback += 1;
    });
    counts.forEach((entry, idx) => {
      entry.trainings = 4 + (idx % 3);
    });
    return counts;
  },
  executiveSummary() {
    return 'Training performance remained stable with strong trainer communication and content quality. Repeated themes suggest adding more practical sessions, examples, and longer lab windows to improve hands-on confidence.';
  }
};
