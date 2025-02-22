import { useCallback, useState } from "react";
import InputField from "../ui/InputField";
import Button from "../ui/Button";
import PrioritySelect from "../ui/PriorityDropDown";
import { deleteIcon, uploadCloud } from "../../assets/icons";
interface FileWithPreview extends File {
  preview?: string;
}
export default function TaskForm() {
  const [priority, setPriority] = useState<string>("");
  const [file, setFile] = useState<FileWithPreview | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + " B";
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB";
    else return (bytes / 1048576).toFixed(1) + " MB";
  };

  const handleDrag = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragging(true);
    } else if (e.type === "dragleave") {
      setIsDragging(false);
    }
  }, []);

  const simulateUpload = (file: File) => {
    setUploadProgress(0);
    console.log(file);

    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);

          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const createPreview = (file: File): Promise<string> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result as string);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleFile = async (selectedFile: File) => {
    if (
      selectedFile &&
      (selectedFile.type === "image/jpeg" || selectedFile.type === "image/png")
    ) {
      const preview = await createPreview(selectedFile);
      const fileWithPreview = Object.assign(selectedFile, { preview });
      setFile(fileWithPreview);
      simulateUpload(selectedFile);
    }
  };

  const handleDrop = useCallback(async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      await handleFile(droppedFile);
    }
  }, []);

  const handleFileInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      await handleFile(selectedFile);
    }
  };

  const handleDelete = () => {
    setFile(null);
    setUploadProgress(0);
  };

  return (
    <form className="w-[30%] mx-auto">
      <div>
        {" "}
        <InputField
          title="Task Name"
          error={null}
          name=""
          value=""
          type="text"
          placeholder="Enter task name"
        />
      </div>
      <div>
        {" "}
        <InputField
          title="Description"
          error={null}
          name=""
          value=""
          textArea
          placeholder="Write more on the task..."
          optional
        />
      </div>{" "}
      <div>
        <label className="text-[1.4rem] text-techiBlack text-[500]">
          Priority
        </label>
        <PrioritySelect value={priority} onValueChange={setPriority} />
      </div>
      <div className="mt-[2rem]">
        <label className="text-[1.4rem] text-techiBlack text-[500]">
          Upload Cover
          <span className="text-[1.4rem] text-techiGreyShadeTwo">
            (Optional)
          </span>
        </label>
      </div>
      <div
        className={`mt-4 border-2  rounded-lg p-6 text-center ${
          isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300"
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        {!file ? (
          <div className="space-y-2">
            <div className="flex justify-center">
              <img src={uploadCloud} alt="" width={40} height={40} />
            </div>

            <label
              htmlFor="file-upload"
              className="text-[1.4rem] text-gray-500"
            >
              <span className="text-[1.4rem] text-techiPurple">
                Click to upload{" "}
              </span>
              or drag and drop <br />
              PNG or JPG
            </label>
            <input
              type="file"
              className="hidden"
              accept=".jpg,.jpeg,.png"
              onChange={handleFileInput}
              id="file-upload"
            />
          </div>
        ) : (
          <div className="relative w-full flex items-center gap-x-[1rem]">
            <div>
              <img
                src={file.preview}
                alt="Preview"
                className="w-full h-[8rem] object-cover rounded-lg"
              />
            </div>
            <div className="text-left">
              <p className="text-[1.3rem] text-techiBlackShadeOne">
                {file.name}
              </p>
              <p className="text-[1.3rem] text-techiGreyShadeOne">
                {formatFileSize(file.size)}
              </p>
              <div className="w-full max-w-md mx-auto">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <div className="mt-1 h-2 w-[10rem] bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-techiPurple transition-all duration-300 text-[1.2rem]"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                  <span>{uploadProgress}%</span>
                </div>
              </div>
            </div>
            <img
              src={deleteIcon}
              alt=""
              width={24}
              height={24}
              onClick={handleDelete}
            />
          </div>
        )}
      </div>
      <div className="flex justify-between items-center">
        <div className="w-[48%]">
          {" "}
          <InputField
            title="Deadline"
            error={null}
            name=""
            value=""
            type="date"
            placeholder=""
          />
        </div>
        <div className="w-[48%]">
          {" "}
          <InputField
            title="Time"
            error={null}
            name=""
            value=""
            type="time"
            placeholder=""
          />
        </div>
      </div>
      <Button action="Update" handleClick={() => {}} />
    </form>
  );
}
