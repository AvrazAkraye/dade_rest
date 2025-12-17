export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors" dir="rtl">
      {/* Header */}
      <div className="bg-amber-700 dark:bg-amber-900 text-white py-8 px-4 text-center transition-colors">
        <h1 className="text-2xl font-bold mb-1">📞 اتصل بنا</h1>
        <p className="text-amber-200 dark:text-amber-300 text-sm">Duhok - K.R.O</p>
      </div>

      {/* Contact Cards */}
      <div className="max-w-md mx-auto px-4 py-8 space-y-4">
        {/* Phone */}
        <a 
          href="tel:+9647508122922"
          className="block bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm text-center active:scale-95 transition-all"
        >
          <span className="text-4xl block mb-3">📞</span>
          <h3 className="font-bold text-gray-800 dark:text-white mb-1">اتصل بنا</h3>
          <p className="text-xl font-bold text-green-600 dark:text-green-400" dir="ltr">+964 750 812 2922</p>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">انقر للاتصال</p>
        </a>

        {/* Location */}
        <a 
          href="https://maps.google.com/?q=36.8669,42.9503"
          target="_blank"
          rel="noopener noreferrer"
          className="block bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm text-center active:scale-95 transition-all"
        >
          <span className="text-4xl block mb-3">📍</span>
          <h3 className="font-bold text-gray-800 dark:text-white mb-1">موقعنا</h3>
          <p className="text-lg font-bold text-red-600 dark:text-red-400">دهوك، إقليم كردستان العراق</p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Duhok - K.R.O</p>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">انقر لعرض الخريطة</p>
        </a>

        {/* Map */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-sm">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3224.5!2d42.9503!3d36.8669!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzbCsDUyJzAwLjgiTiA0MsKwNTcnMDEuMSJF!5e0!3m2!1sen!2s!4v1234567890"
            width="100%"
            height="200"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>

        {/* Hours */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm text-center transition-colors">
          <span className="text-4xl block mb-3">🕐</span>
          <h3 className="font-bold text-gray-800 dark:text-white mb-3">ساعات العمل</h3>
          <div className="space-y-2 text-sm">
            <p><span className="text-gray-500 dark:text-gray-400">السبت - الخميس:</span> <span className="font-bold text-gray-800 dark:text-white">10 ص - 12 م</span></p>
            <p><span className="text-gray-500 dark:text-gray-400">الجمعة:</span> <span className="font-bold text-gray-800 dark:text-white">2 م - 12 م</span></p>
          </div>
        </div>
      </div>

      {/* Order CTA */}
      <div className="px-4 pb-8">
        <div className="max-w-md mx-auto bg-amber-600 dark:bg-amber-800 text-white rounded-2xl p-6 text-center transition-colors">
          <span className="text-3xl block mb-2">🍕</span>
          <h2 className="font-bold mb-3">جاهز للطلب؟</h2>
          <a
            href="tel:+9647508122922"
            className="inline-block bg-white dark:bg-gray-800 text-amber-600 dark:text-amber-400 px-6 py-3 rounded-xl font-bold transition-colors"
          >
            📞 اطلب الآن
          </a>
        </div>
      </div>
    </div>
  );
}
