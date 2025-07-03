'use client';

import { use, useState, useEffect } from 'react';
import Link from 'next/link';
import { ShoppingCart, Star, Heart, Eye } from 'lucide-react';
import productsData from '@/data/products.json';
import { useCartStore } from '../../components/cartStore';

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  rating: number;
  stock: boolean;
  description: string;
  image: string;
}

export default function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = use(params);
  const [products, setProducts] = useState<Product[]>([]);
  const addToCart = useCartStore((state) => state.addToCart);

  useEffect(() => {
    setProducts(productsData.products.filter(p => p.category.toLowerCase() === category.toLowerCase()));
  }, [category]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price / 100);
  };

  const getProductImage = (product: Product) => {
    const query = encodeURIComponent(product.category + ' ' + product.name);
    return `https://source.unsplash.com/400x400/?${query}`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
          {category} Products
        </h1>
        {products.length === 0 ? (
          <div className="text-center text-gray-500">No products found in this category.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <div key={product.id.toString()} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
                <Link href={`/products/${product.id}`}>
                  <div className="relative">
                    <div className="aspect-square bg-gray-200 flex items-center justify-center overflow-hidden">
                      <img
                        src={getProductImage(product)}
                        alt={product.name}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div className="absolute top-3 right-3">
                      <button className="p-2 bg-white rounded-full shadow-md hover:bg-red-50 transition-colors duration-200">
                        <Heart className="h-4 w-4 text-gray-600" />
                      </button>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                      {product.name}
                    </h3>
                    <div className="flex items-center mb-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < Math.floor(product.rating)
                                ? 'text-yellow-400 fill-current'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="ml-2 text-sm text-gray-600">
                        ({product.rating})
                      </span>
                    </div>
                    <p className="text-2xl font-bold text-blue-600 mb-4">
                      {formatPrice(product.price)}
                    </p>
                    <div className="flex gap-2">
                      <button
                        className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center"
                        onClick={(e) => {
                          e.preventDefault();
                          addToCart({ id: product.id, name: product.name, price: product.price, image: product.image }, 1);
                        }}
                      >
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        Add to Cart
                      </button>
                      <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                        <Eye className="h-4 w-4 text-gray-600" />
                      </button>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 