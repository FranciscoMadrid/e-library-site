import React from 'react'

export default function VariantButton({
    variant = 'Default Variant',
    variant_id = 1
}) {
return (
    <div className='p-2 bg-accent-black text-center rounded '>
        {variant}
    </div>
)
}
