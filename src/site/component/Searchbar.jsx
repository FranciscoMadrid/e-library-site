import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Searchbar({ onSubmitCallback }) {
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (searchTerm) {
            navigate(`/store?search=${searchTerm}`);
        } else {
            navigate(`/store`);
        }

        if (onSubmitCallback) onSubmitCallback(); // ✅ Trigger parent callback
    };

    return (
        <form onSubmit={handleSubmit} className='w-full'>
            <div className='w-full mx-auto rounded-2xl relative flex flex-row items-center'>
                <div className='flex absolute items-center p-2'>
                    <i className="fa fa-search"></i>
                </div>
                <input
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className='block w-full p-1 ps-10 font-light bg-white rounded-2xl outline-none focus:ring-2 focus:ring-accent-primary focus:border-accent-primary'
                    type='text'
                    placeholder="Search..."
                />
            </div>
        </form>
    );
}