import React from "react";
import { Link} from "react-router-dom";
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { signoutSuccess } from "../redux/user/userSilce";

export default function () {
  const {currentUser} = useSelector((state) => state.user);


  const dispatch = useDispatch();


  const handleSignout = async () => {
    try {
      const res = await fetch('/api/user/signout', {
        method: 'POST',
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="bg-gradient-to-r from-[#161615] to-[#f3f8f3] via-white">
      <div className=" flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to="/ViewSchedule">
          <h1 className="font-medium text-white text-xl ">Schedule</h1>
        </Link>
        <ul className="flex gap-4">
          

           

          
         

            {currentUser ? (
              <>
              <Link to="/ViewSchedule">
              <div className="className=' cursor-pointer font-serif text-xl text-slate-700 hover:text-slate-900">ViewSchedule</div>
              </Link>
              <Link to="/profile">
               <img src={currentUser.profilePicture} alt="profile" className="h-7 w-7 rounded-full object-cover" />
               </Link>
            
              
               <span onClick={handleSignout} className=' cursor-pointer font-serif text-xl text-slate-700 hover:text-slate-900'>
               Sign Out
             </span>
             </>
               )
           
            :(
              <Link to="/sign-in" >
              <li className="font-serif text-xl text-slate-700 hover:text-slate-900">Sing In</li>
              </Link>
            )}
            
        
        </ul>
      </div>
    </div>
  );
}