import React, { useState, useEffect } from 'react';
import { Image, Upload, Search, Check, X, Folder, Eye, CheckCircle2 } from 'lucide-react';
import { MediaAsset } from '../../types';
import { apiService } from '../../services/apiService';

interface MediaPickerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (imageUrl: string) => void;
  selectedUrl?: string;
  title?: string;
}

export const MediaPicker: React.FC<MediaPickerProps> = ({
  isOpen,
  onClose,
  onSelect,
  selectedUrl = '',
  title = 'Select Image from Media Library'
}) => {
  const [assets, setAssets] = useState<MediaAsset[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<'ALL' | 'PUBLIC_ASSET' | 'UPLOADED'>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedAsset, setSelectedAsset] = useState<MediaAsset | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [previewAsset, setPreviewAsset] = useState<MediaAsset | null>(null);

  useEffect(() => {
    if (isOpen) {
      fetchMedia();
    }
  }, [isOpen]);

  const fetchMedia = async () => {
    setLoading(true);
    try {
      const data = await apiService.getMedia();
      setAssets(data);
      if (selectedUrl) {
        const found = data.find(a => a.url === selectedUrl);
        if (found) setSelectedAsset(found);
      }
    } catch (err) {
      console.error('Failed to load media assets:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setUploadError(null);

    try {
      const newAsset = await apiService.uploadMedia(file, 'Uploaded', file.name);
      setAssets(prev => [newAsset, ...prev]);
      setSelectedAsset(newAsset);
    } catch (err: any) {
      setUploadError(err.message || 'Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  const filteredAssets = assets.filter(asset => {
    const matchesTab = activeTab === 'ALL' || asset.source === activeTab;
    const matchesSearch = searchQuery === '' || 
      asset.filename.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (asset.folder && asset.folder.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesTab && matchesSearch;
  });

  const handleConfirmSelect = () => {
    if (selectedAsset) {
      onSelect(selectedAsset.url);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-5xl max-h-[90vh] flex flex-col overflow-hidden">
        
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/80">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-[#6D5EF6]/10 text-[#6D5EF6] flex items-center justify-center font-bold">
              <Image size={20} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">{title}</h3>
              <p className="text-xs text-slate-500">Choose an existing asset or upload a new image</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Action & Filter Bar */}
        <div className="p-4 border-b border-slate-200 flex flex-wrap items-center justify-between gap-4 bg-white">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setActiveTab('ALL')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'ALL' ? 'bg-[#6D5EF6] text-white shadow-sm' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              All Assets ({assets.length})
            </button>
            <button
              onClick={() => setActiveTab('PUBLIC_ASSET')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'PUBLIC_ASSET' ? 'bg-[#6D5EF6] text-white shadow-sm' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Public Assets ({assets.filter(a => a.source === 'PUBLIC_ASSET').length})
            </button>
            <button
              onClick={() => setActiveTab('UPLOADED')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'UPLOADED' ? 'bg-[#6D5EF6] text-white shadow-sm' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Uploaded ({assets.filter(a => a.source === 'UPLOADED').length})
            </button>
          </div>

          <div className="flex items-center space-x-3 flex-1 max-w-md justify-end">
            <div className="relative flex-1">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search images..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#6D5EF6] focus:ring-1 focus:ring-[#6D5EF6]"
              />
            </div>

            <label className="cursor-pointer bg-[#6D5EF6] hover:bg-[#5b4ebf] text-white px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center space-x-1.5 shadow-sm transition-all">
              <Upload size={14} />
              <span>{uploading ? 'Uploading...' : 'Upload Image'}</span>
              <input type="file" accept="image/*" onChange={handleFileUpload} disabled={uploading} className="hidden" />
            </label>
          </div>
        </div>

        {uploadError && (
          <div className="px-6 py-2 bg-rose-50 border-b border-rose-200 text-rose-700 text-xs flex items-center justify-between">
            <span>{uploadError}</span>
            <button onClick={() => setUploadError(null)} className="font-bold">×</button>
          </div>
        )}

        {/* Gallery Grid & Preview Sidebar */}
        <div className="flex-1 flex overflow-hidden min-h-[360px]">
          {/* Main Grid */}
          <div className="flex-1 p-6 overflow-y-auto bg-slate-50">
            {loading ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {[1, 2, 3, 4, 5, 6, 7, 8].map(n => (
                  <div key={n} className="aspect-square bg-slate-200 rounded-xl animate-pulse" />
                ))}
              </div>
            ) : filteredAssets.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-8">
                <Folder size={40} className="text-slate-300 mb-3" />
                <p className="text-sm font-semibold text-slate-700">No media assets found</p>
                <p className="text-xs text-slate-400 mt-1">Upload a new image or clear your search filter</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {filteredAssets.map(asset => {
                  const isSelected = selectedAsset?.url === asset.url;
                  return (
                    <div
                      key={asset.id}
                      onClick={() => setSelectedAsset(asset)}
                      className={`group relative aspect-square rounded-xl border-2 overflow-hidden cursor-pointer transition-all bg-white shadow-sm hover:shadow-md ${
                        isSelected 
                          ? 'border-[#6D5EF6] ring-2 ring-[#6D5EF6]/30 scale-[0.98]' 
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <img 
                        src={asset.url} 
                        alt={asset.alt_text || asset.filename} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=400&q=80';
                        }}
                      />
                      
                      {/* Selection Check Indicator */}
                      {isSelected && (
                        <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-[#6D5EF6] text-white flex items-center justify-center shadow-lg">
                          <Check size={14} />
                        </div>
                      )}

                      {/* Source Badge Overlay */}
                      <div className="absolute bottom-2 left-2 right-2 opacity-90 group-hover:opacity-100 transition-opacity">
                        <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold shadow-sm ${
                          asset.source === 'PUBLIC_ASSET' 
                            ? 'bg-amber-100 text-amber-800 border border-amber-300' 
                            : 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                        }`}>
                          {asset.source === 'PUBLIC_ASSET' ? 'Public Asset' : 'Uploaded'}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Right Preview Sidebar */}
          {selectedAsset && (
            <div className="w-72 border-l border-slate-200 p-5 bg-white flex flex-col justify-between overflow-y-auto">
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Asset Details</h4>
                <div className="aspect-square rounded-xl border border-slate-200 overflow-hidden bg-slate-50 mb-4 flex items-center justify-center relative">
                  <img src={selectedAsset.url} alt={selectedAsset.filename} className="w-full h-full object-contain" />
                </div>

                <div className="space-y-2 text-xs">
                  <div>
                    <span className="text-slate-400 block">Filename:</span>
                    <span className="font-semibold text-slate-800 break-all">{selectedAsset.filename}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Source:</span>
                    <span className={`font-bold inline-block px-2 py-0.5 rounded text-[10px] ${
                      selectedAsset.source === 'PUBLIC_ASSET' ? 'bg-amber-50 text-amber-700' : 'bg-emerald-50 text-emerald-700'
                    }`}>
                      {selectedAsset.source === 'PUBLIC_ASSET' ? 'Public Static Asset' : 'Uploaded Media'}
                    </span>
                  </div>
                  {selectedAsset.size_bytes > 0 && (
                    <div>
                      <span className="text-slate-400 block">File Size:</span>
                      <span className="font-medium text-slate-700">{(selectedAsset.size_bytes / 1024).toFixed(1)} KB</span>
                    </div>
                  )}
                  {selectedAsset.width && selectedAsset.height && (
                    <div>
                      <span className="text-slate-400 block">Dimensions:</span>
                      <span className="font-medium text-slate-700">{selectedAsset.width} × {selectedAsset.height} px</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <button
                  onClick={handleConfirmSelect}
                  className="w-full bg-[#6D5EF6] hover:bg-[#5b4ebf] text-white py-2.5 rounded-xl font-bold text-xs flex items-center justify-center space-x-2 shadow-md hover:shadow-lg transition-all"
                >
                  <CheckCircle2 size={16} />
                  <span>Select This Image</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
          <div className="text-xs text-slate-500">
            {selectedAsset ? `Selected: ${selectedAsset.filename}` : 'Click an image to select'}
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-800 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirmSelect}
              disabled={!selectedAsset}
              className={`px-5 py-2 rounded-xl text-xs font-bold text-white transition-all shadow-sm ${
                selectedAsset 
                  ? 'bg-[#6D5EF6] hover:bg-[#5b4ebf]' 
                  : 'bg-slate-300 cursor-not-allowed'
              }`}
            >
              Confirm Selection
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
