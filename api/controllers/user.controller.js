import bcryptjs from "bcryptjs";
import { errorHandle } from "../utils/error.js";
import User from "../models/user.model.js";
import Schedule from "../models/schedule.js";

export const test = (req, res) => {
  res.json({ message: "api is worker" });
};

export const updateUser = async (req, res, next) => {
  
  if (req.body.password) {
    if (req.body.password.length < 6) {
      return next(errorHandle(400, "Password must be t least 6 characters"));
    }
    req.body.password = bcryptjs.hashSync(req.body.password, 10);
  }

  if (req.body.username) {
    if (req.body.username.length < 7 || req.body.username.length > 20) {
      return next(
        errorHandle(400, "Username must be between 7 or 20 characters")
      );
    }

    if (req.body.username.includes(" ")) {
      return next(errorHandle(400, "username cannot contain spaces"));
    }
    if (req.body.username !== req.body.username.toLowerCase()) {
      return next(errorHandle(400, "Usernme must be lowercase"));
    }
    if (!req.body.username.match(/^[a-zA-Z0-9]+$/)) {
      return next(
        errorHandle(400, "username can only contain letters and numbers")
      );
    }
}
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.userId,
        {
          $set: {
            username: req.body.username,
            email: req.body.email,
            profilePicture: req.body.profilePicture,
            password: req.body.password,
            phone: req.body.phone,
          },
        },
        { new: true }
      );

      const { password, ...rest } = updatedUser._doc;
      res.status(200).json(rest);
    } catch (error) {
      next(error);
    }
  
};


export const deleteUser = async (req, res, next) => {
  
  try {
    await User.findByIdAndDelete(req.params.userId);
    res.status(200).json('User has been deleted');
  } catch (error) {
    next(error);
  }
};





export const signout = (req, res, next) => {
  try {
    res
      .clearCookie('access_token')
      .status(200)
      .json('User has been signed out');
  } catch (error) {
    next(error);
  }
};


export const creteschedul = async (req, res, next) => {
    
  
  const {Panel, incharge, wantdate,event,Location,participants,specialinstructions,comment  } = req.body;

 


  const newItems = new Schedule({
  
   
    wantdate,
    event,
    Location,
    participants,
    specialinstructions,
    comment,
    incharge,
    Panel
   
       

    
  });
  try {

    const savedItems = await newItems.save();
    res.status(201).json(savedItems);
  } catch (error) {
    next(error);
    console.log(error);
  }
};

export const getallSchedule = async (req, res, next) => {
  try {
    const Items = await Schedule.find();

    if (Items.length > 0) {
      res.json({ message: "Items details retrieved successfully", Items });
    } else {
      return next(errorHandle(404, " Items not fonud "));
    }
  } catch (error) {
    console.log(error.message);

    next(error);
  }
};



export const deleteSchedule = async (req, res, next) => {
    
  try {
    await Schedule.findByIdAndDelete(req.params.Id);
    res.status(200).json("The product has been deleted");
  } catch (error) {
    next(error);
  }
};


export const updateschdule = async (req, res, next) => {
   
  try {
    const updateItems = await Schedule.findByIdAndUpdate(
      req.params.DId,
      {
        $set: {
          wantdate: req.body.wantdate,
          event: req.body.event,
          Location: req.body.Location,
          participants: req.body.participants,
          specialinstructions: req.body.specialinstructions,
        
        },
      },
      { new: true }
    );
    res.status(200).json(updateItems);
  } catch (error) {
    next(error);
  }
};


export const comment = async (req, res, next) => {
  const { postId } = req.params;
    const { comment } = req.body;

    try {
        // Find the Schedule by ID
        const schedule = await Schedule.findById(postId);

        if (!schedule) {
            return res.status(404).json({ error: 'Schedule not found' });
        }

        // Add the comment to the Schedule's comment array
        schedule.comment.push({ comment });

        // Save the updated Schedule
        await schedule.save();

        // Return the updated Schedule
        return res.json(schedule);
    } catch (error) {
        console.error('Error adding comment:', error);
        return res.status(500).json({ error: 'Server error' });
    }
};


