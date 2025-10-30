# Draft Save Feature - Implementation Guide

## Overview
The "Simpan Sebagai Draft" (Save as Draft) feature allows users to save their campaign progress at any point and resume later from the Dashboard. This guide explains how to implement this feature on any campaign creation page.

## Architecture

### Components Created:
1. **draftManager.js** (`src/utils/draftManager.js`) - Utility functions for draft management
2. **Dashboard.js** - Updated to show and manage drafts
3. **App.css** - Added draft button styling (`.draft-save-section`, `.draft-save-btn`)

## How to Implement on a Page

### Step 1: Import Required Dependencies

```javascript
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { saveDraft, generateDraftId, getCurrentPageData } from '../utils/draftManager';
```

### Step 2: Add Draft ID State

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

### Step 3: Create Save Draft Handler

```javascript
const handleSaveAsDraft = () => {
  if (!draftId) return;

  const draftData = {
    id: draftId,
    category: 'pendidikan', // Change to: 'medis', 'sosial', 'kreatif', etc.
    title: campaignTitle || 'Draft Bantuan Pendidikan',
    image: photoPreview || null,
    progress: 57, // Calculate based on current step (e.g., 4/6 = 67%)
    steps: '4 dari 6 tahap', // Update based on your flow
    lastStep: '/judul-kampanye-pendidikan', // Current page route
    target: previousData.targetData?.amount || 0,
    daysLeft: previousData.targetData?.duration || 0,
    formData: {
      ...previousData,
      // Add current page data
      kampanyeData: {
        campaignTitle,
        campaignUrl,
        selectedPhoto: photoPreview
      }
    },
    storyData: getCurrentPageData('pendidikan') // 'medis', 'sosial', 'kreatif'
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

### Step 4: Add Draft Button to JSX

Place this **after** the bottom navigation, before the closing `</div>`:

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

## Category Configuration

### Medical (`medis`)
- localStorage keys: `cerita_part1`, `cerita_part2_section1`, etc.
- Example last steps: `/nama-pasien`, `/target-donasi`, `/judul-kampanye`

### Education (`pendidikan`)
- localStorage keys: `ceritaPendidikan_part1`, `ceritaPendidikan_part2`, etc.
- Example last steps: `/tujuan-detail-pendidikan`, `/target-donasi-pendidikan`, `/judul-kampanye-pendidikan`

### Social (`sosial`)
- localStorage keys: `ceritaSosial_part1`, `ceritaSosial_part2`, etc.
- Example last steps: `/tujuan-detail-sosial`, `/target-donasi-sosial`, `/judul-kampanye-sosial`

### Creative (`kreatif`)
- localStorage keys: `ceritaKreatif_part1`, `ceritaKreatif_part2`, etc.
- Example last steps: `/detail-karya`, `/target-donasi-kreatif`, `/judul-kampanye-kreatif`

## Progress Calculation

Calculate progress based on current step:
- Step 1/6 = 17% progress
- Step 2/6 = 33% progress
- Step 3/6 = 50% progress
- Step 4/6 = 67% progress
- Step 5/6 = 83% progress
- Step 6/6 = 100% progress

## Dashboard Integration

The Dashboard automatically:
1. Loads all drafts from localStorage on mount
2. Displays drafts with "Belum Jadi" status
3. Shows "Lanjutkan" button for drafts
4. Allows users to delete drafts
5. Restores draft ID in sessionStorage when continuing

## User Flow

1. User fills out campaign form
2. User clicks "Simpan Sebagai Draft"
3. Draft is saved to localStorage
4. User is redirected to Dashboard
5. Draft appears in "Belum Jadi" filter
6. User clicks "Lanjutkan" to resume
7. User continues from the last saved step

## Example Implementation

See **JudulKampanyePendidikan.js** for a complete example implementation.

## Pages to Implement (TODO)

### Medical Campaign
- [ ] BantuanMedis.js
- [ ] DetailPasien.js
- [ ] PatientName.js
- [ ] RiwayatMedis.js
- [ ] TargetDonasi.js
- [ ] JudulKampanye.js
- [ ] TulisCerita.js through TulisCerita6.js

### Education Campaign
- [x] JudulKampanyePendidikan.js (COMPLETED - Example)
- [ ] TujuanDetailPendidikan.js
- [ ] PenerimaPendidikan.js
- [ ] TargetDonasiPendidikan.js
- [ ] TulisCeritaPendidikan.js through TulisCeritaPendidikan6.js

### Social Campaign
- [ ] TujuanDetailSosial.js
- [ ] PenerimaSosial.js
- [ ] TargetDonasiSosial.js
- [ ] JudulKampanyeSosial.js
- [ ] TulisCeritaSosial.js through TulisCeritaSosial6.js

### Creative Campaign
- [ ] DetailKarya.js
- [ ] TargetDonasiKreatif.js
- [ ] JudulKampanyeKreatif.js
- [ ] TulisCeritaKreatif.js through TulisCeritaKreatif6.js

## Testing Checklist

- [ ] Save draft from different pages
- [ ] Verify draft appears in Dashboard
- [ ] Resume draft and verify data is restored
- [ ] Delete draft from Dashboard
- [ ] Save multiple drafts and verify they all appear
- [ ] Test with different categories (medis, pendidikan, sosial, kreatif)
- [ ] Verify progress calculation is correct
- [ ] Test on mobile devices

## Notes

- All CSS styling is already in `App.css`
- Draft manager utility is ready to use
- Dashboard is fully integrated and working
- localStorage is used for persistence
- sessionStorage tracks the current draft being edited
