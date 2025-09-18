import { useState, useRef } from "react";
import { Camera,  MapPin, Send } from "lucide-react";

const Report = () => {
  interface ReportData {
    title: string;
    description: string;
    photos: File[];
    audio: File | null;
    latitude: string;
    longitude: string;
    department?: string;
  }

  const [reportData, setReportData] = useState<ReportData>({
    title: "",
    description: "",
    photos: [],
    audio: null,
    latitude: "",
    longitude: "",
  });

  const [isRecording, setIsRecording] = useState(false);
  const recognitionRef = useRef<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: any) => {
    const { name, value, files } = e.target;
    if (name === "photos") {
      setReportData({
        ...reportData,
        photos: Array.from(files as FileList).slice(0, 3) as File[],
      });
    } else if (name === "audio") {
      setReportData({ ...reportData, audio: files[0] });
    } else {
      setReportData({ ...reportData, [name]: value });
    }
  };

  const handleLocationTagging = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setReportData({
            ...reportData,
            latitude: position.coords.latitude.toString(),
            longitude: position.coords.longitude.toString(),
          });
        },
        (error) => {
          console.error("Geolocation error:", error);
          alert("Unable to fetch location. Please enter manually if needed.");
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  const handleVoiceToText = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Your browser does not support Speech Recognition.");
      return;
    }

    if (!recognitionRef.current) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.lang = "en-IN"; // Change to 'hi-IN' for Hindi, 'en-US' for US English, etc.
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setReportData((prev) => ({
          ...prev,
          description: prev.description
            ? prev.description + " " + transcript
            : transcript,
        }));
        setIsRecording(false);
      };

      recognitionRef.current.onerror = (err: any) => {
        console.error("Speech recognition error:", err);
        setIsRecording(false);
      };

      recognitionRef.current.onend = () => {
        setIsRecording(false);
      };
    }

    if (isRecording) {
      recognitionRef.current.stop();
      setIsRecording(false);
    } else {
      recognitionRef.current.start();
      setIsRecording(true);
    }
  };

  const handleReportSubmit = async (e: any) => {
  e.preventDefault();
  setIsSubmitting(true); // start loading

  try {
    const formData = new FormData();
    formData.append("title", reportData.title);
    formData.append("description", reportData.description);
    formData.append("lat", reportData.latitude);
    formData.append("lng", reportData.longitude);
    formData.append("department", reportData.department || "general");

    if (reportData.audio) formData.append("audio", reportData.audio);
    reportData.photos.forEach((photo) => formData.append("photos", photo));

    const response = await fetch("http://localhost:5000/api/v1/reports/create", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) throw new Error("Failed to submit report");

    const result = await response.json();
    console.log("Report submitted successfully:", result);
    alert("✅ Report submitted successfully! Thank you for your contribution.");

    setReportData({
      title: "",
      description: "",
      photos: [],
      audio: null,
      latitude: "",
      longitude: "",
    });
  } catch (error) {
    console.error("Error submitting report:", error);
    alert("❌ Something went wrong. Please try again.");
  } finally {
    setIsSubmitting(false); // stop loading
  }
};

  return (
    <div>
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 text-center">
        Submit a New Civic Report
      </h2>
      <p className="text-center text-gray-600 mb-8">
        Your report helps the Government of Jharkhand build a better community.
      </p>

      {/* Loading Overlay */}
{isSubmitting && (
  <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
    <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
  </div>
)}


      <form onSubmit={handleReportSubmit} className="space-y-6">
        {/* Title */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Title of the Issue
          </label>
          <input
            type="text"
            name="title"
            id="title"
            value={reportData.title}
            onChange={handleInputChange}
            required
            placeholder="e.g., Pothole on Main Street"
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
          />
        </div>

        {/* Description + Voice-to-Text */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Detailed Description
          </label>
          <textarea
            name="description"
            id="description"
            rows={4}
            value={reportData.description}
            onChange={handleInputChange}
            required
            placeholder="Describe the issue, its location, and any other relevant details."
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
          ></textarea>
          <button
            type="button"
            onClick={handleVoiceToText}
            className={`mt-2 px-4 py-2 rounded-md shadow-sm text-white ${
              isRecording ? "bg-red-500" : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {isRecording ? "Stop Recording" : " Speak"}
          </button>
        </div>

        {/* Audio Upload */}
        <div>
          <label htmlFor="audio" className="block text-sm font-medium text-gray-700">
            Upload Audio (Optional)
          </label>
          <div className="mt-1 flex justify-center items-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
            <div className="space-y-1 text-center">
              {/* <Mic className="mx-auto h-12 w-12 text-gray-400" /> */}
              <div className="flex text-sm text-gray-600 justify-center">
                <label
                  htmlFor="audio-upload"
                  className="relative cursor-pointer bg-white rounded-md font-medium text-green-600 hover:text-green-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-green-500"
                >
                  <span>Upload an audio file</span>
                  <input
                    id="audio-upload"
                    name="audio"
                    type="file"
                    accept="audio/*"
                    className="sr-only"
                    onChange={handleInputChange}
                  />
                </label>
              </div>
              <p className="text-xs text-gray-500">MP3, WAV, M4A</p>
            </div>
          </div>
          {reportData.audio && (
            <p className="mt-2 text-sm text-gray-600">
              File: {reportData.audio.name}
            </p>
          )}
        </div>
        {/* Department */}
<div>
  <label htmlFor="department" className="block text-sm font-medium text-gray-700">
    Department
  </label>
  <select
    name="department"
    id="department"
    value={reportData.department || ""}
    onChange={handleInputChange}
    required
    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
  >
    <option value="" disabled>
      Select Department
    </option>
    <option value="Public Works">Public Works</option>
    <option value="Sanitation">Sanitation</option>
    <option value="Electricity">Electricity</option>
    <option value="Water Supply">Water Supply</option>
    <option value="General">General</option>
  </select>
</div>


        {/* Location */}
        <div className="space-y-3">
          <label className="block text-sm font-medium text-gray-700">Location</label>
          <div className="flex space-x-4">
            <div className="flex-1">
              <label htmlFor="latitude" className="sr-only">Latitude</label>
              <input
                type="text"
                name="latitude"
                id="latitude"
                value={reportData.latitude}
                onChange={handleInputChange}
                readOnly
                required
                placeholder="Latitude"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-50 text-gray-600 cursor-not-allowed"
              />
            </div>
            <div className="flex-1">
              <label htmlFor="longitude" className="sr-only">Longitude</label>
              <input
                type="text"
                name="longitude"
                id="longitude"
                value={reportData.longitude}
                onChange={handleInputChange}
                readOnly
                required
                placeholder="Longitude"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-50 text-gray-600 cursor-not-allowed"
              />
            </div>
          </div>
          <button
            type="button"
            onClick={handleLocationTagging}
            className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <MapPin className="w-4 h-4 mr-2" />
            Auto-Tag My Location
          </button>
        </div>

        {/* Photos */}
        <div>
          <label htmlFor="photos" className="block text-sm font-medium text-gray-700">
            Upload Photos (Max 3)
          </label>
          <div className="mt-1 flex justify-center items-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
            <div className="space-y-1 text-center">
              <Camera className="mx-auto h-12 w-12 text-gray-400" />
              <div className="flex text-sm text-gray-600 justify-center">
                <label
                  htmlFor="photo-upload"
                  className="relative cursor-pointer bg-white rounded-md font-medium text-green-600 hover:text-green-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-green-500"
                >
                  <span>Upload files</span>
                  <input
                    id="photo-upload"
                    name="photos"
                    type="file"
                    multiple
                    accept="image/*"
                    className="sr-only"
                    onChange={handleInputChange}
                  />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB each</p>
            </div>
          </div>
          {reportData.photos.length > 0 && (
            <div className="mt-2 text-sm text-gray-600">
              {reportData.photos.map((file, index) => (
                <p key={index}>{file.name}</p>
              ))}
            </div>
          )}
        </div>

        {/* Submit */}
        <div>
          <button
            type="submit"
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
          >
            <Send className="w-5 h-5 mr-2" />
            Submit Report
          </button>
        </div>
      </form>
    </div>
  );
};

export default Report;
