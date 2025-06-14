import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart, updateQuantity } from '../../redux/cartSlice';
import * as CartItemApi from '../../api/cart_item.api.js'

export default function CartItem({
    data = []
}) {
    const {user} = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const handleRemoveCartItem = async () => {
        try {
            await CartItemApi.deleteCartItem(data.cart_item_id);
            dispatch(removeFromCart(data.cart_item_id));
        } catch (error) {
            console.error("Error removing item from cart:", error);
        }
    };

    const handleIncrease = async () => {
        const updatedQuantity = data.quantity + 1;
        try {
            await CartItemApi.updateCartItem(data.cart_item_id, { quantity: updatedQuantity });
            dispatch(updateQuantity({
                cart_item_id: data.cart_item_id,
                quantity: updatedQuantity,
            }));
        } catch (error) {
            console.error("Error updating quantity:", error);
        }
    };

    const handleDecrease = async () => {
        if (data.quantity > 1) {
            const updatedQuantity = data.quantity - 1;
            try {
                await CartItemApi.updateCartItem(data.cart_item_id, { quantity: updatedQuantity });
                dispatch(updateQuantity({
                    cart_item_id: data.cart_item_id,
                    quantity: updatedQuantity,
                }));
            } catch (error) {
                console.error("Error updating quantity:", error);
            }
        }
    };

return (
    <div className='w-full flex flex-row items-center justify-center gap-2 p-2 border-b-2'>
        <div className='flex flex-col items-start gap-2'>
            <h1 className='text-lg font-bold'>{data.title}</h1>
            <p className='font-light'>{data.variant}</p>
            <p className='font-semibold'>${data.price}</p>
            <div className='flex flex-row gap-4 text-center border-accent-black/40 items-center border-2  text-sm rounded-2xl'>
                <i onClick={handleDecrease} className="fa-solid fa-minus w-8 text-red-700 p-2 rounded-l-2xl hover:bg-red-700 hover:text-white transition duration-200 ease-in-out cursor-pointer"></i>
                <h1 className='font-bold'>{data.quantity}</h1>
                <i onClick={handleIncrease} className="fa-solid fa-plus w-8 text-blue-700 p-2 rounded-r-2xl hover:bg-blue-700 hover:text-white transition duration-200 ease-in-out cursor-pointer"></i>
            </div>
            <div onClick={handleRemoveCartItem} className='rounded cursor-pointer bg-accent-primary transition duration-200 ease-in-out hover:bg-accent-primary/80 p-2 text-white font-bold '>
                Remove
            </div>
        </div>
        <div className='flex items-center justify-center w-full'>
            <img src={data.image_preview.image_path} className='h-40 w-30'/>
        </div>
    </div>
)
}
