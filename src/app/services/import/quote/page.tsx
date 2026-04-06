"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  User, 
  Plane, 
  PawPrint, 
  CheckCircle2, 
  Trash2, 
  Plus, 
  Info, 
  Upload, 
  ArrowRight,
  ArrowLeft,
  ShieldCheck
} from "lucide-react";
import { cn } from "@/lib/utils";

// --- Types & Constants ---

interface Pet {
  id: string;
  name: string;
  dob: string;
  type: string;
  breed: string;
  gender: string;
  microchipped: string;
  measurements?: {
    a: string;
    b: string;
    c: string;
    d: string;
  };
}

const COUNTRIES = [
  "United Kingdom", "United States", "Australia", "United Arab Emirates", 
  "Canada", "Singapore", "New Zealand", "India", "Germany", "France", 
  "Japan", "Qatar", "Saudi Arabia", "Other"
];

const ANIMAL_TYPES = ["Dog", "Cat", "Other"];
const GENDERS = ["Male", "Female"];

// --- Components ---

interface SectionProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  stepNumber?: number;
}

function Section({ title, icon, children, stepNumber }: SectionProps) {
  return (
    <div className="mb-6 overflow-hidden rounded-xl border border-gray-100 bg-white shadow-md shadow-gray-200/30 font-sans">
      <div className="flex items-center gap-3 border-b border-gray-50 bg-gray-50/50 px-5 py-3">
        {stepNumber && (
          <span className="text-teal-600 font-black text-lg tracking-tighter">
            {stepNumber}.
          </span>
        )}
        <h2 className="text-base font-black uppercase tracking-tight text-gray-900">
          {title}
        </h2>
      </div>
      <div className="p-5">
        {children}
      </div>
    </div>
  );
}

// Stepper removed for simpler integrated look as requested.

