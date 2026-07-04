import React from 'react';
import { Link } from 'react-router-dom';
import { Award, Users, Heart, Shield, Target, Eye } from 'lucide-react';
import { Button } from '../components/ui/Button';

export function AboutPage() {
  const values = [
    {
      icon: Award,
      title: 'الجودة',
      desc: 'نلتزم بأعلى معايير الجودة في كل منتج نصنعه',
    },
    {
      icon: Heart,
      title: 'الراحة',
      desc: 'تصميمات تضمن راحتك خلال ساعات العمل الطويلة',
    },
    {
      icon: Shield,
      title: 'الاحترافية',
      desc: 'مظهر احترافي يعكس مهنيتك وطبيعة عملك',
    },
    {
      icon: Users,
      title: 'الخدمة',
      desc: 'فريق دعم متخصص لخدمتكم على مدار الساعة',
    },
  ];

  const stats = [
    { value: '10,000+', label: 'عميل راضٍ' },
    { value: '50+', label: 'تصميم حصري' },
    { value: '5', label: 'سنوات خبرة' },
    { value: '98%', label: 'نسبة الرضا' },
  ];

  const team = [
    {
      name: 'أحمد الغhamdi',
      role: 'المدير التنفيذي',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face',
    },
    {
      name: 'سارة الأحمد',
      role: 'مديرة التصميم',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face',
    },
    {
      name: 'محمد العمري',
      role: 'مدير العمليات',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face',
    },
    {
      name: 'نورة الحربي',
      role: 'مديرة التسويق',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <div className="relative bg-primary-500 py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                'url("https://images.unsplash.com/photo-1631217868744-256c0d6e8a0c?w=1920&h=800&fit=crop")',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            من نحن
          </h1>
          <p className="text-xl text-primary-100 max-w-2xl mx-auto">
            RIVA هي علامة تجارية رائدة في مجال الملابس الطبية الفاخرة، نقدم
            تصميمات تجمع بين الأناقة والاحترافية
          </p>
        </div>
      </div>

      {/* Story Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">قصتنا</h2>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                بدأت RIVA في عام 2019 برؤية واضحة: تقديم ملابس طبية تجمع
                بين الفخامة والأداء العملي. نحن نؤمن أن المحترفين في المجال
                الطبي يستحقون أفضل الملابس التي تعكس احترافيتهم.
              </p>
              <p>
                خلال السنوات الماضية، طورنا مجموعة واسعة من الملابس الطبية
                التي تلبي احتياجات الأطباء والممرضين والصيادلة. كل منتج
                يمر بعملية تصميم وتصنيع دقيقة لضمان الجودة والراحة.
              </p>
              <p>
                اليوم، نفخر بخدمة آلاف المحترفين في المجال الطبي عبر
                المملكة العربية السعودية والمنطقة العربية.
              </p>
            </div>
          </div>
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1582719471384-89ccf5cedd0a?w=600&h=600&fit=crop"
              alt="RIVA Story"
              className="w-full rounded-2xl shadow-soft-lg"
            />
            <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-secondary-500 rounded-2xl -z-10" />
          </div>
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-primary-50 rounded-2xl p-8">
              <div className="w-14 h-14 rounded-xl bg-primary-500 flex items-center justify-center mb-6">
                <Target className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                رسالتنا
              </h3>
              <p className="text-gray-600 leading-relaxed">
                تقديم ملابس طبية فاخرة تجمع بين الأناقة والاحترافية، مع
                الحفاظ على أعلى معايير الجودة والراحة، لدعم المحترفين في
                المجال الطبي في أداء عملهم بكل ثقة وتميز.
              </p>
            </div>
            <div className="bg-secondary-50 rounded-2xl p-8">
              <div className="w-14 h-14 rounded-xl bg-secondary-500 flex items-center justify-center mb-6">
                <Eye className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">رؤيتنا</h3>
              <p className="text-gray-600 leading-relaxed">
                أن نكون العلامة التجارية الأولى للملابس الطبية الفاخرة في
                المنطقة العربية، من خلال الابتكار المستمر والتميز في خدمة
                العملاء وتقديم منتجات تتجاوز توقعاتهم.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-primary-500 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, idx) => (
              <div key={idx}>
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                  {stat.value}
                </div>
                <div className="text-primary-100">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Values */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">قيمنا</h2>
          <p className="text-gray-600 max-w-xl mx-auto">
            القيم التي نؤمن بها وتوجه كل ما نقوم به
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-all text-center"
            >
              <div className="w-14 h-14 rounded-xl bg-primary-100 flex items-center justify-center mx-auto mb-4">
                <value.icon className="w-7 h-7 text-primary-500" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                {value.title}
              </h3>
              <p className="text-gray-600 text-sm">{value.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Team */}
      <div className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              فريقنا
            </h2>
            <p className="text-gray-600 max-w-xl mx-auto">
              تعرف على الفريق ورائي RIVA
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {team.map((member, idx) => (
              <div key={idx} className="text-center">
                <div className="relative mb-4 inline-block">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-32 h-32 rounded-full object-cover mx-auto"
                  />
                  <div className="absolute bottom-0 right-0 w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">
                      {member.name[0]}
                    </span>
                  </div>
                </div>
                <h3 className="font-bold text-gray-900">{member.name}</h3>
                <p className="text-sm text-gray-500">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-primary-50 py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            هل أنت جاهز لتجربة الفرق؟
          </h2>
          <p className="text-gray-600 mb-8">
            اكتشف مجموعتنا من الملابس الطبية الفاخرة واستمتع بتجربة تسوق
            استثنائية
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/shop">
              <Button variant="primary" size="lg">
                تسوق الآن
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="outline" size="lg">
                تواصل معنا
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
