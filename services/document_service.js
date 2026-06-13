import { documents as seedDocs } from '../data/mock_data.js';

let docs = [...seedDocs];
let nextId = docs.length + 1;

export const documentService = {
  list() {
    return docs;
  },
  search(query) {
    const q = query.trim().toLowerCase();
    if (!q) return docs;
    return docs.filter((d) => d.name.toLowerCase().includes(q) || d.department.toLowerCase().includes(q));
  },
  upload(fileName) {
    if (!fileName) return null;
    const type = fileName.toLowerCase().endsWith('.docx') ? 'DOCX' : 'PDF';
    const item = {
      id: nextId++,
      name: fileName,
      type,
      department: 'General',
      uploadedAt: new Date().toISOString().slice(0, 10),
      sizeKb: 220,
      summary: 'Newly uploaded document (demo placeholder).'
    };
    docs = [item, ...docs];
    return item;
  },
  remove(id) {
    docs = docs.filter((d) => d.id !== id);
  },
  getById(id) {
    return docs.find((d) => d.id === id) || null;
  }
};
