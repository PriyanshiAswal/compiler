const canned = {
  leave: 'The leave policy allows casual and earned leaves with manager approval. Emergency leave can be requested directly through HR.',
  attendance: 'Attendance rules require check-in by 9:30 AM, with a grace window of 15 minutes and mandatory weekly timesheet updates.',
  cybersecurity: 'Cybersecurity guidelines recommend strong passwords, monthly updates, restricted USB usage, and immediate incident reporting.',
  complaints: 'Most repeated complaints were limited practical exposure, fewer real examples, and short lab durations.',
  compare: 'Batch A scored higher in trainer effectiveness, while Batch B performed better in practical sessions after week three.',
  suggestions: 'Most common suggestions were to increase lab time, include more real case studies, and add recap quizzes.'
};

function mapQuery(query = '') {
  const q = query.toLowerCase();
  if (q.includes('leave')) return canned.leave;
  if (q.includes('attendance')) return canned.attendance;
  if (q.includes('cyber')) return canned.cybersecurity;
  if (q.includes('complaint') || q.includes('repeated')) return canned.complaints;
  if (q.includes('compare')) return canned.compare;
  if (q.includes('suggestion')) return canned.suggestions;
  if (q.includes('batch a')) return 'Batch A maintained an overall average rating of 3.2/5 with high trainer communication scores.';
  return 'Demo assistant response: this prototype uses mock answers and is ready for future local LLM + RAG integration.';
}

export const chatService = {
  askDocumentQuestion(question) {
    return mapQuery(question);
  },
  askAssistant(question) {
    return mapQuery(question);
  }
};
