import mongoose from 'mongoose';


const commentSchema = new mongoose.Schema({
  comment: {
      type: String,
    require:true
  },
  
  
},{ timestamps: true });


const ScheduleSchema = new mongoose.Schema({
 
  
  wantdate: {
    type: String,
    required: true
},
event: {
    type: String,
    required: true
},
Panel: {
  type: String,
  required: true
},
incharge: {
  type: String,
  required: true
},
Location: {
    type: String,
    required: true
},
participants: {
    type: String,
    required: true
},
specialinstructions: {
    type: String,
    required: true
},

comment: [commentSchema], 


},{ timestamps: true } );




const Schedule = mongoose.model('Schedule', ScheduleSchema);

export default Schedule;