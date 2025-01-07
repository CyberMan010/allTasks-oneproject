import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "./api/axios";
import CustomButton from "./UI/Button";
import CustomInput from "./UI/Input";


function ProductCard({ product, onEdit, onDelete, isAdmin }) {
  const [editingProduct, setEditingProduct] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Disable background scrolling and interactions when the modal is open
  useEffect(() => {
    if (editingProduct) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    // Cleanup function to remove the class when the component unmounts
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [editingProduct]);

  // Handle Edit Submission
  const handleEditProduct = async () => {
    try {
      const response = await axios.put(
        `/products/${editingProduct.id}`,
        {
          title: editingProduct.title,
          price: Number(editingProduct.price),
        }
      );
      console.log("Product updated:", response.data);
      setEditingProduct(null); // Clear editing state
      setError(""); // Clear error on success
      onEdit(response.data); // Notify parent component
    } catch (error) {
      console.error("Failed to update product:", error);
      setError("Failed to update product.");
    }
  };

  // Handle Card Click
  const handleCardClick = () => {
    if (!editingProduct) {
      navigate(`/product/${product.id}`);
    }
  };

  // Handle Edit Button Click
  const handleEditClick = (e, product) => {
    e.stopPropagation(); // Stop event propagation
    setEditingProduct(product); // Set the product to edit
  };

  return (
    <div
      className="m-2 group px-10 py-5 bg-white/10 rounded-lg flex flex-col items-center justify-center gap-2 relative after:absolute after:h-full after:bg-[#abd373] shadow-lg after:-z-20 after:w-full after:inset-0 after:rounded-lg transition-all duration-300 hover:transition-all hover:duration-300 after:transition-all after:duration-500 after:hover:transition-all after:hover:duration-500 overflow-hidden cursor-pointer after:-translate-y-full after:hover:translate-y-0 [&_p]:delay-200 [&_p]:transition-all"
      onClick={handleCardClick}
    >
      <img
        alt="product"
        src={product.images}
        className="w-44 card1img aspect-square text-[#abd373] group-hover:bg-gray-800 text-5xl rounded-full p-2 transition-all duration-300 group-hover:transition-all group-hover:duration-300 group-hover:-translate-y-2 mx-auto"
      />
      <p className="cardtxt font-semibold text-gray-200 tracking-wider group-hover:text-gray-700 text-xl">
        {product.title}
      </p>
      <p className="blueberry font-semibold text-gray-600 text-xs">
        One of Kind &amp; Unique Plants Collection Here at SMKY.
      </p>
      <div className="ordernow flex flex-row justify-between items-center w-full">
        <p className="bg-slate-400 rounded-xl ordernow-text text-[#abd373] font-semibold group-hover:text-gray-800">
           ${product.price}
        </p>
      </div>

      {/* Admin Buttons */}
      {isAdmin && (
        <div className="mt-4 flex space-x-2 z-30">
          <CustomButton className="bg-yellow-950 text-yellow-400 border border-yellow-400 border-b-4 font-medium overflow-hidden relative px-4 py-2 rounded-md hover:brightness-150 hover:border-t-4 hover:border-b active:opacity-75 outline-none duration-300 group"
            onClick={(e) => handleEditClick(e, product)} // Use handleEditClick
          >
             <span className="bg-yellow-400 shadow-yellow-400 absolute -top-[150%] left-0 inline-flex w-80 h-[5px] rounded-md opacity-50 group-hover:top-[150%] duration-500 shadow-[0_0_10px_10px_rgba(0,0,0,0.3)]"></span>
            Edit
          </CustomButton>
          <CustomButton className="bg-red-950 text-red-400 border border-red-400 border-b-4 font-medium overflow-hidden relative px-4 py-2 rounded-md hover:brightness-150 hover:border-t-4 hover:border-b active:opacity-75 outline-none duration-300 group"
            onClick={(e) => {
              e.stopPropagation(); // Prevent card click
              onDelete(product.id);
            }}
          >
            <span className="bg-red-400 shadow-red-400 absolute -top-[150%] left-0 inline-flex w-80 h-[5px] rounded-md opacity-50 group-hover:top-[150%] duration-500 shadow-[0_0_10px_10px_rgba(0,0,0,0.3)]"></span>
            Delete
          </CustomButton>
        </div>
      )}

      {/* Edit Product Form */}
      {editingProduct && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div
            className="bg-white p-6 rounded-lg"
            onClick={(e) => e.stopPropagation()} // Prevent clicks inside the modal from closing it
          >
            <h2 className="text-xl font-bold mb-4">Edit Product</h2>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <CustomInput
              type="text"
              placeholder="Title"
              value={editingProduct.title}
              onChange={(e) =>
                setEditingProduct({ ...editingProduct, title: e.target.value })
              }
              className="w-full mb-4"
            />
            <CustomInput
              type="number"
              placeholder="Price"
              value={editingProduct.price}
              onChange={(e) =>
                setEditingProduct({ ...editingProduct, price: e.target.value })
              }
              className="w-full mb-4"
            />
            <div className="flex space-x-4">
              <CustomButton onClick={handleEditProduct}>Save Changes</CustomButton>
              <CustomButton onClick={() => setEditingProduct(null)}>
                Cancel
              </CustomButton>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductCard;