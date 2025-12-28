import React, { createContext, useState } from 'react';

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <ProductContext.Provider value={{ search, setSearch, products, setProducts, filteredProducts }}>
      {children}
    </ProductContext.Provider>
  );
};
