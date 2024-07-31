import { ReactNode, useState } from "react";
import styled from "styled-components";
import { useTranslation } from 'react-i18next';

const DragAndDropTitle = styled.div`

font-size: 16px;
font-weight: 500;
line-height: 20.4px;
color: #C9D5D8;
text-align:center;

`
function DragAndDrop({
  className,
  children,
  key,
  color,
  subTitle,
  accept,
  getFileData
}: {
  className?: string;
  children?: ReactNode;
  key?: string;
  subTitle?: string;
  accept?: string;
  color?: string;
  getFileData?: (file: File | null | undefined) => void;
}) {
  const { t } = useTranslation();
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null | undefined>(null);

  function handleDragEnter(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setIsDragging(true);
  }

  function handleDragLeave(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setIsDragging(false);
  }

  function handleDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (getFileData) {
      getFileData(files[0]);
    }
    // Do something with the dropped files
    setFile(files[0]);
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (getFileData) {
      getFileData(selectedFile);
    }
    setFile(selectedFile);
  };

  const styles = {
    container: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },

    title: {
      color: "#605B5B",
      fontSize: "13px",
    },
    subtitle: {
      color: "#878787",
      fontWeight: 500,
      fontSize: "16px",
    },
    icon: {
      width: "21px",
      height: "21px",
    },
  };

  return (
    <div
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
      style={{
        width: "100%",
      }}
    >
      <label
        htmlFor={key ? key : "file"}
        style={{
          ...styles.container,
          width: "100%",
          flexDirection: "column",

          border: isDragging ? "2px dashed #605B5B" : "2px dashed transparent",
          borderRadius: "6px",
        }}
      >
        {!children ? (
          <div
            style={{
              backgroundColor: color ? color : "#0A2328",
              width: "100%",
              padding: "32px 0",
              borderRadius: "6px",
            }}
            className={`${className}`}
          >
            <div
              style={{
                ...styles.container,
                gap: "20px",
              }}
            >
              <Icon />
            </div>
            <DragAndDropTitle>
              {t("Click to choose a file or drag and drop here")}
            </DragAndDropTitle>
            <p style={{ ...styles.subtitle, textAlign: "center" }}>
              {file ? <p>{file.name}</p> : subTitle ? subTitle : "(Pdf,txt,doc)"}
            </p>
          </div>
        ) : (
          <>{children}</>
        )}
      </label>
      <input
        type="file"
        accept={accept ?? ".csv,.xls,.xlsx,.xlsb"}
        id={key ? key : "file"}
        onChange={handleFileChange}
        style={{
          display: "none",
        }}
      />
    </div>
  );
}

function Icon() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="28" height="28" rx="8" fill="#384B4F" />
      <path
        d="M22.3332 13.167V18.167C22.3332 21.5003 21.4998 22.3337 18.1665 22.3337H9.83317C6.49984 22.3337 5.6665 21.5003 5.6665 18.167V9.83366C5.6665 6.50033 6.49984 5.66699 9.83317 5.66699H11.0832C12.3332 5.66699 12.6082 6.03366 13.0832 6.66699L14.3332 8.33366C14.6498 8.75033 14.8332 9.00033 15.6665 9.00033H18.1665C21.4998 9.00033 22.3332 9.83366 22.3332 13.167Z"
        stroke="#96ADB3"
        strokeWidth="1.5"
        strokeMiterlimit="10"
      />
    </svg>
  );
}

export default DragAndDrop;
