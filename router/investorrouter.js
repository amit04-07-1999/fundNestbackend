const router = require('express').Router();

const { editProfile, getCurrentUser, deleteUser, getAllentrepreneurs, getEntrepreneurById, sendMessageToEntrepreneur, getMessagesWithEntrepreneur } = require('../controller/investorcontroller');
const { middleware } = require('../middleware/jwtmiddleware');

router.get('/currentuser', getCurrentUser);
router.patch('/editprofile', editProfile);
router.delete('/deleteuser', deleteUser);
router.get('/entrepreneurs', getAllentrepreneurs);
router.get('/entrepreneur/:id', getEntrepreneurById);
router.post('/send-message/:entrepreneurId', middleware, sendMessageToEntrepreneur);
router.get('/messages/:roomId', getMessagesWithEntrepreneur);



module.exports = router;

