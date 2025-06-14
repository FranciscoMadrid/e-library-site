import * as Order from './order.model.js';
import * as OrderItem from './order_item.model.js';
import * as OrderHistory from './order_history.model.js'
import _ from 'lodash';
//Main Order Controller

export const getAll = async(req, res) => {
    try {
        const record = await Order.getAll();
        res.json(record)
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const getById = async(req, res) => {
    try {
        const record = await Order.getById(req.params.id);

        if(!record)
        {
            return res.status(404).json({ error: 'Record not found'})
        }

        const nestedJson = _(record)
            .groupBy('order_id')
            .map((item) => {
                const first = item[0];
                return {
                    order_id: first.order_id,
                    fk_user_id: first.fk_user_id,
                    shipping_address: first.shipping_address,
                    order_status: first.order_status,
                    order_date: first.created_at,
                    order_items: _.uniqBy(
                        item.map(i => ({
                            order_item_id: i.order_item_id,
                            fk_book_variant_id: i.fk_book_variant_id,
                            quantity: i.quantity,
                            subtotal: i.subtotal
                        })),
                        'order_item_id'
                    ),
                };
            }).value();

        res.json(nestedJson); 
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const create = async (req, res) => {
    try {
        const user = await Order.create(req.body);
        res.status(201).json(user);
    } catch (error) {
            res.status(500).json({ error: error.message });
    }
}

export const update = async(req, res) => {
    const userId = req.params.id;
    const updateData = req.body;

    try {
        const affectedRows = await Order.update(userId, updateData);

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
        const affectedRows = await Order.deleteById(userId);

        if(affectedRows === 0)
        {
            return res.status(404).json({ message: 'Record not found' });
        }
        res.json({ message: 'Record deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: `Failed to delete Record: ${error.message}` });
    }
}

//Order Item Controller

export const getAllOrderItem = async(req, res) => {
    try {
        const record = await OrderItem.getAll();
        res.json(record)
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const getByIdOrderItem = async(req, res) => {
    try {
        const user = await OrderItem.getById(req.params.id);

        if(!user)
        {
            return res.status(404).json({ error: 'Record not found'})
        }

        res.json(user); 
    } catch (error) {
        res.status(500).json({ error: err.message });
    }
}

export const createOrderItem = async (req, res) => {
    try {
        const user = await OrderItem.create(req.body);
        res.status(201).json(user);
    } catch (error) {
            res.status(500).json({ error: error.message });
    }
}

export const updateOrderItem = async(req, res) => {
    const userId = req.params.id;
    const updateData = req.body;

    try {
        const affectedRows = await OrderItem.update(userId, updateData);

        if(affectedRows === 0)
        {
            return res.status(404).json({ message: 'Record not found or nothing changed' });
        }

        res.json({ message: 'Record updated successfully' });
    } catch (error) {
        res.status(500).json({ error: `Failed to update Record ${error}` });
    }
}

export const deleteByIdOrderItem = async(req, res) => {
    const userId = req.params.id;

    try {
        const affectedRows = await OrderItem.deleteById(userId);

        if(affectedRows === 0)
        {
            return res.status(404).json({ message: 'Record not found' });
        }
        res.json({ message: 'Record deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: `Failed to delete Record: ${error.message}` });
    }
}

//Order History Controller

export const getAllOrderHistory = async(req, res) => {
    try {
        const record = await OrderHistory.getAll();
        res.json(record)
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const getByIdOrderHistory = async(req, res) => {
    try {
        const user = await OrderHistory.getById(req.params.id);

        if(!user)
        {
            return res.status(404).json({ error: 'Record not found'})
        }

        res.json(user); 
    } catch (error) {
        res.status(500).json({ error: err.message });
    }
}

export const createOrderHistory = async (req, res) => {
    try {
        const user = await OrderHistory.create(req.body);
        res.status(201).json(user);
    } catch (error) {
            res.status(500).json({ error: error.message });
    }
}

export const updateOrderHistory = async(req, res) => {
    const userId = req.params.id;
    const updateData = req.body;

    try {
        const affectedRows = await OrderHistory.update(userId, updateData);

        if(affectedRows === 0)
        {
            return res.status(404).json({ message: 'Record not found or nothing changed' });
        }

        res.json({ message: 'Record updated successfully' });
    } catch (error) {
        res.status(500).json({ error: `Failed to update Record ${error}` });
    }
}

export const deleteByIdOrderHistory = async(req, res) => {
    const userId = req.params.id;

    try {
        const affectedRows = await OrderHistory.deleteById(userId);

        if(affectedRows === 0)
        {
            return res.status(404).json({ message: 'Record not found' });
        }
        res.json({ message: 'Record deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: `Failed to delete Record: ${error.message}` });
    }
}