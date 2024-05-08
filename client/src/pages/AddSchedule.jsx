import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";



export default function SignUp() {
  const [formData, setFormData] = useState({});
  
  const [loading, setLoading] = useState(false);
  const [publishError, setPublishError] = useState(null);
  const navigate = useNavigate();
  console.log(formData)

  const handlchange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/user/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        setPublishError(data.message);
        return;
      }

      if (res.ok) {
        setPublishError(null);
        
        alert("successfull");
        navigate("/ViewSchedule")
        
      }
    } catch (error) {
      setPublishError("Something went wrong");
    }
  };

 
  const handleDateChange = (e) => {
    const date = e.target.value.trim(); // Remove leading/trailing spaces
    const datePattern = /^(0[1-9]|1[0-2])\/(0[1-9]|[1-2][0-9]|3[0-1])\/\d{2}$/;
  
    if (!datePattern.test(date)) {
      setPublishError("Invalid date format. Please use mm/dd/yy format.");
    } else {
      setFormData({ ...formData, wantdate: date });
      setPublishError(null); // Clear error message if date is valid
    }
  };
  

  return (
    <div className=" ">
        
         
         <img src="https://media.istockphoto.com/id/903533082/vector/abstract-gray-background.jpg?s=612x612&w=0&k=20&c=4Voiv87FE56PeR5cZTBH7y_6rwPG4jaWD6ERIbSfbpk=" alt="" className="w-full h-[1000px] object-cover " />
         <div className="absolute transform -translate-x-0 translate-y-0 top-1 ml-6 ">
         <h1 className="text-5xl font-serif  whitespace-nowrap ml-80 mt-14 text-slate-900">New Schedule</h1>
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
       
        
          <div className="w-[550px] h-[900px] border rounded-xl  mt-2 bg-white bg-opacity-25 shadow-xl ml-60 shadow-xl">
        <div className="flex justify-center items-center   mt-6">
          <form className="flex flex-col   gap-4" onSubmit={handleSubmit} >
            
           
            <div>
            <h3 className="font-semibold text-black ml-1">Required Date</h3>
              <input
               className=" bg-slate-100 p-3 rounded-lg w-[460px] h-11"
                type="text"
                placeholder="(mm/dd/yy)"
                id="wantdate"
                
            
                maxLength={8}
            
                onChange={handleDateChange}
              />
            </div>
            <div>
            <h3 className="font-semibold text-black ml-1">Panel</h3>
              <textarea
              className=" bg-slate-100 p-3 rounded-lg w-[460px] h-10"
                type="text"
                placeholder=""
                id="Panel"
                onChange={handlchange}
              />
            </div>
            <div>
            <h3 className="font-semibold text-black ml-1">InchargeName</h3>
              <textarea
              className=" bg-slate-100 p-3 rounded-lg w-[460px] h-10"
                type="text"
                placeholder=""
                id="incharge"
                onChange={handlchange}
              />
            </div>
            <div>
            <h3 className="font-semibold text-black ml-1">Location</h3>
              <textarea
              className=" bg-slate-100 p-3 rounded-lg w-[460px] h-20"
                type="text"
                placeholder=""
                id="Location"
                onChange={handlchange}
              />
            </div>
            <div>
            <h3 className="font-semibold text-black ml-1">Event</h3>
              <textarea
              className=" bg-slate-100 p-3 rounded-lg w-[460px] h-20"
                type="text"
                placeholder=""
                id="event"
                onChange={handlchange}
              />
            </div>
            <div>
            <h3 className="font-semibold text-black ml-1">Participants</h3>
              <textarea
              className=" bg-slate-100 p-3 rounded-lg w-[460px] h-20"
                type="text"
                placeholder=""
                id="participants"
                onChange={handlchange}
              />
            </div>
           
            <div>
            <h3 className="font-semibold text-black ml-1">Specialinstructions</h3>
              <textarea
              className=" bg-slate-100 p-3 rounded-lg w-[460px] h-20"
                type="text"
                placeholder=""
                id="specialinstructions"
                onChange={handlchange}
              />
            </div>
           
            <button
              className="  bg-gradient-to-r from-[#141615] to-[#f3f8f3] via-white text-black p-3 border border-black rounded-lg w-[460px] h-11 hover:opacity-90"
              type="submit"
             
            >
             submit 
            </button>

            {publishError && (
            <p className="mt-5 text-red-600  w-300 h-7 rounded-lg text-center ">
              {publishError}
            </p>
          )}
          
          </form>
          
         
         
        </div>
        </div>
      </div>
      </div>
    </div>
  );
}
