import React, { useRef, useState } from 'react';
import { Toast } from 'primereact/toast';
import { Tooltip } from 'primereact/tooltip';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import './FileUploader.scss';
import { FileUpload } from 'primereact/fileupload';

const FileUploader = ({ onUpload }) => {
  const [totalSize, setTotalSize] = useState(0);
  const toast = useRef(null);

  const onFileSelect = (event) => {
    const files = event.target.files;
    let _totalSize = totalSize;
    for (let i = 0; i < files.length; i++) {
      _totalSize += files[i].size;
    }
    setTotalSize(_totalSize);
  }

  return (
    <div className="file-uploader">
      <div className="card">
        <Toast ref={toast}></Toast>
        <Tooltip target=".custom-choose-btn" content="Choose" position="bottom" />
        <Tooltip target=".custom-upload-btn" content="Upload" position="bottom" />
        <Tooltip target=".custom-cancel-btn" content="Clear" position="bottom" />
        <h5>Advanced File Upload</h5>
        <FileUpload 
          name="demo[]" 
          url="https://primefaces.org/primereact/showcase/upload.php" 
          onUpload={onUpload} 
          multiple 
          accept="image/*.zip.pdf.doc.rar" 
          maxFileSize={1000000}
          emptyTemplate={<p className="m-0">Drag and drop files to here to upload.</p>} 
        />
      </div>
    </div>
  );
}

export default FileUploader;
