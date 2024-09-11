const router = require('express').Router();

const { getCurrentUser, editProfile, getAllInvestors, deleteentrepreneur, getInvestorById, sendMessageToInvestor, getMessagesWithInvestor, getMessagesByRoomId } = require('../controller/enterprenuercontroller');
const { middleware } = require('../middleware/jwtmiddleware');

router.get('/currentuser', getCurrentUser);
router.patch('/editprofile', editProfile);
router.delete('/deleteuser', deleteentrepreneur);
router.get('/investors', getAllInvestors);
router.get('/investor/:id', getInvestorById);
router.post('/send-message/:investorId', middleware, sendMessageToInvestor);
// router.get('/messages/:roomId', getMessagesWithInvestor);

router.get('/:roomId', getMessagesByRoomId)


module.exports = router;