import React, { useState, useEffect } from 'react';
import { ArrowLeft, ChevronRight, User, Mail, Phone, MapPin, CreditCard, Lock, Shield, HelpCircle, LogOut, X, Copy, Wallet } from 'lucide-react';
import { api } from '../../utils/api';
import { useNavigate } from 'react-router-dom';
// Mock API for demo purposes


export default function ProfilePage() {
  const [currentView, setCurrentView] = useState('main');
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [tempName, setTempName] = useState(userName);
  const [profilePic, setProfilePic] = useState(null);
  const [loading, setLoading] = useState(false);
  const [userCards, setUserCards] = useState([]);
  const [walletBalance, setWalletBalance] = useState(0);
  const navigate = useNavigate();
  // Payment states
  const [selectedAmount, setSelectedAmount] = useState('N50,000');
  const [customAmount, setCustomAmount] = useState('');
  const [selectedCurrency, setSelectedCurrency] = useState('USDT');
  const [paymentType, setPaymentType] = useState('card'); // 'card' or 'crypto'
  
  // Form states for add card
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvc, setCvc] = useState('');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [billingAddress, setBillingAddress] = useState('');
  const [postalCode, setPostalCode] = useState('');
  
  // OTP and reference states
  const [cardReference, setCardReference] = useState('');
  const [otp, setOtp] = useState('');
  
  // Crypto wallet states
  const [cryptoNetwork, setCryptoNetwork] = useState('TRON');
  const [cryptoAddress, setCryptoAddress] = useState('');
  const [cryptoTag, setCryptoTag] = useState('');
  const [cryptoProvider, setCryptoProvider] = useState('');
  const [cryptoWalletType, setCryptoWalletType] = useState('USDT');
  
  // Top-up states
  const [selectedCardId, setSelectedCardId] = useState('');
  const [topUpReference, setTopUpReference] = useState('');
  
  // Carousel state
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  
  const walletAddress = 'JjhdIno5d49jf8mof0jOfnoskfoj0fmaf0jasofrnil0sf';

  const handleNextCard = () => {
    setActiveCardIndex((prev) => (prev + 1) % userCards.length);
  };

  const handlePrevCard = () => {
    setActiveCardIndex((prev) => (prev - 1 + userCards.length) % userCards.length);
  };

  const handleDotClick = (index) => {
    setActiveCardIndex(index);
  };

  const handleEditClick = (type) => {
    setModalType(type);
    setShowModal(true);
    if (type === 'name') {
      setTempName(userName);
    }
  };

  const handleSaveName = async () => {
    try {
      await api.put("auth/profile", {
        firstname: tempName,
        phone: userPhone,
        address: 'no 362 nwaniba road, uyo, nigeria'
      });
      setUserName(tempName);
      
      setShowModal(false);
    } catch (error) {
      console.log("Update error:", error);
      setShowModal(false);
    }
  };

  const handleAddCard = async () => {
    try {
      const [expMonth, expYear] = expiryDate.split('/').map(s => s.trim());
      
      const response = await api.post("https://mydlv.onrender.com/api/v1/auth/credit-debit", {
        card: {
          number: cardNumber.replace(/\s/g, ''),
          cvv: cvc,
          expiry_month: expMonth,
          expiry_year: expYear
        },
        billing: {
          email: email,
          firstname: firstName,
          lastname: lastName,
          address: billingAddress,
          postal_code: postalCode
        }
      });

      if (response.data.success) {
        const reference = response.data.data.data.card.reference;
        setCardReference(reference);
        setModalType('verifyCard');
      }
    } catch (error) {
      console.error("Add card error:", error);
      alert("Failed to add card. Please try again.");
    }
  };

  const handleVerifyCard = async () => {
    try {
      const response = await api.put("https://mydlv.onrender.com/api/v1/auth/verify-card", {
        otp: otp,
        reference: cardReference
      });

      if (response.data.success) {
        alert("Card verified successfully!");
        setShowModal(false);
        resetCardForm();
        fetchUser();
      }
    } catch (error) {
      console.error("Verify card error:", error);
      alert("Failed to verify card. Please try again.");
    }
  };

  const handleAddCryptoWallet = async () => {
    try {
      const response = await api.post("https://mydlv.onrender.com/api/v1/auth/crypto", {
        network: cryptoNetwork,
        address: cryptoAddress,
        tag: cryptoTag,
        provider: cryptoProvider,
        wallet_type: cryptoWalletType
      });

      if (response.data.success) {
        alert("Crypto wallet added successfully!");
        setShowModal(false);
        resetCryptoForm();
        fetchUser();
      }
    } catch (error) {
      console.error("Add crypto wallet error:", error);
      alert("Failed to add crypto wallet. Please try again.");
    }
  };

  const handleTopUpCard = async () => {
    try {
      const amountStr = customAmount || selectedAmount.replace(/[^0-9]/g, '');
      
      const response = await api.post("https://mydlv.onrender.com/api/v1/auth/topup-card", {
        card_id: selectedCardId || userCards[0]?._id,
        amount: amountStr
      });

      if (response.data.success && response.data.data.reference) {
        setTopUpReference(response.data.data.reference);
        
        // Immediately verify the top-up
        const verifyResponse = await api.post("https://mydlv.onrender.com/api/v1/auth/topup-card-verify", {
          reference: response.data.data.reference
        });

        if (verifyResponse.data.success) {
          alert("Top-up successful!");
          setShowModal(false);
          fetchUser();
        }
      }
    } catch (error) {
      console.error("Top-up error:", error);
      alert("Failed to top up. Please try again.");
    }
  };

  const resetCardForm = () => {
    setCardNumber('');
    setExpiryDate('');
    setCvc('');
    setEmail('');
    setFirstName('');
    setLastName('');
    setBillingAddress('');
    setPostalCode('');
    setOtp('');
    setCardReference('');
  };

  const resetCryptoForm = () => {
    setCryptoNetwork('TRON');
    setCryptoAddress('');
    setCryptoTag('');
    setCryptoProvider('');
    setCryptoWalletType('USDT');
  };

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(walletAddress);
    alert('Wallet address copied!');
  };

  const handleProfileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
  
    setLoading(true);
  
    try {
      const token = localStorage.getItem("token");
  
      // 1️⃣ Request a signed URL from your backend
      const signResponse = await fetch(`https://mydlv.onrender.com/api/v1/auth/sign-s3`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fileName: file.name,
          fileType: file.type,
        }),
      });
  
      const signedUrl = await signResponse.json();
  
      if (!signedUrl) {
        throw new Error("Failed to get signed URL");
      }
  
      // 2️⃣ Upload the file directly to S3
      const uploadResponse = await fetch(signedUrl, {
        method: "PUT",
        headers: {
          "Content-Type": file.type,
        },
        body: file,
      });
  
      if (!uploadResponse.ok) {
        throw new Error("Failed to upload to S3");
      }
  
      // Remove AWS query params to get the clean file URL
      const imageUrl = uploadResponse.url.split("?")[0];
  
      // 3️⃣ Update user profile with this image URL
      const updateRes = await api.post("auth/profile/picture", {
        images: [imageUrl],
      });
  
      // 4️⃣ Update UI preview instantly
      setProfilePic(imageUrl);
  
      alert("Profile picture updated!");
  
    } catch (error) {
      console.error("Upload error:", error);
      alert("Failed to upload image");
    } finally {
      setLoading(false);
    }
  };
  const handleLogout = () => {
    try {
      // Clear localStorage
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      
      // Show success message (optional - you can use any notification system)
      alert('Logged out successfully!');
      
      // Redirect to login page
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
      alert('Failed to logout. Please try again.');
    }
  };

  const menuItems = [
    { id: 'account', label: 'Account', icon: User, hasArrow: true },
    { id: 'support', label: 'Support', icon: HelpCircle, hasArrow: true },
    { id: 'language', label: 'Language', icon: MapPin, hasArrow: true },
    { id: 'faq', label: 'FAQ', icon: HelpCircle, hasArrow: true },
    { id: 'logout', label: 'Logout', icon: LogOut, hasArrow: true },
  ];

  const accountItems = [
    { id: 'name', label: 'Name', value: userName, icon: User, editable: true },
    { id: 'email', label: 'Email', value: userEmail, icon: Mail, editable: true },
    { id: 'phone', label: 'Phone Number', value: userPhone, icon: Phone, editable: true },
    { id: 'location', label: 'Locations', icon: MapPin, editable: true },
    { id: 'payment', label: 'Payment methods', icon: CreditCard, hasArrow: true },
    { id: 'password', label: 'Change Password', icon: Lock, editable: true },
    { id: 'privacy', label: 'Privacy', icon: Shield, hasArrow: true },
  ];

  const fetchUser = async () => {
    setLoading(true);
    try {
      const res = await api.get("auth/me");
      const data = res.data.data;
      
      setUserName(data.firstname);
      setUserEmail(data.email);
      setUserPhone(data.phone);
      setProfilePic(data?.profile_picture);
      setWalletBalance(data.wallet?.NGN || 0);
      
      // Transform user wallet data to display format
      const cards = data.userWallet?.filter(w => w.type === 'card').map(wallet => ({
        _id: wallet._id,
        type: wallet.card.brand?.trim().toLowerCase() === 'visa' ? 'Visa' : 'Visa/Mastercard',
        number: `•••• •••• •••• ${wallet.card.last4}`,
        expiry: `${wallet.card.exp_month}/${wallet.card.exp_year?.slice(-2)}`,
        authorization_code: wallet.card.authorization_code,
        logos: wallet.card.brand?.trim().toLowerCase() === 'visa' 
          ? ["data:image/svg+xml,%3Csvg width='40' height='26' viewBox='0 0 40 26' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='40' height='26' rx='4' fill='white' stroke='%23E5E5E5'/%3E%3Cpath d='M14 8h12v10H14V8z' fill='%231A1F71'/%3E%3Cpath d='M20 8h6v10h-6V8z' fill='%23F7931A'/%3E%3C/svg%3E"]
          : [
              "data:image/svg+xml,%3Csvg width='40' height='26' viewBox='0 0 40 26' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='40' height='26' rx='4' fill='%231434CB'/%3E%3Cpath d='M14 13h12v5H14v-5z' fill='%23EB001B'/%3E%3Cpath d='M26 13h-12v5h12v-5z' fill='%23F79E1B'/%3E%3C/svg%3E",
              "data:image/svg+xml,%3Csvg width='40' height='26' viewBox='0 0 40 26' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='40' height='26' rx='4' fill='white' stroke='%23E5E5E5'/%3E%3Cpath d='M14 8h12v10H14V8z' fill='%231A1F71'/%3E%3Cpath d='M20 8h6v10h-6V8z' fill='%23F7931A'/%3E%3C/svg%3E"
            ]
      })) || [];
      
      setUserCards(cards);
      setLoading(false);
    } catch (error) {
      console.log("Fetch user error:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  if (loading) {
    return (
      <div className="min-h flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading profile ...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen ">
      {/* Main Profile View */}
      {currentView === 'main' && (
        <div className="max-w-2xl mx-auto px-2 md:px-6 py-8">
          <button className="mb-8 p-2 hover:bg-gray-100 flex items-center gap-4 rounded-lg transition-colors">
            <ArrowLeft size={24} />
            <h1 className="text-xl font-bold">Profile</h1>
          </button>

          <div className="text-center flex gap-2 items-center justify-center mb-12">
            <div className="inline-flex flex-col items-center">
              <div className="relative mb-4">
                <div className="w-20 h-20 md:w-24 md:h-24 bg-gray-200 rounded-full flex items-center justify-center">
                  {profilePic ? (
                    <img 
                      src={profilePic} 
                      alt="Profile" 
                      className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover" 
                    />
                  ) : (
                    <User size={40} className="text-gray-400" />
                  )}
                </div>
                <label className="absolute bottom-0 right-0 w-8 h-8 bg-white rounded-full border-2 border-gray-200 flex items-center justify-center shadow-sm hover:bg-gray-50 transition-colors cursor-pointer">
                  <input type="file" className="hidden" onChange={handleProfileUpload} />
                  <span className="text-xl text-gray-600">+</span>
                </label>
              </div>
              <span className="text-xs md:text-sm text-gray-500">Upload Image</span>
            </div>
            
            <h2 className="md:text-3xl font-semibold text-green-600 mt-4">{userName}</h2>
          </div>

          <div className="space-y-3 bg-[#E5E5E5] p-1 md:p-2 rounded">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    if (item.id === "logout") {
                      handleLogout();
                    }
                    if (item.id === "account") {
                      setCurrentView("account");
                    }
                  }}
                  className="w-full flex items-center justify-between p-4 border-b border-b-[#999] hover:bg-[#e1e1e1] transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Icon size={20} className="text-gray-600" />
                    <span className="text-base font-medium text-gray-800">{item.label}</span>
                  </div>
                  {item.hasArrow && <ChevronRight size={20} className="text-gray-400" />}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Account View */}
      {currentView === 'account' && (
        <div className="max-w-2xl mx-auto px-2 md:px-6 py-8">
          <div className="flex items-center gap-4 mb-8">
            <button 
              onClick={() => setCurrentView('main')}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft size={24} />
            </button>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-gray-500 cursor-pointer hover:text-gray-700">Profile</span>
              <ChevronRight size={16} className="text-gray-400" />
              <span className="text-gray-800 font-medium">Account</span>
            </div>
          </div>

          <h1 className="text-3xl font-bold mb-8">Account</h1>

          <div className="space-y-3">
            {accountItems.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-4 rounded-xl"
                >
                  <div className="flex items-center gap-3 flex-1">
                    <Icon size={20} />
                    <div className="flex-1">
                      <div className="text-sm text-gray-500 mb-1">{item.label}</div>
                      {item.value && (
                        <div className="text-base text-xs font-medium text-gray-800 break-words">{item.value}</div>
                      )}
                    </div>
                  </div>
                  {item.editable && (
                    <button 
                      onClick={() => handleEditClick(item.id)}
                      className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-gray-100 transition-colors"
                    >
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-gray-600">
                        <path d="M11.334 2.00004C11.5091 1.82494 11.7169 1.68605 11.9457 1.59129C12.1745 1.49653 12.4197 1.44775 12.6673 1.44775C12.9149 1.44775 13.1601 1.49653 13.3889 1.59129C13.6177 1.68605 13.8256 1.82494 14.0007 2.00004C14.1758 2.17513 14.3147 2.383 14.4094 2.61178C14.5042 2.84055 14.553 3.08575 14.553 3.33337C14.553 3.58099 14.5042 3.82619 14.4094 4.05497C14.3147 4.28374 14.1758 4.49161 14.0007 4.66671L5.00065 13.6667L1.33398 14.6667L2.33398 11L11.334 2.00004Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                  )}
                  {item.hasArrow && (
                    <button
                      onClick={() => item.id === 'payment' && setCurrentView('payment')}
                    >
                      <ChevronRight size={20} className="text-gray-400" />
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Payment Methods Page */}
      {currentView === 'payment' && (
        <div className="max-w-2xl mx-auto px-2 md:px-6 py-8">
          <div className="flex items-center gap-4 mb-8">
            <button 
              onClick={() => setCurrentView('account')}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft size={24} />
            </button>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-gray-500 cursor-pointer hover:text-gray-700">Profile</span>
              <ChevronRight size={16} className="text-gray-400" />
              <span className="text-gray-500 cursor-pointer hover:text-gray-700">Account</span>
              <ChevronRight size={16} className="text-gray-400" />
              <span className="text-gray-800 font-medium">Payment Methods</span>
            </div>
          </div>

          <h1 className="text-3xl font-bold mb-8">Payment Methods</h1>

          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className='w-full'>
              {userCards.length > 0 ? (
                <>
                  <div className="relative">
                    <div className="rounded-[30px] p-6 shadow-lg border border-gray-200 bg-[#F5F5F5] relative overflow-hidden">
                      <div className="px-6">
                        <div className="mb-">
                          <span className="text-sm font-medium text-gray-700">Card Type</span>
                        </div>
                        <div className="flex items-center gap-3 mb-">
                          {userCards[activeCardIndex].logos.map((logo, idx) => (
                            <img key={idx} src={logo} alt={`Card logo ${idx + 1}`} className="w-10 h-7" />
                          ))}
                        </div>
                        <div className="mb-1">
                          <span className="text-sm md:text-base font-semibold tracking-wider">
                            {userCards[activeCardIndex].number}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    {userCards.length > 1 && (
                      <div className="flex justify-center gap-2 mt-2">
                        {userCards.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => handleDotClick(index)}
                            className={`h-1 rounded-full transition-all ${
                              index === activeCardIndex 
                                ? 'w-8 bg-gray-800' 
                                : 'w-2 bg-gray-300 hover:bg-gray-400'
                            }`}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <div className="rounded-[30px] p-6 shadow-lg border border-gray-200 bg-[#F5F5F5] text-center">
                  <p className="text-gray-500">No cards added yet</p>
                </div>
              )}
              
              <button 
                onClick={() => {
                  setShowModal(true);
                  setModalType('addCard');
                  setPaymentType('card');
                }}
                className="w-full py-3 shadow-lg bg-[#F5F5F5] rounded-3xl transition-colors font-semibold flex items-center mt-1 justify-center gap-2"
              >
                <span className="text-xl text-white bg-green-600 w-6 h-6 rounded-full flex items-center justify-center">+</span>
                <span className='text-[#333]'>Add new card</span>
              </button>
            </div>
            
            <div>
              <div className="bg-[#f5f5f5] rounded-2xl p-6 shadow-xl">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-6 md:w-12 md:h-12 h-6 bg-white/20 rounded-lg flex items-center justify-center">
                    <Wallet size={24} className="text-[#222]" />
                  </div>
                  <div>
                    <span className="text-sm font-medium">Wallet Balance</span>
                    <div className="text-3xl font-bold">₦{walletBalance.toLocaleString()}.00</div>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => {
                  setShowModal(true);
                  setModalType('topUpCard');
                }}
                className="w-full py-3 shadow-lg bg-[#F5F5F5] rounded-3xl hover:bg-gray-50 transition-colors font-semibold flex items-center justify-center gap-2 mt-4 md:"
              >
                <span className="text-xl text-white bg-green-600 w-6 h-6 rounded-full flex items-center justify-center">+</span>
                <span className='text-[#333]'>Top up</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal for Change Name */}
      {showModal && modalType === 'name' && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800">Change name</h2>
              <button 
                onClick={() => setShowModal(false)}
                className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
              >
                <X size={18} className="text-gray-600" />
              </button>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
              <input
                type="text"
                value={tempName}
                onChange={(e) => setTempName(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Enter your name"
              />
            </div>

            <button
              onClick={handleSaveName}
              className="w-full py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors"
            >
              Save
            </button>
          </div>
        </div>
      )}

      {/* Add New Card/Crypto Modal */}
      {showModal && modalType === 'addCard' && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50 px-4 py-20 overflow-y-auto">
          <div className="bg-white rounded-2xl mt-[170px] md:mt-[60px] shadow-xl max-w-lg w-full p-6 my-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800">Add Payment Method</h2>
              <button 
                onClick={() => {
                  setShowModal(false);
                  resetCardForm();
                  resetCryptoForm();
                }}
                className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
              >
                <X size={18} className="text-gray-600" />
              </button>
            </div>

            <div className="flex gap-3 mb-6">
              <button
                onClick={() => setPaymentType('card')}
                className={`flex-1 py-3 rounded-lg font-medium transition-colors ${
                  paymentType === 'card'
                    ? 'bg-gray-100 text-gray-800'
                    : 'bg-white text-gray-600 border border-gray-200'
                }`}
              >
                Card
              </button>
              <button
                onClick={() => setPaymentType('crypto')}
                className={`flex-1 py-3 rounded-lg font-medium transition-colors ${
                  paymentType === 'crypto'
                    ? 'bg-gray-100 text-gray-800'
                    : 'bg-white text-gray-600 border border-gray-200'
                }`}
              >
                Crypto Wallet
              </button>
            </div>

            {paymentType === 'card' ? (
              <>
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-3">Card details</label>
                  
                  <div className="relative mb-3">
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="w-full px-4 py-3 bg-gray-50 border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="0000 0000 0000 0000"
                      maxLength={19}
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-2">
                      <img src="data:image/svg+xml,%3Csvg width='32' height='20' viewBox='0 0 32 20' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='32' height='20' rx='3' fill='%231434CB'/%3E%3C/svg%3E" alt="Visa" className="h-5" />
                      <img src="data:image/svg+xml,%3Csvg width='32' height='20' viewBox='0 0 32 20' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='32' height='20' rx='3' fill='%23EB001B'/%3E%3C/svg%3E" alt="Mastercard" className="h-5" />
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="flex-1 relative">
                      <input
                        type="text"
                        value={expiryDate}
                        onChange={(e) => setExpiryDate(e.target.value)}
                        className="w-full px-4 py-3 bg-gray-50 border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="MM / YY"
                        maxLength={7}
                      />
                      <div className="absolute right-3 top-1/2 -translate-y-1/2">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-gray-400">
                          <rect x="2" y="3" width="12" height="10" rx="1" stroke="currentColor" strokeWidth="1.5"/>
                          <path d="M2 6h12" stroke="currentColor" strokeWidth="1.5"/>
                        </svg>
                      </div>
                    </div>
                    <div className="flex-1 relative">
                      <input
                        type="text"
                        value={cvc}
                        onChange={(e) => setCvc(e.target.value)}
                        className="w-full px-4 py-3 bg-gray-50 border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="CVC"
                        maxLength={3}
                      />
                      <div className="absolute right-3 top-1/2 -translate-y-1/2">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-gray-400">
                          <path d="M8 11a1 1 0 100-2 1 1 0 000 2z" fill="currentColor"/>
                          <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-xs text-gray-500 mt-3">
                    By providing your card information, you allow us to charge your card for future payments in accordance with their terms.
                  </p>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Enter email"
                  />
                </div>

                <div className=" flex flex-col md:flex-row gap-3 mb-4">
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="flex-1 px-4 py-3 bg-gray-50 border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="First Name"
                  />
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="flex-1 px-4 py-3 bg-gray-50 border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Last Name"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Billing address</label>
                  <input
                    type="text"
                    value={billingAddress}
                    onChange={(e) => setBillingAddress(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 mb-3"
                    placeholder="House 9 efab sunshine estate Apo Waru"
                  />
                  <input
                    type="text"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Postal code"
                  />
                </div>

                <button 
                  onClick={handleAddCard}
                  className="w-full py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors"
                >
                  Save Card
                </button>
              </>
            ) : (
              <>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Network</label>
                  <select
                    value={cryptoNetwork}
                    onChange={(e) => setCryptoNetwork(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="TRON">TRON</option>
                    <option value="ETHEREUM">ETHEREUM</option>
                    <option value="BSC">BSC</option>
                  </select>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Wallet Address</label>
                  <input
                    type="text"
                    value={cryptoAddress}
                    onChange={(e) => setCryptoAddress(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Enter wallet address"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Tag (Optional)</label>
                  <input
                    type="text"
                    value={cryptoTag}
                    onChange={(e) => setCryptoTag(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Enter tag if required"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Provider</label>
                  <input
                    type="text"
                    value={cryptoProvider}
                    onChange={(e) => setCryptoProvider(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="e.g., Binance, MetaMask"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Wallet Type</label>
                  <select
                    value={cryptoWalletType}
                    onChange={(e) => setCryptoWalletType(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="USDT">USDT</option>
                    <option value="USDC">USDC</option>
                    <option value="BTC">BTC</option>
                    <option value="ETH">ETH</option>
                  </select>
                </div>

                <button 
                  onClick={handleAddCryptoWallet}
                  className="w-full py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors"
                >
                  Save Wallet
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {/* OTP Verification Modal */}
      {showModal && modalType === 'verifyCard' && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800">Verify Card</h2>
              <button 
                onClick={() => {
                  setShowModal(false);
                  resetCardForm();
                }}
                className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
              >
                <X size={18} className="text-gray-600" />
              </button>
            </div>

            <p className="text-sm text-gray-600 mb-4">
              Please enter the OTP sent to your phone/email to verify your card.
            </p>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">OTP</label>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-center text-2xl tracking-widest"
                placeholder="00000"
                maxLength={5}
              />
            </div>

            <button
              onClick={handleVerifyCard}
              className="w-full py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors"
            >
              Verify
            </button>
          </div>
        </div>
      )}

      {/* Top Up from Card Modal */}
      {showModal && modalType === 'topUpCard' && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800">Top Up wallet</h2>
              <button 
                onClick={() => setShowModal(false)}
                className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
              >
                <X size={18} className="text-gray-600" />
              </button>
            </div>

            <div className="flex gap-3 mb-6">
              <button
                onClick={() => setModalType('topUpCrypto')}
                className="flex-1 py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 bg-white text-gray-600 border border-gray-200"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-gray-500">
                  <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M10 6v8M6 10h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
                Top-up with Crypto
              </button>
              <button
                className="flex-1 py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 bg-gray-100 text-gray-800"
              >
                <CreditCard size={20} />
                Top up from Card
              </button>
            </div>

            <div className="grid grid-cols-3 gap-3 mb-4">
              {['N10,000', 'N20,000', 'N50,000'].map((amount) => (
                <button
                  key={amount}
                  onClick={() => setSelectedAmount(amount)}
                  className={`py-3 rounded-lg font-medium transition-colors ${
                    selectedAmount === amount
                      ? 'bg-gray-900 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {amount}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-3 gap-3 mb-4">
              {['N100,000', 'N500,000', 'Other'].map((amount) => (
                <button
                  key={amount}
                  onClick={() => setSelectedAmount(amount)}
                  className={`py-3 rounded-lg font-medium transition-colors ${
                    selectedAmount === amount
                      ? 'bg-gray-900 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {amount}
                </button>
              ))}
            </div>

            <input
              type="text"
              value={customAmount}
              onChange={(e) => setCustomAmount(e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 mb-6 text-center"
              placeholder="Enter amount"
            />

            {userCards.length > 0 && (
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">Choose card</label>
                <div className="flex items-center justify-between px-4 py-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    {userCards[0].logos.map((logo, idx) => (
                      <img key={idx} src={logo} alt="Card" className="h-5" />
                    ))}
                  </div>
                  <span className="text-gray-600">{userCards[0].number}</span>
                  <ChevronRight size={20} className="text-gray-400" />
                </div>
              </div>
            )}

            <button 
              onClick={handleTopUpCard}
              className="w-full py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors"
            >
              Top Up
            </button>
          </div>
        </div>
      )}

      {/* Top Up with Crypto Modal */}
      {showModal && modalType === 'topUpCrypto' && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800">Top Up wallet</h2>
              <button 
                onClick={() => setShowModal(false)}
                className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
              >
                <X size={18} className="text-gray-600" />
              </button>
            </div>

            <div className="flex gap-3 mb-6">
              <button
                className="flex-1 py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 bg-gray-100 text-gray-800"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-gray-500">
                  <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M10 6v8M6 10h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
                Top-up with Crypto
              </button>
              <button
                onClick={() => setModalType('topUpCard')}
                className="flex-1 py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 bg-white text-gray-600 border border-gray-200"
              >
                <CreditCard size={20} />
                Top up from Card
              </button>
            </div>

            <div className="grid grid-cols-3 gap-3 mb-4">
              {['N10,000', 'N20,000', 'N50,000'].map((amount) => (
                <button
                  key={amount}
                  onClick={() => setSelectedAmount(amount)}
                  className={`py-3 rounded-lg font-medium transition-colors ${
                    selectedAmount === amount
                      ? 'bg-gray-900 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {amount}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-3 gap-3 mb-4">
              {['N100,000', 'N500,000', 'Other'].map((amount) => (
                <button
                  key={amount}
                  onClick={() => setSelectedAmount(amount)}
                  className={`py-3 rounded-lg font-medium transition-colors ${
                    selectedAmount === amount
                      ? 'bg-gray-900 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {amount}
                </button>
              ))}
            </div>

            <input
              type="text"
              value={customAmount}
              onChange={(e) => setCustomAmount(e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 mb-6 text-center"
              placeholder="Enter amount"
            />

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">Choose currency</label>
              <div className="flex gap-3">
                <button
                  onClick={() => setSelectedCurrency('USDT')}
                  className={`flex-1 py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 ${
                    selectedCurrency === 'USDT'
                      ? 'bg-green-100 text-green-700 border-2 border-green-600'
                      : 'bg-gray-50 text-gray-600 border border-gray-200'
                  }`}
                >
                  <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">₮</span>
                  </div>
                  USDT
                </button>
                <button
                  onClick={() => setSelectedCurrency('USDC')}
                  className={`flex-1 py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 ${
                    selectedCurrency === 'USDC'
                      ? 'bg-blue-100 text-blue-700 border-2 border-blue-600'
                      : 'bg-gray-50 text-gray-600 border border-gray-200'
                  }`}
                >
                  <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">$</span>
                  </div>
                  USDC
                </button>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 break-all flex-1">{walletAddress}</span>
                <button 
                  onClick={handleCopyAddress}
                  className="ml-3 p-2 hover:bg-gray-200 rounded-lg transition-colors flex-shrink-0"
                >
                  <Copy size={18} className="text-gray-600" />
                </button>
              </div>
              <div className="text-xs text-gray-500 mt-2 flex items-center gap-1">
                <span>Copy {selectedCurrency} Address</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}