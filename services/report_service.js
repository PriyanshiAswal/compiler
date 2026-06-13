export const reportService = {
  list() {
    return [
      {
        id: 1,
        title: 'Monthly Report',
        period: 'June 2026',
        summary: 'Attendance, feedback trends, and document updates snapshot.'
      },
      {
        id: 2,
        title: 'Batch Performance Report',
        period: 'Q2 2026',
        summary: 'Comparative quality and trainer effectiveness by batch.'
      },
      {
        id: 3,
        title: 'Feedback Summary Report',
        period: 'Last 100 records',
        summary: 'Strength clusters and improvement opportunities from training feedback.'
      }
    ];
  },
  download(reportId) {
    return `Demo download triggered for report #${reportId}.`;
  }
};
