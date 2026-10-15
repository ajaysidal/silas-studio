"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, MessageSquare, Check, Loader2, AlertCircle } from 'lucide-react';

interface FormData {
  name: string;
  email: string;
  organization: string;
  interest: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  organization?: string;
  interest?: string;
  message?: string;
}

export default function Contact() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    organization: '',
    interest: '',
    message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Full name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Please enter a valid email';
    if (!formData.organization.trim()) newErrors.organization = 'Organization name is required';
    if (!formData.interest) newErrors.interest = 'Please select an area of interest';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    else if (formData.message.trim().length < 20) newErrors.message = 'Message must be at least 20 characters';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    setSubmitStatus('idle');
    
    // Simulate API call
    
    setIsSubmitting(false);
    setSubmitStatus('success');
    setFormData({ name: '', email: '', organization: '', interest: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const interests = [
    { value: '', label: 'Select an option' },
    { value: 'dfy', label: 'Done-For-You AI Pipelines' },
    { value: 'payload', label: 'Payload CMS Integration' },
    { value: 'enterprise', label: 'Enterprise App Builder' },
    { value: 'silas', label: 'Silas Studio Deployment' },
    { value: 'other', label: 'Other' },
  ];

  return (
    <main className="min-h-screen bg-slate-950 py-12 md:py-16 lg:py-20 xl:py-24">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left Side - Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="pr-8 lg:pr-12"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-teal-500/10 text-teal-400 text-sm font-medium mb-16">
              GET IN TOUCH
            </span>
            <h1 className="font-orbitron text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight text-slate-100 mb-16">
              Let's Build Your{' '}
              <span className="gradient-text">Sovereign Infrastructure</span>
            </h1>
            <p className="text-base md:text-lg text-slate-300 leading-relaxed mb-10 max-w-xl">
              Whether you are ready to deploy a Done-For-You AI pipeline, integrate our Headless CMS, 
              or discuss a custom enterprise architecture, our team is ready to assist. 
              We respond to all inquiries within 24 hours.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-900/50 border border-slate-800">
                <div className="w-12 h-12 rounded-xl bg-teal-500/10 flex items-center justify-center flex-shrink-0 text-teal-400">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-orbitron text-sm font-semibold text-slate-100 mb-1">Email Us</h3>
                  <p className="text-slate-400 text-sm"><a href="mailto:hello@buildwithai.digital" className="hover:text-teal-400 transition-colors">hello@buildwithai.digital</a></p>
                  <p className="text-slate-500 text-xs mt-1">Typical response: &lt; 24 hours</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-900/50 border border-slate-800">
                <div className="w-12 h-12 rounded-xl bg-teal-500/10 flex items-center justify-center flex-shrink-0 text-teal-400">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-orbitron text-sm font-semibold text-slate-100 mb-1">Headquarters</h3>
                  <p className="text-slate-400 text-sm">Suva, Fiji — Rooted in Legacy</p>
                  <p className="text-slate-500 text-xs mt-1">Global remote team</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-900/50 border border-slate-800">
                <div className="w-12 h-12 rounded-xl bg-teal-500/10 flex items-center justify-center flex-shrink-0 text-teal-400">
                  <MessageSquare className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-orbitron text-sm font-semibold text-slate-100 mb-1">Connect Social</h3>
                  <p className="text-slate-400 text-sm"><a href="https://linkedin.com/company/buildwithai" target="_blank" rel="noopener noreferrer" className="hover:text-teal-400 transition-colors">LinkedIn</a> · <a href="https://github.com/buildwithai" target="_blank" rel="noopener noreferrer" className="hover:text-teal-400 transition-colors">GitHub</a></p>
                  <p className="text-slate-500 text-xs mt-1">Follow our journey</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Side - Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          >
            <div className="bg-slate-950/80 backdrop-blur-md rounded-2xl border border-slate-800 p-6 md:p-8">
              <h2 className="font-orbitron text-2xl md:text-3xl font-bold text-slate-100 mb-16">Send Secure Message</h2>
              
              {submitStatus === 'success' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mb-6 p-4 rounded-xl bg-teal-500/10 border border-teal-500/30 flex items-center gap-3"
                >
                  <Check className="w-5 h-5 text-teal-400 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-teal-300">Message Sent Successfully</p>
                    <p className="text-sm text-teal-500">We'll get back to you within 24 hours.</p>
                  </div>
                </motion.div>
              )}
              
              {submitStatus === 'error' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center gap-3"
                >
                  <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-red-300">Something Went Wrong</p>
                    <p className="text-sm text-red-500">Please try again or email us directly.</p>
                  </div>
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">
                    Full Name <span className="text-teal-400">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-slate-900 text-slate-100 rounded-xl border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent ${errors.name ? 'border-red-500/50 focus:ring-red-500' : 'border-slate-700 hover:border-slate-600'}`}
                    placeholder="Ajay Sidal"
                   
                    aria-invalid={errors.name ? 'true' : 'false'}
                    aria-describedby={errors.name ? 'name-error' : undefined}
                  />
                  {errors.name && (
                    <p id="name-error" className="mt-1.5 text-sm text-red-400 flex items-center gap-1.5" role="alert">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
                    Company Email <span className="text-teal-400">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-slate-900 text-slate-100 rounded-xl border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent ${errors.email ? 'border-red-500/50 focus:ring-red-500' : 'border-slate-700 hover:border-slate-600'}`}
                    placeholder="ajay@buildwithai.digital"
                   
                    aria-invalid={errors.email ? 'true' : 'false'}
                    aria-describedby={errors.email ? 'email-error' : undefined}
                  />
                  {errors.email && (
                    <p id="email-error" className="mt-1.5 text-sm text-red-400 flex items-center gap-1.5" role="alert">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {errors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="organization" className="block text-sm font-medium text-slate-300 mb-2">
                    Organization / Agency Name <span className="text-teal-400">*</span>
                  </label>
                  <input
                    type="text"
                    id="organization"
                    name="organization"
                    value={formData.organization}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-slate-900 text-slate-100 rounded-xl border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent ${errors.organization ? 'border-red-500/50 focus:ring-red-500' : 'border-slate-700 hover:border-slate-600'}`}
                    placeholder="Build With AI"
                   
                    aria-invalid={errors.organization ? 'true' : 'false'}
                    aria-describedby={errors.organization ? 'org-error' : undefined}
                  />
                  {errors.organization && (
                    <p id="org-error" className="mt-1.5 text-sm text-red-400 flex items-center gap-1.5" role="alert">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {errors.organization}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="interest" className="block text-sm font-medium text-slate-300 mb-2">
                    Area of Interest <span className="text-teal-400">*</span>
                  </label>
                  <select
                    id="interest"
                    name="interest"
                    value={formData.interest}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-slate-900 text-slate-100 rounded-xl border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent appearance-none ${errors.interest ? 'border-red-500/50 focus:ring-red-500' : 'border-slate-700 hover:border-slate-600'}`}
                   
                    aria-invalid={errors.interest ? 'true' : 'false'}
                    aria-describedby={errors.interest ? 'interest-error' : undefined}
                  >
                    {interests.map((opt) => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                  {errors.interest && (
                    <p id="interest-error" className="mt-1.5 text-sm text-red-400 flex items-center gap-1.5" role="alert">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {errors.interest}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-2">
                    Message / Project Details <span className="text-teal-400">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className={`w-full px-4 py-3 bg-slate-900 text-slate-100 rounded-xl border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none ${errors.message ? 'border-red-500/50 focus:ring-red-500' : 'border-slate-700 hover:border-slate-600'}`}
                    placeholder="Describe your project, timeline, team size, and any specific requirements..."
                   
                    aria-invalid={errors.message ? 'true' : 'false'}
                    aria-describedby={errors.message ? 'message-error' : undefined}
                  />
                  {errors.message && (
                    <p id="message-error" className="mt-1.5 text-sm text-red-400 flex items-center gap-1.5" role="alert">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {errors.message}
                    </p>
                  )}
                </div>

                 
                 
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Sending Securely...
                    </>
                  ) : (
                    <>
                      Send Secure Message
                      <Check className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                    </>
                  )}

                <p className="text-xs text-slate-500 text-center">
                  By submitting, you agree to our <a href="/privacy" className="text-teal-400 hover:underline">Privacy Policy</a> and <a href="/terms" className="text-teal-400 hover:underline">Terms of Service</a>. Your data is encrypted in transit and at rest.
                </p>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
