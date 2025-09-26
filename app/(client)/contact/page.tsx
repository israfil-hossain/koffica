'use client';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {ScheduleButton} from '@/components/schedule-button';
import { createContactSubmission } from '@/actions/createContactSubmission';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const result = await createContactSubmission(formData);
      
      if (result.success) {
        toast.success('Thank you for your message! We\'ll get back to you soon.');
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      } else {
        toast.error('Failed to submit your message. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactInfo = [
    {
      title: 'Phone',
      value: '+880 1723560 254',
      icon: '☕'
    },
    {
      title: 'Email',
      value: 'koffica@gmail.com',
      icon: '📧'
    },
    {
      title: 'Address',
      value: 'Coffee District, Dhaka, Bangladesh',
      icon: '📍'
    },
    {
      title: 'Hours',
      value: 'Mon-Fri: 7AM-9PM, Sat-Sun: 8AM-10PM',
      icon: '🕒'
    }
  ];

  return (
    <div className="min-h-screen bg-black">

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Contact <span className="text-yellow-600">Us</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            {`Ready to discover the perfect coffee? Have questions about our beans or brewing methods?
            We'd love to hear from you and help you find your ideal coffee experience. `}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Contact Form */}
          <Card className="shadow-lg bg-gray-900 border-gray-800">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-white mb-6">Send Us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name" className="text-gray-300">Full Name *</Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="mt-1 bg-gray-800 border-gray-700 text-white placeholder-gray-400"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-gray-300">Email Address *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="mt-1 bg-gray-800 border-gray-700 text-white placeholder-gray-400"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phone" className="text-gray-300">Phone Number</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      className="mt-1 bg-gray-800 border-gray-700 text-white placeholder-gray-400"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                  <div>
                    <Label htmlFor="subject" className="text-gray-300">Subject *</Label>
                    <Input
                      id="subject"
                      name="subject"
                      type="text"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      className="mt-1 bg-gray-800 border-gray-700 text-white placeholder-gray-400"
                      placeholder="Coffee Consultation"
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="message" className="text-gray-300">Message *</Label>
                  <Textarea
                    id="message"
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    className="mt-1 min-h-32 bg-gray-800 border-gray-700 text-white placeholder-gray-400"
                    placeholder="Tell us about your coffee preferences and what you're looking for..."
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-yellow-600 hover:bg-yellow-700 text-black py-3 disabled:opacity-50 font-semibold"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">Get in Touch</h2>
              <p className="text-gray-300 mb-8">
                {`We're here to help you discover the perfect coffee experience. Whether you need brewing advice,
                have questions about our beans, or want to discuss custom blends, don't hesitate to reach out.`}
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {contactInfo.map((info, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className="text-2xl">{info.icon}</div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{info.title}</h3>
                        <p className="text-gray-600">{info.value}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
              <div className="space-y-3">
                <ScheduleButton />
               
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <section className="bg-gray-50 rounded-2xl p-8 md:p-12 mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-600">Quick answers to common questions about our services</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                question: 'How long does a consultation take?',
                answer: 'Initial consultations typically take 60-90 minutes, depending on the size and complexity of your space.'
              },
              {
                question: 'Do you provide plant maintenance?',
                answer: 'Yes! We offer ongoing maintenance services and provide detailed care instructions for all plants.'
              },
              {
                question: 'What areas do you serve?',
                answer: 'We currently serve the greater metropolitan area within a 50-mile radius of our main location.'
              },
              {
                question: 'Can you work with my budget?',
                answer: 'Absolutely! We offer solutions for various budgets and can customize packages to meet your needs.'
              }
            ].map((faq, index) => (
              <div key={index} className="space-y-2">
                <h4 className="font-semibold text-gray-900">{faq.question}</h4>
                <p className="text-gray-600 text-sm">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Map Placeholder */}
        {/* <section className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Visit Our Showroom</h2>
          <div className="bg-gray-200 rounded-2xl h-64 flex items-center justify-center mb-6">
            <div className="text-center">
              <div className="text-4xl mb-2">🗺️</div>
              <p className="text-gray-600">Interactive map would be displayed here</p>
              <p className="text-sm text-gray-500">123 Green Street, Plant City, PC 12345</p>
            </div>
          </div>
          <Button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3">
            Get Directions
          </Button>
        </section> */}
       
      </main>

    </div>
  );
};

export default Contact;
