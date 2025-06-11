import React from 'react'
import CategoryItem from './CategoryItem'
import ThrillerImg from '../../assets/thriller-cat.jpg'
import FantasyImg from '../../assets/fantasy-cat.jpg'
import DramaImg from '../../assets/drama-cat.jpg'
import DystopiaImg from '../../assets/dystopia-cat.jpg'
import RomanceImg from '../../assets/romance-cat.png'
import GothicImg from '../../assets/gothic-cat.jpg'

export default function CategoryContainer() {
return (
    <div className='grid grid-cols-2 md:grid-cols-3 gap-2'>
        <CategoryItem image={ThrillerImg} title='Thriller'/>
        <CategoryItem image={FantasyImg} title='Fantasy'/>
        <CategoryItem image={DramaImg} title='Drama'/>
        <CategoryItem image={DystopiaImg} title='Dystopia'/>
        <CategoryItem image={RomanceImg} title='Romance'/>
        <CategoryItem image={GothicImg} title='Gothic'/>
    </div>
)
}
