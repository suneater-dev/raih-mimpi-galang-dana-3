// Draft Manager Utility
// Manages campaign drafts in localStorage with real-time updates

export const DRAFT_STORAGE_KEY = 'campaign_drafts';

// Generate unique draft ID
export const generateDraftId = () => {
  return `draft_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

// Get all drafts
export const getAllDrafts = () => {
  try {
    const drafts = localStorage.getItem(DRAFT_STORAGE_KEY);
    return drafts ? JSON.parse(drafts) : [];
  } catch (error) {
    console.error('Error getting drafts:', error);
    return [];
  }
};

// Save or update draft
export const saveDraft = (draftData) => {
  try {
    const drafts = getAllDrafts();
    const existingIndex = drafts.findIndex(d => d.id === draftData.id);

    const draft = {
      ...draftData,
      lastModified: new Date().toISOString(),
    };

    if (existingIndex >= 0) {
      // Update existing draft
      drafts[existingIndex] = draft;
    } else {
      // Add new draft
      drafts.push(draft);
    }

    localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(drafts));
    return draft;
  } catch (error) {
    console.error('Error saving draft:', error);
    return null;
  }
};

// Get draft by ID
export const getDraftById = (draftId) => {
  try {
    const drafts = getAllDrafts();
    return drafts.find(d => d.id === draftId) || null;
  } catch (error) {
    console.error('Error getting draft:', error);
    return null;
  }
};

// Delete draft
export const deleteDraft = (draftId) => {
  try {
    const drafts = getAllDrafts();
    const filteredDrafts = drafts.filter(d => d.id !== draftId);
    localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(filteredDrafts));
    return true;
  } catch (error) {
    console.error('Error deleting draft:', error);
    return false;
  }
};

// Get current page data from localStorage based on category
export const getCurrentPageData = (category) => {
  const data = {};

  switch(category) {
    case 'medis':
      data.part1 = localStorage.getItem('cerita_part1') || '';
      data.part2_section1 = localStorage.getItem('cerita_part2_section1') || '';
      data.part2_section2 = localStorage.getItem('cerita_part2_section2') || '';
      data.part3 = localStorage.getItem('cerita_part3') || '';
      data.part3_photo = localStorage.getItem('cerita_part3_photo') || '';
      data.part4 = localStorage.getItem('cerita_part4') || '';
      data.part4_photo = localStorage.getItem('cerita_part4_photo') || '';
      data.part5_section1 = localStorage.getItem('cerita_part5_section1') || '';
      data.part5_section2 = localStorage.getItem('cerita_part5_section2') || '';
      data.part6 = localStorage.getItem('cerita_part6') || '';
      break;

    case 'pendidikan':
      data.part1 = localStorage.getItem('ceritaPendidikan_part1') || '';
      data.part2 = localStorage.getItem('ceritaPendidikan_part2') || '';
      data.part3 = localStorage.getItem('ceritaPendidikan_part3') || '';
      data.part4 = localStorage.getItem('ceritaPendidikan_part4') || '';
      data.part5 = localStorage.getItem('ceritaPendidikan_part5') || '';
      data.part6 = localStorage.getItem('ceritaPendidikan_part6') || '';
      break;

    case 'sosial':
      data.part1 = localStorage.getItem('ceritaSosial_part1') || '';
      data.part2 = localStorage.getItem('ceritaSosial_part2') || '';
      data.part3 = localStorage.getItem('ceritaSosial_part3') || '';
      data.part4 = localStorage.getItem('ceritaSosial_part4') || '';
      data.part5 = localStorage.getItem('ceritaSosial_part5') || '';
      data.part6 = localStorage.getItem('ceritaSosial_part6') || '';
      break;

    case 'kreatif':
      data.part1 = localStorage.getItem('ceritaKreatif_part1') || '';
      data.part2 = localStorage.getItem('ceritaKreatif_part2') || '';
      data.part3 = localStorage.getItem('ceritaKreatif_part3') || '';
      data.part4 = localStorage.getItem('ceritaKreatif_part4') || '';
      data.part5 = localStorage.getItem('ceritaKreatif_part5') || '';
      data.part6 = localStorage.getItem('ceritaKreatif_part6') || '';
      break;

    default:
      break;
  }

  return data;
};

// Format date for display
export const formatDraftDate = (isoString) => {
  const date = new Date(isoString);
  const now = new Date();
  const diffMs = now - date;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'Baru saja';
  if (diffMins < 60) return `${diffMins} menit yang lalu`;
  if (diffHours < 24) return `${diffHours} jam yang lalu`;
  if (diffDays < 7) return `${diffDays} hari yang lalu`;

  return date.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
};
