# Quick Draft Implementation Template

## Copy-Paste Template for All Pages

### Step 1: Add Imports (Top of file)
```javascript
// ADD these to existing imports:
import { useState, useEffect } from 'react'; // Add useEffect if not present
import { saveDraft, generateDraftId, getCurrentPageData } from '../utils/draftManager';
```

### Step 2: Add Draft State (After other useState declarations)
```javascript
const [draftId, setDraftId] = useState(null);

// Initialize or get draft ID
useEffect(() => {
  const currentDraftId = sessionStorage.getItem('current_draft_id');
  if (currentDraftId) {
    setDraftId(currentDraftId);
  } else {
    const newDraftId = generateDraftId();
    setDraftId(newDraftId);
    sessionStorage.setItem('current_draft_id', newDraftId);
  }
}, []);
```

### Step 3: Add Save Handler (Before return statement)
```javascript
const handleSaveAsDraft = () => {
  if (!draftId) return;

  const draftData = {
    id: draftId,
    category: 'CHANGE_ME', // 'medis', 'pendidikan', 'sosial', 'kreatif'
    title: 'CHANGE_ME', // e.g., 'Draft Bantuan Medis'
    image: photoPreview || null, // Use photo if available
    progress: XX, // Calculate: (current_step / total_steps) * 100
    steps: 'X dari Y tahap', // e.g., '3 dari 7 tahap'
    lastStep: 'CHANGE_ME', // Current page route, e.g., '/target-donasi'
    target: previousData.targetData?.amount || 0,
    daysLeft: previousData.targetData?.duration || 0,
    formData: {
      ...previousData,
      // Add current page data here
    },
    storyData: getCurrentPageData('CHANGE_ME') // 'medis', 'pendidikan', 'sosial', 'kreatif'
  };

  const saved = saveDraft(draftData);
  if (saved) {
    alert('Draft berhasil disimpan! Anda dapat melanjutkannya nanti dari Dashboard.');
    navigate('/dashboard');
  } else {
    alert('Gagal menyimpan draft. Silakan coba lagi.');
  }
};
```

### Step 4: Add Button JSX (Before closing </div> of main content)
```javascript
{/* Save as Draft Button */}
<div className="draft-save-section">
  <button className="draft-save-btn" onClick={handleSaveAsDraft}>
    <svg className="draft-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z" strokeLinecap="round" strokeLinejoin="round"/>
      <polyline points="17 21 17 13 7 13 7 21" strokeLinecap="round" strokeLinejoin="round"/>
      <polyline points="7 3 7 8 15 8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
    Simpan Sebagai Draft
  </button>
  <p className="draft-save-hint">Simpan progress Anda dan lanjutkan nanti dari Dashboard</p>
</div>
```

## Page-Specific Configuration

### Medical Category (`medis`)
| Page | Step | Progress | Route |
|------|------|----------|-------|
| BantuanMedis.js | 1/7 | 14% | `/bantuan-medis` |
| DetailPasien.js | 2/7 | 29% | `/detail-pasien` |
| PatientName.js | 3/7 | 43% | `/nama-pasien` |
| RiwayatMedis.js | 3/7 | 43% | `/riwayat-medis` |
| TargetDonasi.js | 4/7 | 57% | `/target-donasi` |
| JudulKampanye.js | 5/7 | 71% | `/judul-kampanye` |
| TulisCerita*.js | 6/7 | 86% | `/tulis-cerita-X` |

### Education Category (`pendidikan`)
| Page | Step | Progress | Route |
|------|------|----------|-------|
| TujuanDetailPendidikan.js | 1/6 | 17% | `/tujuan-detail-pendidikan` |
| PenerimaPendidikan.js | 2/6 | 33% | `/penerima-pendidikan` |
| TargetDonasiPendidikan.js | 3/6 | 50% | `/target-donasi-pendidikan` |
| JudulKampanyePendidikan.js ✅ | 4/6 | 67% | `/judul-kampanye-pendidikan` |
| TulisCeritaPendidikan*.js | 5/6 | 83% | `/tulis-cerita-pendidikan-X` |

