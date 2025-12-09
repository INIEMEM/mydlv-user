import React, { useEffect, useState, useRef } from 'react';
import { X, Plus, Edit2, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../utils/api';

const API_BASE = 'https://mydlv.onrender.com/api/v1';

export default function ShoppingList() {
  const navigate = useNavigate();

  // UI state
  const [activeTab, setActiveTab] = useState('create'); // 'create' | 'saved'

  // Inputs for new item
  const [productName, setProductName] = useState('');
  const [productQty, setProductQty] = useState('');
  const [productGuage, setProductGuage] = useState('');
  const [showViewModal, setShowViewModal] = useState(false);
  const [viewListData, setViewListData] = useState(null);
  const [viewListItems, setViewListItems] = useState([]);
  const [isEditingList, setIsEditingList] = useState(false);
  const [productAvailable, setProductAvailable] = useState(false);
  const [showNotAvailable, setShowNotAvailable] = useState(false);
  // Items in working list (before save)
  const [items, setItems] = useState([]); // { id, product, unit, guage, query }

  // Suggestions
  const [suggestions, setSuggestions] = useState([]);
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);
  const [loading, setLoading] = useState(false);
  // Saved lists
  const [savedLists, setSavedLists] = useState([]); // { id, name }
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [listTitle, setListTitle] = useState('');
  const [isViewingAfterSave, setIsViewingAfterSave] = useState(false);
  // Editing item
  const [editingId, setEditingId] = useState(null);

  // Refs
  const searchAbortController = useRef(null);

  useEffect(() => {
    // Fetch saved lists when component mounts
    fetchSavedLists();

    return () => {
      if (searchAbortController.current) searchAbortController.current.abort();
    };
  }, []);

  // --- API helpers ---
  const fetchSavedLists = async () => {
    setLoading(true);
    try {
      const res = await api.get("shopping-list");
      const lists = res.data?.data?.data || res.data?.data || [];
      const normalized = (Array.isArray(lists) ? lists : []).map((l) => ({
        id: l._id || l.id,
        name: l.name
      }));
      setSavedLists(normalized);
    setLoading(false);
    } catch (err) {
      console.warn("Failed to load saved lists", err);
      setLoading(false);
    }
  };
  

  const searchProducts = async (value) => {
    setProductName(value);
  
    if (!value || !value.trim()) {
      setSuggestions([]);
      return;
    }
  
    if (searchAbortController.current) searchAbortController.current.abort();
    searchAbortController.current = new AbortController();
  
    setLoadingSuggestions(true);
  
    try {
      const res = await api.get(`product/filter?q=${encodeURIComponent(value)}`, {
        signal: searchAbortController.current.signal
      });
  
      const found = res.data?.data?.data || []; // FIXED
  
      setSuggestions(Array.isArray(found) ? found.slice(0, 8) : []);
      setProductAvailable(found.length > 0);
      if (found.length === 0) {
        setShowNotAvailable(true);
      
        // Auto-hide after 2 seconds
        setTimeout(() => {
          setShowNotAvailable(false);
        }, 2000);
      } else {
        setShowNotAvailable(false);
      }
    } catch (err) {
      if (err.name !== "CanceledError" && err.name !== "AbortError") {
        console.warn("Search error", err);
        setSuggestions([]);
      }
    }finally {
      setLoadingSuggestions(false);
    }
  
   
  };
  
  

  const selectSuggestion = (item) => {
    setProductName(item.title || '');
    setProductGuage(item.guage || '');
    setSuggestions([]);
  };

  // --- Items management ---
  const addItem = () => {
    if (!productAvailable) {
      alert("This product is not available in stock. You cannot add it.");
      return;
    }
    const name = (productName || '').trim();
    const qty = (productQty || '').toString().trim();
    const guage = (productGuage || '').trim();

    if (!name) return;

    // Default qty to 1 if empty
    const finalQty = qty || '1';

    const query = `${name} ${finalQty} ${guage}`.trim();

    const newItem = {
      id: Date.now(),
      product: name,
      unit: finalQty,
      guage,
      query
    };

    setItems((s) => [...s, newItem]);

    // Reset inputs
    setProductName('');
    setProductQty('');
    setProductGuage('');
    setSuggestions([]);
  };

  const startEditItem = (id) => {
    const it = items.find((i) => i.id === id);
    if (!it) return;
    setEditingId(id);
    setProductName(it.product);
    setProductQty(it.unit);
    setProductGuage(it.guage);
  };

  const saveEditItem = () => {
    if (!editingId) return;
    setItems((prev) =>
      prev.map((it) => (it.id === editingId ? { ...it, product: productName, unit: productQty || '1', guage: productGuage, query: `${productName} ${productQty || '1'} ${productGuage}`.trim() } : it))
    );
    setEditingId(null);
    setProductName('');
    setProductQty('');
    setProductGuage('');
  };

  const removeItem = (id) => {
    setItems((prev) => prev.filter((p) => p.id !== id));
  };

  const clearList = () => setItems([]);

  // --- Save shopping list to backend ---
  const handleSaveList = async () => {
    if (!listTitle.trim() || items.length === 0) return;
  
    const payload = {
      name: listTitle.trim(),
      items: items.map((i) => ({
        product: i.product,
        query: i.query,
        unit: i.unit,
        guage: i.guage
      }))
    };
  
    try {
      const res = await api.post("shopping-list", payload);
  
      const listData =
        res.data?.data?.data ||
        res.data?.data ||
        {};
  
      const listId = listData?._id;
      const listItems = listData?.itemsSaved || [];
  
      // update sidebar
      if (listId) {
        setSavedLists((s) => [...s, { id: listId, name: listTitle.trim() }]);
      }
  
      setListTitle("");
      setShowSaveModal(false);
      setItems([]);
  
      // 🚀 IF the user clicked "VIEW ITEMS", redirect after saving
      if (isViewingAfterSave && listId) {
        navigate(`/shopping-list/${listId}`, {
          state: {
            listData,
            listItems
          }
        });
      }
  
      // reset the flag
      setIsViewingAfterSave(false);
  
    } catch (err) {
      console.error("Save list failed", err);
    }
  };
  
  

  // Delete a saved list locally (no backend delete call implemented - adapt if API exists)
  const removeSavedListLocal = (id) => {
    setSavedLists((s) => s.filter((l) => l.id !== id));
  };

  // When user clicks View for a saved list -> navigate to the route you specified (keep existing navigate('./1'))
  const handleViewSavedList = async (list) => {
    if (!list?.id) return;
  
    try {
      const res = await api.get(`shopping-list/${list.id}`);
  
      const listData = res.data?.data?.data[0] || {};
      const listItems = res.data?.data?.data[0]?.listItems || [];

      console.log("Fetched list data:", listData, listItems);
      setViewListData(listData);
      
      setViewListItems(
        (listItems || []).map(i => ({
          product: i.product || "",
          unit: i.unit || "",
          guage: i.guage || "",
        }))
      );
      setShowViewModal(true);
      // Pass the data through the router state
      // navigate(`/shopping-list/${list.id}`, {
      //   state: {
      //     listData,
      //     listItems
      //   }
      // });
  
    } catch (err) {
      console.error("Failed to fetch shopping list", err);
    }
  };
  
  const handleAddItemToViewedList = () => 
{
  if (!productName.trim()) return;

  const newItem = {
    product: productName,
    unit: productQty || "1",
    guage: productGuage,
    query: `${productName} ${productQty || "1"} ${productGuage}`.trim()
  };

  setViewListItems((prev) => [...prev, newItem]);

  // Clear fields
  setProductName("");
  setProductQty("");
  setProductGuage("");
};


  const handleUpdateList = async () => {
    if (!viewListData?._id) return;
  
    const payload = {
      name: viewListData.name,
      items: viewListItems.map(it => ({
        product: it.product,
        query: `${it.product} ${it.unit} ${it.guage}`,
        unit: it.unit,
        guage: it.guage
      }))
    };
  
    try {
      await api.put(`shopping-list/${viewListData._id}`, payload);
  
      // Update sidebar list name
      setSavedLists(prev =>
        prev.map(l =>
          l.id === viewListData._id ? { ...l, name: viewListData.name } : l
        )
      );
  
      setIsEditingList(false);
      alert("Shopping list updated!");
    } catch (err) {
      console.error("Update failed", err);
    }
  };
  
  
  // DELETE Shopping List
  const handleDeleteList = async () => {
    if (!viewListData?._id) return;
  
    try {
      await api.delete(`shopping-list/${viewListData._id}`);
  
      // Remove from saved sidebar
      setSavedLists(prev => prev.filter(l => l.id !== viewListData._id));
  
      setShowViewModal(false);
      alert("Shopping list deleted!");
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  const handleViewItems = async () => {
    if (items.length === 0) return;
  
    const payload = {
      name: "Temporary List",
      items: items.map(i => ({
        product: i.product,
        query: i.query,
        unit: i.unit,
        guage: i.guage
      }))
    };
  
    try {
      const res = await api.post("shopping-list", payload);
  
      const listData = res.data?.data?.data || {};
      const listItems = res.data?.data?.itemsSaved || [];
      const listId = listData?._id;
  
      if (!listId) {
        console.error("List ID missing");
        return;
      }
  
      navigate(`/shopping-list/${listId}`, {
        state: {
          listData,
          listItems
        }
      });
  
    } catch (err) {
      console.error("Failed to create shopping list", err);
    }
  };
  if (loading) {
    return (
      <div className="min-h flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading shopping list...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-0 md:p-1 min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Mobile Tabs */}
        <div className="flex gap-2 mb-4 lg:hidden">
          <button
            onClick={() => setActiveTab('create')}
            className={`flex-1 py-2 px-4 rounded font-medium text-sm ${activeTab === 'create' ? 'bg-[#333] text-white' : ' text-gray-700 border border-gray-300'}`}>
            Create Shopping List
          </button>
          <button
            onClick={() => setActiveTab('saved')}
            className={`flex-1 py-2 px-4 rounded font-medium text-sm ${activeTab === 'saved' ? 'bg-[#333] text-white' : ' text-gray-700 border border-gray-300'}`}>
            Saved List
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Shopping List Form */}
          <div className={`flex-1 ${activeTab === 'create' ? 'block' : 'hidden'} lg:block`}>
            <div className="p-4 md:p-6">
              <div className="mb-4 bg-[#222] text-center p-2 text-white rounded hidden md:block">
                <h3 className="text-sm md:text-base font-semibold mb-1">Shop Better | Create your shopping list</h3>
              </div>

              {/* Inputs: product name (with suggestions), qty, guage */}
              <div className="mb-4">
                <div className="space-y-3 mb-4 flex items-center">
                  <div 
                    className="relative"
                    style={{flex: 2}}
                  >
                    <input
                      type="text"
                      value={productName}
                      onChange={(e) => searchProducts(e.target.value)}
                      placeholder="name"
                      className="w-full  px-3 py-2 border border-gray-300 rounded text-sm bg-transparent mt-3 "
                    />

                  {productName.trim() !== "" && (
                    <div className="absolute z-20 bg-white border mt-1 rounded shadow md:w-[300px] w-[250px]">
                     {loadingSuggestions ? (
                      <div className="p-3 text-center text-sm text-gray-500 flex items-center justify-center gap-2">
                        <div className="w-4 h-4 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
                        Searching…
                      </div>
                    ) : suggestions.length > 0 ? (
                      <div className="max-h-56 overflow-y-auto">
                        {suggestions.map((item) => (
                          <div
                            key={item._id}
                            onClick={() => selectSuggestion(item)}
                            className="flex items-center gap-3 p-2 hover:bg-gray-100 cursor-pointer"
                          >
                            <img
                              src={item.images?.[0]}
                              alt={item.title}
                              className="w-12 h-12 rounded object-cover"
                            />
                            <div>
                              <p className="text-sm font-medium">{item.title}</p>
                              <p className="text-xs text-gray-500">{item.guage}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : showNotAvailable ? (
                      <div className="p-2 text-sm text-gray-500">
                        Product not available in stock
                      </div>
                    ) : null}

                    </div>
                  )}


                  </div>

                  <input
                    type="number"
                    value={productQty}
                    onChange={(e) => setProductQty(e.target.value)}
                    placeholder="Qty(e.g. 2)"
                    className="w-full px-3 py-2 border border-gray-300 rounded text-sm bg-transparent flex-1"
                  />

                  <input
                    type="text"
                    value={productGuage}
                    onChange={(e) => setProductGuage(e.target.value)}
                    placeholder="Unit(litres, kg, packs)"
                    className="w-full px-3 py-2 border border-gray-300 rounded text-sm bg-transparent flex-1"
                  />

                  
                </div>
                <div className="flex gap-2 mb-2">
                    {editingId ? (
                      <>
                        <button onClick={saveEditItem} className="flex-1 px-4 py-2 bg-green-500 text-white rounded text-sm">Save Item</button>
                        <button onClick={() => { setEditingId(null); setProductName(''); setProductQty(''); setProductGuage(''); }} className="flex-1 px-4 py-2 border border-gray-300 rounded text-sm">Cancel</button>
                      </>
                    ) : (
                      <>
                        <button onClick={addItem} className="flex-1 px-4 py-2 bg-[#444] text-white rounded text-sm flex items-center justify-center"><Plus size={16} /> Add</button>
                        <button onClick={() => { setProductName(''); setProductQty(''); setProductGuage(''); setSuggestions([]); }} className="flex-1 px-4 py-2 border border-gray-300 rounded text-sm">Clear</button>
                      </>
                    )}
                  </div>

                {/* Scrollable Items List */}
                <div className="border border-gray-200 rounded h-48 md:h-64 overflow-y-auto bg-gray-50 ">
                  {items.length === 0 ? (
                    <div className="flex items-center justify-center h-full text-gray-400 text-xs md:text-sm px-4 text-center ">Start adding items to your list</div>
                  ) : (
                    <div className="p-2 space-y-1">
                      {items.map((item) => (
                        <div key={item.id} className="flex items-center justify-between px-3 py-2 bg-white border border-gray-200 rounded text-sm hover:bg-gray-50">
                          <div className="flex-1 pr-2">
                            <div className="font-medium break-words">{item.product}</div>
                            <div className="text-xs text-gray-500">{item.unit} {item.guage}</div>
                          </div>

                          <div className="flex items-center gap-2">
                            <button onClick={() => startEditItem(item.id)} className="p-1 text-gray-600 hover:text-gray-800"><Edit2 size={16} /></button>
                            <button onClick={() => removeItem(item.id)} className="p-1 text-red-500 hover:text-red-700"><Trash2 size={16} /></button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2">
                <button 
                  onClick={() => {
                    setIsViewingAfterSave(true);
                    setShowSaveModal(true);
                  }}
                  disabled={items.length === 0} 
                  className="w-full bg-green-500 text-white py-2.5 rounded font-medium hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-sm"
                >VIEW ITEMS</button>

                <div className="flex gap-2">
                  <button onClick={clearList} disabled={items.length === 0} className="flex-1 bg-red-500 text-white py-2 rounded font-medium hover:bg-red-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-sm">Clear list</button>
                  <button onClick={() => setShowSaveModal(true)} disabled={items.length === 0} className="flex-1 bg-gray-800 text-white py-2 rounded font-medium hover:bg-gray-900 disabled:bg-gray-300 disabled:cursor-not-allowed text-sm">Save list</button>
                </div>
              </div>
            </div>
          </div>

          {/* Saved Lists Sidebar */}
          <div className={`w-full lg:w-64 ${activeTab === 'saved' ? 'block' : 'hidden'} lg:block `}>
            <div className="bg-[#222] text-center text-white px-4 py-2 rounded-t text-sm font-medium hidden md:block">Saved shopping List</div>
            <div className="rounded-b p-3 space-y-2 max-h-96 lg:max-h-none overflow-y-auto">
              {savedLists.length === 0 ? (
                <div className="text-center text-gray-400 text-sm py-8">No saved lists yet</div>
              ) : (
                savedLists.map((list) => (
                  <div key={list.id} className="flex gap-3 rounded p-3 items-center ">
                    <div className="flex-3 w-[120px] items-center">
                      <span className="text-sm font-medium break-words">{list.name}</span>
                    </div>

                    <div className="flex-1 flex gap-2">
                      <button onClick={() => handleViewSavedList(list)} className="w-full bg-[#333] text-white h-[34px] rounded text-xs hover:bg-gray-800">View</button>
                      {/* <button onClick={() => removeSavedListLocal(list.id)} title="Remove" className="w-10 bg-red-100 text-red-600 rounded text-xs"> <X size={14} /></button> */}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Save Modal */}
      {showSaveModal && (
        <div 
         
         className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 ">
          <div 
            
            className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl ">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Save Shopping List</h3>
              <button onClick={() => setShowSaveModal(false)} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
            </div>

            <input type="text" value={listTitle} onChange={(e) => setListTitle(e.target.value)} placeholder="Enter list title" className="w-full px-3 py-2 border border-gray-300 rounded mb-4 focus:outline-none focus:border-green-500" autoFocus />

            <div className="flex gap-2">
              <button onClick={() => setShowSaveModal(false)} className="flex-1 px-4 py-2 border border-gray-300 rounded hover:bg-gray-50">Cancel</button>
              <button onClick={handleSaveList} disabled={!listTitle.trim()} className="flex-1 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed">Save</button>
            </div>
          </div>
        </div>
      )}

      {showViewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm pb-[70px] ">
          <div className="relative bg-white w-full max-w-lg mx-4 p-6 rounded-xl shadow-lg max-h-[90vh] overflow-y-auto ">

            {/* TITLE */}
            <div className="mb-4">
              {isEditingList ? (
                <input
                  className="border p-2 rounded w-full"
                  value={viewListData?.name}
                  onChange={e =>
                    setViewListData(prev => ({ ...prev, name: e.target.value }))
                  }
                />
              ) : (
                <h3 className="text-xl font-semibold">{viewListData?.name}</h3>
              )}
            </div>

            {/* ITEMS */}
            {viewListItems.length === 0 ? (
              <p className="text-gray-500 text-sm">No items in this list.</p>
            ) : (
              viewListItems.map((item, index) => (
                <div key={item._id || index} className="p-3 mb-3 border rounded bg-gray-50">
                  {isEditingList ? (
                    <div className="md:flex  gap-2">
                      <input
                        className="border p-1 rounded flex-1"
                        value={item.product}
                        onChange={e => {
                          const val = e.target.value;
                          setViewListItems(prev => {
                            const arr = [...prev];
                            arr[index] = { ...arr[index], guage: val };
                            return arr;
                          });
                        }}
                      />

                      <input
                        className="border p-1 rounded w-20"
                        value={item.unit}
                        onChange={e => {
                          const val = e.target.value;
                          setViewListItems(prev => {
                            const arr = [...prev];
                            arr[index].unit = val;
                            return arr;
                          });
                        }}
                      />

                      <input
                        className="border p-1 rounded w-24"
                        value={item.guage}
                        placeholder='pack,liter'
                        onChange={e => {
                          const val = e.target.value;
                          setViewListItems(prev => {
                            const arr = [...prev];
                            arr[index].guage = val;
                            return arr;
                          });
                        }}
                      />

                      <button
                        onClick={() =>
                          setViewListItems(prev => prev.filter((_, i) => i !== index))
                        }
                        className="text-red-500"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ) : (
                    <div>
                      <p className="font-medium">{item.product}</p>
                      <p className="text-xs text-gray-500">
                        {item.unit} {item.guage}
                      </p>
                    </div>
                  )}
                </div>
              ))
            )}
            {isEditingList && (
              <div className="p-3 mb-4 border rounded bg-gray-100">
                <h4 className="font-medium mb-2 text-sm">Add New Item</h4>

                <div className="flex flex-col gap-2">
                  <input
                    type="text"
                    className="border p-2 rounded"
                    placeholder="Product name"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                  />

                  <input
                    type="text"
                    className="border p-2 rounded"
                    placeholder="Unit (e.g. 2)"
                    value={productQty}
                    onChange={(e) => setProductQty(e.target.value)}
                  />

                  <input
                    type="text"
                    className="border p-2 rounded"
                    placeholder="Guage (pack, liter)"
                    value={productGuage}
                    onChange={(e) => setProductGuage(e.target.value)}
                  />

                  <button
                    onClick={handleAddItemToViewedList}
                    className="w-full bg-green-600 text-white py-2 rounded text-sm"
                  >
                    Add Item
                  </button>
                </div>
              </div>
            )}

            {/* ACTION BUTTONS */}
            <div className="flex gap-2 mt-4">
              {!isEditingList ? (
                <>
                  <button
                    onClick={() => setIsEditingList(true)}
                    className="flex-1 px-4 py-2 bg-[#333] text-white rounded"
                  >
                    Edit
                  </button>

                  <button
                    onClick={handleDeleteList}
                    className="flex-1 px-4 py-2 bg-red-600 text-white rounded"
                  >
                    Delete
                  </button>

                  <button
                    onClick={() => {
                      setShowViewModal(false);
                      navigate(`/shopping-list/${viewListData?._id}`, {
                        state: { listData: viewListData, listItems: viewListItems },
                      });
                    }}
                    className="flex-1 px-4 py-2 bg-green-600 text-white rounded"
                  >
                    View Page
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => setIsEditingList(false)}
                    className="flex-1 px-4 py-2 border rounded"
                  >
                    Cancel
                  </button>

                  <button
                    onClick={handleUpdateList}
                    className="flex-1 px-4 py-2 bg-green-600 text-white rounded"
                  >
                    Save Changes
                  </button>
                </>
              )}
            </div>

            {/* CLOSE ICON */}
            <button
              onClick={() => setShowViewModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-black"
            >
              ✕
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
