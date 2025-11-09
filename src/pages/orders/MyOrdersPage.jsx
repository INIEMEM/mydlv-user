import React, { useState } from 'react';
import { X, MapPin, Trash2 } from 'lucide-react';

export default function MyOrdersPage() {
  const [activeTab, setActiveTab] = useState('cart');
  const [showMapModal, setShowMapModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const cartOrders = [
    {
      id: 1,
      restaurant: 'Chicken Republic Ikot Ekpene Road',
      item: 'Big Boyz Combo',
      price: 7700,
      deliveryPack: '2X Delivery pack',
      choices: ['2 Chicken', 'Chips (Regular) x1', 'Chilled Drink (1) Large (Fish fish)'],
      specialRequest: 'No bone out'
    },
    {
      id: 2,
      restaurant: 'Local Market Ikot Ekpene Road',
      item: 'Palmoil one keg',
      price: 5000,
      image: null
    }
  ];

  const activeOrders = [
    {
      id: '656d1dd4',
      restaurant: 'Chicken Republic Ikot Ekpene road',
      item: 'Big Boyz Combo',
      price: 7700,
      date: '21-10-2025',
      deliveryPack: '2X Delivery pack',
      deliveryCode: '1212',
      status: 'arrived',
      stages: [
        { label: 'Order Confirmed', completed: true },
        { label: 'Order is ready', completed: true },
        { label: 'Rider has picked up order', completed: true },
        { label: 'Your order has arrived', completed: true, active: true }
      ]
    }
  ];

  const completedOrders = [
    {
      id: '656d1dd4',
      restaurant: 'Chicken Republic Ikot Ekpene road',
      item: 'Big Boyz Combo',
      price: 7700,
      date: '21-10-2025',
      deliveryPack: '2X Delivery pack',
      deliveryCode: '1212',
      status: 'completed'
    }
  ];

  const savedOrders = [
    {
      id: 1,
      restaurant: 'Chicken Republic Ikot Ekpene Road',
      item: 'Big Boyz Combo',
      price: 7700,
      choices: ['2 Chicken', 'Chips (Regular) x1', 'Chilled Drink (1) Large (Fish fish)']
    }
  ];

  const openMapModal = (order) => {
    setSelectedOrder(order);
    setShowMapModal(true);
  };

  const renderCartTab = () => (
    <div className="space-y-4 md:flex">
      <div className='overflow-y-auto max-h-[calc(100vh-300px)]'>
      {cartOrders.map((order) => (
        <div key={order.id} className=" rounded-lg p-4 shadow-sm">
          <div className="flex items-start justify-between mb-3">
            <h3 className="font-semibold text-gray-800">{order.restaurant}</h3>
            <button className="text-red-500 hover:text-red-600">
              <Trash2 size={20} />
            </button>
          </div>
          
          <div className="flex gap-4">
            <div className="w-24 h-24 bg-gray-200 rounded-lg flex-shrink-0"></div>
            
            <div className="flex-1">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-medium">{order.item}</h4>
                <span className="font-semibold">₦{order.price.toLocaleString()}</span>
              </div>
              
              {order.deliveryPack && (
                <div className="flex items-center gap-1 text-sm text-gray-600 mb-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span>{order.deliveryPack}</span>
                </div>
              )}
              
              {order.choices && (
                <div className="text-sm text-gray-600 mb-2">
                  <p className="font-medium">Your choices:</p>
                  {order.choices.map((choice, idx) => (
                    <p key={idx}>{choice}</p>
                  ))}
                </div>
              )}
              
              {order.specialRequest && (
                <p className="text-sm text-gray-600">
                  Special request: {order.specialRequest}
                </p>
              )}
              
              <div className="flex gap-2 mt-3">
                <button className="px-4 py-1.5 bg-gray-800 text-white text-sm rounded hover:bg-gray-700">
                  Edit choices
                </button>
                <button className="px-4 py-1.5 bg-green-600 text-white text-sm rounded hover:bg-green-700">
                  Add new order
                </button>
                <button className="px-4 py-1.5 border border-gray-300 text-sm rounded hover:bg-gray-50">
                  Save order →
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
      </div>
      
      
      <div className=" rounded-lg p-4 shadow-sm">
        <div className="flex justify-between mb-2">
          <span className="text-gray-600">Sub total (3 Orders)</span>
          <span className="font-semibold">₦14,400.00</span>
        </div>
        <div className="flex justify-between mb-2">
          <span className="text-gray-600">Delivery fee</span>
          <span className="font-semibold">₦600.00</span>
        </div>
        <div className="flex justify-between mb-4">
          <span className="text-gray-600">Service fee</span>
          <span className="font-semibold">₦600.00</span>
        </div>
        <div className="flex justify-between mb-4 pt-2 border-t">
          <span className="font-semibold text-lg">Total</span>
          <span className="font-semibold text-lg">₦16,600.00</span>
        </div>
        <button className="w-full bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700">
          PLACE ORDER
        </button>
        <button className="w-full mt-2  bg-white text-gray-900 py-2 rounded-lg font-medium  flex items-center justify-center gap-2">
          <span className="text-xl">+</span> Add new order
        </button>
      </div>
    </div>
  );

  const renderActiveTab = () => (
    <div className="space-y-6">
      {activeOrders.map((order) => (
        <div key={order.id}>
          {/* Top Card with Map */}
          <div className=" rounded-lg shadow-sm overflow-hidden">
            <div className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800 mb-1">{order.restaurant}</h3>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm">{order.item}</p>
                      <p className="text-sm font-semibold">₦{order.price.toLocaleString()}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-green-600 font-semibold">Delivery Code: {order.deliveryCode}</p>
                      <p className="text-xs text-gray-600">2X Delivery pack</p>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Order ID: {order.id}</p>
                  <p className="text-xs text-gray-500">Date: {order.date}</p>
                </div>
                <button className="ml-2 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center hover:bg-red-600">
                  <X size={18} className="text-white" />
                </button>
              </div>

              {/* Progress Steps */}
              <div className="relative mt-6 mb-4">
                <div className="flex justify-between items-start">
                  {order.stages.map((stage, idx) => (
                    <div key={idx} className="flex flex-col items-center relative z-10" style={{ width: `${100 / order.stages.length}%` }}>
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center mb-2 ${
                        stage.completed ? 'bg-black' : 'bg-gray-300'
                      }`}>
                        {stage.active && (
                          <div className="w-6 h-6 bg-green-500 rounded-full"></div>
                        )}
                      </div>
                      <p className={`text-xs text-center max-w-[80px] ${stage.active ? 'text-green-600 font-semibold' : 'text-gray-600'}`}>
                        {stage.label}
                      </p>
                    </div>
                  ))}
                </div>
                {/* Connection line */}
                <div className="absolute top-3 left-0 right-0 h-0.5 bg-gray-300" style={{ width: '100%', zIndex: 0 }}>
                  <div className="h-full bg-black" style={{ width: '75%' }}></div>
                </div>
              </div>
            </div>

            {/* Map */}
            <button 
              onClick={() => openMapModal(order)}
              className="w-full bg-gray-100 overflow-hidden h-64 flex items-center justify-center cursor-pointer hover:opacity-90 transition-opacity relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200">
                {/* Map-like background */}
                <div className="absolute inset-0" style={{
                  backgroundImage: `
                    linear-gradient(rgba(200, 200, 200, 0.3) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(200, 200, 200, 0.3) 1px, transparent 1px)
                  `,
                  backgroundSize: '30px 30px'
                }}></div>
                
                {/* Green pin at top */}
                <div className="absolute top-16 right-20">
                  <MapPin className="text-green-500" size={40} fill="#22c55e" />
                </div>
                
                {/* Route line */}
                <svg className="absolute inset-0 w-full h-full">
                  <path
                    d="M 320 60 Q 250 120 180 220"
                    stroke="#d1d5db"
                    strokeWidth="3"
                    fill="none"
                    strokeDasharray="8,4"
                  />
                </svg>
                
                {/* Black dot at bottom */}
                <div className="absolute bottom-10 left-32 w-3 h-3 bg-black rounded-full"></div>
              </div>
            </button>
          </div>

          {/* Bottom Card with Summary */}
          <div className=" rounded-lg p-4 shadow-sm mt-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800 mb-1">{order.restaurant}</h3>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm">{order.item}</p>
                    <p className="text-sm font-semibold">₦{order.price.toLocaleString()}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-green-600 font-semibold">Delivery Code: {order.deliveryCode}</p>
                    <p className="text-xs text-gray-600">2X Delivery pack</p>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-1">Order ID: {order.id}</p>
                <p className="text-xs text-gray-500">Date: {order.date}</p>
              </div>
            </div>

            {/* Progress Steps */}
            <div className="relative mt-6 mb-4">
              <div className="flex justify-between items-start">
                {order.stages.map((stage, idx) => (
                  <div key={idx} className="flex flex-col items-center relative z-10" style={{ width: `${100 / order.stages.length}%` }}>
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center mb-2 ${
                      stage.completed ? 'bg-black' : 'bg-gray-300'
                    }`}>
                      {stage.active && (
                        <div className="w-6 h-6 bg-green-500 rounded-full"></div>
                      )}
                    </div>
                    <p className={`text-xs text-center max-w-[80px] ${stage.active ? 'text-green-600 font-semibold' : 'text-gray-600'}`}>
                      {stage.label}
                    </p>
                  </div>
                ))}
              </div>
              {/* Connection line */}
              <div className="absolute top-3 left-0 right-0 h-0.5 bg-gray-300" style={{ width: '100%', zIndex: 0 }}>
                <div className="h-full bg-black" style={{ width: '75%' }}></div>
              </div>
            </div>

            {/* See Rider Button */}
            <button className="w-full py-2.5 border border-gray-300 rounded hover:bg-gray-50 flex items-center justify-center gap-2 mt-4">
              <span className="text-lg">👁️</span>
              <span className="font-medium">See Rider</span>
            </button>
          </div>
        </div>
      ))}
    </div>
  );

  const renderCompletedTab = () => (
    <div className="space-y-4">
      {completedOrders.map((order) => (
        <div key={order.id} className=" rounded-lg p-4 shadow-sm">
          <h3 className="font-semibold text-gray-800 mb-2">{order.restaurant}</h3>
          <div className="flex justify-between items-start mb-2">
            <div>
              <p className="text-sm font-medium">{order.item}</p>
              <p className="text-sm text-gray-600">Order ID: {order.id}</p>
              <p className="text-sm text-gray-600">Date: {order.date}</p>
            </div>
            <p className="font-semibold">₦{order.price.toLocaleString()}</p>
          </div>
          
          <div className="flex items-center gap-2 mt-3">
            <div className="flex-1 h-2 bg-green-500 rounded-full"></div>
            <span className="text-sm text-green-600 font-semibold">Your order has arrived</span>
          </div>
        </div>
      ))}
    </div>
  );

  const renderSavedOrdersTab = () => (
    <div className="space-y-4">
      {savedOrders.map((order) => (
        <div key={order.id} className=" rounded-lg p-4 shadow-sm">
          <div className="flex items-start justify-between mb-3">
            <h3 className="font-semibold text-gray-800">{order.restaurant}</h3>
            <button className="text-red-500 hover:text-red-600">
              <Trash2 size={20} />
            </button>
          </div>
          
          <div className="flex gap-4">
            <div className="w-24 h-24 bg-gray-200 rounded-lg flex-shrink-0"></div>
            
            <div className="flex-1">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-medium">{order.item}</h4>
                <span className="font-semibold">₦{order.price.toLocaleString()}</span>
              </div>
              
              {order.choices && (
                <div className="text-sm text-gray-600 mb-3">
                  <p className="font-medium">Your choices:</p>
                  {order.choices.map((choice, idx) => (
                    <p key={idx}>{choice}</p>
                  ))}
                </div>
              )}
              
              <button className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700">
                Quick Reorder
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen  p-6">
      <div className="max-w-4xl mx-auto">
        {/* Tabs */}
        <div className=" rounded-lg shadow-sm mb-6">
          <div className="flex border-b">
            <button
              onClick={() => setActiveTab('cart')}
              className={`flex-1 py-4 text-center font-medium transition-colors ${
                activeTab === 'cart'
                  ? 'bg-[#333] text-white'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              Cart
            </button>
            <button
              onClick={() => setActiveTab('active')}
              className={`flex-1 py-4 text-center font-medium transition-colors ${
                activeTab === 'active'
                  ? 'bg-[#333] text-white'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              Active
            </button>
            <button
              onClick={() => setActiveTab('completed')}
              className={`flex-1 py-4 text-center font-medium transition-colors ${
                activeTab === 'completed'
                  ? 'bg-[#333] text-white'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              Completed
            </button>
            <button
              onClick={() => setActiveTab('saved')}
              className={`flex-1 py-4 text-center font-medium transition-colors ${
                activeTab === 'saved'
                  ? 'bg-[#333] text-white'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              Saved orders
            </button>
          </div>
        </div>

        {/* Content */}
        <div>
          {activeTab === 'cart' && renderCartTab()}
          {activeTab === 'active' && renderActiveTab()}
          {activeTab === 'completed' && renderCompletedTab()}
          {activeTab === 'saved' && renderSavedOrdersTab()}
        </div>
      </div>

      {/* Map Modal */}
      {showMapModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-lg font-semibold">Delivery Tracking</h3>
              <button
                onClick={() => setShowMapModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="p-4">
              {selectedOrder && (
                <div className="mb-4 bg-green-50 p-3 rounded">
                  <p className="font-semibold">{selectedOrder.restaurant}</p>
                  <p className="text-sm text-gray-600">Order ID: {selectedOrder.id}</p>
                  <p className="text-sm text-green-600 font-semibold">Delivery Code: {selectedOrder.deliveryCode}</p>
                </div>
              )}
              
              <div className="bg-gradient-to-br from-green-100 via-blue-100 to-purple-100 rounded-lg h-96 flex items-center justify-center relative overflow-hidden">
                {/* Simulated map with route */}
                <div className="absolute inset-0">
                  <div className="absolute top-1/4 left-1/4 w-12 h-12 bg-red-500 rounded-full flex items-center justify-center animate-pulse">
                    <MapPin className="text-white" size={24} />
                  </div>
                  <div className="absolute bottom-1/4 right-1/4 w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                    <MapPin className="text-white" size={24} />
                  </div>
                  <svg className="absolute inset-0 w-full h-full">
                    <path
                      d="M 150 150 Q 300 100 450 300"
                      stroke="#4ade80"
                      strokeWidth="4"
                      fill="none"
                      strokeDasharray="10,5"
                    />
                  </svg>
                </div>
                
                <div className="relative z-10 text-center bg-white bg-opacity-90 p-6 rounded-lg">
                  <MapPin className="mx-auto mb-2 text-green-600" size={48} />
                  <p className="text-lg font-semibold">Live Delivery Tracking</p>
                  <p className="text-sm text-gray-600 mt-2">Your order is on the way!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}