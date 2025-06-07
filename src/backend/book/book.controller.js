import * as Book from './book.model.js';
import * as BookImage from './book_image.model.js';
import * as BookPublisher from './book_publisher.model.js';
import * as BookCategory from './book_category.models.js';
import * as BookAuthor from './book_author.model.js';
import * as BookVariant from './book_variant.model.js';
import _ from 'lodash';
import { title } from 'motion/react-client';

//Main Book Controller

export const getAll = async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 10;
        const page = parseInt(req.query.page) || 1;
        const searchTerm = req.query.searchTerm || '';
        const orderDesc = req.query.orderDesc || false;

        const record = await Book.getAll({ limit, page, searchTerm, orderDesc });
        const resTotalBooks = await Book.countBooks({searchTerm});
        const totalPages = Math.ceil(resTotalBooks/limit);

        const nestedJson = _(record)
            .groupBy('book_id')
            .map((items) => {
                const first = items[0];
                return {
                book_id: first.book_id,
                title: first.title,
                publication_date: first.publication_date,
                categories: _.uniqBy(
                    items.map(i => ({ category_name: i.category })),
                    'category_name'
                ),
                publishers: _.uniqBy(
                    items.map(i => ({ publisher_name: i.publisher_name })),
                    'publisher_name'
                ),
                authors: _.uniqBy(
                    items.map(i => ({ author: i.author })),
                    'author'
                ),
                book_variant: _.uniqBy(
                    items.map(i => ({
                    variant_id: i.variant_id,
                    variant: i.variant_name,
                    price: i.price,
                    images: _.uniqBy(
                        items.map(it => ({
                        image_path: it.image_path,
                        alt_text: it.alt_text
                        })), 'image_path')
                    })), 'variant'
                )
                };
            })
            .value();

        return res.status(200).json({
            data: nestedJson,
            currentPage: page,
            pageSize: limit,
            totalPages: totalPages
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getById = async(req, res) => {
    try {
        const user = await Book.getById(req.params.id);

        if(!user)
        {
            return res.status(404).json({ error: 'Record not found'})
        }

        res.json(user); 
    } catch (error) {
        res.status(500).json({ error: err.message });
    }
}

export const create = async (req, res) => {
    try {
        const user = await Book.create(req.body);
        res.status(201).json(user);
    } catch (error) {
            res.status(500).json({ error: error.message });
    }
}

export const update = async(req, res) => {
    const userId = req.params.id;
    const updateData = req.body;

    try {
        const affectedRows = await Book.update(userId, updateData);

        if(affectedRows === 0)
        {
            return res.status(404).json({ message: 'Record not found or nothing changed' });
        }

        res.json({ message: 'Record updated successfully' });
    } catch (error) {
        res.status(500).json({ error: `Failed to update Record ${error}` });
    }
}

export const deleteById = async(req, res) => {
    const userId = req.params.id;

    try {
        const affectedRows = await Book.deleteById(userId);

        if(affectedRows === 0)
        {
            return res.status(404).json({ message: 'Record not found' });
        }
        res.json({ message: 'Record deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: `Failed to delete Record: ${error.message}` });
    }
}

//Book Image Controller

export const getAllImage = async(req, res) => {
    try {
        const record = await BookImage.getAll();
        res.json(record)
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const getByIdImage = async(req, res) => {
    try {
        const user = await BookImage.getById(req.params.id);

        if(!user)
        {
            return res.status(404).json({ error: 'Record not found'})
        }

        res.json(user); 
    } catch (error) {
        res.status(500).json({ error: err.message });
    }
}

export const createImage = async (req, res) => {
    try {
        const user = await BookImage.create(req.body);
        res.status(201).json(user);
    } catch (error) {
            res.status(500).json({ error: error.message });
    }
}

export const updateImage = async(req, res) => {
    const userId = req.params.id;
    const updateData = req.body;

    try {
        const affectedRows = await BookImage.update(userId, updateData);

        if(affectedRows === 0)
        {
            return res.status(404).json({ message: 'Record not found or nothing changed' });
        }

        res.json({ message: 'Record updated successfully' });
    } catch (error) {
        res.status(500).json({ error: `Failed to update Record ${error}` });
    }
}

export const deleteByIdImage = async(req, res) => {
    const userId = req.params.id;

    try {
        const affectedRows = await BookImage.deleteById(userId);

        if(affectedRows === 0)
        {
            return res.status(404).json({ message: 'Record not found' });
        }
        res.json({ message: 'Record deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: `Failed to delete Record: ${error.message}` });
    }
}

//Book Publisher Controller

export const getAllPublisher = async(req, res) => {
    try {
        const record = await BookPublisher.getAll();
        res.json(record)
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const getByIdPublisher = async(req, res) => {
    try {
        const user = await BookPublisher.getById(req.params.id);

        if(!user)
        {
            return res.status(404).json({ error: 'Record not found'})
        }

        res.json(user); 
    } catch (error) {
        res.status(500).json({ error: err.message });
    }
}

export const createPublisher = async (req, res) => {
    try {
        const user = await BookPublisher.create(req.body);
        res.status(201).json(user);
    } catch (error) {
            res.status(500).json({ error: error.message });
    }
}

export const updatePublisher = async(req, res) => {
    const userId = req.params.id;
    const updateData = req.body;

    try {
        const affectedRows = await BookPublisher.update(userId, updateData);

        if(affectedRows === 0)
        {
            return res.status(404).json({ message: 'Record not found or nothing changed' });
        }

        res.json({ message: 'Record updated successfully' });
    } catch (error) {
        res.status(500).json({ error: `Failed to update Record ${error}` });
    }
}

export const deleteByIdPublisher = async(req, res) => {
    const userId = req.params.id;

    try {
        const affectedRows = await BookPublisher.deleteById(userId);

        if(affectedRows === 0)
        {
            return res.status(404).json({ message: 'Record not found' });
        }
        res.json({ message: 'Record deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: `Failed to delete Record: ${error.message}` });
    }
}

//Book Category Controller

export const getAllCategory = async(req, res) => {
    try {
        const record = await BookCategory.getAll();
        res.json(record)
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const getByIdCategory = async(req, res) => {
    try {
        const user = await BookCategory.getById(req.params.id);

        if(!user)
        {
            return res.status(404).json({ error: 'Record not found'})
        }

        res.json(user); 
    } catch (error) {
        res.status(500).json({ error: err.message });
    }
}

export const createCategory = async (req, res) => {
    try {
        const user = await BookCategory.create(req.body);
        res.status(201).json(user);
    } catch (error) {
            res.status(500).json({ error: error.message });
    }
}

export const updateCategory = async(req, res) => {
    const userId = req.params.id;
    const updateData = req.body;

    try {
        const affectedRows = await BookCategory.update(userId, updateData);

        if(affectedRows === 0)
        {
            return res.status(404).json({ message: 'Record not found or nothing changed' });
        }

        res.json({ message: 'Record updated successfully' });
    } catch (error) {
        res.status(500).json({ error: `Failed to update Record ${error}` });
    }
}

export const deleteByIdCategory = async(req, res) => {
    const userId = req.params.id;

    try {
        const affectedRows = await BookCategory.deleteById(userId);

        if(affectedRows === 0)
        {
            return res.status(404).json({ message: 'Record not found' });
        }
        res.json({ message: 'Record deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: `Failed to delete Record: ${error.message}` });
    }
}

//Book Author Controller

export const getAllAuthor = async(req, res) => {
    try {
        const record = await BookAuthor.getAll();
        res.json(record)
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const getByIdAuthor = async(req, res) => {
    try {
        const user = await BookAuthor.getById(req.params.id);

        if(!user)
        {
            return res.status(404).json({ error: 'Record not found'})
        }

        res.json(user); 
    } catch (error) {
        res.status(500).json({ error: err.message });
    }
}

export const createAuthor = async (req, res) => {
    try {
        const user = await BookAuthor.create(req.body);
        res.status(201).json(user);
    } catch (error) {
            res.status(500).json({ error: error.message });
    }
}

export const updateAuthor = async(req, res) => {
    const userId = req.params.id;
    const updateData = req.body;

    try {
        const affectedRows = await BookAuthor.update(userId, updateData);

        if(affectedRows === 0)
        {
            return res.status(404).json({ message: 'Record not found or nothing changed' });
        }

        res.json({ message: 'Record updated successfully' });
    } catch (error) {
        res.status(500).json({ error: `Failed to update Record ${error}` });
    }
}

export const deleteByIdAuthor = async(req, res) => {
    const userId = req.params.id;

    try {
        const affectedRows = await BookAuthor.deleteById(userId);

        if(affectedRows === 0)
        {
            return res.status(404).json({ message: 'Record not found' });
        }
        res.json({ message: 'Record deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: `Failed to delete Record: ${error.message}` });
    }
}


//Book Variant Controller

export const getAllVariant = async(req, res) => {
    try {
        const record = await BookVariant.getAll();
        res.json(record)
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const getByIdVariant = async(req, res) => {
    try {
        const user = await BookVariant.getById(req.params.id);

        if(!user)
        {
            return res.status(404).json({ error: 'Record not found'})
        }

        res.json(user); 
    } catch (error) {
        res.status(500).json({ error: err.message });
    }
}

export const createVariant = async (req, res) => {
    try {
        const user = await BookVariant.create(req.body);
        res.status(201).json(user);
    } catch (error) {
            res.status(500).json({ error: error.message });
    }
}

export const updateVariant = async(req, res) => {
    const userId = req.params.id;
    const updateData = req.body;

    try {
        const affectedRows = await BookVariant.update(userId, updateData);

        if(affectedRows === 0)
        {
            return res.status(404).json({ message: 'Record not found or nothing changed' });
        }

        res.json({ message: 'Record updated successfully' });
    } catch (error) {
        res.status(500).json({ error: `Failed to update Record ${error}` });
    }
}

export const deleteByIdVariant = async(req, res) => {
    const userId = req.params.id;

    try {
        const affectedRows = await BookVariant.deleteById(userId);

        if(affectedRows === 0)
        {
            return res.status(404).json({ message: 'Record not found' });
        }
        res.json({ message: 'Record deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: `Failed to delete Record: ${error.message}` });
    }
}