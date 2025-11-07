import React, { useState } from 'react';
import { X, Plus, Trash2 } from 'lucide-react';

export default function ShoppingList() {
  const [items, setItems] = useState([]);
  const [currentItem, setCurrentItem] = useState('');
  const [savedLists, setSavedLists] = useState([
    { id: 1, name: 'Monthly Groceries' },
    { id: 2, name: 'Toiletries' }
  ]);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [listTitle, setListTitle] = useState('');

  const addItem = () => {
    if (currentItem.trim()) {
      setItems([...items, { id: Date.now(), text: currentItem.trim() }]);
      setCurrentItem('');
    }
  };

  const removeItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  const clearList = () => {
    setItems([]);
  };

  const handleSaveList = () => {
    if (listTitle.trim()) {
      setSavedLists([...savedLists, { id: Date.now(), name: listTitle.trim() }]);
      setListTitle('');
      setShowSaveModal(false);
      setItems([]);
    }
  };

  const handleViewItems = () => {
    // Navigate to items matching page
    alert('Redirecting to food items page...');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-green-500 rounded flex items-center justify-center">
            <span className="text-white font-bold text-xl">m</span>
          </div>
          <span className="text-xl font-bold">mydlv</span>
        </div>
        <div className="flex items-center gap-4">
          <button className="text-sm text-gray-600 hover:text-gray-800">🏠 Home</button>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">₦ N650,000.00</span>
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              🛒
            </div>
            <span className="bg-green-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">0</span>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-gray-50 border-r border-gray-200 min-h-[calc(100vh-73px)] p-4">
          <div className="space-y-2">
            <div className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded cursor-pointer">
              <span className="text-lg">🧭</span>
              <span className="text-sm">Explore</span>
            </div>
            <div className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded cursor-pointer">
              <span className="text-lg">🔔</span>
              <span className="text-sm">Notifications</span>
            </div>
            <div className="flex items-center gap-3 px-3 py-2 bg-gray-200 rounded cursor-pointer">
              <span className="text-lg">📋</span>
              <span className="text-sm font-medium">Shopping List</span>
            </div>
            <div className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded cursor-pointer">
              <span className="text-lg">🚗</span>
              <span className="text-sm">My Rider</span>
            </div>
            <div className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded cursor-pointer">
              <span className="text-lg">📦</span>
              <span className="text-sm">My Orders</span>
            </div>
            <div className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded cursor-pointer">
              <span className="text-lg">⚙️</span>
              <span className="text-sm">My Services</span>
            </div>
            <div className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded cursor-pointer">
              <span className="text-lg">❓</span>
              <span className="text-sm">Support</span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          <div className="max-w-4xl mx-auto flex gap-6">
            {/* Shopping List Form */}
            <div className="flex-1 bg-white border border-gray-200 rounded-lg shadow-sm p-6">
              <div className="mb-4">
                <h3 className="text-base font-semibold mb-1">Shop Better | Create a your shopping list</h3>
              </div>

              {/* Items Input Area */}
              <div className="mb-4">
                <div className="flex gap-2 mb-3">
                  <input
                    type="text"
                    value={currentItem}
                    onChange={(e) => setCurrentItem(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addItem()}
                    placeholder="Type item and press Enter..."
                    className="flex-1 px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-green-500"
                  />
                  <button
                    onClick={addItem}
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 text-sm"
                  >
                    <Plus size={16} />
                  </button>
                </div>

                {/* Scrollable Items List */}
                <div className="border border-gray-200 rounded h-64 overflow-y-auto bg-gray-50">
                  {items.length === 0 ? (
                    <div className="flex items-center justify-center h-full text-gray-400 text-sm">
                      Start adding items to your list
                    </div>
                  ) : (
                    <div className="p-2 space-y-1">
                      {items.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center justify-between px-3 py-2 bg-white border border-gray-200 rounded text-sm hover:bg-gray-50"
                        >
                          <span>{item.text}</span>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <button
                  onClick={handleViewItems}
                  disabled={items.length === 0}
                  className="flex-1 bg-green-500 text-white py-2.5 rounded font-medium hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-sm"
                >
                  VIEW ITEMS
                </button>
              </div>

              <div className="flex gap-2 mt-2">
                <button
                  onClick={clearList}
                  disabled={items.length === 0}
                  className="flex-1 bg-red-500 text-white py-2 rounded font-medium hover:bg-red-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-sm"
                >
                  Clear list
                </button>
                <button
                  onClick={() => setShowSaveModal(true)}
                  disabled={items.length === 0}
                  className="flex-1 bg-gray-800 text-white py-2 rounded font-medium hover:bg-gray-900 disabled:bg-gray-300 disabled:cursor-not-allowed text-sm"
                >
                  Save list
                </button>
              </div>

              {/* Profile Badge */}
              <div className="mt-6 flex items-center gap-2 px-3 py-2 bg-gray-900 rounded w-fit">
                <div className="w-6 h-6 bg-gray-600 rounded-full"></div>
                <span className="text-white text-xs font-medium">Michael</span>
              </div>
            </div>

            {/* Saved Lists Sidebar */}
            <div className="w-64">
              <div className="bg-gray-800 text-white px-4 py-2 rounded-t text-sm font-medium">
                Saved shopping List
              </div>
              <div className="bg-white border border-gray-200 rounded-b p-3 space-y-2">
                {savedLists.map((list) => (
                  <div key={list.id} className="bg-white border border-gray-200 rounded p-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">{list.name}</span>
                    </div>
                    <button className="w-full bg-gray-900 text-white py-1.5 rounded text-xs hover:bg-gray-800">
                      View
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Save Modal */}
      {showSaveModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Save Shopping List</h3>
              <button
                onClick={() => setShowSaveModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={20} />
              </button>
            </div>
            <input
              type="text"
              value={listTitle}
              onChange={(e) => setListTitle(e.target.value)}
              placeholder="Enter list title"
              className="w-full px-3 py-2 border border-gray-300 rounded mb-4 focus:outline-none focus:border-green-500"
              autoFocus
            />
            <div className="flex gap-2">
              <button
                onClick={() => setShowSaveModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveList}
                disabled={!listTitle.trim()}
                className="flex-1 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}