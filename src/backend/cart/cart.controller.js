import * as Cart from './cart.model.js';
import * as CartItem from './cart_item.model.js';
import _ from 'lodash';

//Main Cart Controller

export const getAll = async(req, res) => {
    try {
        const record = await Cart.getAll();
        res.json(record)
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const getById = async (req, res) => {
    try {
        const user = await Cart.getById(req.params.id);

        if (!user || user.length === 0) {
            return res.status(404).json({ error: 'Record not found' });
        }

        const nestedJson = _(user)
            .groupBy('cart_id')
            .map((items) => {
                const first = items[0];
                return {
                    cart_id: first.cart_id,
                    fk_user_id: first.fk_user_id,
                    is_active: first.is_active,
                    cart_items: _.uniqBy(
                        items.map(i => ({
                            cart_item_id: i.cart_item_id,
                            fk_book_variant_id: i.fk_book_variant_id,
                            quantity: i.quantity
                        })),
                        'cart_item_id' 
                    ),
                };
            })
            .value();

        res.json(nestedJson);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const create = async (req, res) => {
    try {
        const user = await Cart.create(req.body);
        res.status(201).json(user);
    } catch (error) {
            res.status(500).json({ error: error.message });
    }
}

export const update = async(req, res) => {
    const userId = req.params.id;
    const updateData = req.body;

    try {
        const affectedRows = await Cart.update(userId, updateData);

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
        const affectedRows = await Cart.deleteById(userId);

        if(affectedRows === 0)
        {
            return res.status(404).json({ message: 'Record not found' });
        }
        res.json({ message: 'Record deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: `Failed to delete Record: ${error.message}` });
    }
}

//CartItem Controller

export const getAllCartItem = async(req, res) => {
    try {
        const record = await CartItem.getAll();
        res.json(record)
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const getByIdCartItem = async(req, res) => {
    try {
        const user = await CartItem.getById(req.params.id);

        if(!user)
        {
            return res.status(404).json({ error: 'Record not found'})
        }

        res.json(user); 
    } catch (error) {
        res.status(500).json({ error: err.message });
    }
}

export const createCartItem = async (req, res) => {
    try {
        const user = await CartItem.create(req.body);
        res.status(201).json(user);
    } catch (error) {
            res.status(500).json({ error: error.message });
    }
}

export const updateCartItem = async(req, res) => {
    const userId = req.params.id;
    const updateData = req.body;

    try {
        const affectedRows = await CartItem.update(userId, updateData);

        if(affectedRows === 0)
        {
            return res.status(404).json({ message: 'Record not found or nothing changed' });
        }

        res.json({ message: 'Record updated successfully' });
    } catch (error) {
        res.status(500).json({ error: `Failed to update Record ${error}` });
    }
}

export const deleteByIdCartItem = async(req, res) => {
    const userId = req.params.id;

    try {
        const affectedRows = await CartItem.deleteById(userId);

        if(affectedRows === 0)
        {
            return res.status(404).json({ message: 'Record not found' });
        }
        res.json({ message: 'Record deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: `Failed to delete Record: ${error.message}` });
    }
}

export const getByCartAndVariant = async (req, res) => {
    const { cart_id, book_variant_id } = req.params;

    try {
        const item = await CartItem.getByCartAndVariant(cart_id, book_variant_id);

        if (!item) {
            return res.status(404).json({ error: 'Item not found in cart' });
        }

        res.json(item);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};