"use client"

export default function FoodsPage() {
  return (
    <div className="text-center mt-12 animate-fadeIn">
      <h2 className="text-3xl font-extrabold text-orange-600 mb-3">🍽️ All Foods</h2>
      <p className="text-lg text-gray-700 mb-6">Explore the delicious data!</p>
      <div className="bg-orange-100 p-6 rounded-xl shadow-md inline-block">
        <h3 className="text-2xl font-semibold text-orange-700 mb-2">👨‍🍳 Welcome to the Admin Kitchen!</h3>
        <p className="text-base text-gray-600 max-w-md mx-auto">
          Here's where all the magic happens – manage your menu, track the orders, and keep everything cookin' just right! 🍔🍕🍩
        </p>
      </div>
    </div>
  );
}
