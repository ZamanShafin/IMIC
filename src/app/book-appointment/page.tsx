'use client';

import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import { Calendar, User, FileText, CheckCircle2, ChevronRight, ChevronLeft, MapPin, Building2, Stethoscope, Upload, MessageCircle } from 'lucide-react';
import Link from 'next/link';

export default function BookAppointmentPage() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [bookingRef, setBookingRef] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    specialty: 'Bones (Orthopaedics)',
    procedure: 'Knee Surgery',
    country: 'Singapore',
    hospital: 'Farrer Park Hospital',
    doctor: '',
    preferredDateStart: '',
    preferredDateEnd: '',
    patientName: '',
    patientPhone: '',
    patientEmail: '',
    whatsappNumber: '',
    dob: '',
    gender: 'Male',
    countryRes: 'Bangladesh',
    notes: ''
  });

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 4));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (res.ok) {
        setBookingRef(data.refNumber);
        setStep(5);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-1">
        <section className="bg-imic-navy text-white py-14 px-4 text-center">
          <div className="max-w-7xl mx-auto space-y-3">
            <span className="text-xs font-bold text-imic-teal uppercase tracking-widest block">Online Consultation Desk</span>
            <h1 className="text-3xl sm:text-5xl font-extrabold">Book an Appointment</h1>
            <p className="text-slate-300 text-sm max-w-xl mx-auto">
              Schedule your consultation with premier hospital specialists in Singapore, Malaysia, Thailand, or India.
            </p>
          </div>
        </section>

        {/* Wizard Card */}
        <section className="py-16 max-w-4xl mx-auto px-4">
          <div className="bg-slate-50 p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-xl space-y-8">
            {/* Step Indicators */}
            {step <= 4 && (
              <div className="flex items-center justify-between border-b border-slate-200 pb-6 text-xs font-bold">
                <div className={`flex items-center gap-2 ${step >= 1 ? 'text-imic-teal' : 'text-slate-400'}`}>
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center font-bold ${step >= 1 ? 'bg-imic-teal text-white' : 'bg-slate-200'}`}>1</div>
                  <span className="hidden sm:inline">Specialty & Country</span>
                </div>
                <div className={`flex items-center gap-2 ${step >= 2 ? 'text-imic-teal' : 'text-slate-400'}`}>
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center font-bold ${step >= 2 ? 'bg-imic-teal text-white' : 'bg-slate-200'}`}>2</div>
                  <span className="hidden sm:inline">Hospital & Date</span>
                </div>
                <div className={`flex items-center gap-2 ${step >= 3 ? 'text-imic-teal' : 'text-slate-400'}`}>
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center font-bold ${step >= 3 ? 'bg-imic-teal text-white' : 'bg-slate-200'}`}>3</div>
                  <span className="hidden sm:inline">Patient Details</span>
                </div>
                <div className={`flex items-center gap-2 ${step >= 4 ? 'text-imic-teal' : 'text-slate-400'}`}>
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center font-bold ${step >= 4 ? 'bg-imic-teal text-white' : 'bg-slate-200'}`}>4</div>
                  <span className="hidden sm:inline">Review & Reports</span>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Step 1 */}
              {step === 1 && (
                <div className="space-y-4">
                  <h2 className="text-xl font-bold text-imic-navy flex items-center gap-2">
                    <Stethoscope className="w-5 h-5 text-imic-teal" />
                    <span>Select Medical Specialty & Destination</span>
                  </h2>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Medical Speciality *</label>
                    <select
                      value={formData.specialty}
                      onChange={(e) => setFormData({ ...formData, specialty: e.target.value })}
                      className="w-full bg-white border border-slate-200 text-sm rounded-xl p-3.5 focus:ring-2 focus:ring-imic-teal"
                    >
                      <option value="Bones (Orthopaedics)">Bones (Orthopaedics)</option>
                      <option value="Brain Nerves (Neurology)">Brain Nerves (Neurology)</option>
                      <option value="Ear, Nose, Throat (ENT)">Ear, Nose, Throat (ENT)</option>
                      <option value="Eyes (Ophthalmology)">Eyes (Ophthalmology)</option>
                      <option value="Heart & Vascular (Cardiovascular)">Heart & Vascular (Cardiovascular)</option>
                      <option value="Cancer (Oncology)">Cancer (Oncology)</option>
                      <option value="General Surgery">General Surgery</option>
                      <option value="Transplant & Cellular Therapy">Transplant & Cellular Therapy</option>
                      <option value="Hormone Disorder (Endocrinology)">Hormone Disorder (Endocrinology)</option>
                      <option value="Urinary & Reproductive System (Urology)">Urinary & Reproductive System (Urology)</option>
                      <option value="Women (Obstetrics & Gynaecology)">Women (Obstetrics & Gynaecology)</option>
                      <option value="Kidneys (Renal Medicine)">Kidneys (Renal Medicine)</option>
                      <option value="Lungs (Respiratory Medicine)">Lungs (Respiratory Medicine)</option>
                      <option value="Paediatrics">Paediatrics</option>
                      <option value="Stomach & Digestive System (Gastroenterology)">Stomach & Digestive System (Gastroenterology)</option>
                      <option value="Addiction Treatment">Addiction Treatment</option>
                      <option value="Allergy">Allergy</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Target Country *</label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {['Singapore', 'Malaysia', 'Thailand', 'India'].map((c) => (
                        <button
                          key={c}
                          type="button"
                          onClick={() => setFormData({ ...formData, country: c })}
                          className={`p-3.5 rounded-xl border font-bold text-xs transition ${
                            formData.country === c
                              ? 'bg-imic-teal text-white border-imic-teal shadow-md'
                              : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                          }`}
                        >
                          {c}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 flex justify-end">
                    <button
                      type="button"
                      onClick={nextStep}
                      className="bg-imic-teal hover:bg-imic-teal-hover text-white font-bold text-sm px-6 py-3 rounded-xl flex items-center gap-1"
                    >
                      <span>Next: Hospital & Dates</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* Step 2 */}
              {step === 2 && (
                <div className="space-y-4">
                  <h2 className="text-xl font-bold text-imic-navy flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-imic-teal" />
                    <span>Hospital Preference & Travel Dates</span>
                  </h2>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Preferred Hospital (Optional)</label>
                    <input
                      type="text"
                      value={formData.hospital}
                      onChange={(e) => setFormData({ ...formData, hospital: e.target.value })}
                      placeholder="e.g. Farrer Park, Mount Elizabeth, Sunway Medical, Fortis..."
                      className="w-full bg-white border border-slate-200 text-sm rounded-xl p-3.5 focus:ring-2 focus:ring-imic-teal"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">Preferred Date From</label>
                      <input
                        type="date"
                        value={formData.preferredDateStart}
                        onChange={(e) => setFormData({ ...formData, preferredDateStart: e.target.value })}
                        className="w-full bg-white border border-slate-200 text-sm rounded-xl p-3.5 focus:ring-2 focus:ring-imic-teal"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">Preferred Date To</label>
                      <input
                        type="date"
                        value={formData.preferredDateEnd}
                        onChange={(e) => setFormData({ ...formData, preferredDateEnd: e.target.value })}
                        className="w-full bg-white border border-slate-200 text-sm rounded-xl p-3.5 focus:ring-2 focus:ring-imic-teal"
                      />
                    </div>
                  </div>

                  <div className="pt-4 flex justify-between">
                    <button
                      type="button"
                      onClick={prevStep}
                      className="border border-slate-300 text-slate-700 font-semibold text-sm px-5 py-3 rounded-xl"
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={nextStep}
                      className="bg-imic-teal hover:bg-imic-teal-hover text-white font-bold text-sm px-6 py-3 rounded-xl flex items-center gap-1"
                    >
                      <span>Next: Patient Details</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3 */}
              {step === 3 && (
                <div className="space-y-4">
                  <h2 className="text-xl font-bold text-imic-navy flex items-center gap-2">
                    <User className="w-5 h-5 text-imic-teal" />
                    <span>Patient Demographics & Contact</span>
                  </h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">Patient Full Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.patientName}
                        onChange={(e) => setFormData({ ...formData, patientName: e.target.value })}
                        placeholder="Full Name as in Passport"
                        className="w-full bg-white border border-slate-200 text-sm rounded-xl p-3 focus:ring-2 focus:ring-imic-teal"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">Mobile Number *</label>
                      <input
                        type="tel"
                        required
                        value={formData.patientPhone}
                        onChange={(e) => setFormData({ ...formData, patientPhone: e.target.value })}
                        placeholder="+8801700000000"
                        className="w-full bg-white border border-slate-200 text-sm rounded-xl p-3 focus:ring-2 focus:ring-imic-teal"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">WhatsApp Number</label>
                      <input
                        type="tel"
                        value={formData.whatsappNumber}
                        onChange={(e) => setFormData({ ...formData, whatsappNumber: e.target.value })}
                        placeholder="+8801700000000"
                        className="w-full bg-white border border-slate-200 text-sm rounded-xl p-3 focus:ring-2 focus:ring-imic-teal"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">Email Address *</label>
                      <input
                        type="email"
                        required
                        value={formData.patientEmail}
                        onChange={(e) => setFormData({ ...formData, patientEmail: e.target.value })}
                        placeholder="patient@example.com"
                        className="w-full bg-white border border-slate-200 text-sm rounded-xl p-3 focus:ring-2 focus:ring-imic-teal"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">Date of Birth</label>
                      <input
                        type="date"
                        value={formData.dob}
                        onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                        className="w-full bg-white border border-slate-200 text-sm rounded-xl p-3 focus:ring-2 focus:ring-imic-teal"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">Gender</label>
                      <select
                        value={formData.gender}
                        onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                        className="w-full bg-white border border-slate-200 text-sm rounded-xl p-3 focus:ring-2 focus:ring-imic-teal"
                      >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div className="pt-4 flex justify-between">
                    <button
                      type="button"
                      onClick={prevStep}
                      className="border border-slate-300 text-slate-700 font-semibold text-sm px-5 py-3 rounded-xl"
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={nextStep}
                      className="bg-imic-teal hover:bg-imic-teal-hover text-white font-bold text-sm px-6 py-3 rounded-xl flex items-center gap-1"
                    >
                      <span>Next: Review & Upload</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* Step 4 */}
              {step === 4 && (
                <div className="space-y-4">
                  <h2 className="text-xl font-bold text-imic-navy flex items-center gap-2">
                    <FileText className="w-5 h-5 text-imic-teal" />
                    <span>Review Booking & Medical Reports</span>
                  </h2>

                  <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-2 text-xs text-slate-700">
                    <div><span className="font-bold text-slate-500">Patient:</span> {formData.patientName} ({formData.gender})</div>
                    <div><span className="font-bold text-slate-500">Phone:</span> {formData.patientPhone} | <span className="font-bold text-slate-500">Email:</span> {formData.patientEmail}</div>
                    <div><span className="font-bold text-slate-500">Specialty:</span> {formData.specialty}</div>
                    <div><span className="font-bold text-slate-500">Target Country:</span> {formData.country}</div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Additional Medical Notes</label>
                    <textarea
                      rows={3}
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      placeholder="Special requirements, wheelchair, flight stretcher..."
                      className="w-full bg-white border border-slate-200 text-sm rounded-xl p-3 focus:ring-2 focus:ring-imic-teal"
                    />
                  </div>

                  <div className="p-4 bg-white border border-dashed border-slate-300 rounded-2xl text-center space-y-2">
                    <Upload className="w-6 h-6 text-imic-teal mx-auto" />
                    <span className="text-xs font-bold text-imic-navy block">Upload Medical Reports (Scans, Prescriptions)</span>
                    <input type="file" className="text-xs text-slate-500 mx-auto" />
                  </div>

                  <div className="pt-4 flex justify-between">
                    <button
                      type="button"
                      onClick={prevStep}
                      className="border border-slate-300 text-slate-700 font-semibold text-sm px-5 py-3 rounded-xl"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className="bg-imic-teal hover:bg-imic-teal-hover text-white font-bold text-sm px-8 py-3.5 rounded-xl shadow-xl transition flex items-center gap-2"
                    >
                      <Calendar className="w-4 h-4" />
                      <span>{loading ? 'Confirming...' : 'Submit Booking Request'}</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Step 5: Confirmation */}
              {step === 5 && bookingRef && (
                <div className="text-center py-6 space-y-6">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-md">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>

                  <div className="space-y-2">
                    <h2 className="text-2xl font-bold text-imic-navy">Booking Request Submitted!</h2>
                    <p className="text-slate-600 text-sm">Your booking reference code is:</p>
                    <div className="inline-block bg-imic-navy text-imic-teal text-xl font-mono font-bold px-6 py-2.5 rounded-2xl tracking-wider border border-slate-800">
                      {bookingRef}
                    </div>
                  </div>

                  <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
                    A confirmation email & SMS notification have been sent. Our CPAC staff in Dhaka will verify hospital slot availability and reach out within 2 hours.
                  </p>

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                    <a
                      href={`https://wa.me/+8801777995995?text=Hello%20IMIC%2C%20I%20just%20submitted%20booking%20request%20${bookingRef}`}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-sm px-6 py-3 rounded-xl shadow-lg transition"
                    >
                      <MessageCircle className="w-5 h-5 fill-white" />
                      <span>Message us on WhatsApp</span>
                    </a>

                    <Link
                      href={`/booking/track?ref=${bookingRef}`}
                      className="flex items-center gap-2 border border-slate-300 hover:bg-slate-100 text-slate-700 font-bold text-sm px-6 py-3 rounded-xl transition"
                    >
                      <span>Track Booking Status</span>
                    </Link>
                  </div>
                </div>
              )}
            </form>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
