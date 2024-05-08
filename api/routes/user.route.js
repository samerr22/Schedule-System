import express from 'express';
import { comment, creteschedul,  deleteSchedule,  deleteUser,  getallSchedule,  signout, test, updateUser, updateschdule,  } from '../controllers/user.controller.js';


const router = express.Router();


router.get('/test', test); 
router.post('/signout', signout);
router.post('/create', creteschedul);
router.get('/getschedule', getallSchedule);
router.put('/update/:DId', updateschdule);
router.delete('/delete/:Id', deleteSchedule);
router.post('/comment/:postId', comment);
router.put( '/update/:userId', updateUser);
router.delete('/delete/:userId',  deleteUser);


export default router;