import { useCallback, useEffect, useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { toast } from "react-hot-toast";
import InputField from "../ui/InputField";
import Button from "../ui/Button";
import PrioritySelect from "../ui/PriorityDropDown";
import { deleteIcon } from "../../assets/icons";
import { CloudUpload, X } from "lucide-react";
import { useTheme } from "../../utilities/DarkLightModeProvider";
import { useTaskContext, Task } from "../../utilities/TaskContext";

const MAX_FILE_SIZE = 2 * 1024 * 1024;
interface FileWithPreview extends File {
  preview?: string;
}

interface TaskFormProps {
  initialTask?: Task | null;
  isOpen: boolean;
  onClose: () => void;
  title: string;
}

interface FormValues {
  id: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  visual?: string;
  date: string;
  time: string;
}

const getTodayString = () => {
  const today = new Date();
  return today.toISOString().split("T")[0];
};

const getCurrentTime = () => {
  const now = new Date();
  return `${String(now.getHours()).padStart(2, "0")}:${String(
    now.getMinutes()
  ).padStart(2, "0")}`;
};

const isDateTimeInPast = (date: string, time: string) => {
  const combinedDateTime = new Date(`${date}T${time}`);
  return combinedDateTime < new Date();
};

const validationSchema = Yup.object().shape({
  title: Yup.string()
    .required("Task name is required")
    .min(3, "Task name must be at least 3 characters"),
  description: Yup.string().optional(),
  date: Yup.string()
    .required("Deadline is required")
    .test("not-past", "Deadline cannot be in the past", function (date) {
      if (!date) return false;
      const time = this.parent.time || getCurrentTime();
      return !isDateTimeInPast(date, time);
    }),
  time: Yup.string()
    .required("Time is required")
    .test("not-past", "Time cannot be in the past", function (time) {
      if (!time) return false;
      const date = this.parent.date || getTodayString();
      return !isDateTimeInPast(date, time);
    }),
  priority: Yup.string().required("Priority is required"),
});

export default function TaskForm({
  initialTask,
  isOpen,
  onClose,
  title,
}: TaskFormProps) {
  const [file, setFile] = useState<FileWithPreview | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const { isDarkMode } = useTheme();
  const { addTask, updateTask } = useTaskContext();

  const isEditing = Boolean(initialTask);

  const getInitialValues = (): FormValues => {
    if (initialTask) {
      return {
        id: initialTask.id,
        title: initialTask.title,
        description: initialTask.description || "",
        status: initialTask.status,
        priority: initialTask.priority,
        visual: initialTask.visual || "",
        date: initialTask.date,
        time: initialTask.time,
      };
    }

    return {
      id: "",
      title: "",
      description: "",
      status: "To-Do",
      priority: "",
      visual: "",
      date: getTodayString(),
      time: getCurrentTime(),
    };
  };

  useEffect(() => {
    if (initialTask?.visual) {
      setFile({ preview: initialTask.visual } as FileWithPreview);
      setUploadProgress(100);
    } else {
      setFile(null);
      setUploadProgress(0);
    }
  }, [initialTask]);

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
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
    console.log(file);
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
      if (selectedFile.size > MAX_FILE_SIZE) {
        toast.error("File size exceeded. Maximum size is 2MB.");
        return;
      }

      const preview = await createPreview(selectedFile);
      const fileWithPreview = Object.assign(selectedFile, { preview });
      setFile(fileWithPreview);
      simulateUpload(selectedFile);
    } else {
      toast.error("File format not supported");
    }
  };

  const handleDrop = useCallback(async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      if (droppedFile.size > MAX_FILE_SIZE) {
        toast.error("File size exceeded. Maximum size is 2MB.");
        return;
      }
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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div
        className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="flex items-center justify-center min-h-screen p-4">
        <div
          className="relative bg-white dark:bg-gray-800 w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-xl transform transition-all"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center p-6 dark:border-gray-700">
            <h2 className="text-[2.4rem] font-semibold text-black dark:text-white">
              {title}
            </h2>
            <X
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            />
          </div>
          <div className="p-6">
            <Formik
              initialValues={getInitialValues()}
              validationSchema={validationSchema}
              onSubmit={(values, { resetForm }) => {
                try {
                  const taskData = { ...values, visual: file?.preview || "" };

                  if (isEditing) {
                    updateTask(initialTask?.id ?? "", taskData);
                    toast.success("Task updated successfully!");
                    onClose();
                  } else {
                    addTask({ ...taskData, id: crypto.randomUUID() });
                    toast.success("Task created successfully!");
                    onClose();
                  }

                  resetForm();
                  setFile(null);
                } catch (error) {
                  toast.error("Failed to save task. Please try again.");
                  console.log(error);
                }
              }}
            >
              {({ errors, touched, values, handleChange, setFieldValue }) => (
                <Form className="w-full max-w-2xl mx-auto">
                  <div className="space-y-4">
                    <div>
                      <InputField
                        title="Task Name"
                        error={
                          touched.title && errors.title ? errors.title : null
                        }
                        name="title"
                        value={values.title}
                        type="text"
                        placeholder="Enter task name"
                        onChange={handleChange}
                      />
                    </div>

                    <div>
                      <InputField
                        title="Description"
                        error={
                          touched.description && errors.description
                            ? errors.description
                            : null
                        }
                        name="description"
                        value={values.description}
                        textArea
                        placeholder="Write more on the task..."
                        optional
                        onChange={handleChange}
                      />
                    </div>

                    <div>
                      <label className="text-[1.4rem] text-techiBlack dark:text-white font-medium">
                        Priority
                      </label>
                      <PrioritySelect
                        value={values.priority}
                        onValueChange={(value) =>
                          setFieldValue("priority", value)
                        }
                      />
                      {touched.priority && errors.priority && (
                        <div className="text-red-500 text-sm mt-1">
                          {errors.priority}
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="text-[1.4rem] text-techiBlack dark:text-white font-medium">
                        Upload Cover
                        <span className="text-[1.4rem] text-techiGreyShadeTwo dark:text-gray-400 ml-2">
                          (Optional)
                        </span>
                      </label>
                    </div>

                    <div
                      className={`mt-4 border-2 rounded-lg p-6 text-center transition-colors
                        ${
                          isDragging
                            ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                            : "border-gray-300 dark:border-gray-600"
                        }
                        dark:bg-gray-800
                      `}
                      onDragEnter={handleDrag}
                      onDragLeave={handleDrag}
                      onDragOver={handleDrag}
                      onDrop={handleDrop}
                    >
                      {!file ? (
                        <div className="space-y-4">
                          <div className="flex justify-center">
                            <CloudUpload
                              color={isDarkMode ? "#ffffff" : "#000000"}
                            />
                          </div>

                          <label
                            htmlFor="file-upload"
                            className="text-[1.4rem] text-gray-500 dark:text-gray-400"
                          >
                            <span className="text-techiPurple text-[1.4rem] dark:text-purple-400 cursor-pointer">
                              Click to upload{" "}
                            </span>
                            or drag and drop <br />
                            PNG or JPG(max 2MB)
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
                        <div className="relative w-full flex flex-col sm:flex-row items-center gap-4">
                          <div className="w-full sm:w-auto">
                            <img
                              src={file.preview}
                              alt="Preview"
                              className="w-full sm:w-32 h-32 object-cover rounded-lg"
                            />
                          </div>
                          <div className="text-left flex-1">
                            <p className="text-[1.3rem] text-techiBlackShadeOne dark:text-white">
                              {file.name || "Uploaded Image"}
                            </p>
                            <p className="text-[1.3rem] text-techiGreyShadeOne dark:text-gray-400">
                              {file.size ? formatFileSize(file.size) : ""}
                            </p>
                            <div className="w-full max-w-md">
                              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                <div className="mt-1 h-2 w-full sm:w-[10rem] bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                  <div
                                    className="h-full bg-techiPurple dark:bg-purple-500 transition-all duration-300"
                                    style={{ width: `${uploadProgress}%` }}
                                  />
                                </div>
                                <span>{uploadProgress}%</span>
                              </div>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={handleDelete}
                            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
                          >
                            <img
                              src={deleteIcon}
                              alt="Delete"
                              className="w-[2.4rem] dark:invert"
                            />
                          </button>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                      <div className="w-full sm:w-1/2">
                        <InputField
                          placeholder="Enter due date"
                          title="Deadline"
                          error={
                            touched.date && errors.date ? errors.date : null
                          }
                          name="date"
                          value={values.date}
                          type="date"
                          onChange={handleChange}
                        />
                      </div>
                      <div className="w-full sm:w-1/2">
                        <InputField
                          placeholder="Enter due time"
                          title="Time"
                          error={
                            touched.time && errors.time ? errors.time : null
                          }
                          name="time"
                          value={values.time}
                          type="time"
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    <Button
                      type="submit"
                      action={isEditing ? "Update Task" : "Add Task"}
                    />
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
}
