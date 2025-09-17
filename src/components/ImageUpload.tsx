import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Upload, X } from 'lucide-react';

interface ImageUploadProps {
  onUploadComplete?: (url: string) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onUploadComplete }) => {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setError(null);
      const file = e.target.files?.[0];
      if (!file) return;

      // Create preview
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);

      // Validate file type
      if (!file.type.startsWith('image/')) {
        throw new Error('Please select an image file');
      }

      // Validate file size (5MB)
      if (file.size > 5 * 1024 * 1024) {
        throw new Error('Image size must be less than 5MB');
      }

      setUploading(true);

      // Generate unique filename
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;

      // Upload file
      const { error: uploadError, data } = await supabase.storage
        .from('images')
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('images')
        .getPublicUrl(filePath);

      if (onUploadComplete) {
        onUploadComplete(publicUrl);
      }

    } catch (err) {
      console.error('Upload error:', err);
      setError(err instanceof Error ? err.message : 'Error uploading file');
    } finally {
      setUploading(false);
    }
  };

  const clearPreview = () => {
    if (preview) {
      URL.revokeObjectURL(preview);
      setPreview(null);
    }
  };

  useEffect(() => {
    return () => {
      clearPreview();
    };
  }, []);

  return (
    <div className="w-full">
      <label className="block w-full">
        <div className={`relative border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-all ${
          error ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-brand-purple'
        }`}>
          {preview ? (
            <div className="relative">
              <img 
                src={preview} 
                alt="Upload preview" 
                className="max-h-48 mx-auto rounded"
              />
              <button
                onClick={(e) => {
                  e.preventDefault();
                  clearPreview();
                }}
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
              >
                <X size={16} />
              </button>
            </div>
          ) : (
            <div className="space-y-2">
              <Upload className="w-10 h-10 mx-auto text-gray-400" />
              <div className="text-sm text-gray-600">
                {uploading ? 'Uploading...' : 'Click or drag image to upload'}
              </div>
              <div className="text-xs text-gray-400">
                PNG, JPG, GIF up to 5MB
              </div>
            </div>
          )}
          
          <input
            type="file"
            className="hidden"
            accept="image/*"
            onChange={handleFileSelect}
            disabled={uploading}
          />
        </div>
      </label>

      {error && (
        <div className="mt-2 text-sm text-red-500">
          {error}
        </div>
      )}
    </div>
  );
};

export default ImageUpload;