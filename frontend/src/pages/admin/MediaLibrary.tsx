import React, { useState, useEffect } from 'react';
import { Upload, Search, Image as ImageIcon, Trash2, Folder, Sparkles, Loader2, Copy, Check, Eye, ExternalLink } from 'lucide-react';
import { MediaAsset } from '../../types';
import { apiService } from '../../services/apiService';

export const MediaLibrary: React.FC = () => {
  const [mediaList, setMediaList] = useState<MediaAsset[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [previewMedia, setPreviewMedia] = useState<MediaAsset | null>(null);

  const [selectedSource, setSelectedSource] = useState<'ALL' | 'PUBLIC_ASSET' | 'UPLOADED'>('ALL');
  const [selectedFolder, setSelectedFolder] = useState<string>('All');
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchMedia();
  }, []);

  const fetchMedia = async () => {
    setLoading(true);
    try {
      const data = await apiService.getMedia();
      setMediaList(data);
    } catch (err) {
      console.error('Failed to load media assets:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setIsUploading(true);
      setUploadStatus(null);

      try {
        const newMedia = await apiService.uploadMedia(file, selectedFolder === 'All' ? 'Uploaded' : selectedFolder, file.name);
        setMediaList(prev => [newMedia, ...prev]);
        setUploadStatus(`Successfully uploaded "${file.name}" to persistent media storage!`);
      } catch (err: any) {
        setUploadStatus(`Upload failed: ${err.message || 'Error uploading file'}`);
      } finally {
        setIsUploading(false);
      }
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this media file?')) return;
    try {
      await apiService.deleteMedia(id);
      setMediaList(prev => prev.filter(m => m.id !== id));
      if (previewMedia?.id === id) setPreviewMedia(null);
    } catch (err: any) {
      alert(err.message || 'Failed to delete media asset');
    }
  };

  const handleCopyUrl = (url: string, id: string) => {
    const fullUrl = url.startsWith('http') ? url : `${window.location.origin}${url}`;
    navigator.clipboard.writeText(fullUrl);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredMedia = mediaList.filter(m => {
    if (selectedSource !== 'ALL' && m.source !== selectedSource) return false;
    if (selectedFolder !== 'All' && m.folder !== selectedFolder) return false;
    if (search && !m.filename.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="space-y-6 font-display text-slate-900 bg-[#F8FAFC] min-h-screen p-6">
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-200 pb-6">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Media Library & Asset Vault</h1>
          <p className="text-xs text-slate-500 mt-1">Discover project static assets and upload persistent media for products, categories, and banners.</p>
        </div>

        <label className={`flex items-center gap-2 ${isUploading ? 'bg-[#6D5EF6] opacity-75' : 'bg-[#6D5EF6] hover:bg-[#5847E4]'} text-white px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider cursor-pointer shadow-md transition-all`}>
          {isUploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
          {isUploading ? 'Uploading...' : 'Upload New Media'}
          <input type="file" onChange={handleUpload} disabled={isUploading} className="hidden" accept="image/*,video/*" />
        </label>
      </div>

      {uploadStatus && (
        <div className="p-3 bg-[#6D5EF6]/10 border border-[#6D5EF6]/20 rounded-xl text-xs text-[#6D5EF6] font-semibold flex items-center justify-between">
          <span>{uploadStatus}</span>
          <button onClick={() => setUploadStatus(null)} className="text-slate-400 hover:text-slate-600 font-bold">✕</button>
        </div>
      )}

      {/* Filter Tabs & Search */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Source Badges Filter */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <button
            onClick={() => setSelectedSource('ALL')}
            className={`px-3.5 py-1.5 rounded-xl font-bold transition-all ${
              selectedSource === 'ALL' ? 'bg-[#6D5EF6] text-white shadow-sm' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            All Media ({mediaList.length})
          </button>
          <button
            onClick={() => setSelectedSource('PUBLIC_ASSET')}
            className={`px-3.5 py-1.5 rounded-xl font-bold transition-all ${
              selectedSource === 'PUBLIC_ASSET' ? 'bg-amber-600 text-white shadow-sm' : 'bg-amber-50 text-amber-800 hover:bg-amber-100'
            }`}
          >
            Public Assets ({mediaList.filter(m => m.source === 'PUBLIC_ASSET').length})
          </button>
          <button
            onClick={() => setSelectedSource('UPLOADED')}
            className={`px-3.5 py-1.5 rounded-xl font-bold transition-all ${
              selectedSource === 'UPLOADED' ? 'bg-emerald-600 text-white shadow-sm' : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
            }`}
          >
            Uploaded ({mediaList.filter(m => m.source === 'UPLOADED').length})
          </button>
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search filenames..."
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-[#6D5EF6]"
          />
        </div>
      </div>

      {/* Media Grid */}
      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8].map(n => (
            <div key={n} className="h-48 bg-slate-200 rounded-2xl animate-pulse" />
          ))}
        </div>
      ) : filteredMedia.length === 0 ? (
        <div className="bg-white p-12 rounded-2xl border border-slate-200 text-center shadow-sm">
          <ImageIcon className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-800">No media assets found</h3>
          <p className="text-xs text-slate-500 mt-1">Upload a file or clear search query.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          {filteredMedia.map((media) => (
            <div key={media.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden group hover:shadow-md transition-shadow flex flex-col justify-between">
              
              <div className="h-44 bg-slate-100 overflow-hidden relative cursor-pointer" onClick={() => setPreviewMedia(media)}>
                <img 
                  src={media.url} 
                  alt={media.filename} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=400&q=80';
                  }}
                />

                {/* Source Badge */}
                <div className="absolute top-2 left-2">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold shadow-sm ${
                    media.source === 'PUBLIC_ASSET' ? 'bg-amber-100 text-amber-800 border border-amber-300' : 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                  }`}>
                    {media.source === 'PUBLIC_ASSET' ? 'Public Asset' : 'Uploaded'}
                  </span>
                </div>

                <div className="absolute inset-0 bg-slate-900/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-2">
                  <button
                    onClick={(e) => { e.stopPropagation(); setPreviewMedia(media); }}
                    className="p-2 bg-white/90 rounded-xl text-slate-700 hover:text-[#6D5EF6] shadow"
                    title="Preview"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); handleCopyUrl(media.url, media.id); }}
                    className="p-2 bg-white/90 rounded-xl text-slate-700 hover:text-[#6D5EF6] shadow"
                    title="Copy URL"
                  >
                    {copiedId === media.id ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  </button>
                  {media.source === 'UPLOADED' && (
                    <button
                      onClick={(e) => { e.stopPropagation(); handleDelete(media.id); }}
                      className="p-2 bg-white/90 rounded-xl text-slate-700 hover:text-rose-600 shadow"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>

              <div className="p-3.5 text-xs">
                <p className="font-bold text-slate-900 truncate" title={media.filename}>{media.filename}</p>
                <div className="flex justify-between items-center text-[10px] text-slate-500 mt-1 font-mono">
                  <span>{media.folder || 'Assets'}</span>
                  <span>{media.size_bytes ? `${(media.size_bytes / 1024).toFixed(0)} KB` : 'N/A'}</span>
                </div>
              </div>

            </div>
          ))}
        </div>
      )}

      {/* PREVIEW MODAL */}
      {previewMedia && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 truncate">{previewMedia.filename}</h3>
              <button onClick={() => setPreviewMedia(null)} className="text-slate-400 hover:text-slate-600 font-bold">✕</button>
            </div>
            
            <div className="p-6">
              <div className="aspect-video rounded-xl bg-slate-100 border border-slate-200 overflow-hidden mb-4 flex items-center justify-center">
                <img src={previewMedia.url} alt={previewMedia.filename} className="w-full h-full object-contain" />
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-400">Source:</span>
                  <span className="font-bold text-slate-800">{previewMedia.source === 'PUBLIC_ASSET' ? 'Public Static Asset' : 'Uploaded Storage'}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-400">Folder:</span>
                  <span className="font-semibold text-slate-800">{previewMedia.folder}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-400">File Size:</span>
                  <span className="font-semibold text-slate-800">{previewMedia.size_bytes ? `${(previewMedia.size_bytes / 1024).toFixed(1)} KB` : 'N/A'}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-400">URL Path:</span>
                  <span className="font-mono text-[11px] text-slate-700 truncate max-w-[240px]">{previewMedia.url}</span>
                </div>
              </div>
            </div>

            <div className="px-6 py-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
              <button
                onClick={() => handleCopyUrl(previewMedia.url, previewMedia.id)}
                className="bg-white border border-slate-200 text-slate-800 hover:bg-slate-100 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5"
              >
                {copiedId === previewMedia.id ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} />}
                <span>{copiedId === previewMedia.id ? 'Copied Link!' : 'Copy Image URL'}</span>
              </button>
              
              <button
                onClick={() => setPreviewMedia(null)}
                className="bg-[#6D5EF6] text-white px-4 py-1.5 rounded-xl text-xs font-bold"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

