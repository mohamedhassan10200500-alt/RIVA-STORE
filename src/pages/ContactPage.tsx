import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input, Textarea } from '../components/ui/Input';
import { useToast } from '../context/ToastContext';

export function ContactPage() {
  const { showToast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    showToast('تم إرسال رسالتك بنجاح! سنتواصل معك قريباً');
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary-500 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">تواصل معنا</h1>
          <p className="text-primary-100 text-lg max-w-xl mx-auto">
            نحن هنا لمساعدتك! لا تتردد في التواصل معنا لأي استفسار أو طلب.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                معلومات التواصل
              </h2>
              <p className="text-gray-600 mb-8">
                يمكنك التواصل معنا عبر أي من الطرق التالية ونرد عليك في أقرب وقت.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-primary-500" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">العنوان</h3>
                  <p className="text-gray-600">
                    الرياض، المملكة العربية السعودية
                    <br />
                    شارع العليا، مركز الفيصلية، الطابق الثالث
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-primary-500" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">الهاتف</h3>
                  <p className="text-gray-600" dir="ltr">
                    +966 12 345 6789
                  </p>
                  <p className="text-gray-600" dir="ltr">
                    +966 98 765 4321
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-primary-500" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">البريد الإلكتروني</h3>
                  <p className="text-gray-600">info@riva-med.com</p>
                  <p className="text-gray-600">support@riva-med.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6 text-primary-500" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">
                    ساعات العمل
                  </h3>
                  <p className="text-gray-600">
                    السبت - الخميس: 9 ص - 9 م
                    <br />
                    الجمعة: مغلق
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl p-8 shadow-card">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                أرسل لنا رسالة
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <Input
                    label="الاسم الكامل"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                  <Input
                    label="البريد الإلكتروني"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <Input
                    label="رقم الهاتف"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    dir="ltr"
                  />
                  <Input
                    label="الموضوع"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  />
                </div>
                <Textarea
                  label="الرسالة"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  required
                  placeholder="اكتب رسالتك هنا..."
                />
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  loading={isSubmitting}
                  icon={<Send className="w-5 h-5" />}
                >
                  إرسال الرسالة
                </Button>
              </form>
            </div>
          </div>
        </div>

        {/* Map */}
        <div className="mt-16">
          <div className="bg-primary-100 rounded-2xl h-80 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="w-12 h-12 text-primary-500 mx-auto mb-4" />
              <p className="text-gray-600">
                الرياض، المملكة العربية السعودية
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
