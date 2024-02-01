"use client";
import React, { useEffect, useState } from "react";
import Banner from "./Banner";
import axios from "axios";
import ProductItem from "./ProductItem";

const Main = () => {
  const [products, setProducts] = useState([]);
  const fetchProducts = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/admin/products");
      setProducts(data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      {/* <Banner /> */}
      <section className="py-20">
        <div className="container flex flex-col items-start gap-6">
          <h2 className="text-4xl font-semibold">Products</h2>
          <div className="w-full grid grid-cols-5 gap-5">
            {products?.map((item, id) => (
              <ProductItem item={item} key={id} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Main;
