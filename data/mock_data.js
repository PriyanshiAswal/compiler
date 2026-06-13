const sampleComments = [
  'Trainer explained concepts clearly.',
  'Need more hands-on sessions.',
  'Excellent content.',
  'Lab duration should be increased.',
  'Slides and examples were very useful.',
  'Pace was fast in the advanced section.',
  'Good trainer engagement and Q&A.',
  'Infrastructure can be improved for better practice.'
];

const docNames = [
  'Leave Policy.pdf',
  'Attendance Guidelines.pdf',
  'Cybersecurity Policy.pdf',
  'Training Manual.pdf',
  'Onboarding Checklist.docx',
  'Code of Conduct.pdf',
  'Expense Reimbursement.docx',
  'Remote Work Policy.pdf',
  'Data Privacy Handbook.pdf',
  'IT Support SOP.docx'
];

export const documents = docNames.map((name, index) => ({
  id: index + 1,
  name,
  type: name.endsWith('.pdf') ? 'PDF' : 'DOCX',
  department: ['HR', 'Operations', 'IT', 'Admin'][index % 4],
  uploadedAt: `2026-${String((index % 6) + 1).padStart(2, '0')}-${String((index % 27) + 1).padStart(2, '0')}`,
  sizeKb: 180 + index * 22,
  summary: `Reference document for ${name.replace(/\.(pdf|docx)$/i, '').toLowerCase()}.`
}));

export const trainingBatches = [
  { id: 'BATCH-A', name: 'Batch A - Office Productivity' },
  { id: 'BATCH-B', name: 'Batch B - Cyber Hygiene' },
  { id: 'BATCH-C', name: 'Batch C - Leadership Basics' },
  { id: 'BATCH-D', name: 'Batch D - Communication Skills' },
  { id: 'BATCH-E', name: 'Batch E - Data Practices' }
];

export const trainers = [
  'A. Sharma',
  'P. Nair',
  'K. Singh',
  'R. Gupta',
  'M. Iyer',
  'T. Das',
  'N. Verma',
  'D. Joseph',
  'S. Rao',
  'V. Mehta'
];

export const feedbackRecords = Array.from({ length: 100 }, (_, i) => {
  const batch = trainingBatches[i % trainingBatches.length];
  const month = (i % 6) + 1;
  const contentQuality = ((i * 3) % 5) + 1;
  const trainerEffectiveness = ((i * 2 + 1) % 5) + 1;
  const practicalSessions = ((i * 4 + 2) % 5) + 1;
  const infrastructure = ((i * 5 + 3) % 5) + 1;

  return {
    id: i + 1,
    batchId: batch.id,
    batchName: batch.name,
    trainerName: trainers[i % trainers.length],
    date: `2026-${String(month).padStart(2, '0')}-${String((i % 28) + 1).padStart(2, '0')}`,
    ratings: {
      contentQuality,
      trainerEffectiveness,
      practicalSessions,
      infrastructure
    },
    comment: sampleComments[i % sampleComments.length]
  };
});

export const activities = [
  'Uploaded new Training Manual.pdf',
  'Generated monthly feedback summary',
  'Batch B performance report viewed',
  'Office policy documents refreshed',
  'Feedback trends reviewed by operations team'
];
