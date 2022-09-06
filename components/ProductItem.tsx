import { memo, useState } from "react";
import dynamic from "../node_modules/next/dynamic";
import { AddProductToWishListProps } from './AddProductToWishList'
import lodash from 'lodash'
const AddProductToWishList = dynamic<AddProductToWishListProps>(() =>
  import("./AddProductToWishList").then((res) => res.AddProductToWishList),
  {
    loading: () => <span>Carregando...</span>
  }
);
interface ProductItemProps {
  product: {
    id: number;
    price: number;
    priceFormatted: string;
    title: string;
  };

  onAddToWishList: (id: number) => void;
}

function ProductItemComponent({ product, onAddToWishList }: ProductItemProps) {
  const [isAddingToWishList, setIsAddingToWishList] = useState(false);

  return (
    <div>
      {product.title} - <strong>{product.priceFormatted}</strong>
      <button onClick={() => setIsAddingToWishList(true)}>
        Adicionar aos favoritos
      </button>
      {isAddingToWishList && (
        <AddProductToWishList
          onAddToWishList={() => onAddToWishList(product.id)}
          onRequestClose={() => setIsAddingToWishList(false)}
        />
      )}
    </div>
  );
}

export const ProductItem = memo(
  ProductItemComponent,
  (prevProps, nextProps) => {
    return lodash.isEqual(prevProps.product, nextProps.product);
  }
);
