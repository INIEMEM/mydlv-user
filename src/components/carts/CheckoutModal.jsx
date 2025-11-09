import React, { useState } from 'react';
import { X, Plus } from 'lucide-react';

// Import this component in your RestaurantDetailsPage.jsx:
// import CheckoutModal from './CheckoutModal';

const CheckoutModal = ({ isOpen, onClose, cartItems, subtotal, deliveryFee, serviceFee, total, restaurantData }) => {
  const [selectedPayment, setSelectedPayment] = useState('wallet');
  const [deliveryLocation, setDeliveryLocation] = useState('Home');
  const [deliveryInstructions, setDeliveryInstructions] = useState('');
  const [showInstructionsInput, setShowInstructionsInput] = useState(false);

  if (!isOpen) return null;

  const handlePayment = () => {
    // Handle payment logic here
    console.log('Processing payment...', {
      paymentMethod: selectedPayment,
      location: deliveryLocation,
      instructions: deliveryInstructions,
      total
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-[70] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <div>
            <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
              <span className="text-green-600 font-medium">Restaurants</span>
              <span>›</span>
              <span>Chicken Republic</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Checkout</h2>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Left Column - Order Summary */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Order Items</h3>
              <div className="space-y-3 mb-6">
                {cartItems.map((item) => (
                  <div key={`${item.id}-${item.vendorId}`} className="bg-gray-50 rounded-lg p-4">
                    <div className="flex gap-3 mb-2">
                      <div className="w-16 h-16 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                        {item.image && (
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        )}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 text-sm mb-1">{item.name}</h4>
                        <p className="text-xs text-gray-500 line-clamp-2">{item.description}</p>
                      </div>
                    </div>
                    
                    {item.choices && item.choices.length > 0 && (
                      <div className="text-xs text-gray-600 mb-2 pl-1">
                        {item.choices.slice(0, 3).map((choice, idx) => (
                          <div key={idx}>• {choice}</div>
                        ))}
                        {item.choices.length > 3 && (
                          <div className="text-gray-400">+{item.choices.length - 3} more</div>
                        )}
                      </div>
                    )}
                    
                    <div className="flex items-center justify-between pt-2 border-t border-gray-200">
                      <span className="text-sm text-gray-600">Qty: {item.quantity}</span>
                      <span className="font-semibold text-gray-900">₦{(item.price * item.quantity).toLocaleString()}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Price Breakdown */}
              <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Sub total ({cartItems.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
                  <span className="font-medium text-gray-900">₦{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Delivery fee</span>
                  <span className="font-medium text-gray-900">₦{deliveryFee.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Service fee</span>
                  <span className="font-medium text-gray-900">₦{serviceFee.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-lg font-bold pt-3 border-t border-gray-300">
                  <span>Total</span>
                  <span>₦{total.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Right Column - Payment & Delivery */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Payment Options</h3>
              <div className="space-y-3 mb-6">
                <button
                  onClick={() => setSelectedPayment('wallet')}
                  className={`w-full flex items-center justify-between p-4 rounded-lg border-2 transition-all ${
                    selectedPayment === 'wallet'
                      ? 'border-green-500 bg-green-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <span className="font-medium text-gray-900">Pay from wallet</span>
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    selectedPayment === 'wallet' ? 'border-green-500' : 'border-gray-300'
                  }`}>
                    {selectedPayment === 'wallet' && (
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    )}
                  </div>
                </button>

                <button
                  onClick={() => setSelectedPayment('card')}
                  className={`w-full flex items-center justify-between p-4 rounded-lg border-2 transition-all ${
                    selectedPayment === 'card'
                      ? 'border-green-500 bg-green-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <span className="font-medium text-gray-900">Pay with card</span>
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    selectedPayment === 'card' ? 'border-green-500' : 'border-gray-300'
                  }`}>
                    {selectedPayment === 'card' && (
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    )}
                  </div>
                </button>

                <button
                  onClick={() => setSelectedPayment('bank')}
                  className={`w-full flex items-center justify-between p-4 rounded-lg border-2 transition-all ${
                    selectedPayment === 'bank'
                      ? 'border-green-500 bg-green-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <span className="font-medium text-gray-900">Pay with bank transfer</span>
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    selectedPayment === 'bank' ? 'border-green-500' : 'border-gray-300'
                  }`}>
                    {selectedPayment === 'bank' && (
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    )}
                  </div>
                </button>
              </div>

              {/* Delivery Location */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-900 mb-3">
                  Choose delivery location
                </label>
                <select
                  value={deliveryLocation}
                  onChange={(e) => setDeliveryLocation(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white text-gray-900"
                >
                  <option value="Home">Home</option>
                  <option value="Office">Office</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Delivery Instructions */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-900 mb-3">
                  Delivery instructions
                </label>
                {!showInstructionsInput ? (
                  <button
                    onClick={() => setShowInstructionsInput(true)}
                    className="text-green-600 font-medium text-sm hover:text-green-700 flex items-center gap-1"
                  >
                    <Plus size={16} />
                    Add
                  </button>
                ) : (
                  <textarea
                    value={deliveryInstructions}
                    onChange={(e) => setDeliveryInstructions(e.target.value)}
                    placeholder="Enter delivery instructions..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                    rows={3}
                  />
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 px-6 py-4 bg-gray-50">
          <button
            onClick={handlePayment}
            className="w-full bg-green-500 text-white py-4 rounded-lg font-bold text-lg hover:bg-green-600 transition-colors"
          >
            Pay ₦{total.toLocaleString()}
          </button>
          <p className="text-xs text-center text-gray-500 mt-3">
            Delivery includes PIN verification for secure handover.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CheckoutModal;