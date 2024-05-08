import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import moment from 'moment';


export default function Home() {
  const { currentUser } = useSelector((state) => state.user);
  const [workouts, setWorkouts] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [notification, setNotification] = useState(null);
  const [filter, setfilter] = useState([]);
  const [query, setQuery] = useState(" ");
  const [commentText, setCommentText] = useState("");
  const [ItemDelete, setItemToDelete] = useState("");
  const [selectedPostId, setSelectedPostId] = useState(null);
 
 console.log(selectedPostId)


  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await fetch(`/api/user/getschedule`);
        const data = await res.json();
        console.log(data)

        if (res.ok) {
            setWorkouts(data.Items);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchItems();
  }, []);




  const handleDeleteUser = async (id) => {
    console.log(id)
    try {
      const res = await fetch(
        `/api/user/delete/${id}`,
        {
          method: "DELETE",
        }
      );
      const data = await res.json();
      if (res.ok) {
        setWorkouts((prev) => prev.filter((workout) => workout.id !== id));
        alert("deleted")
      } else {
        console.log(data.message);
      }
    } catch (error) {
      
      console.log(error.message);
    }
  };
  






  const handleComment = async (postId, commentText) => {
    try {
      const res = await fetch(`/api/user/comment/${postId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ comment: commentText }), // Remove userId from the body
      });
      if (res.ok) {
        alert("success")
        window.location.reload()
      }
    } catch (error) {
      console.error("Error posting comment:", error);
    }
  };
 

  return (
    <div className="">

<div></div>



    <div className="flex justify-center mt-10 items-center">
      <h1 className="text-5xl font-serif text-slate-800 text-opacity-70 mt-6">
        Schedule
      </h1>
    </div>
    
    
    {currentUser?.isAdmin && (
    <Link to="/add">
    <button className=" ml-[1200px]  w-44 h-10 rounded-xl hover:opacity-80  whitespace-nowrap font-medium  text-black border border-black bg-gradient-to-r from-[#979797] to-[#f3f8f3] via-white shadow-xl">
      Add New Schedule
    </button>
    </Link>
    )}
    <div className="max-h-[800px]  overflow-y-auto  scrollbar-none">
    <div className="flex justify-center mt-4">
      <div className="flex flex-wrap justify-center gap-8">
        {workouts.map((workout) => (
          <div
          key={workout.id}
            className="w-[500px] h-[750px] bg-gradient-to-r from-[#e6e3e3] to-[#f3f8f3] via-white bg-opacity-50  mt-10 mb-5 border rounded-2xl border-black  shadow-2xl"
          >
            <div className="px-6 py-4">
                <div className="flex justify-center items-center  font-serif ">
                <h2 className="font-extralight text-xl text-green-800 mb-2 truncate">
                {workout.wantdate}
              </h2>

                </div>
                <div className="flex justify-center items-center">
                  <h1>Deadline</h1>
                </div>

                
              <div>
              <div className="font-semibold text-gray-700 ">Event</div>
              <div className="font-extralight text-gray-700 text-base  w-20px break-words">
                 {workout.event}
              </div>

              </div>

              <div>
              <div className="font-semibold text-gray-700 ">participants</div>
              <div className="font-extralight text-gray-700 text-base  w-20px break-words">
                 {workout.participants}
              </div>

              </div>


              <div>
              <div className="font-semibold text-gray-700 ">specialinstructions</div>
              <div className="font-extralight text-gray-700 text-base  w-20px break-words">
                 {workout.specialinstructions}
              </div>
              <div className="font-semibold text-gray-700 ">Panel</div>
              <div className="font-extralight text-gray-700 text-base  w-20px break-words">
                 {workout.Panel}
              </div>
              <div className="font-semibold text-gray-700 ">Incharge</div>
              <div className="font-extralight text-gray-700 text-base  w-20px break-words">
                 {workout.incharge}
              </div>

              <div className="flex justify-center items-center  mt-2">
                   <h1>PublishDate</h1>


                </div>
                <div className="flex justify-center items-center">
                  {workout.createdAt}
                </div>
                <div className="flex justify-center items-center mt-5">

               
                <button onClick={() => setSelectedPostId(workout._id)}>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT39MC8P4nQc7W1X59HDxu66eEfGlUfNURWjW7IIUuirA&s"  alt=""  className='w-8 h-8 object-cover mt-[-6px] rounded-full'/>
            </button>
            </div>

              </div>
            





              <div className="mt-2 flex">
             


             {selectedPostId === workout._id && (
                      <>
                        <input
                          type="text"
                          value={commentText}
                          maxLength={20}
                          onChange={(e) => setCommentText(e.target.value)}
                          placeholder=" Comment..."
                          className="w-[420px] ml-2 text-slate-700 h-10 rounded-full bg-slate-50"
                        />
                        <button className=" ml-2 text-blue-700 font-medium" onClick={() => handleComment(workout._id, commentText)}>Post</button>
                      </>
                    )}

                  
                  
              
             </div>


             
             
             
             
              <ul>
              {currentUser?.isAdmin && (
                <div className="flex justify-center mt-14 gap-8">
                     
                     


                
                    <Link to={`/updateSch/${workout._id}`}>
              <img className="w-8 h-8 " src="https://icons.veryicon.com/png/o/miscellaneous/linear-small-icon/edit-246.png"/>
        
              </Link>

            <button className="mt-[-3px]" onClick={() => handleDeleteUser(workout._id)} 
                   >
                            <img     className="w-8 h-8 " src="https://cdn.icon-icons.com/icons2/1157/PNG/512/1487086345-cross_81577.png"/>
            </button>
          
                </div>
                )}

                <div className="w-[450px] h-[200px] rounded-2xl bg-slate-50 bg-opacity-60 border border-black mt-4">
              <div className="flex  ml-4 font-medium text-gray-400">Comment</div>
             <div className="max-h-44  overflow-y-auto  scrollbar-none">

             {workout.comment.map((comments, index) => (
                  <div key={index} className="gap-2">
                    <div className="font-extralight text-sm ml-6 mt-2 text-gray-700">
                   {comments.comment}
                    </div>
                    <div className=" ml-8  text-[10px] font-extralight text-gray-600">
                    
                     {moment(comments.createdAt).fromNow()}
                    </div>
                    <div>

                    
                 </div>
                


                  </div>
                
                ))}

                
                </div>

             </div>

                
              </ul>
            </div>
          </div>
        ))}
       
      </div>
    </div>
    </div>
    {notification && (
        <div className="fixed bottom-4 right-4 z-50 bg-gray-200 border border-gray-300 rounded-md p-4 shadow-md">
          <p className="text-sm">{notification}</p>
        </div>
      )}
      </div>

  );
}


