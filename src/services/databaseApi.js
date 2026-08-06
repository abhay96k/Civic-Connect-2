/**
 * RoadVision AI - Live Database API Service
 * Integrates Supabase Realtime DB with Fallback Local Storage Sync for Potholes & Accounts.
 */

import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://demo-civic-connect.supabase.co';
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || 'demo-anon-key';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const LOCAL_STORAGE_KEY = 'roadvision_potholes_db';

// Default initial data if database is empty
const INITIAL_REPORTS = [
  {
    id: 'REP-1001',
    title: 'Severe Deep Crater on MG Road',
    location: 'Sector 4, MG Road, Ward 12',
    lat: 18.5204,
    lng: 73.8567,
    severity: 'Critical',
    depth: '14.2 cm',
    status: 'In Repair',
    contractor: 'Apex Infra Ltd.',
    reportedBy: 'citizen@roadvision.ai',
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    aiConfidence: '98.6%',
  },
  {
    id: 'REP-1002',
    title: 'Asphalt Fissure near Station Square',
    location: 'Station Road, North Exit',
    lat: 18.5285,
    lng: 73.8742,
    severity: 'High',
    depth: '8.5 cm',
    status: 'Reported',
    contractor: 'Unassigned',
    reportedBy: 'user@civic.org',
    timestamp: new Date(Date.now() - 7200000).toISOString(),
    aiConfidence: '94.2%',
  },
  {
    id: 'REP-1003',
    title: 'Highway 102 Pothole Cluster',
    location: 'Highway 102, Flyover Pillar #14',
    lat: 18.5089,
    lng: 73.8245,
    severity: 'Moderate',
    depth: '5.1 cm',
    status: 'Resolved',
    contractor: 'City Road Works',
    reportedBy: 'cctv-ai-bot@police.gov',
    timestamp: new Date(Date.now() - 86400000).toISOString(),
    aiConfidence: '99.1%',
  },
];

// Initialize local database
function getLocalDb() {
  const existing = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (!existing) {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(INITIAL_REPORTS));
    return INITIAL_REPORTS;
  }
  try {
    return JSON.parse(existing);
  } catch (e) {
    return INITIAL_REPORTS;
  }
}

function saveLocalDb(data) {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
}

// FETCH ALL POTHOLES (API)
export async function fetchPotholesApi() {
  try {
    const { data, error } = await supabase
      .from('pothole_reports')
      .select('*')
      .order('timestamp', { ascending: false });

    if (error || !data || data.length === 0) {
      return getLocalDb();
    }
    return data;
  } catch (err) {
    return getLocalDb();
  }
}

// CREATE NEW POTHOLE REPORT (API)
export async function createPotholeReportApi(reportData) {
  const newReport = {
    id: `REP-${Math.floor(1000 + Math.random() * 9000)}`,
    timestamp: new Date().toISOString(),
    status: 'Reported',
    contractor: 'Pending Allocation',
    aiConfidence: '96.5%',
    ...reportData,
  };

  try {
    const { data, error } = await supabase
      .from('pothole_reports')
      .insert([newReport])
      .select();

    if (error) throw error;
    return data ? data[0] : newReport;
  } catch (err) {
    // Local fallback
    const current = getLocalDb();
    const updated = [newReport, ...current];
    saveLocalDb(updated);
    return newReport;
  }
}

// UPDATE POTHOLE STATUS (API)
export async function updatePotholeStatusApi(reportId, newStatus, contractorName = null) {
  try {
    const updatePayload = { status: newStatus };
    if (contractorName) updatePayload.contractor = contractorName;

    const { data, error } = await supabase
      .from('pothole_reports')
      .update(updatePayload)
      .eq('id', reportId)
      .select();

    if (error) throw error;
  } catch (err) {
    // Local fallback
    const current = getLocalDb();
    const updated = current.map((r) =>
      r.id === reportId ? { ...r, status: newStatus, ...(contractorName ? { contractor: contractorName } : {}) } : r
    );
    saveLocalDb(updated);
  }
}

// SUBSCRIBE TO REALTIME UPDATES
export function subscribeToPotholesRealtime(onUpdate) {
  const channel = supabase
    .channel('pothole_live_changes')
    .on(
      'postgres_changes',
      { event: '*', schema: 'public', table: 'pothole_reports' },
      (payload) => {
        onUpdate(payload);
      }
    )
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
}
