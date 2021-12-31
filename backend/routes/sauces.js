const express = require('express');
const router = express.Router(); /*La méthode express.Router() vous permet de créer des routeurs séparés 
                                 pour chaque route principale de votre application – 
                                 vous y enregistrez ensuite les routes individuelles.*/
                                 
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const saucesCtrl = require('../controllers/sauces');

router.get('/', auth, saucesCtrl.getAllSauces);
router.post('/', auth, multer, saucesCtrl.createSauce);
router.get('/:id', auth, saucesCtrl.getOneSauce);
router.put('/:id', auth, multer, saucesCtrl.modifySauce);
router.delete('/:id', auth, saucesCtrl.deleteSauce);
router.post('/:id/like', auth, saucesCtrl.addLike);
module.exports = router;