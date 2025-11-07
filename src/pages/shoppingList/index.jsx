import React, { useState } from 'react';
import { X, Plus } from 'lucide-react';

export default function ShoppingList() {
  const [items, setItems] = useState([]);
  const [currentItem, setCurrentItem] = useState('');
  const [savedLists, setSavedLists] = useState([
    { id: 1, name: 'Monthly Groceries' },
    { id: 2, name: 'Toiletries' }
  ]);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [listTitle, setListTitle] = useState('');
  const [activeTab, setActiveTab] = useState('create'); // 'create' or 'saved'

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
    <div className="p-4 md:p-1  min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Mobile Tabs */}
        <div className="flex gap-2 mb-4 lg:hidden">
          <button
            onClick={() => setActiveTab('create')}
            className={`flex-1 py-2 px-4 rounded font-medium text-sm ${
              activeTab === 'create'
                ? 'bg-gray-900 text-white'
                : 'bg-white text-gray-700 border border-gray-300'
            }`}
          >
            Create Shopping List
          </button>
          <button
            onClick={() => setActiveTab('saved')}
            className={`flex-1 py-2 px-4 rounded font-medium text-sm ${
              activeTab === 'saved'
                ? 'bg-gray-900 text-white'
                : 'bg-white text-gray-700 border border-gray-300'
            }`}
          >
            Saved List
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Shopping List Form */}
          <div className={`flex-1 ${activeTab === 'create' ? 'block' : 'hidden'} lg:block`}>
            <div className="   p-4 md:p-6">
              <div className="mb-4">
                <h3 className="text-sm md:text-base font-semibold mb-1">
                  Shop Better | Create a your shopping list
                </h3>
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
                    className="px-3 md:px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 text-sm flex items-center justify-center"
                  >
                    <Plus size={16} />
                  </button>
                </div>

                {/* Scrollable Items List */}
                <div className="border border-gray-200 rounded h-48 md:h-64 overflow-y-auto bg-gray-50">
                  {items.length === 0 ? (
                    <div className="flex items-center justify-center h-full text-gray-400 text-xs md:text-sm px-4 text-center">
                      Start adding items to your list
                    </div>
                  ) : (
                    <div className="p-2 space-y-1">
                      {items.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center justify-between px-3 py-2 bg-white border border-gray-200 rounded text-sm hover:bg-gray-50"
                        >
                          <span className="flex-1 break-words pr-2">{item.text}</span>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-red-500 hover:text-red-700 flex-shrink-0"
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
              <div className="space-y-2">
                <button
                  onClick={handleViewItems}
                  disabled={items.length === 0}
                  className="w-full bg-green-500 text-white py-2.5 rounded font-medium hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-sm"
                >
                  VIEW ITEMS
                </button>

                <div className="flex gap-2">
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
              </div>

              {/* Profile Badge */}
              {/* <div className="mt-4 md:mt-6 flex items-center gap-2 px-3 py-2 bg-gray-900 rounded w-fit">
                <div className="w-6 h-6 bg-gray-600 rounded-full"></div>
                <span className="text-white text-xs font-medium">Michael</span>
              </div> */}
            </div>
          </div>

          {/* Saved Lists Sidebar */}
          <div className={`w-full lg:w-64 ${activeTab === 'saved' ? 'block' : 'hidden'} lg:block`}>
            <div className="bg-gray-800 text-white px-4 py-2 rounded-t text-sm font-medium">
              Saved shopping List
            </div>
            <div className="rounded-b p-3 space-y-2 max-h-96 lg:max-h-none overflow-y-auto">
              {savedLists.length === 0 ? (
                <div className="text-center text-gray-400 text-sm py-8">
                  No saved lists yet
                </div>
              ) : (
                savedLists.map((list) => (
                  <div key={list.id} className=" rounded p-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium break-words">{list.name}</span>
                    </div>
                    <button className="w-full bg-gray-900 text-white py-1.5 rounded text-xs hover:bg-gray-800">
                      View
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Save Modal */}
      {showSaveModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl">
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