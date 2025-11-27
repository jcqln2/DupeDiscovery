import React, { useState } from 'react';
import { Search, Star, ShoppingBag, Wallet, Check } from 'lucide-react';

// Mock dupe data
const dupeData = {
  brands: [
    { id: 1, name: 'MORPHE', logo: 'M', displayName: 'MORPHE' },
    { id: 2, name: 'DRUNK ELEPHANT', logo: 'DE', displayName: 'DRUNK ELEPHANT™' },
    { id: 3, name: 'Rodial', logo: 'R', displayName: 'Rodial' },
    { id: 4, name: 'Glossier', logo: 'G', displayName: 'Glossier.' },
    { id: 5, name: "Kiehl's", logo: 'K', displayName: "Kiehl's SINCE 1851" },
    { id: 6, name: 'HERBIVORE', logo: 'H', displayName: 'HERBIVORE' },
    { id: 7, name: 'TOM FORD', logo: 'TF', displayName: 'TOM FORD BEAUTY' },
    { id: 8, name: 'TATCHA', logo: 'T', displayName: 'TATCHA.' }
  ],
  products: {
    1: [
      { id: 1, name: 'Morphe 35O Palette', price: 23, dupe: 'e.l.f. Bite Size Eyeshadow', dupePrice: 3, savings: 20, rating: 4.5 },
      { id: 2, name: 'Morphe Fluidity Foundation', price: 18, dupe: 'Maybelline Fit Me', dupePrice: 6, savings: 12, rating: 4.3 }
    ],
    2: [
      { id: 3, name: 'Protini Polypeptide Cream', price: 68, dupe: 'CeraVe Moisturizing Cream', dupePrice: 16, savings: 52, rating: 4.7 },
      { id: 4, name: 'C-Firma Vitamin C Serum', price: 80, dupe: 'The Ordinary Vitamin C', dupePrice: 9, savings: 71, rating: 4.4 }
    ],
    3: [
      { id: 5, name: 'Dragon\'s Blood Sculpting Gel', price: 110, dupe: 'The INKEY List Caffeine Serum', dupePrice: 11, savings: 99, rating: 4.2 }
    ],
    4: [
      { id: 6, name: 'Boy Brow', price: 18, dupe: 'e.l.f. Wow Brow Gel', dupePrice: 4, savings: 14, rating: 4.6 },
      { id: 7, name: 'Cloud Paint Blush', price: 22, dupe: 'Flower Beauty Blush Bomb', dupePrice: 9, savings: 13, rating: 4.5 }
    ],
    5: [
      { id: 8, name: 'Midnight Recovery Concentrate', price: 72, dupe: 'The Ordinary Squalane + Rosehip', dupePrice: 11, savings: 61, rating: 4.4 }
    ],
    6: [
      { id: 9, name: 'Phoenix Facial Oil', price: 88, dupe: 'The Ordinary 100% Rosehip Oil', dupePrice: 10, savings: 78, rating: 4.3 }
    ],
    7: [
      { id: 10, name: 'Shade and Illuminate', price: 82, dupe: 'NYX Highlight & Contour Pro Palette', dupePrice: 15, savings: 67, rating: 4.5 }
    ],
    8: [
      { id: 11, name: 'The Dewy Skin Cream', price: 68, dupe: 'Belif The True Cream', dupePrice: 38, savings: 30, rating: 4.6 }
    ]
  }
};

