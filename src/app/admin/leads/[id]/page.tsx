"use client";

import React, { useState, useEffect, useCallback, use } from 'react';
import Link from 'next/link';
import { ChevronLeft, User, Phone, MapPin, Calendar, Clock, Laptop, Link as LinkIcon, Edit, MessageSquare, Plus, CheckCircle, ArrowRight } from 'lucide-react';

export default function LeadDetailsPage(props: { params: Promise<{ id: string }> }) {
  const params = use(props.params);
  const [lead, setLead] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [note, setNote] = useState('');
  const [addingNote, setAddingNote] = useState(false);
  const [updatingStatus, setUpdatingStatus] = useState(false);

  const fetchLead = useCallback(async () => {
    try {
      const res = await fetch(`/api/admin/leads/${params.id}`);
      if (res.ok) {
        const data = await res.json();
        setLead(data.lead);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [params.id]);

  useEffect(() => {
    fetchLead();
  }, [fetchLead]);

  const handleStatusChange = async (newStatus: string) => {
    if (newStatus === lead.status) return;
    setUpdatingStatus(true);
    try {
      const res = await fetch(`/api/admin/leads/${params.id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      if (res.ok) fetchLead();
    } catch (err) {
      console.error(err);
    } finally {
      setUpdatingStatus(false);
    }
  };

  const handleAddNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!note.trim()) return;
    setAddingNote(true);
    try {
      const res = await fetch(`/api/admin/leads/${params.id}/notes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ note })
      });
      if (res.ok) {
        setNote('');
        fetchLead();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setAddingNote(false);
    }
  };

  if (loading) {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-blue-600"></div></div>;
  }

  if (!lead) {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center">Lead not found.</div>;
  }

  const statuses = ['NEW', 'CONTACTED', 'INTERESTED', 'DEMO_SCHEDULED', 'DEMO_ATTENDED', 'FOLLOW_UP', 'PAYMENT_PENDING', 'CONVERTED', 'ACTIVE_STUDENT', 'LOST'];

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans pb-12">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link href="/admin/leads" className="p-2 rounded-full hover:bg-gray-100 transition">
              <ChevronLeft className="w-6 h-6 text-gray-500" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">{lead.studentName}</h1>
              <p className="text-sm text-gray-500 flex items-center gap-2 mt-0.5">
                <User className="w-3.5 h-3.5" /> Parent: {lead.parentName}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-gray-500">Pipeline Stage:</span>
            <select 
              value={lead.status}
              onChange={(e) => handleStatusChange(e.target.value)}
              disabled={updatingStatus}
              className="bg-gray-50 border border-gray-200 rounded-lg py-2 pl-3 pr-8 text-sm font-semibold focus:ring-2 focus:ring-blue-500 outline-none disabled:opacity-50"
            >
              {statuses.map(s => <option key={s} value={s}>{s.replace('_', ' ')}</option>)}
            </select>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* LEFT COLUMN: Info */}
          <div className="lg:col-span-1 space-y-6">
            {/* Contact Card */}
            <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
              <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                <User className="w-4 h-4" /> Contact Information
              </h2>
              <div className="space-y-4">
                <div>
                  <p className="text-xs text-gray-500 font-medium">Phone Number</p>
                  <p className="text-sm font-semibold mt-1 flex items-center gap-2"><Phone className="w-4 h-4 text-blue-500"/> {lead.phone}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium">Student Age</p>
                  <p className="text-sm font-medium mt-1">{lead.studentAge} years old</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium">Experience Level</p>
                  <p className="text-sm font-medium mt-1 capitalize">{lead.experienceLevel}</p>
                </div>
              </div>
            </div>

            {/* Tracking Card */}
            <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
              <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                <MapPin className="w-4 h-4" /> Attribution & Tracking
              </h2>
              <div className="space-y-4">
                <div>
                  <p className="text-xs text-gray-500 font-medium">Source / Campaign</p>
                  <p className="text-sm font-medium mt-1">
                    {lead.source || 'Organic'} {lead.campaign && <span className="text-gray-400 text-xs ml-1">({lead.campaign})</span>}
                  </p>
                </div>
                
                {lead.visitorSession && (
                  <>
                    <div className="pt-4 border-t border-gray-100">
                      <p className="text-xs text-gray-500 font-medium">Browser & Device</p>
                      <p className="text-sm font-medium mt-1 flex items-center gap-2">
                        <Laptop className="w-4 h-4 text-gray-400"/> {lead.visitorSession.browser} on {lead.visitorSession.os}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 font-medium">Landing Page</p>
                      <p className="text-sm font-medium mt-1 break-all truncate" title={lead.visitorSession.landingPage}>{lead.visitorSession.landingPage}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 font-medium">Referrer</p>
                      <p className="text-sm font-medium mt-1 break-all truncate" title={lead.visitorSession.referrer}>{lead.visitorSession.referrer || 'Direct'}</p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Timeline & Notes */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Notes Input */}
            <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
              <form onSubmit={handleAddNote}>
                <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                  <MessageSquare className="w-4 h-4" /> Add a Note
                </label>
                <div className="flex gap-3">
                  <input 
                    type="text" 
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="E.g. Called parent, requested weekend slot..."
                    className="flex-1 bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition"
                  />
                  <button 
                    type="submit" 
                    disabled={addingNote || !note.trim()}
                    className="bg-blue-600 text-white px-5 py-2 rounded-lg font-medium text-sm hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2 transition"
                  >
                    {addingNote ? 'Saving...' : <><Plus className="w-4 h-4" /> Save</>}
                  </button>
                </div>
              </form>
            </div>

            {/* Timeline */}
            <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
              <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-6 flex items-center gap-2">
                <Clock className="w-4 h-4" /> Activity Timeline
              </h2>
              
              <div className="relative border-l border-gray-200 ml-3 space-y-8 pb-4">
                
                {/* Render Notes integrated into timeline, or separately? Best to merge them visually */}
                {/* For MVP, let's just list activities. We already log notes as activities in the API! */}
                
                {lead.activities.map((activity: any) => (
                  <div key={activity.id} className="relative pl-8">
                    <span className="absolute -left-2 top-1.5 w-4 h-4 rounded-full bg-white border-2 border-blue-500"></span>
                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                      <div className="flex justify-between items-start mb-1">
                        <span className="text-sm font-bold text-gray-900">{activity.title}</span>
                        <span className="text-xs font-medium text-gray-500">{new Date(activity.createdAt).toLocaleString()}</span>
                      </div>
                      {activity.description && (
                        <p className="text-sm text-gray-600 mt-2">{activity.description}</p>
                      )}
                      <p className="text-xs font-medium text-gray-400 mt-3">By: {activity.createdBy}</p>
                    </div>
                  </div>
                ))}

              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
