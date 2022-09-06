import { useMemo } from "react";
import { List, ListRowRenderer } from "react-virtualized";
import { ProductItem } from "./ProductItem";

interface SearchResultsProps {
  results: Array<{
    id: number;
    price: number;
    priceFormatted: string;
    title: string;
  }>;

  totalPrice: string;

  onAddToWishList: (id: number) => void;
}

export function SearchResults({
  results,
  onAddToWishList,
  totalPrice,
}: SearchResultsProps) {
  const rowRenderer: ListRowRenderer = ({ index, key, style }) => {
    return (
      <div key={key} style={style}>
        <ProductItem
          product={results[index]}
          onAddToWishList={onAddToWishList}
        />
      </div>
    );
  };
  return (
    <div>
      {totalPrice}
      <List
        height={300}
        rowHeight={50}
        width={900}
        overscanRowCount={5}
        rowCount={results.length}
        rowRenderer={rowRenderer}
      />
    </div>
  );
}
