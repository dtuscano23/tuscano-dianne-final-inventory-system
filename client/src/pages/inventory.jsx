import { getProducts, deleteProducts, updateProducts, addProducts } from "../api/products";
import { useEffect, useState } from "react";

const Inventory = () => {
    const [products, setProducts] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [isAdding, setIsAdding] = useState(false);
    const [currentProduct, setCurrentProduct] = useState({
        product_id: "",
        product_name: "",
        quantity: "",
        unit: "",
        price: ""
    });

    useEffect(() => {
        getAllProducts();
    }, []);

    const getAllProducts = async () => {
        const response = await getProducts();
        setProducts(response);
    }

    const handleEdit = (product) => {
        setCurrentProduct(product);
        setIsEditing(true);
    }

    const handleDelete = async (productId) => {
        try {
            await deleteProducts(productId);
            alert('Product deleted successfully');
            getAllProducts();
        } catch (error) {
            console.error('Error deleting product:', error);
            alert('Error deleting product');
        }
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCurrentProduct({
            ...currentProduct,
            [name]: value
        });
    }

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateProducts(currentProduct, currentProduct.product_id);
            alert('Product updated successfully');
            setIsEditing(false);
            getAllProducts();
        } catch (error) {
            console.error('Error updating product:', error);
            alert('Error updating product');
        }
    }

    const handleAddProduct = () => {
        setCurrentProduct({
            product_id: "",
            product_name: "",
            quantity: "",
            unit: "",
            price: ""
        });
        setIsAdding(true);
    }

    const handleAddSubmit = async (e) => {
        e.preventDefault();
        try {
            await addProducts(currentProduct);
            alert('Product added successfully');
            setIsAdding(false);
            getAllProducts();
        } catch (error) {
            console.error('Error adding product:', error);
            alert('Error adding product');
        }
    }

    return (
        <div className="h-full w-full mb-55 bg-violet-200 ">
            <div className="text-4xl bg-blue-400 flex items-center justify-center pt-4 pb-4"><b>SAMPLE INVENTORY</b></div>

            <div className="">
                <button onClick={() => handleAddProduct(products)} className="hover:bg-blue-600 mb-4 my-3 mx-3 p-2 rounded bg-blue-800 text-white">Add Product</button>
            </div>
            <div className="w-full flex justify-center">
                <br></br>

                
                <table className="mb-10 table-auto border-double rounded-lg border-4 border-black w-2/3 bg-white shadow-xl hover:shadow-blue-100/50 drop-shadow-md">
                    <thead>
                        <tr className="bg-green-300">
                            <th className="border border-black px-4 py-2">Product ID</th>
                            <th className="border border-black px-4 py-2">Product Name</th>
                            <th className="border border-black px-4 py-2">Quantity</th>
                            <th className="border border-black px-4 py-2">Unit</th>
                            <th className="border border-black px-4 py-2">Price</th>
                            <th className="border border-black px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product, index) => (
                            <tr key={index} className="hover:bg-gray-200 border-5">
                                <td className="border border-gray-800 px-4 py-1 text-center">{product.product_id}</td>
                                <td className="border border-gray-800 px-4 py-1 text-center">{product.product_name}</td>
                                <td className="border border-gray-800 px-4 py-1 text-center">{product.quantity}</td>
                                <td className="border border-gray-800 px-4 py-1 text-center">{product.unit}</td>
                                <td className="border border-gray-800 px-4 py-1 text-center">{product.price}</td>
                                <td className="border border-gray-800 px-4 py-1 text-center">
                                    <button onClick={() => handleEdit(product)} className="bg-blue-500 text-white px-1 py-1 rounded hover:bg-blue-700 transition duration-200 inline-flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                            <path d="M17.414 2.586a2 2 0 00-2.828 0l-10 10a2 2 0 00-.586 1.414V17a1 1 0 001 1h3.586a2 2 0 001.414-.586l10-10a2 2 0 000-2.828l-2.586-2.586zm-11.172 12L6 16l1.414-1.414 1.586 1.586a1 1 0 01-1.414 1.414l-2.586-2.586zm10-10L16 6 6.586 15.414a1 1 0 01-1.414 0L4 14l10-10z" />
                                        </svg>
                                        Edit
                                    </button>
                                    <button onClick={() => handleDelete(product.product_id)} className="bg-red-500 text-white px-1 py-1 rounded ml-2 hover:bg-red-700 transition duration-200 inline-flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 100 2h1v10a2 2 0 002 2h6a2 2 0 002-2V6h1a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zm1 6a1 1 0 011-1h4a1 1 0 110 2h-4a1 1 0 01-1-1zM6 7a1 1 0 011-1h2a1 1 0 110 2H7a1 1 0 01-1-1zm3 3a1 1 0 011 1v4a1 1 0 11-2 0v-4a1 1 0 011-1zm4 0a1 1 0 011 1v4a1 1 0 11-2 0v-4a1 1 0 011-1z" clipRule="evenodd" />
                                        </svg>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                
            </div>
                <div className="text-1xl dark:bg-slate-600 flex items-center text-white justify-center p-2">
                    <div className="text-center">By: Dianne T. Tuscano</div>
                </div>

            {isEditing && (
                <div className="modal fixed inset-0 flex items-center justify-center bg-black bg-opacity-60">
                    <div className="modal-content bg-blue-500 p-6 rounded-lg shadow-lg">
                        <h2 className="text-2xl mb-4 hover:bg-green-400 text-white text-center"><u>Edit Product</u></h2>
                        <form onSubmit={handleEditSubmit}>
                            <div className="mb-4">
                                <label className="block text-white">Product Name:</label>
                                <input
                                    type="text"
                                    name="product_name"
                                    value={currentProduct.product_name}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-black"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-white">Quantity:</label>
                                <input
                                    type="number"
                                    name="quantity"
                                    value={currentProduct.quantity}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-black"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-white">Unit:</label>
                                <input
                                    type="text"
                                    name="unit"
                                    value={currentProduct.unit}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-black"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-white">Price:</label>
                                <input
                                    type="number"
                                    name="price"
                                    value={currentProduct.price}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-black"
                                />
                            </div>
                            <button type="submit" className=" bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded">Save</button>
                            <button onClick={() => setIsEditing(false)} className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded ml-2">Cancel</button>
                        </form>
                    </div>
                </div>
            )}

{isAdding && (
                <div className="modal fixed inset-0 flex items-center justify-center bg-black bg-opacity-70">
                    <div className="modal-content bg-red-400 p-6 rounded-lg shadow-lg">
                        <h2 className="text-2xl mb-4 hover:bg-green-400 text-center"><u>Add Product</u></h2>
                        <form onSubmit={handleAddSubmit}>
                        <div className="mb-4">
                                <label className="block text-black">Product ID:</label>
                                <input
                                    type="number"
                                    name="product_id"
                                    value={currentProduct.product_id}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-black"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-black">Product Name:</label>
                                <input
                                    type="text"
                                    name="product_name"
                                    value={currentProduct.product_name}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-black"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-black">Quantity:</label>
                                <input
                                    type="number"
                                    name="quantity"
                                    value={currentProduct.quantity}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-black"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-black">Unit:</label>
                                <input
                                    type="text"
                                    name="unit"
                                    value={currentProduct.unit}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-black"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-black">Price:</label>
                                <input
                                    type="number"
                                    name="price"
                                    value={currentProduct.price}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-black"
                                />
                            </div>
                            <button type="submit" className="  bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded">Add</button>
                            <button onClick={() => setIsAdding(false)} className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded ml-2">Cancel</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Inventory;