export default function App() {
  const [screen, setScreen] = useState('brands'); // 'brands', 'products', 'cart'
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState([]);
  const [luksoBalance, setLuksoBalance] = useState(25);
  const [walletConnected, setWalletConnected] = useState(false);
  const [purchaseComplete, setPurchaseComplete] = useState(false);
  const [tempSelectedBrand, setTempSelectedBrand] = useState(null);

  const handleBrandSelect = (brand) => {
    setTempSelectedBrand(brand);
  };

  const confirmBrandSelection = () => {
    if (tempSelectedBrand) {
      setSelectedBrand(tempSelectedBrand);
      setScreen('products');
      setTempSelectedBrand(null);
    }
  };

  const addToCart = (product) => {
    if (!cart.find(item => item.id === product.id)) {
      setCart([...cart, { ...product, brandName: selectedBrand.name }]);
    }
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const connectWallet = () => {
    setWalletConnected(true);
  };

  const checkout = () => {
    const totalItems = cart.length;
    if (luksoBalance >= totalItems && walletConnected) {
      setLuksoBalance(luksoBalance - totalItems);
      setPurchaseComplete(true);
      setTimeout(() => {
        setPurchaseComplete(false);
        setCart([]);
        setScreen('brands');
      }, 2500);
    }
  };

  const filteredBrands = dupeData.brands.filter(brand =>
    brand.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#3a2e26] relative overflow-hidden">
      {/* Speckled pattern background */}
      <div className="absolute inset-0 opacity-30" style={{
        backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)`,
        backgroundSize: '20px 20px'
      }}></div>
      
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Main Content */}
        <div className="flex-1 px-6 pt-12 pb-24">
          {/* Brands Screen */}
          {screen === 'brands' && (
            <div>
              <h2 className="text-white text-lg font-medium mb-6 text-center px-4">
                Search for the brand of the product that you'd like to find a dupe of
              </h2>
              
              {/* Search Bar */}
              <div className="relative mb-8">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search brands..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-xl bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/50"
                />
              </div>

              {/* Brand Grid */}
              <div className="grid grid-cols-2 gap-6 mb-8">
                {filteredBrands.map((brand) => (
                  <button
                    key={brand.id}
                    onClick={() => handleBrandSelect(brand)}
                    className={`flex flex-col items-center justify-center aspect-square rounded-full transition-all ${
                      brand.id === 6 
                        ? tempSelectedBrand?.id === brand.id
                          ? 'bg-green-600 scale-105'
                          : 'bg-green-600 hover:scale-105'
                        : tempSelectedBrand?.id === brand.id
                          ? 'bg-white scale-105'
                          : 'bg-white hover:scale-105'
                    }`}
                  >
                    <div className="text-center px-4 py-2">
                      {brand.id === 2 && (
                        <div className="text-3xl mb-2">🐘</div>
                      )}
                      {brand.id === 4 && (
                        <div className="text-4xl font-bold mb-2">G</div>
                      )}
                      {brand.id === 5 && (
                        <div className="text-xs font-bold mb-1">KIEHL'S</div>
                      )}
                      {brand.id === 6 && (
                        <div className="text-lg font-bold mb-1">HERBIVORE</div>
                      )}
                      {brand.id === 7 && (
                        <div className="text-xs font-bold mb-1">TOM FORD</div>
                      )}
                      {brand.id === 8 && (
                        <div className="text-lg font-bold mb-1">TATCHA</div>
                      )}
                      <p className={`text-xs font-medium leading-tight ${
                        brand.id === 6 ? 'text-white' : 'text-black'
                      }`}>
                        {brand.displayName}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

        {/* SELECT BRAND Button - Fixed at bottom */}
        {screen === 'brands' && (
          <div className="fixed bottom-0 left-0 right-0 p-6 bg-[#3a2e26] border-t border-white/10">
            <button
              onClick={confirmBrandSelection}
              disabled={!tempSelectedBrand}
              className={`w-full py-4 rounded-xl font-semibold transition ${
                tempSelectedBrand
                  ? 'bg-white text-black hover:bg-gray-100 active:scale-95'
                  : 'bg-gray-600 text-gray-400 cursor-not-allowed'
              }`}
            >
              SELECT BRAND
            </button>
          </div>
        )}

        {/* Products Screen */}
        {screen === 'products' && selectedBrand && (
          <div className="pb-6 pt-20">
            <button
              onClick={() => {
                setScreen('brands');
                setSelectedBrand(null);
                setTempSelectedBrand(null);
              }}
              className="mb-4 text-white font-medium hover:text-gray-300 transition"
            >
              ← Back to Brands
            </button>
            <h2 className="text-xl font-semibold text-white mb-4">
              {selectedBrand.displayName || selectedBrand.name} Dupes
            </h2>
            <div className="space-y-4">
              {dupeData.products[selectedBrand.id]?.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-2xl p-5 shadow-md"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-800 mb-1">
                        {product.name}
                      </h3>
                      <p className="text-sm text-gray-600 line-through">
                        ${product.price}
                      </p>
                    </div>
                    <div className="flex items-center gap-1 bg-amber-100 px-2 py-1 rounded-full">
                      <Star size={14} className="fill-amber-500 text-amber-500" />
                      <span className="text-sm font-medium text-amber-900">
                        {product.rating}
                      </span>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 mb-3">
                    <p className="text-sm font-medium text-gray-700 mb-1">
                      Dupe Found:
                    </p>
                    <p className="font-bold text-green-700 mb-2">
                      {product.dupe}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-2xl font-bold text-green-700">
                        ${product.dupePrice}
                      </span>
                      <span className="text-sm font-medium bg-green-200 text-green-800 px-3 py-1 rounded-full">
                        Save ${product.savings}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => addToCart(product)}
                    disabled={cart.find(item => item.id === product.id)}
                    className={`w-full py-3 rounded-xl font-semibold transition ${
                      cart.find(item => item.id === product.id)
                        ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                        : 'bg-white text-black hover:bg-gray-100 active:scale-95 border-2 border-black'
                    }`}
                  >
                    {cart.find(item => item.id === product.id) ? 'Added to Cart' : 'Add to Cart'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Cart Screen */}
        {screen === 'cart' && (
          <div className="pb-6 pt-20">
            <button
              onClick={() => setScreen(selectedBrand ? 'products' : 'brands')}
              className="mb-4 text-white font-medium hover:text-gray-300 transition"
            >
              ← Continue Shopping
            </button>
            <h2 className="text-xl font-semibold text-white mb-4">
              Your Cart
            </h2>

            {cart.length === 0 ? (
              <div className="bg-white rounded-2xl p-8 text-center shadow-md">
                <ShoppingBag size={48} className="mx-auto text-gray-300 mb-3" />
                <p className="text-gray-600">Your cart is empty</p>
              </div>
            ) : (
              <>
                <div className="space-y-3 mb-6">
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="bg-white rounded-xl p-4 shadow-md flex justify-between items-center"
                    >
                      <div className="flex-1">
                        <p className="font-semibold text-gray-800 text-sm">
                          {item.dupe}
                        </p>
                        <p className="text-xs text-gray-600 mt-1">
                          Dupe for {item.brandName} {item.name}
                        </p>
                        <p className="text-lg font-bold text-green-700 mt-1">
                          ${item.dupePrice}
                        </p>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="ml-3 text-red-500 hover:text-red-700 font-medium text-sm"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>

                <div className="bg-white rounded-2xl p-5 shadow-md mb-4">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-gray-700">Subtotal:</span>
                    <span className="font-bold text-xl text-gray-800">
                      ${cart.reduce((sum, item) => sum + item.dupePrice, 0)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center pt-3 border-t border-gray-200">
                    <span className="text-gray-700 font-medium">Lukso Tokens Required:</span>
                    <span className="font-bold text-xl text-amber-900">
                      {cart.length} LYX
                    </span>
                  </div>
                </div>

                {!walletConnected ? (
                  <button
                    onClick={connectWallet}
                    className="w-full py-4 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl font-semibold shadow-lg hover:from-blue-600 hover:to-indigo-600 transition active:scale-95 flex items-center justify-center gap-2"
                  >
                    <Wallet size={20} />
                    Connect Wallet to Checkout
                  </button>
                ) : (
                  <button
                    onClick={checkout}
                    disabled={luksoBalance < cart.length}
                    className={`w-full py-4 rounded-xl font-semibold shadow-lg transition active:scale-95 flex items-center justify-center gap-2 ${
                      luksoBalance < cart.length
                        ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                        : 'bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:from-amber-600 hover:to-orange-600'
                    }`}
                  >
                    {luksoBalance < cart.length ? (
                      'Insufficient LYX Balance'
                    ) : (
                      <>
                        <ShoppingBag size={20} />
                        Complete Purchase ({cart.length} LYX)
                      </>
                    )}
                  </button>
                )}
              </>
            )}
          </div>
        )}
      </div>

      {/* Purchase Success Modal */}
      {purchaseComplete && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-6 z-50">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl animate-bounce">
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check size={40} className="text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              Purchase Complete!
            </h3>
            <p className="text-gray-600 mb-2">
              Your dupes are on the way
            </p>
            <p className="text-sm text-gray-500">
              {cart.length} LYX tokens have been deducted
            </p>
          </div>
        </div>
      )}

      {/* Header with cart and wallet - only show on products/cart screens */}
      {(screen === 'products' || screen === 'cart') && (
        <div className="fixed top-0 left-0 right-0 bg-[#3a2e26]/90 backdrop-blur-sm p-4 z-20 border-b border-white/10">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-bold text-white">Dupe Discovery</h1>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setScreen('cart')}
                className="relative p-2 bg-white/20 rounded-full hover:bg-white/30 transition"
              >
                <ShoppingBag size={22} className="text-white" />
                {cart.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                    {cart.length}
                  </span>
                )}
              </button>
              <button
                onClick={connectWallet}
                className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium transition ${
                  walletConnected
                    ? 'bg-green-500 text-white'
                    : 'bg-white/20 hover:bg-white/30 text-white'
                }`}
              >
                <Wallet size={18} />
                <span className="text-sm">{luksoBalance} LYX</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
    </div>
  );
}