### Social Category (`sosial`)
| Page | Step | Progress | Route |
|------|------|----------|-------|
| TujuanDetailSosial.js | 1/6 | 17% | `/tujuan-detail-sosial` |
| PenerimaSosial.js | 2/6 | 33% | `/penerima-sosial` |
| TargetDonasiSosial.js | 3/6 | 50% | `/target-donasi-sosial` |
| JudulKampanyeSosial.js | 4/6 | 67% | `/judul-kampanye-sosial` |
| TulisCeritaSosial*.js | 5/6 | 83% | `/tulis-cerita-sosial-X` |

### Creative Category (`kreatif`)
| Page | Step | Progress | Route |
|------|------|----------|-------|
| TujuanDetailKreatif.js | 1/6 | 17% | `/tujuan-detail-kreatif` |
| PenerimaKreatif.js | 2/6 | 33% | `/penerima-kreatif` |
| TargetDonasiKreatif.js | 3/6 | 50% | `/target-donasi-kreatif` |
| JudulKampanyeKreatif.js | 4/6 | 67% | `/judul-kampanye-kreatif` |
| TulisCeritaKreatif*.js | 5/6 | 83% | `/tulis-cerita-kreatif-X` |

## Example: DetailPasien.js (Medical - Step 2)

```javascript
// 1. Imports
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { saveDraft, generateDraftId, getCurrentPageData } from '../utils/draftManager';

const DetailPasien = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // 2. Draft State
  const [draftId, setDraftId] = useState(null);

  useEffect(() => {
    const currentDraftId = sessionStorage.getItem('current_draft_id');
    if (currentDraftId) {
      setDraftId(currentDraftId);
    } else {
      const newDraftId = generateDraftId();
      setDraftId(newDraftId);
      sessionStorage.setItem('current_draft_id', newDraftId);
    }
  }, []);

  // ... existing code ...

  // 3. Save Handler
  const handleSaveAsDraft = () => {
    if (!draftId) return;

    const draftData = {
      id: draftId,
      category: 'medis',
      title: 'Draft Bantuan Medis',
      image: null,
      progress: 29,
      steps: '2 dari 7 tahap',
      lastStep: '/detail-pasien',
      target: 0,
      daysLeft: 0,
      formData: {
        ...location.state,
        // Add current form data
      },
      storyData: getCurrentPageData('medis')
    };

    const saved = saveDraft(draftData);
    if (saved) {
      alert('Draft berhasil disimpan! Anda dapat melanjutkannya nanti dari Dashboard.');
      navigate('/dashboard');
    }
  };

  // 4. In JSX, add button before closing </div>
  return (
    <div className="container">
      {/* ... existing content ... */}

      {/* Save as Draft Button */}
      <div className="draft-save-section">
        <button className="draft-save-btn" onClick={handleSaveAsDraft}>
          <svg className="draft-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z" strokeLinecap="round" strokeLinejoin="round"/>
            <polyline points="17 21 17 13 7 13 7 21" strokeLinecap="round" strokeLinejoin="round"/>
            <polyline points="7 3 7 8 15 8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Simpan Sebagai Draft
        </button>
        <p className="draft-save-hint">Simpan progress Anda dan lanjutkan nanti dari Dashboard</p>
      </div>
    </div>
  );
};
```

## Files Already Completed ✅
- JudulKampanyePendidikan.js
- BantuanMedis.js

## Quick Reference for Story Pages
Story pages (TulisCerita*.js) are step 6 for most categories. For these, set:
- Progress: 86%
- Steps: '6 dari 7 tahap' (or '5 dari 6 tahap' for education/social/creative)
- Include story content from localStorage in storyData

## Testing Checklist per Page
1. [ ] Click "Simpan Sebagai Draft" button
2. [ ] Verify redirect to Dashboard
3. [ ] See draft with correct title and progress
4. [ ] Click "Lanjutkan" button
5. [ ] Verify return to same page
6. [ ] Form data is preserved
