import React from 'react'
import Category from '../Categories';
import CategoryCard from '../ui/CategoryCard';
import { caliberationsContents } from '@/utilities/Contents';

const Caliberations = () => {
  return (
    <Category style="top-10 -left-32 dropDown place-items-center z-[777]">
      {caliberationsContents.map((p, i) => (
        <CategoryCard key={i} title={p.title} image={p.img} route={p.route || ''} />
      ))}
    </Category>
  );
}

export default Caliberations