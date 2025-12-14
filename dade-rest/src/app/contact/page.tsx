export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* Header */}
      <div className="bg-amber-700 text-white py-8 px-4 text-center">
        <h1 className="text-2xl font-bold mb-1">📞 اتصل بنا</h1>
        <p className="text-amber-200 text-sm">Duhok - K.R.O</p>
      </div>

      {/* Contact Cards */}
      <div className="max-w-md mx-auto px-4 py-8 space-y-4">
        {/* Phone */}
        <a 
          href="tel:+9647508122922"
          className="block bg-white rounded-2xl p-6 shadow-sm text-center active:scale-95 transition-transform"
        >
          <span className="text-4xl block mb-3">📞</span>
          <h3 className="font-bold text-gray-800 mb-1">اتصل بنا</h3>
          <p className="text-xl font-bold text-green-600" dir="ltr">+964 750 812 2922</p>
          <p className="text-xs text-gray-400 mt-1">انقر للاتصال</p>
        </a>

        {/* Location */}
        <a 
          href="https://www.google.com/maps/search/?api=1&query=Duhok+-+K.R.O"
          target="_blank"
          rel="noopener noreferrer"
          className="block bg-white rounded-2xl p-6 shadow-sm text-center active:scale-95 transition-transform"
        >
          <span className="text-4xl block mb-3">📍</span>
          <h3 className="font-bold text-gray-800 mb-1">موقعنا</h3>
          <p className="text-lg font-bold text-red-600">Duhok - K.R.O</p>
          <p className="text-xs text-gray-400 mt-1">انقر لعرض الخريطة</p>
        </a>

        {/* Hours */}
        <div className="bg-white rounded-2xl p-6 shadow-sm text-center">
          <span className="text-4xl block mb-3">🕐</span>
          <h3 className="font-bold text-gray-800 mb-3">ساعات العمل</h3>
          <div className="space-y-2 text-sm">
            <p><span className="text-gray-500">السبت - الخميس:</span> <span className="font-bold">10 ص - 12 م</span></p>
            <p><span className="text-gray-500">الجمعة:</span> <span className="font-bold">2 م - 12 م</span></p>
          </div>
        </div>
      </div>

      {/* Order CTA */}
      <div className="px-4 pb-8">
        <div className="max-w-md mx-auto bg-amber-600 text-white rounded-2xl p-6 text-center">
          <span className="text-3xl block mb-2">🍕</span>
          <h2 className="font-bold mb-3">جاهز للطلب؟</h2>
          <a
            href="tel:+9647508122922"
            className="inline-block bg-white text-amber-600 px-6 py-3 rounded-xl font-bold"
          >
            📞 اطلب الآن
          </a>
        </div>
      </div>
    </div>
  );
}
