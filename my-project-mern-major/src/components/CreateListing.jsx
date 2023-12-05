import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  getStorage,
} from "firebase/storage";
import app from "../firebase";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";
export default function CreateListing() {
  const alert = useAlert();
  const navigate = useNavigate();
  const data = useSelector((state) => {
    return state.users;
  });
  const storage = getStorage(app);
  const [formData, setFormData] = useState({
    description: "",
    full_address: "",
    society: "",
    bhk_type: "",
    bathrooms: "",
    facing: "",
    lower_price: "",
    upper_price: "",
    images: ["https://firebasestorage.googleapis.com/v0/b/real-state-4d214.appspot.com/o/files%2Ftwo.png%2B0.24633917121151816?alt=media&token=c5993f49-018b-435a-bbc2-af6b5347de95"],
    user_id: data.user_id,
  });

  const [files, setFiles] = useState([]);
  const [fileUrl, setFileUrl] = useState([]);
  const [enable, setEnable] = useState(false);

  const handleInputFileChange = (e) => {
    for (let i = 0; i < e.target.files.length; i++) {
      const newFile = e.target.files[i];
      newFile["id"] = Math.random();
      setFiles((prev) => [...prev, newFile]);
    }
  };

  const uploadToFirebase = () => {
    if(files.length==0){
      alert.error("Please Select Images");
      return;
    }
 if(files.length>4){
    alert.error("Please Select only 4 Images");
    return;
 }
    
    handleUpload(files);
  }
  const handleFromSubmit = async (e) => {
    e.preventDefault();
    setTimeout(() => {}, 5000);
    setFormData({ ...formData, images: fileUrl });
      const res = await fetch("/api/property/addproperty", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": `${data.accessToken}`,
        },
        body: JSON.stringify(formData),
      });

     const resdata = await res.json();
    if (resdata.success == true) {
      alert.success("Property Added Successfully");
      setTimeout(() => {}, 2000);
      
      navigate("/profile")
      setFormData({});
      setFiles([]);
      setFileUrl([]);
      setEnable(false);

   
    } else {
      alert.error(resdata.message);
    }
  };

  const handleUpload = (files) => {
    files.map((file) => {
      const storageRef = ref(storage, `/files/${file.name}+${file.id}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const percent = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          console.log(percent);
        },
        (err) => console.log(err),
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            setFileUrl((prev) => [...prev, url]);
           
          });
        }
      );
     
    });
  

   
  };
  return (
    <>
      <div
        className="flex justify-center w-full   bg-gray-100"
        style={{ height: "100vh" }}
      >
        <div className="mt-24">
          <div className="flex justify-center bg-gray-200">
            <main className="p-3 max-w-4xl mx-auto shadow">
              <h1 className="text-3xl font-semibold text-center my-7">
                Create a Listing
              </h1>
              <form  onSubmit={handleFromSubmit}
                className="flex flex-col sm:flex-row gap-4"
                
              >
                <div className="flex flex-col gap-4 flex-1">
                  <textarea
                    type="text"
                    placeholder="Description"
                    className="border p-3 rounded-lg"
                    id="description"
                    required
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        [e.target.id]: e.target.value,
                      });
                    }}
                  />
                  <input
                    type="text"
                    placeholder="Full Address"
                    className="border p-3 rounded-lg"
                    id="full_address"
                    required
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        [e.target.id]: e.target.value,
                      });
                    }}
                  />
                  <input
                    type="text"
                    placeholder="Society Name"
                    className="border p-3 rounded-lg"
                    id="society"
                    required
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        [e.target.id]: e.target.value,
                      });
                    }}
                  />

                  <div className="flex flex-wrap gap-6">
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        id="bhk_type"
                        min="1"
                        max="10"
                        required
                        className="p-3 border border-gray-300 rounded-lg"
                        onChange={(e) => {
                          setFormData({
                            ...formData,
                            [e.target.id]: e.target.value,
                          });
                        }}
                      />
                      <p>BHK</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        id="bathrooms"
                        min="1"
                        max="10"
                        required
                        className="p-3 border border-gray-300 rounded-lg"
                        onChange={(e) => {
                          setFormData({
                            ...formData,
                            [e.target.id]: e.target.value,
                          });
                        }}
                      />
                      <p>Baths</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        id="facing"
                        required
                        className="p-3 border border-gray-300 rounded-lg"
                        onChange={(e) => {
                          setFormData({
                            ...formData,
                            [e.target.id]: e.target.value,
                          });
                        }}
                      />
                      <p>Facing</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        id="lower_price"
                        min="1"
                        max="10"
                        required
                        className="p-3 border border-gray-300 rounded-lg"
                        onChange={(e) => {
                          setFormData({
                            ...formData,
                            [e.target.id]: e.target.value,
                          });
                        }}
                      />
                      <div className="flex flex-col items-center">
                        <p>Lower Price</p>
                        <span className="text-xs">($ / month)</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        id="upper_price"
                        min="1"
                        max="10"
                        required
                        className="p-3 border border-gray-300 rounded-lg"
                        onChange={(e) => {
                          setFormData({
                            ...formData,
                            [e.target.id]: e.target.value,
                          });
                        }}
                      />
                      <div className="flex flex-col items-center">
                        <p>Upper Price</p>
                        <span className="text-xs">($ / month)</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col flex-1 gap-4">
                  <p className="font-semibold">
                    Images:
                    <span className="font-normal text-gray-600 ml-2">
                      The first image will be the cover (max 4)
                    </span>
                  </p>
                  <div className="flex gap-4">
                    <input
                      className="p-3 border border-gray-300 rounded w-full"
                      type="file"
                      id="images"
                      accept="image/*"
                      multiple
                      onChange={handleInputFileChange}
                    />
                    <button onClick={uploadToFirebase} type="button"  className='p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80'>Upload</button>
                  </div>
                  <button type="submit"  className="p-3 bg-purple-400 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
                    Create Listing
                  </button>
                </div>
              </form>
            </main>
          </div>
        </div>
        {/* </div> */}
      </div>
    </>
  );
}
