import React, { FC } from "react";

interface CategoryProps {
  style: string;
}

const Category: FC<CategoryProps> = ({ style }) => {
  return (
    <div
      className={`${style} absolute text-black-secondary-bg bg-neutral-base-bg rounded p-4 w-96`}
    >
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus
      obcaecati libero omnis nemo non natus et minus aspernatur excepturi id
      blanditiis, tempore quia atque deleniti, reprehenderit eos qui expedita
      nesciunt accusantium. Iure cum perspiciatis sequi eveniet aliquam mollitia
      nobis accusamus, ipsa sit beatae minus ab est enim obcaecati praesentium
      architecto.
    </div>
  );
};

export default Category;