export default function ImportQuotePage() {
  // --- Form State ---
  const [currentStep, setCurrentStep] = useState(1);
  const [pets, setPets] = useState<Pet[]>([
    { id: "initial-pet-id", name: "", dob: "", type: "", breed: "", gender: "", microchipped: "" }
  ]);
  const [formData, setFormData] = useState({
    firstName: "", lastName: "", email: "", phone: "",
    address1: "", address2: "", city: "", state: "", zip: "", country: "",
    originCountry: "", departureAirport: "", travelDate: "",
    transportMethod: [] as string[],
    originCollection: "",
    slDoorDelivery: "",
    slDeliveryAddress: "",
    vaccinationRecords: null as File | null,
    helpBloodTest: "",
    haveCrates: "",
    supplyCrates: "",
    crateMeasurements: ""
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // --- Handlers ---
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[name];
      return newErrors;
    });
  };

  const handleCheckboxChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      transportMethod: prev.transportMethod.includes(value)
        ? prev.transportMethod.filter(m => m !== value)
        : [...prev.transportMethod, value]
    }));
  };

  const addPet = () => {
    setPets(prev => [...prev, { 
      id: crypto.randomUUID(), name: "", dob: "", type: "", breed: "", gender: "", microchipped: "" 
    }]);
  };

  const removePet = (id: string) => {
    if (pets.length > 1) {
      setPets(prev => prev.filter(p => p.id !== id));
    }
  };

  const updatePet = (id: string, field: string, value: any) => {
    setPets(prev => prev.map(p => p.id === id ? { ...p, [field]: value } : p));
    const petIndex = pets.findIndex(p => p.id === id);
    const errKey = `pet_${petIndex}_${field}`;
    if (errors[errKey]) setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[errKey];
      return newErrors;
    });
  };

  const updatePetMeasurement = (id: string, field: string, value: string) => {
    setPets(prev => prev.map(p => {
      if (p.id === id) {
        return {
          ...p,
          measurements: {
            ...(p.measurements || { a: "", b: "", c: "", d: "" }),
            [field]: value
          }
        };
      }
      return p;
    }));
    const petIndex = pets.findIndex(p => p.id === id);
    const errKey = `pet_${petIndex}_${field}`;
    if (errors[errKey]) setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[errKey];
      return newErrors;
    });
  };

  const validateStep = (step: number) => {
    const newErrors: Record<string, string> = {};
    if (step === 1) {
      if (!formData.firstName) newErrors.firstName = "First name required";
      if (!formData.lastName) newErrors.lastName = "Last name required";
      if (!formData.email) newErrors.email = "Email address required";
      if (!formData.phone) newErrors.phone = "Phone number required";
      if (!formData.address1) newErrors.address1 = "Address required";
      if (!formData.country) newErrors.country = "Country required";
      if (!formData.originCountry) newErrors.originCountry = "Origin country required";
      if (!formData.departureAirport) newErrors.departureAirport = "Departure airport required";
      if (!formData.travelDate) newErrors.travelDate = "Travel date required";
    } else if (step === 2) {
      pets.forEach((pet, index) => {
        if (!pet.name) newErrors[`pet_${index}_name`] = "Pet name required";
        if (!pet.dob) newErrors[`pet_${index}_dob`] = "Date of birth required";
        if (!pet.type) newErrors[`pet_${index}_type`] = "Animal type required";
        if (!pet.breed) newErrors[`pet_${index}_breed`] = "Breed required";
        if (!pet.gender) newErrors[`pet_${index}_gender`] = "Gender required";
        if (!pet.microchipped) newErrors[`pet_${index}_microchipped`] = "Required";
        
        if (pet.type === "Dog") {
          if (!pet.measurements?.a) newErrors[`pet_${index}_a`] = "Required";
          if (!pet.measurements?.b) newErrors[`pet_${index}_b`] = "Required";
          if (!pet.measurements?.c) newErrors[`pet_${index}_c`] = "Required";
          if (!pet.measurements?.d) newErrors[`pet_${index}_d`] = "Required";
        }
      });
    } else if (step === 3) {
      if (!formData.vaccinationRecords) newErrors.vaccinationRecords = "Vaccination record required";
      if (!formData.helpBloodTest) newErrors.helpBloodTest = "Selection required";
      if (!formData.haveCrates) newErrors.haveCrates = "Selection required";
      if (!formData.supplyCrates) newErrors.supplyCrates = "Selection required";
      if (formData.supplyCrates === "No Thank You" && !formData.crateMeasurements) {
        newErrors.crateMeasurements = "Crate measurements required";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1);
      window.scrollTo({ top: 300, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    setCurrentStep(prev => prev - 1);
    window.scrollTo({ top: 300, behavior: 'smooth' });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep(3)) {
      setIsSubmitting(true);
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSubmitted(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 1500);
    }
  };

  if (isSubmitted) {
    return (
      <div className="flex flex-col items-center justify-center py-32 px-4 text-center">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white p-12 rounded-4xl shadow-2xl max-w-lg border border-teal-50"
        >
          <div className="w-24 h-24 bg-teal-600 rounded-3xl flex items-center justify-center text-white mx-auto mb-8 shadow-xl shadow-teal-600/20">
            <CheckCircle2 className="w-14 h-14" />
          </div>
          <h1 className="text-4xl font-black uppercase tracking-tighter text-gray-900 mb-4">Request Received!</h1>
          <p className="text-lg text-gray-600 mb-8 font-medium">
            Thank you for trusting PetExpress. Our relocation experts will review your details and contact you within 24 hours with a comprehensive quote.
          </p>
          <button 
            onClick={() => window.location.href = "/"}
            className="bg-gray-900 text-white px-8 py-4 rounded-2xl font-bold uppercase tracking-widest hover:bg-teal-600 transition-colors shadow-lg"
          >
            Back to Home
          </button>
        </motion.div>
      </div>
    );
  }

  if (!mounted) return <div className="min-h-screen bg-white" />;

  return (
    <div className="flex flex-col w-full bg-gray-50/50 min-h-screen">
      <section className="bg-white pt-24 pb-12 border-b border-gray-100 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-teal-600/5 rounded-full -mr-20 -mt-20 blur-3xl opacity-50"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-5xl md:text-7xl font-black mb-4 tracking-tighter text-gray-900 uppercase"
          >
            PET IMPORT <span className="text-teal-600">QUOTE</span>
          </motion.h1>
          <p className="text-xl text-gray-500 max-w-2xl font-bold uppercase tracking-[0.2em]">
            Complete the form below to receive a personalized travel plan.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <form onSubmit={handleSubmit} noValidate>
          <AnimatePresence mode="wait">
            {currentStep === 1 && (
              <motion.div
                key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}
              >
                <Section title="Step 1: Client & Travel Information" icon={<User className="w-4 h-4" />} stepNumber={1}>
                  <div className="space-y-8">
                    <div className="border-b border-gray-100 pb-2">
                      <h3 className="text-sm font-black uppercase tracking-widest text-teal-600">Client Information</h3>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3">
                      {[
                        { label: "First Name *", name: "firstName" },
                        { label: "Last Name *", name: "lastName" },
                        { label: "Email Address *", name: "email", type: "email" },
                        { label: "Phone Number *", name: "phone", type: "tel" },
                        { label: "Address Line 1 *", name: "address1", span: 2 },
                        { label: "Address Line 2", name: "address2", span: 2 },
                        { label: "City", name: "city" },
                        { label: "State", name: "state" },
                        { label: "Zip Code", name: "zip" }
                      ].map(field => (
                        <div key={field.name} className={cn("space-y-1", field.span === 2 && "md:col-span-2")}>
                          <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">{field.label}</label>
                          <input 
                            type={field.type || "text"} name={field.name} value={(formData as any)[field.name]} onChange={handleInputChange}
                            className={cn("w-full px-3 py-2 rounded-lg border bg-gray-50/25 text-sm text-gray-900 focus:outline-none transition-all", errors[field.name] ? "border-red-400" : "border-gray-200 focus:border-teal-600")}
                          />
                          {errors[field.name] && <p className="text-[10px] font-bold text-red-500 uppercase tracking-tight">{errors[field.name]}</p>}
                        </div>
                      ))}
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Country *</label>
                        <select name="country" value={formData.country} onChange={handleInputChange} className={cn("w-full px-3 py-2 rounded-lg border bg-gray-50/25 text-sm text-gray-900 focus:outline-none appearance-none cursor-pointer", errors.country ? "border-red-400" : "border-gray-200 focus:border-teal-600")}>
                          <option value="">Select Country</option>
                          {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                        {errors.country && <p className="text-[10px] font-bold text-red-500 uppercase tracking-tight">{errors.country}</p>}
                      </div>
                    </div>

                    <div className="border-b border-gray-100 pb-2">
                      <h3 className="text-sm font-black uppercase tracking-widest text-teal-600">Travel Information</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3">
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Country your pet(s) will be travelling from *</label>
                        <select name="originCountry" value={formData.originCountry} onChange={handleInputChange} className={cn("w-full px-3 py-2 rounded-lg border bg-gray-50/25 text-sm text-gray-900 focus:outline-none", errors.originCountry ? "border-red-400" : "border-gray-200 focus:border-teal-600")}>
                          <option value="">Select Origin</option>
                          {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                        {errors.originCountry && <p className="text-[10px] font-bold text-red-500 uppercase tracking-tight">{errors.originCountry}</p>}
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Airport of departure *</label>
                        <input type="text" name="departureAirport" value={formData.departureAirport} onChange={handleInputChange} className={cn("w-full px-3 py-2 rounded-lg border bg-gray-50/25 text-sm text-gray-900 focus:outline-none", errors.departureAirport ? "border-red-400" : "border-gray-200 focus:border-teal-600")} />
                        {errors.departureAirport && <p className="text-[10px] font-bold text-red-500 uppercase tracking-tight">{errors.departureAirport}</p>}
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Approximate travel dates *</label>
                        <input type="date" name="travelDate" value={formData.travelDate} onChange={handleInputChange} className={cn("w-full px-3 py-2 rounded-lg border bg-gray-50/25 text-sm text-gray-900 focus:outline-none", errors.travelDate ? "border-red-400" : "border-gray-200 focus:border-teal-600")} />
                        {errors.travelDate && <p className="text-[10px] font-bold text-red-500 uppercase tracking-tight">{errors.travelDate}</p>}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Method of transporting pets</label>
                      <div className="flex flex-col gap-2">
                        {["Accompanied Baggage / Excess Baggage", "Manifested Air Freight Cargo under an Air Waybill"].map(m => (
                          <div key={m} onClick={() => handleCheckboxChange(m)} className={cn("flex items-center gap-2 p-2 px-3 rounded-lg border cursor-pointer text-xs transition-all", formData.transportMethod.includes(m) ? "border-teal-600 bg-teal-50/30 text-teal-700" : "border-gray-100 bg-gray-50/20 text-gray-500")}>
                            <div className={cn("w-4 h-4 rounded border flex items-center justify-center shrink-0", formData.transportMethod.includes(m) ? "border-teal-600 bg-teal-600 text-white" : "border-gray-300 bg-white")}>
                              {formData.transportMethod.includes(m) && <CheckCircle2 className="w-3 h-3" />}
                            </div>
                            {m}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 leading-tight">Do you require collection from your origin residence (Airport drop) ?</label>
                      <div className="flex gap-2">
                        {["Yes please", "No Thank You"].map(val => (
                          <button key={val} type="button" onClick={() => setFormData(p => ({ ...p, originCollection: val }))} className={cn("flex-1 py-1.5 rounded-lg border text-[10px] font-bold uppercase transition-all", formData.originCollection === val ? "bg-teal-600 text-white border-teal-600" : "border-gray-100 text-gray-400")}>{val}</button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 leading-tight">Once the import clearance is complete in Sri Lanka; do you require door delivery from Colombo airport to your residence in Sri Lanka?</label>
                      <div className="flex gap-2">
                        {["Yes please", "No Thank You"].map(val => (
                          <button key={val} type="button" onClick={() => setFormData(p => ({ ...p, slDoorDelivery: val }))} className={cn("flex-1 py-1.5 rounded-lg border text-[10px] font-bold uppercase transition-all", formData.slDoorDelivery === val ? "bg-teal-600 text-white border-teal-600" : "border-gray-100 text-gray-400")}>{val}</button>
                        ))}
                      </div>
                      <AnimatePresence>
                        {formData.slDoorDelivery === "Yes please" && (
                          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="space-y-1">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Please provide delivery address in Sri Lanka *</label>
                            <textarea 
                              name="slDeliveryAddress" 
                              value={formData.slDeliveryAddress} 
                              onChange={handleInputChange} 
                              placeholder="Address in Sri Lanka..." 
                              className={cn("w-full h-20 p-3 rounded-lg border bg-gray-50/25 text-sm text-gray-900 focus:outline-none transition-all", errors.slDeliveryAddress ? "border-red-400" : "border-gray-200 focus:border-teal-600")} 
                            />
                            {errors.slDeliveryAddress && <p className="text-[10px] font-bold text-red-500 uppercase tracking-tight">{errors.slDeliveryAddress}</p>}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>

                  <div className="mt-8 flex justify-end">
                    <button type="button" onClick={handleNext} className="flex items-center gap-2 bg-gray-900 hover:bg-teal-600 text-white py-2 px-6 rounded-lg font-bold uppercase tracking-widest text-[10px] transition-all shadow active:scale-95">
                      Next Step <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </Section>
              </motion.div>
            )}

            {currentStep === 2 && (
              <motion.div
                key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}
              >
                <Section title="Pet Details" icon={<PawPrint className="w-5 h-5" />} stepNumber={2}>
                  <div className="space-y-6">
                    {pets.map((pet, index) => (
                      <div key={pet.id} className="p-4 rounded-lg border border-teal-50 bg-teal-50/10 relative">
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-[10px] font-black uppercase tracking-widest text-teal-600 bg-white px-2 py-0.5 rounded border border-teal-100">Pet {index + 1}</span>
                          {pets.length > 1 && <button type="button" onClick={() => removePet(pet.id)} className="text-red-300 hover:text-red-500 transition-colors"><Trash2 className="w-4 h-4" /></button>}
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-2">
                          <div className="space-y-1">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Pet Name *</label>
                            <input type="text" value={pet.name} onChange={(e) => updatePet(pet.id, "name", e.target.value)} className={cn("w-full px-3 py-2 rounded-lg border bg-white text-sm text-gray-900 focus:outline-none transition-all", errors[`pet_${index}_name`] ? "border-red-400" : "border-gray-200 focus:border-teal-600")} />
                            {errors[`pet_${index}_name`] && <p className="text-[10px] font-bold text-red-500 uppercase tracking-tight">{errors[`pet_${index}_name`]}</p>}
                          </div>
                          <div className="space-y-1">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Date of Birth *</label>
                            <input type="date" value={pet.dob} onChange={(e) => updatePet(pet.id, "dob", e.target.value)} className={cn("w-full px-3 py-2 rounded-lg border bg-white text-sm text-gray-900 focus:outline-none transition-all", errors[`pet_${index}_dob`] ? "border-red-400" : "border-gray-200 focus:border-teal-600")} />
                            {errors[`pet_${index}_dob`] && <p className="text-[10px] font-bold text-red-500 uppercase tracking-tight">{errors[`pet_${index}_dob`]}</p>}
                          </div>
                          <div className="space-y-1">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Animal Type *</label>
                            <select value={pet.type} onChange={(e) => updatePet(pet.id, "type", e.target.value)} className={cn("w-full px-3 py-2 rounded-lg border bg-white text-sm text-gray-900 focus:outline-none transition-all appearance-none cursor-pointer", errors[`pet_${index}_type`] ? "border-red-400" : "border-gray-200 focus:border-teal-600")}>
                              <option value="">Select Type</option>
                              {ANIMAL_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                            </select>
                            {errors[`pet_${index}_type`] && <p className="text-[10px] font-bold text-red-500 uppercase tracking-tight">{errors[`pet_${index}_type`]}</p>}
                          </div>
                          <div className="space-y-1">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Breed *</label>
                            <input type="text" value={pet.breed} onChange={(e) => updatePet(pet.id, "breed", e.target.value)} className={cn("w-full px-3 py-2 rounded-lg border bg-white text-sm text-gray-900 focus:outline-none transition-all", errors[`pet_${index}_breed`] ? "border-red-400" : "border-gray-200 focus:border-teal-600")} />
                            {errors[`pet_${index}_breed`] && <p className="text-[10px] font-bold text-red-500 uppercase tracking-tight">{errors[`pet_${index}_breed`]}</p>}
                          </div>
                          <div className="space-y-1">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Gender *</label>
                            <select value={pet.gender} onChange={(e) => updatePet(pet.id, "gender", e.target.value)} className={cn("w-full px-3 py-2 rounded-lg border bg-white text-sm text-gray-900 focus:outline-none transition-all appearance-none cursor-pointer", errors[`pet_${index}_gender`] ? "border-red-400" : "border-gray-200 focus:border-teal-600")}>
                              <option value="">Select Gender</option>
                              {GENDERS.map(g => <option key={g} value={g}>{g}</option>)}
                            </select>
                            {errors[`pet_${index}_gender`] && <p className="text-[10px] font-bold text-red-500 uppercase tracking-tight">{errors[`pet_${index}_gender`]}</p>}
                          </div>
                          <div className="space-y-1">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Microchipped? *</label>
                            <div className="flex gap-2">
                              {["Yes", "No"].map(v => (
                                <button key={v} type="button" onClick={() => updatePet(pet.id, "microchipped", v)} className={cn("flex-1 py-1.5 rounded-lg border text-[10px] font-bold uppercase transition-all", pet.microchipped === v ? "bg-teal-600 text-white border-teal-600 shadow-sm" : errors[`pet_${index}_microchipped`] ? "border-red-400 text-red-400" : "border-gray-100 text-gray-400 bg-white")}>{v}</button>
                              ))}
                            </div>
                            {errors[`pet_${index}_microchipped`] && <p className="text-[10px] font-bold text-red-500 uppercase tracking-tight">{errors[`pet_${index}_microchipped`]}</p>}
                          </div>
                        </div>

                        {/* Dog Measurements Section */}
                        {pet.type === "Dog" && (
                          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="mt-6 p-5 rounded-xl bg-gray-50 border border-gray-100 space-y-4">
                            <div className="flex flex-col gap-1">
                              <h4 className="text-[10px] font-black uppercase tracking-widest text-teal-600">Dog Measurement Guide</h4>
                              <p className="text-[10px] font-bold text-gray-500 italic">If you require us to supply IATA certified pet travel crate(s); please provide the measurements below.</p>
                            </div>

                            <div className="flex flex-col md:flex-row gap-4 p-3 bg-white rounded-lg border border-gray-100 items-center">
                                <div className="shrink-0 w-full md:w-48 bg-gray-50 rounded-md overflow-hidden border border-gray-50">
                                  <img 
                                    src="/images/pet-size/crate-size.png" 
                                    alt="How to measure your pet" 
                                    className="w-full h-auto object-cover"
                                  />
                                </div>
                                <ul className="text-[9px] font-bold text-gray-600 space-y-1 grow">
                                  <li>• <span className="text-teal-600 font-black">A</span> = nose to root of tail.</li>
                                  <li>• <span className="text-teal-600 font-black">B</span> = ground to elbow joint.</li>
                                  <li>• <span className="text-teal-600 font-black">C</span> = width across shoulders.</li>
                                  <li>• <span className="text-teal-600 font-black">D</span> = ground to top of head/ear.</li>
                                </ul>
                            </div>

                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                              {[
                                { key: "a", label: "A: nose to root of tail" },
                                { key: "b", label: "B: ground to elbow joint" },
                                { key: "c", label: "C: width across shoulders" },
                                { key: "d", label: "D: ground to top of head/ear" }
                              ].map(dim => {
                                const errKey = `pet_${index}_${dim.key}`;
                                return (
                                  <div key={dim.key} className="space-y-0.5">
                                    <label className="text-[9px] font-black uppercase text-gray-400 leading-tight block">{dim.label} (cm)</label>
                                    <input 
                                      type="number" 
                                      value={(pet.measurements as any)?.[dim.key] || ""} 
                                      onChange={(e) => updatePetMeasurement(pet.id, dim.key, e.target.value)} 
                                      className={cn("w-full px-3 py-2 rounded-lg border bg-white text-sm text-gray-900 focus:outline-none transition-all", errors[errKey] ? "border-red-400" : "border-gray-200 focus:border-teal-600")} 
                                      placeholder="0" 
                                    />
                                    {errors[errKey] && <p className="text-[10px] font-bold text-red-500 uppercase tracking-tight">{errors[errKey]}</p>}
                                  </div>
                                );
                              })}
                            </div>
                          </motion.div>
                        )}

                        {pet.type === "Cat" && (
                          <div className="mt-4 p-3 rounded-lg bg-teal-50/50 border border-teal-100">
                            <p className="text-[10px] font-bold text-teal-700 italic">***Cats do not need to be measured as they would require a standard size #200 pet travel crate.***</p>
                          </div>
                        )}
                      </div>
                    ))}
                    <button type="button" onClick={addPet} className="w-full py-2 border border-dashed border-teal-200 rounded-lg text-[10px] font-bold uppercase tracking-widest text-teal-600 hover:bg-teal-50 transition-colors">+ Add Another Pet</button>
                  </div>
                  <div className="mt-8 flex items-center justify-between">
                    <button type="button" onClick={handleBack} className="flex items-center gap-2 text-gray-400 hover:text-gray-900 font-bold uppercase tracking-widest text-[10px] transition-colors"><ArrowLeft className="w-3 h-3" /> Back</button>
                    <button type="button" onClick={handleNext} className="flex items-center gap-2 bg-gray-900 hover:bg-teal-600 text-white py-2 px-6 rounded-lg font-bold uppercase tracking-widest text-[10px] transition-all shadow active:scale-95">Next Step <ArrowRight className="w-3 h-3" /></button>
                  </div>
                </Section>
              </motion.div>
            )}

            {currentStep === 3 && (
              <motion.div
                key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}
              >
                <Section title="Final Requirements" icon={<ShieldCheck className="w-5 h-5" />} stepNumber={3}>
                  <div className="space-y-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Upload Vaccination Records *</label>
                        <div className="border border-dashed border-gray-200 rounded-lg p-5 flex flex-col items-center bg-gray-50/25 group cursor-pointer hover:bg-teal-50/30 transition-colors">
                          <Upload className="w-4 h-4 text-gray-300 mb-1 group-hover:text-teal-600" />
                          <span className="text-[10px] font-bold uppercase text-gray-400 group-hover:text-teal-700">Click to upload</span>
                        </div>
                        {errors.vaccinationRecords && <p className="text-[10px] font-bold text-red-500 uppercase tracking-tight mt-1">{errors.vaccinationRecords}</p>}
                      </div>

                      {/* Blood Test Section */}
                      <div className="space-y-4 p-4 rounded-xl bg-gray-50/30 border border-gray-100">
                        <div className="flex flex-col gap-1">
                          <h4 className="text-[10px] font-black uppercase tracking-widest text-teal-600">Blood Test Assistance</h4>
                          <p className="text-[10px] font-bold text-gray-500 italic">In order to obtain the import permits, below blood tests must be done;</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="p-3 bg-white rounded-lg border border-gray-100">
                            <h5 className="text-[9px] font-black uppercase text-teal-600 mb-1">Dogs</h5>
                            <p className="text-[9px] font-bold text-gray-500">• Heartworm (Dirofilaria immitis), Leishmaniasis, Babesia Gibsoni, Babesia Canis</p>
                          </div>
                          <div className="p-3 bg-white rounded-lg border border-gray-100">
                            <h5 className="text-[9px] font-black uppercase text-teal-600 mb-1">Cats</h5>
                            <p className="text-[9px] font-bold text-gray-500">• Heartworm (Dirofilaria Immitis)</p>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 block h-6">Would you like us to help you with these tests? *</label>
                          <div className="flex gap-4">
                            {[
                              { label: "Yes please help me", value: "Yes" }, 
                              { label: "No I can get this done", value: "No" }
                            ].map(v => (
                              <button 
                                key={v.value} type="button" onClick={() => setFormData(p => ({ ...p, helpBloodTest: v.value }))}
                                className={cn("flex-1 py-1.5 rounded-lg border text-[10px] font-bold uppercase transition-all", formData.helpBloodTest === v.value ? "bg-teal-600 text-white border-teal-600 shadow-sm" : errors.helpBloodTest ? "border-red-400 text-red-500 bg-red-50/10" : "border-gray-100 text-gray-400 bg-white")}
                              >
                                {v.label}
                              </button>
                            ))}
                          </div>
                          {errors.helpBloodTest && <p className="text-[10px] font-bold text-red-500 uppercase tracking-tight">{errors.helpBloodTest}</p>}
                        </div>
                      </div>

                      {/* Pet Travel Crates Section */}
                      <div className="space-y-6 pt-2">
                        <div className="space-y-3">
                          <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Do you already have IATA certified International Pet Travel Crate(s) for your pet(s)? *</label>
                          <div className="flex gap-4 max-w-sm">
                            {["Yes", "No"].map(v => (
                              <button 
                                key={v} type="button" onClick={() => setFormData(p => ({ ...p, haveCrates: v }))}
                                className={cn("flex-1 py-1.5 rounded-lg border text-[10px] font-bold uppercase transition-all", formData.haveCrates === v ? "bg-teal-600 text-white border-teal-600 shadow-sm" : errors.haveCrates ? "border-red-400 text-red-500 bg-red-50/10" : "border-gray-100 text-gray-400 bg-white")}
                              >
                                {v}
                              </button>
                            ))}
                          </div>
                          {errors.haveCrates && <p className="text-[10px] font-bold text-red-500 uppercase tracking-tight">{errors.haveCrates}</p>}
                        </div>

                        <div className="space-y-3">
                          <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Do you want us to supply IATA certified International Pet Travel Crate(s) for your pet(s)? *</label>
                          <div className="flex gap-4 max-w-sm">
                            {["Yes please", "No Thank You"].map(v => (
                              <button 
                                key={v} type="button" onClick={() => setFormData(p => ({ ...p, supplyCrates: v }))}
                                className={cn("flex-1 py-1.5 rounded-lg border text-[10px] font-bold uppercase transition-all", formData.supplyCrates === v ? "bg-teal-600 text-white border-teal-600 shadow-sm" : errors.supplyCrates ? "border-red-400 text-red-500 bg-red-50/10" : "border-gray-100 text-gray-400 bg-white")}
                              >
                                {v}
                              </button>
                            ))}
                          </div>
                          {errors.supplyCrates && <p className="text-[10px] font-bold text-red-500 uppercase tracking-tight">{errors.supplyCrates}</p>}
                        </div>

                        {/* Conditional Textarea for Crate Measurements */}
                        <AnimatePresence>
                          {formData.supplyCrates === "No Thank You" && (
                            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="space-y-1">
                              <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Please advise the external measurements of the crate(s) *</label>
                              <textarea 
                                value={formData.crateMeasurements} 
                                onChange={(e) => {
                                  setFormData(p => ({ ...p, crateMeasurements: e.target.value }));
                                  if (errors.crateMeasurements) setErrors(prev => {
                                    const n = { ...prev }; delete n.crateMeasurements; return n;
                                  });
                                }}
                                className={cn("w-full h-24 p-3 rounded-lg border bg-white text-sm text-gray-900 focus:outline-none transition-all", errors.crateMeasurements ? "border-red-400" : "border-gray-200 focus:border-teal-600")}
                                placeholder="e.g. Length x Width x Height in cm for each crate..."
                              />
                              {errors.crateMeasurements && <p className="text-[10px] font-bold text-red-500 uppercase tracking-tight">{errors.crateMeasurements}</p>}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                  </div>
                  <div className="mt-8 flex items-center justify-between">
                    <button type="button" onClick={handleBack} className="flex items-center gap-2 text-gray-400 hover:text-gray-900 font-bold uppercase tracking-widest text-[10px] transition-colors"><ArrowLeft className="w-3 h-3" /> Back</button>
                    <button type="submit" disabled={isSubmitting} className="bg-teal-600 hover:bg-teal-700 text-white py-2 px-8 rounded-lg font-black uppercase tracking-widest text-[10px] transition-all shadow">
                      {isSubmitting ? "Processing..." : "Submit Request"}
                    </button>
                  </div>
                </Section>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Old navigation buttons removed - now integrated inside sections */}
        </form>
      </div>
    </div>
  );
}
