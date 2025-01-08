import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "./api/axios";
import { Cartcontext } from "./context/cartContext";
import Cart from "./UI/Cart";
import { ShoppingCart } from "lucide-react";

function ProductDetails() {
  const { id } = useParams();
  const [showModal, setShowModal] = useState(false);
  const [product, setProduct] = useState(null);
  const [error, setError] = useState("");
  const [quantity, setQuantity] = useState(1);
  const { cartItems, addToCart } = useContext(Cartcontext);

  useEffect(() => {
    getProductDetails();
  }, [id]);

  async function getProductDetails() {
    try {
      const response = await axios.get(`/products/${id}`);
      setProduct(response.data);
    } catch (error) {
      setError(error.message);
    }
  }

  const handleAddToCart = () => {
    // Add to cart with current quantity
    const productToAdd = { ...product, quantity };
    addToCart(productToAdd);
    setShowModal(true);
  };

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500 text-xl">{error}</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#abd373]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 relative">
      <button
        className="fixed top-4 right-4 z-50 px-4 py-2 bg-[#abd373] text-white rounded-full flex items-center gap-2 hover:bg-[#96bc64] transition-colors"
        onClick={() => setShowModal(true)}
      >
        <ShoppingCart className="h-5 w-5" />
        <span className="font-bold">{cartItems.length}</span>
      </button>

      <Cart showModal={showModal} toggle={() => setShowModal(!showModal)} />

      <div className="max-w-7xl mx-auto">
        <div className="bg-white/10 rounded-lg overflow-hidden shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
            {/* Image Section */}
            <div className="relative group">
              <div className="aspect-square overflow-hidden rounded-lg bg-gray-800/50">
                <img
                  src={product.images}
                  alt={product.title}
                  className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            </div>

            {/* Product Details Section */}
            <div className="flex flex-col space-y-6">
              <h1 className="text-3xl font-bold text-gray-200">{product.title}</h1>
              
              <div className="flex items-center space-x-4">
                <span className="text-2xl font-bold text-[#abd373]">
                  ${product.price}
                </span>
                <span className="text-sm text-gray-400">
                  Free Shipping
                </span>
              </div>

              <div className="prose prose-invert">
                <p className="text-gray-300">{product.description}</p>
              </div>

              <div className="flex items-center space-x-4">
                <div className="flex items-center bg-gray-800 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-2 text-gray-300 hover:text-[#abd373]"
                  >
                    -
                  </button>
                  <span className="px-4 py-2 text-gray-200">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-2 text-gray-300 hover:text-[#abd373]"
                  >
                    +
                  </button>
                </div>
              </div>

              <button 
                onClick={handleAddToCart}
                className="group relative w-full bg-[#abd373] text-gray-800 font-semibold py-3 px-6 rounded-full overflow-hidden transition-all duration-300 hover:bg-[#96bc64] hover:shadow-lg hover:shadow-[#abd373]/20"
              >
                <span className="relative z-10">Add to Cart</span>
                <div className="absolute inset-0 bg-white/20 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
              </button>

              <div className="border-t border-gray-700 pt-6 mt-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col space-y-2">
                    <span className="text-gray-400 text-sm">Plant Care</span>
                    <span className="text-gray-200">Easy to maintain</span>
                  </div>
                  <div className="flex flex-col space-y-2">
                    <span className="text-gray-400 text-sm">Size</span>
                    <span className="text-gray-200">Medium</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;