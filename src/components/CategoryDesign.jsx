import React from 'react'

const CategoryDesign = () => {
    return (
        <div className='flex justify-between flex-wrap gap-1 py-2'>
            <div className="card bg-base-100 w-[150px] shadow-sm rounded-none transition-all duration-300 ease-in-out 
                hover:-translate-y-1 hover:shadow-md cursor-pointer">
                <figure className="px-2 pt-2">
                    <img
                        src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                        alt="Shoes"
                        className="rounded-xl" />
                </figure>
                <div className="card-body items-center text-center p-2">
                    <h2 className="card-text">Shoes</h2>
                </div>
            </div>
        </div>
    )
}

export default CategoryDesign