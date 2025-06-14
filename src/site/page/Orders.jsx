import React, { useEffect, useState } from 'react'
import * as OrderApi from '../../api/order.js';
import * as BookVariantApi from '../../api/book_variant.api.js';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import BounceLoader from "react-spinners/BounceLoader";
import OrderItem from '../component/OrderItem.jsx';

export default function Orders() {
    const { user } = useSelector(state => state.auth);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const [orders, setOrders] = useState([]);
    const [orderItem, setOrderItem] = useState([]);
    const [total, setTotal] = useState([]);


    useEffect(() => {
        const fetchOrders = async() => {
            try {
                setLoading(true);
                const result = await OrderApi.getById(user.id)
                setOrders(result);
            } catch (error) {
                setError(`Error in creating order, ${error}`);
            }
        }
        if(user?.id){
            fetchOrders();
        }
    }, [user?.id])

    useEffect(() => {
        const fetchBookVariantsData = async () => {
            try {
                setLoading(true);

                const totalMap = [];

                orders.map((order) => {
                    order.order_items.map((item) => {
                        totalMap.push({order_id: order.order_id, subtotal: item.subtotal, quantity: item.quantity});
                    })
                })

                const totalByOrderId = [];

                totalMap.forEach(item => {
                    const {order_id, subtotal, quantity} = item;
                    const itemTotal = subtotal * quantity;

                    if(!totalByOrderId[order_id]){
                        totalByOrderId[order_id] = 0;
                    }
                    totalByOrderId[order_id] += itemTotal; 
                })

                setTotal(totalByOrderId);

                const variantsId = [...new Set(
                    orders.flatMap(order =>
                        order.order_items.map(item => item.fk_book_variant_id)
                    )
                )];
                console.log(orders)

                const variantDataList = await Promise.all(
                    variantsId.map(id => BookVariantApi.getById(id))
                );

                const variantMap = {};

                variantDataList.forEach(response => {
                const book = response.data[0]; 
                const variant = book.book_variant[0]; 
                    
                variantMap[variant.book_variant_id] = {
                        ...book
                    };
                });
                setOrderItem(variantMap);
            } catch (error) {
                setError(`Error in retriving books, ${error}`);
            } finally{
                setLoading(false);
            }
        }
        if(orders.length > 0){
            fetchBookVariantsData();
        }
    }, [orders]);

return (
    <div className='w-full flex-grow py-10 text-accent-black relative bg-primary p-4'>
        {!loading ? (
            orders.length < 0 ? (
                <div className='max-w-7xl p-4 mx-auto rounded-lg flex flex-col gap-2'>
                {orders
                .slice()
                .sort((a, b) => new Date(b.order_date) - new Date(a.order_date))
                .map((item, index) => (
                    <OrderItem
                        key={item.order_id}
                        item={item}
                        index={index}
                        orderItem={orderItem}
                        total={total}
                    />
                ))}
            </div>
            ) : (
                <div className="flex max-w-7xl mx-auto justify-center flex-col items-center h-[600px] bg-white rounded-2xl shadow-xl text-gray-800 text-xl">
                    <h1 className='text-2xl font-bold'>No orders found</h1>
                    <p>You should check the store and grab yourself some new books!</p>
                </div>
            )
        ): (
            <div className="flex justify-center items-center flex-grow h-[600px]">
                <BounceLoader size={100} color="#c6c930" />
            </div>
        )}
    </div>
)
}
