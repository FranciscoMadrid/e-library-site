import * as User from './user.model.js';

export const getAll = async(req, res) => {
    try {
        const record = await User.getAll();
        res.json(record)
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const getById = async(req, res) => {
    try {
        const user = await User.getById(req.params.id);

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
        const user = await User.create(req.body);
        res.status(201).json(user);
    } catch (error) {
            res.status(500).json({ error: error.message });
    }
}

export const update = async(req, res) => {
    const userId = req.params.id;
    const updateData = req.body;

    try {
        const affectedRows = await User.update(userId, updateData);

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
        const affectedRows = await User.deleteById(userId);

        if(affectedRows === 0)
        {
            return res.status(404).json({ message: 'Record not found' });
        }
        res.json({ message: 'Record deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: `Failed to delete Record: ${error.message}` });
    }
}