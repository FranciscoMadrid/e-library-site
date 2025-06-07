import React from 'react'

export default function PaginationButton({
    pageNumber = 1,
    currentPage = 0,
    onClick = () => {}
}) {
return (
    <div onClick={() => onClick(pageNumber)}
        className={`border-2 cursor-pointer border-accent-black rounded h-8 w-8 items-center justify-center flex ${currentPage == pageNumber ? 'bg-accent-primary text-white border-accent-primary' : 'bg-white'} hover:bg-accent-primary hover:border-accent-primary hover:text-white transition duration-150 ease-in-out`}>
        <h1>{pageNumber}</h1>
    </div>
)
}
