'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getStoredPosts, saveNewPost, deletePostById } from '../data/postsStore';

export default function AdminPortal() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState('');
  
  const [activeTab, setActiveTab] = useState('manage'); // 'manage' or 'create'
  const [posts, setPosts] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');

  // Form State for New Article
  const [formData, setFormData] = useState({
    title: '',
    celebrity: '',
    category: 'Celebrity Travel',
    destination: 'Cape Town, South Africa',
    author: 'Editorial Desk',
    excerpt: '',
    content: '',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=1000&auto=format&fit=crop',
    isFeatured: false,
    status: 'published'
  });

  // Mode for image input: 'file' or 'url'
  const [imageInputMode, setImageInputMode] = useState('file');

  // Load posts on client mount
  useEffect(() => {
    setPosts(getStoredPosts());
  }, []);

  // Handle Login (Default Passcode: admin123)
  const handleLogin = (e) => {
    e.preventDefault();
    if (passwordInput === 'admin123') {
      setIsAuthenticated(true);
      setLoginError('');
    } else {
      setLoginError('Invalid security key. Hint: use admin123');
    }
  };

  // Handle standard text inputs
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Handle Local File Upload from Computer
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check file size (Warn if greater than 3MB for browser storage limits)
      if (file.size > 3 * 1024 * 1024) {
        alert('File size is larger than 3MB. Please choose a smaller photo or use an image URL for optimal speed.');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          image: reader.result // Base64 Image String
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle Publishing Post
  const handlePublish = (e) => {
    e.preventDefault();
    
    if (!formData.title || !formData.celebrity || !formData.excerpt) {
      alert('Please fill in the title, celebrity name, and summary excerpt.');
      return;
    }

    const updated = saveNewPost(formData);
    setPosts(updated);
    setSuccessMessage('🎉 Article published successfully! It is now live on your website.');
    
    // Reset Form
    setFormData({
      title: '',
      celebrity: '',
      category: 'Celebrity Travel',
      destination: 'Cape Town, South Africa',
      author: 'Editorial Desk',
      excerpt: '',
      content: '',
      image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=1000&auto=format&fit=crop',
      isFeatured: false,
      status: 'published'
    });

    setTimeout(() => setSuccessMessage(''), 4000);
    setActiveTab('manage');
  };

  // Handle Delete Post
  const handleDelete = (id, title) => {
    if (confirm(`Are you sure you want to delete "${title}"?`)) {
      const updated = deletePostById(id);
      setPosts(updated);
    }
  };

  // -------------------------------------------------------------
  // VIEW 1: LOGIN SCREEN
  // -------------------------------------------------------------
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0B132B] flex items-center justify-center px-4">
        <div className="bg-white p-8 sm:p-10 rounded-xl shadow-2xl max-w-md w-full border border-gray-100">
          <div className="text-center mb-8">
            <span className="gold-accent text-xs font-bold uppercase tracking-[0.3em]">
              Editorial Control Center
            </span>
            <h1 className="font-serif text-3xl font-bold text-[#0B132B] mt-2">
              Admin Portal
            </h1>
            <p className="text-gray-500 text-xs mt-2">
              Enter your publication passkey to manage articles
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
                Passkey
              </label>
              <input
                type="password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="Enter passkey (admin123)"
                className="w-full px-4 py-3 border border-gray-300 rounded focus:ring-2 focus:ring-[#D4AF37] focus:outline-none text-sm"
              />
            </div>

            {loginError && (
              <p className="text-red-600 text-xs font-medium bg-red-50 p-2.5 rounded border border-red-200">
                {loginError}
              </p>
            )}

            <button
              type="submit"
              className="w-full gold-bg text-[#0B132B] font-bold text-xs uppercase tracking-widest py-3.5 rounded hover:bg-yellow-400 transition"
            >
              Authenticate & Access
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link href="/" className="text-xs text-gray-400 hover:text-[#0B132B] transition">
              ← Return to Main Site
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // VIEW 2: LOGGED IN ADMIN DASHBOARD
  // -------------------------------------------------------------
  return (
    <div className="bg-[#F8F5F0] min-h-screen pb-20">
      
      {/* Top Admin Navigation Header */}
      <header className="bg-[#0B132B] text-white py-6 px-4 sm:px-8 border-b-4 border-[#D4AF37]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <div>
            <span className="gold-accent text-[10px] font-bold uppercase tracking-widest">
              Travel With Celebs Media Desk
            </span>
            <h1 className="font-serif text-2xl font-bold">Content Management System</h1>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/" className="text-xs text-gray-300 hover:text-white underline">
              View Live Website ↗
            </Link>
            <button 
              onClick={() => setIsAuthenticated(false)} 
              className="bg-red-600/20 text-red-300 border border-red-500/40 hover:bg-red-600 hover:text-white px-3 py-1.5 rounded text-xs transition"
            >
              Sign Out
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        {/* Success Alert */}
        {successMessage && (
          <div className="bg-emerald-50 border border-emerald-300 text-emerald-800 p-4 rounded-lg mb-8 font-medium text-sm flex justify-between items-center">
            <span>{successMessage}</span>
            <button onClick={() => setSuccessMessage('')} className="text-emerald-900 font-bold">✕</button>
          </div>
        )}

        {/* Action Tabs */}
        <div className="flex border-b border-gray-300 mb-8 space-x-6">
          <button
            onClick={() => setActiveTab('manage')}
            className={`pb-4 text-sm font-bold uppercase tracking-wider transition ${
              activeTab === 'manage'
                ? 'border-b-2 border-[#D4AF37] text-[#0B132B]'
                : 'text-gray-400 hover:text-gray-700'
            }`}
          >
            Manage Published Articles ({posts.length})
          </button>
          <button
            onClick={() => setActiveTab('create')}
            className={`pb-4 text-sm font-bold uppercase tracking-wider transition ${
              activeTab === 'create'
                ? 'border-b-2 border-[#D4AF37] text-[#0B132B]'
                : 'text-gray-400 hover:text-gray-700'
            }`}
          >
            ✏️ Publish New Story
          </button>
        </div>

        {/* TAB 1: ARTICLE MANAGEMENT TABLE */}
        {activeTab === 'manage' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <h2 className="font-serif text-xl font-bold text-[#0B132B]">Published Stories</h2>
              <button 
                onClick={() => setActiveTab('create')}
                className="gold-bg text-[#0B132B] font-bold text-xs px-4 py-2 rounded uppercase"
              >
                + Create New Article
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-gray-50 border-b border-gray-200 text-gray-500 uppercase tracking-wider">
                  <tr>
                    <th className="p-4">Cover</th>
                    <th className="p-4">Article Title</th>
                    <th className="p-4">Celebrity</th>
                    <th className="p-4">Category</th>
                    <th className="p-4">Destination</th>
                    <th className="p-4">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {posts.map((post) => (
                    <tr key={post.id} className="hover:bg-gray-50/80 transition">
                      <td className="p-4">
                        <img 
                          src={post.image} 
                          alt={post.title} 
                          className="h-10 w-14 object-cover rounded shadow-sm border border-gray-200"
                        />
                      </td>
                      <td className="p-4 font-semibold text-[#0B132B] max-w-xs truncate">
                        {post.title}
                        {post.isFeatured && (
                          <span className="ml-2 bg-amber-100 text-amber-800 text-[10px] px-2 py-0.5 rounded font-bold">
                            LEAD
                          </span>
                        )}
                      </td>
                      <td className="p-4 text-gray-700 font-medium">{post.celebrity}</td>
                      <td className="p-4">
                        <span className="bg-gray-100 px-2 py-1 rounded text-gray-600 font-medium">
                          {post.category}
                        </span>
                      </td>
                      <td className="p-4 text-gray-500">📍 {post.destination}</td>
                      <td className="p-4 flex space-x-3 items-center">
                        <Link 
                          href={`/article/${post.id}`} 
                          target="_blank"
                          className="text-blue-600 hover:underline font-semibold"
                        >
                          View ↗
                        </Link>
                        <button
                          onClick={() => handleDelete(post.id, post.title)}
                          className="text-red-600 hover:text-red-800 font-semibold"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: PUBLISH NEW STORY FORM */}
        {activeTab === 'create' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 max-w-4xl mx-auto">
            <h2 className="font-serif text-2xl font-bold text-[#0B132B] mb-6 border-b border-gray-100 pb-4">
              Write & Publish Article
            </h2>

            <form onSubmit={handlePublish} className="space-y-6">
              
              {/* Title */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
                  Article Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g. Burna Boy spotted in St. Tropez on Luxury Yacht"
                  className="w-full px-4 py-3 border border-gray-300 rounded focus:ring-2 focus:ring-[#D4AF37] focus:outline-none text-sm"
                  required
                />
              </div>

              {/* Grid: Celebrity & Category */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
                    Celebrity Name *
                  </label>
                  <input
                    type="text"
                    name="celebrity"
                    value={formData.celebrity}
                    onChange={handleChange}
                    placeholder="e.g. Burna Boy, Zendaya, Drake"
                    className="w-full px-4 py-3 border border-gray-300 rounded focus:ring-2 focus:ring-[#D4AF37] focus:outline-none text-sm"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
                    Category
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded focus:ring-2 focus:ring-[#D4AF37] focus:outline-none text-sm bg-white"
                  >
                    <option value="Celebrity Travel">Celebrity Travel</option>
                    <option value="Celebrity News">Celebrity News</option>
                    <option value="Destinations">Destinations</option>
                    <option value="Hotels & Resorts">Hotels & Resorts</option>
                    <option value="Lifestyle">Lifestyle</option>
                  </select>
                </div>
              </div>

              {/* Grid: Destination & Author */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
                    Destination / Location
                  </label>
                  <input
                    type="text"
                    name="destination"
                    value={formData.destination}
                    onChange={handleChange}
                    placeholder="e.g. Cape Town, South Africa"
                    className="w-full px-4 py-3 border border-gray-300 rounded focus:ring-2 focus:ring-[#D4AF37] focus:outline-none text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
                    Author / Desk
                  </label>
                  <input
                    type="text"
                    name="author"
                    value={formData.author}
                    onChange={handleChange}
                    placeholder="e.g. Elena Rostova or Editorial Team"
                    className="w-full px-4 py-3 border border-gray-300 rounded focus:ring-2 focus:ring-[#D4AF37] focus:outline-none text-sm"
                  />
                </div>
              </div>

              {/* FEATURED COVER IMAGE SECTION WITH FILE UPLOAD */}
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <div className="flex justify-between items-center mb-4">
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-800">
                    Featured Cover Image *
                  </label>

                  {/* Mode Toggle Buttons */}
                  <div className="flex space-x-2 text-xs font-semibold">
                    <button
                      type="button"
                      onClick={() => setImageInputMode('file')}
                      className={`px-3 py-1 rounded transition ${
                        imageInputMode === 'file'
                          ? 'gold-bg text-[#0B132B] font-bold'
                          : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                      }`}
                    >
                      📁 Upload from Laptop
                    </button>
                    <button
                      type="button"
                      onClick={() => setImageInputMode('url')}
                      className={`px-3 py-1 rounded transition ${
                        imageInputMode === 'url'
                          ? 'gold-bg text-[#0B132B] font-bold'
                          : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                      }`}
                    >
                      🔗 Web Image Link
                    </button>
                  </div>
                </div>

                {/* Option 1: File Uploader Input */}
                {imageInputMode === 'file' ? (
                  <div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="w-full text-xs text-gray-600 bg-white p-3 border border-gray-300 rounded cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-[#0B132B] file:text-white hover:file:bg-[#D4AF37] hover:file:text-[#0B132B] file:transition"
                    />
                    <p className="text-[11px] text-gray-400 mt-2">
                      Upload JPG, PNG, or WEBP photos directly from your computer folders.
                    </p>
                  </div>
                ) : (
                  /* Option 2: Image Web URL Input */
                  <div>
                    <input
                      type="url"
                      name="image"
                      value={formData.image}
                      onChange={handleChange}
                      placeholder="https://images.unsplash.com/your-image-url"
                      className="w-full px-4 py-3 border border-gray-300 rounded focus:ring-2 focus:ring-[#D4AF37] focus:outline-none text-sm bg-white"
                    />
                    <p className="text-[11px] text-gray-400 mt-2">
                      Paste a direct image link from Unsplash, Pexels, or any image website.
                    </p>
                  </div>
                )}

                {/* LIVE IMAGE PREVIEW BOX */}
                {formData.image && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-2">
                      Live Cover Image Preview:
                    </span>
                    <div className="relative h-48 w-full rounded-lg overflow-hidden border-2 border-[#D4AF37]">
                      <img
                        src={formData.image}
                        alt="Article Cover Preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Excerpt */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
                  Short Excerpt / Teaser Summary *
                </label>
                <textarea
                  name="excerpt"
                  rows={2}
                  value={formData.excerpt}
                  onChange={handleChange}
                  placeholder="A 1-2 sentence preview that appears on article cards..."
                  className="w-full px-4 py-3 border border-gray-300 rounded focus:ring-2 focus:ring-[#D4AF37] focus:outline-none text-sm"
                  required
                />
              </div>

              {/* Full Article Content */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
                  Full Article Body
                </label>
                <textarea
                  name="content"
                  rows={6}
                  value={formData.content}
                  onChange={handleChange}
                  placeholder="Write the full story here..."
                  className="w-full px-4 py-3 border border-gray-300 rounded focus:ring-2 focus:ring-[#D4AF37] focus:outline-none text-sm"
                />
              </div>

              {/* Lead Story Toggle */}
              <div className="flex items-center space-x-3 bg-amber-50 p-4 rounded border border-amber-200">
                <input
                  type="checkbox"
                  id="isFeatured"
                  name="isFeatured"
                  checked={formData.isFeatured}
                  onChange={handleChange}
                  className="h-4 w-4 text-[#D4AF37] focus:ring-[#D4AF37] border-gray-300 rounded"
                />
                <label htmlFor="isFeatured" className="text-xs font-bold text-amber-900 cursor-pointer">
                  ⭐ Mark as Lead Featured Story on Homepage Banner
                </label>
              </div>

              {/* Submit Buttons */}
              <div className="pt-4 flex items-center justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setActiveTab('manage')}
                  className="px-6 py-3 border border-gray-300 text-gray-700 font-bold text-xs uppercase rounded hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="gold-bg text-[#0B132B] font-bold text-xs uppercase tracking-widest px-8 py-3.5 rounded hover:bg-yellow-400 transition shadow"
                >
                  Publish Article Live
                </button>
              </div>

            </form>
          </div>
        )}

      </div>
    </div>
  );
}