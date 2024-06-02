import React, { useState } from 'react';
import { useUploadFileMutation } from '../../store/apiSlices/apiSlice';
import { toast } from 'react-toastify';

const Upload = () => {
  const [file, setFile] = useState(null);
  const [uploadFile] = useUploadFileMutation();

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (file) {
      try {
        await uploadFile(file).unwrap();
        toast.success('File uploaded successfully.');
        setFile(null);
      } catch (error) {
        toast.error('Failed to upload file.');
      }
    } else {
      toast.warning('Please select a file to upload.');
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Upload Page</h2>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload} className="ml-4 p-2 bg-blue-500 text-white rounded">
        Upload
      </button>
    </div>
  );
};

export default Upload;
