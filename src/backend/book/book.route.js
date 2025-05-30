import express from 'express'
import * as BookControl from './book.controller.js'

const router = express.Router();

//Book Variant-----------------------------------------
router.get('/variant', BookControl.getAllVariant);
router.get('/variant/:id', BookControl.getByIdVariant);
router.post('/variant/', BookControl.createVariant);
router.put('/variant/:id', BookControl.updateVariant);
router.delete('/variant/:id', BookControl.deleteByIdVariant);

//Book Author-----------------------------------------
router.get('/author', BookControl.getAllAuthor);
router.get('/author/:id', BookControl.getByIdAuthor);
router.post('/author/', BookControl.createAuthor);
router.put('/author/:id', BookControl.updateAuthor);
router.delete('/author/:id', BookControl.deleteByIdAuthor);

//Book Category-----------------------------------------
router.get('/category', BookControl.getAllCategory);
router.get('/category/:id', BookControl.getByIdCategory);
router.post('/category/', BookControl.createCategory);
router.put('/category/:id', BookControl.updateCategory);
router.delete('/category/:id', BookControl.deleteByIdCategory);

//Book Publisher-----------------------------------------
router.get('/publisher', BookControl.getAllPublisher);
router.get('/publisher/:id', BookControl.getByIdPublisher);
router.post('/publisher/', BookControl.createPublisher);
router.put('/publisher/:id', BookControl.updatePublisher);
router.delete('/publisher/:id', BookControl.deleteByIdPublisher);

//Book Image-----------------------------------------
router.get('/image', BookControl.getAllImage);
router.get('/image/:id', BookControl.getByIdImage);
router.post('/image/', BookControl.createImage);
router.put('/image/:id', BookControl.updateImage);
router.delete('/image/:id', BookControl.deleteByIdImage);

// Main Book-----------------------------------------
router.get('/', BookControl.getAll);
router.get('/:id', BookControl.getById);
router.post('/', BookControl.create);
router.put('/:id', BookControl.update);
router.delete('/:id', BookControl.deleteById);

export default router;