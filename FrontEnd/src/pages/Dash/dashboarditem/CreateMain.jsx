import React, { useState } from "react";
import CreateStats from "../../components/CreatePg/CreateStats";
import UserInp from "../../components/CreatePg/UserInp";
import { addDays, format } from "date-fns";
import Footer from "../../components/CreatePg/Footer";
import {
  createPrivateCapsules,
  getPrivateCapsules,
} from "../../backend/privateFns";
import StatsCreate from "../../components/CreatePg/StatsCreate";
import axios from "axios";

function CreateMain() {
  const [step, setStep] = useState(1);

  const [capsuleName, setCapsuleName] = useState("");
  const [message, setMessage] = useState("");
  const [isPrivate, setIsPrivate] = useState(true);
  const [openDate, setOpenDate] = useState(addDays(new Date(), 30));
  const [files, setFiles] = useState([]);
  const [isUploading, setIsUploading] = useState(false);

  const handleNextStep = () => {
    if (capsuleName === "" || message === "") return;
    if (step === 4) {
      return;
    }
    setStep((prev) => prev + 1);
  };
  const handlePrevStep = () => {
    if (step === 1) {
      return;
    }
    setStep((prev) => prev - 1);
  };

  const handleFileUpload = (e) => {
    const uploadedFiles = Array.from(e.target.files);
    setIsUploading(true);

    setTimeout(() => {
      setFiles((prev) => [
        ...prev,
        ...uploadedFiles.map((file) => ({
          id: Date.now() + Math.random(),
          file,
          name: file.name,
          size: (file.size / 1024 / 1024).toFixed(1) + " MB",
          type: file.type.startsWith("image")
            ? "image"
            : file.type.startsWith("video")
            ? "video"
            : file.type.startsWith("audio")
            ? "audio"
            : "document",
        })),
      ]);
      setIsUploading(false);
      e.target.value = "";
      console.log(files);
    }, 1000);
  };

  const removeFile = (id) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  };

  const handleCreateCapsule = async () => {
    const formData = new FormData();

    formData.append("title", capsuleName);
    formData.append("message", message);
    formData.append("opening_date", openDate.toISOString());
    formData.append("is_private", isPrivate ? 1 : 0);

    files.forEach((f) => formData.append("files[]", f.file));

    const res = await createPrivateCapsules(formData);
    console.log(res);
  };

  return (
    <>
      <main className="w-full flex flex-col justify-between gap-5">
        <div className="flex flex-col-reverse xl:flex-row  gap-5 px-5">
          <div className="flex w-full text-white h-fit">
            <UserInp
              step={step}
              capsuleName={capsuleName}
              setCapsuleName={setCapsuleName}
              message={message}
              setMessage={setMessage}
              isPrivate={isPrivate}
              setIsPrivate={setIsPrivate}
              openDate={openDate}
              setOpenDate={setOpenDate}
              files={files}
              setFiles={setFiles}
              handleFileUpload={handleFileUpload}
              removeFile={removeFile}
            />
          </div>
          <div className="w-full xl:w-90 md:flex-row xl:flex-col    text-white flex flex-col gap-5 ">
            <div className="md:w-full">
              <CreateStats state={step} setState={setStep} />
            </div>
            <div className="md:w-full ">
              <StatsCreate
                capsuleName={capsuleName}
                isPrivate={isPrivate}
                  openDate={openDate}
                  files={files}
              />
            </div>
          </div>
        </div>
        <Footer
          handlePrevStep={handlePrevStep}
          handleNextStep={handleNextStep}
          handleCreateCapsule={handleCreateCapsule}
          step={step}
        />
      </main>
    </>
  );
}

export default CreateMain;
