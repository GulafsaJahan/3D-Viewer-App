import React, { useState } from 'react';
import API from '../api';
import Viewer from './Viewer';

const Upload3DModel = () => {
  const [file, setFile] = useState(null);
  const [modelUrl, setModelUrl] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('model', file);

    try {
      const res = await API.post('/model/upload', formData);
      setModelUrl(res.data.url); // Set URL of uploaded file
      alert('Model uploaded successfully');
    } catch (err) {
      alert('Upload failed');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Upload 3D Model (.glb/.obj)</h2>
      <form onSubmit={handleSubmit}>
        <input type="file" className="form-control my-2" accept=".obj,.glb" onChange={(e) => setFile(e.target.files[0])} required />
        <button className="btn btn-primary">Upload</button>
      </form>

      {modelUrl && (
        <div className="mt-4">
          <Viewer modelUrl={modelUrl} />
        </div>
      )}
    </div>
  );
};

export default Upload3DModel;
