import { FormEvent, useCallback, useState } from "react";
import { SearchResults } from "../components/SearchResult";

type Results = {
  totalPrice: string;
  data: Array<{
    id: number;
    price: number;
    priceFormatted: string;
    title: string;
  }>;
};

export default function Home() {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState<Results>({
    totalPrice: '',
    data: []
  });

  async function handleSearch(e: FormEvent) {
    e.preventDefault();

    if (!search.trim()) {
      return;
    }

    const response = await fetch(`http://localhost:3333/products?q=${search}`);

    const data = await response.json();
    const formatter = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    })
    const products = data.map((product) => ({
      id: product.id,
      title: product.title,
      price: product.price,
      priceFormatted: formatter.format(product.price)
    }))

    const totalPrice = formatter.format(data.reduce(
      (total, product) => total + product.price,
      0
    ))

    setResults({ totalPrice, data: products})
  }

  const addToWishList = useCallback(async (id) => {
    console.log(id);
  }, []);

  return (
    <div>
      <h1>Search</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          name=""
          value={search}
          onChange={({ target }) => setSearch(target.value)}
        />
        <button type="submit">Buscar</button>
      </form>

      <SearchResults results={results.data} totalPrice={results.totalPrice} onAddToWishList={addToWishList} />
    </div>
  );
}
