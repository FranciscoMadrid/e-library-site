import * as Wishlist from './wishlist.model.js';
import * as WishlistItem from './wishlist_item.model.js';

//Main Wishlist Controller

export const getAll = async(req, res) => {
    try {
        const record = await Wishlist.getAll();
        res.json(record)
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const getById = async(req, res) => {
    try {
        const user = await Wishlist.getById(req.params.id);

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
        const user = await Wishlist.create(req.body);
        res.status(201).json(user);
    } catch (error) {
            res.status(500).json({ error: error.message });
    }
}

export const update = async(req, res) => {
    const userId = req.params.id;
    const updateData = req.body;

    try {
        const affectedRows = await Wishlist.update(userId, updateData);

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
        const affectedRows = await Wishlist.deleteById(userId);

        if(affectedRows === 0)
        {
            return res.status(404).json({ message: 'Record not found' });
        }
        res.json({ message: 'Record deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: `Failed to delete Record: ${error.message}` });
    }
}

//Wishlist Item Controller

export const getAllWishlistItem = async(req, res) => {
    try {
        const record = await WishlistItem.getAll();
        res.json(record)
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const getByIdWishlistItem = async(req, res) => {
    try {
        const user = await WishlistItem.getById(req.params.id);

        if(!user)
        {
            return res.status(404).json({ error: 'Record not found'})
        }

        res.json(user); 
    } catch (error) {
        res.status(500).json({ error: err.message });
    }
}

export const createWishlistItem = async (req, res) => {
    try {
        const user = await WishlistItem.create(req.body);
        res.status(201).json(user);
    } catch (error) {
            res.status(500).json({ error: error.message });
    }
}

export const updateWishlistItem = async(req, res) => {
    const userId = req.params.id;
    const updateData = req.body;

    try {
        const affectedRows = await WishlistItem.update(userId, updateData);

        if(affectedRows === 0)
        {
            return res.status(404).json({ message: 'Record not found or nothing changed' });
        }

        res.json({ message: 'Record updated successfully' });
    } catch (error) {
        res.status(500).json({ error: `Failed to update Record ${error}` });
    }
}

export const deleteByIdWishlistItem = async(req, res) => {
    const userId = req.params.id;

    try {
        const affectedRows = await WishlistItem.deleteById(userId);

        if(affectedRows === 0)
        {
            return res.status(404).json({ message: 'Record not found' });
        }
        res.json({ message: 'Record deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: `Failed to delete Record: ${error.message}` });
    }
}