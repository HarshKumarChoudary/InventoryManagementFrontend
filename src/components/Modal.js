import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createNewInventory, fetchInventory } from '../redux/actions';
import { FaSpinner } from 'react-icons/fa';

const Modal = ({ isOpen, onClose }) => {
    const [image, setImage] = useState(null);
    const [isLowStockChecked, setIsLowStockChecked] = useState(false);
    const [isTaxEnabled, setIsTaxEnabled] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [formValues, setFormValues] = useState({
        category: '',
        code: '',
        description: '',
        image: '',
        inclusiveTax: false,
        lowStock: 0,
        name: '',
        openingStock: 0,
        price: 0,
        taxRate: 0,
        unit: '',
        lowStockWarning:false,
    });
    const [errors, setErrors] = useState({});

    const dispatch = useDispatch();

    const handleLowStockChange = (event) => {
        setIsLowStockChecked(!isLowStockChecked);
    };

    const handleTaxEnabled = (event) => {
        setIsTaxEnabled(!isTaxEnabled);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validateForm()) {
            const formData = new FormData();
            formData.append('image', image);
            formData.append('category', String(formValues.category));
            formData.append('code', String(formValues.code));
            formData.append('description', String(formValues.description));
            formData.append('inclusiveTax', isTaxEnabled);
            formData.append('lowStock', Number(formValues.lowStock));
            formData.append('name', String(formValues.name));
            formData.append('openingStock', Number(formValues.openingStock));
            formData.append('price', Number(formValues.price));
            formData.append('taxRate', Number(formValues.taxRate));
            formData.append('unit', String(formValues.unit));
            formData.append('lowStockWarning', isLowStockChecked);

            setIsLoading(true);
            await dispatch(createNewInventory(formData));
            setIsLoading(false);
            onClose();
        } else {
            // Scroll to the first error
            const firstErrorField = document.querySelector('.text-red-500');

            if (firstErrorField) {
                firstErrorField.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        const newValue = type === 'checkbox' ? checked : value;

        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: newValue,
        }));
    };

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formValues.category.trim()) {
            newErrors.category = 'Category is required';
        }

        if (!formValues.code.trim()) {
            newErrors.code = 'Code is required';
        }

        if (!formValues.name.trim()) {
            newErrors.name = 'Name is required';
        }

        if (formValues.lowStock < 0) {
            newErrors.lowStock = 'Low Stock must be a positive number';
        }

        if (formValues.price < 0) {
            newErrors.price = 'Price must be a positive number';
        }
        
        if (formValues.openingStock < 0) {
            newErrors.openingStock = 'Opening Stock must be a positive number';
        }

        if (formValues.unit < 0) {
            newErrors.unit = 'Units must be a positive number';
        }
        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    useEffect(() => {
        if (!isOpen) {
            setFormValues({
                category: '',
                code: '',
                description: '',
                image: '',
                inclusiveTax: false,
                lowStock: 0,
                name: '',
                openingStock: 0,
                price: 0,
                taxRate: 0,
                unit: '',
            });
            setImage(null);
            setErrors({});
        }
    }, [isOpen]);

    const handleReset = () => {
        setFormValues({
            category: '',
            code: '',
            description: '',
            image: '',
            inclusiveTax: false,
            lowStock: 0,
            name: '',
            openingStock: 0,
            price: 0,
            taxRate: 0,
            unit: '',
        });
        setImage(null);
        setErrors({});
        setIsLowStockChecked(false);
        setIsTaxEnabled(false);
    };

    useEffect(() => {
        dispatch(fetchInventory());
    }, [dispatch]);


    return (
        <div className={`fixed inset-0 flex items-center justify-center z-50 ${isOpen ? '' : 'hidden'}`}>
            <div className="bg-white w-2/3 p-6 rounded-lg shadow-lg min-h-[20rem] max-h-[80vh] overflow-y-auto">
                <h2 className="text-2xl font-bold mb-4">Add Inventory</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            
                            <b>General Details</b>
                            {/* Column 1 */}
                            <div>
                                <label htmlFor="image" className="block text-gray-700 font-bold mb-2">
                                    Image:
                                </label>
                                <input
                                    type="file"
                                    id="image"
                                    name="image"
                                    onChange={handleImageChange}
                                    className="border border-gray-300 px-4 py-2 w-full"
                                />
                                {image && (
                                    <img
                                        src={URL.createObjectURL(image)}
                                        alt="Preview"
                                        className="mt-2 h-36"
                                    />
                                )}
                            </div>
                            <div>
                                <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
                                    Name:
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formValues.name}
                                    onChange={handleInputChange}
                                    className={`border ${errors.name ? 'border-red-500' : 'border-gray-300'
                                        } px-4 py-2 w-full`}
                                />
                                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                            </div>

                            <div>
                                <label htmlFor="category" className="block text-gray-700 font-bold mb-2">
                                    Category:
                                </label>
                                <select
                                    id="category"
                                    name="category"
                                    value={formValues.category}
                                    onChange={handleInputChange}
                                    className={`border ${errors.category ? 'border-red-500' : 'border-gray-300'
                                        } px-4 py-2 w-full`}
                                >
                                    <option value="">Select</option>
                                    <option value="Panel">Panel</option>
                                    <option value="Other">Other</option>
                                    <option value="MC4 Connector">MC4 Connector</option>
                                    <option value="Wire">Wire</option>
                                    <option value="Inverter">Inverter</option>
                                </select>
                                {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
                            </div>
                           
                            <div>
                                <label htmlFor="code" className="block text-gray-700 font-bold mb-2">
                                    Code:
                                </label>
                                <input
                                    type="text"
                                    id="code"
                                    name="code"
                                    value={formValues.code}
                                    onChange={handleInputChange}
                                    className="border border-gray-300 px-4 py-2 w-full"
                                />
                            </div>
                            <div>
                                <label htmlFor="description" className="block text-gray-700 font-bold mb-2">
                                    Description:
                                </label>
                                <textarea
                                    id="description"
                                    name="description"
                                    value={formValues.description}
                                    onChange={handleInputChange}
                                    className="border border-gray-300 px-4 py-2 w-full resize-none"
                                ></textarea>
                            </div>

                        </div>
                        <div>
                            {/* Column 2 */}
                            <b>Stock Details</b>
                            
                            <div>
                                <label htmlFor="unit" className="block text-gray-700 font-bold mb-2">
                                    Unit:
                                </label>
                                <select
                                    id="unit"
                                    name="unit"
                                    value={formValues.unit}
                                    onChange={handleInputChange}
                                    className="border border-gray-300 px-4 py-2 w-full"
                                >
                                    <option value="">Select unit</option>
                                    <option value="PCS">PCS</option>
                                    <option value="FEET">FEET</option>
                                    <option value="INCHES">INCHES</option>
                                </select>
                                {errors.unit && <p className="text-red-500 text-sm mt-1">{errors.unit}</p>}
                            </div>

                            <div>
                                <label htmlFor="openingStock" className="block text-gray-700 font-bold mb-2">
                                    Opening Stock:
                                </label>
                                <input
                                    type="number"
                                    id="openingStock"
                                    name="openingStock"
                                    value={formValues.openingStock}
                                    onChange={handleInputChange}
                                    className={`border ${errors.openingStock ? 'border-red-500' : 'border-gray-300'
                                        } px-4 py-2 w-full`}
                                />
                                {errors.openingStock && (
                                    <p className="text-red-500 text-sm mt-1">{errors.openingStock}</p>
                                )}
                            </div>

                            {/* Low Stock Toggle Button */}
                            <div className="flex items-center mb-4">
                                <label htmlFor="lowStockToggle" className="mr-2 text-gray-700 font-bold">
                                    Low Stock Warning:
                                </label>

                                <button
                                    type="button"
                                    onClick={handleLowStockChange}
                                    className={`rounded-full w-14 h-7 transition-colors duration-200 ${isLowStockChecked ? 'bg-blue-500' : 'bg-gray-300'
                                        }`}
                                >
                                    <div
                                        className={`w-5 h-5 rounded-full transform transition-transform duration-200 ${isLowStockChecked ? 'translate-x-7 bg-white' : 'translate-x-0 bg-blue-500'
                                            }`}
                                    ></div>
                                </button>
                                <span className="ml-2">{isLowStockChecked ? 'On' : 'Off'}</span>
                            </div>
                            <div>
                                {isLowStockChecked && (
                                    <>
                                        <label htmlFor="lowStock" className="block text-gray-700 font-bold mb-2">
                                            Low Stock:
                                        </label>
                                        <input
                                            type="number"
                                            id="lowStock"
                                            name="lowStock"
                                            value={formValues.lowStock}
                                            onChange={handleInputChange}
                                            className="border border-gray-300 px-4 py-2 w-full"
                                        />
                                        {errors.lowStock && <p className="text-red-500 text-sm mt-1">{errors.lowStock}</p>}
                                    </>

                                )}
                            </div>
                            
                            <div>
                                <label htmlFor="price" className="block text-gray-700 font-bold mb-2">
                                    Purchase Price:
                                </label>
                                <input
                                    type="number"
                                    id="price"
                                    name="price"
                                    value={formValues.price}
                                    onChange={handleInputChange}
                                    className="border border-gray-300 px-4 py-2 w-full"
                                />
                                {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}

                            </div>
                            <div className="flex items-center mb-4">
                                <label htmlFor="inclusiveOfTax" className="mr-2 text-gray-700 font-bold">
                                    Inclusive Of Tax:
                                </label>

                                <button
                                    type="button"
                                    onClick={handleTaxEnabled}
                                    className={`rounded-full w-14 h-7 transition-colors duration-200 ${isTaxEnabled ? 'bg-blue-500' : 'bg-gray-300'
                                        }`}
                                >
                                    <div
                                        className={`w-5 h-5 rounded-full transform transition-transform duration-200 ${isTaxEnabled ? 'translate-x-7 bg-white' : 'translate-x-0 bg-blue-500'
                                            }`}
                                    ></div>
                                </button>
                                <span className="ml-2">{isTaxEnabled ? 'On' : 'Off'}</span>
                            </div>
                            <div>
                                <label htmlFor="taxRate" className="block text-gray-700 font-bold mb-2">
                                    Tax Rate:
                                </label>
                                <select
                                    id="taxRate"
                                    name="taxRate"
                                    value={formValues.taxRate}
                                    onChange={handleInputChange}
                                    className="border border-gray-300 px-4 py-2 w-full"
                                >
                                    <option value="">Select Tax Rate</option>
                                    <option value="5">GST 5%</option>
                                    <option value="0.25">GST 0.25%</option>
                                </select>
                            </div>
                                
                        </div>
                    </div>

                    <div className="flex justify-end">
                        <div className="modal-actions">
                            {isLoading ? (
                                <FaSpinner className="loading-spinner" />
                            ) : (
                                <>
                                        <button
                                            type="submit"
                                            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                                        >
                                            Save
                                        </button>
                                </>
                            )}
                        </div>
                        
                        <button
                            type="button"
                            onClick={handleReset}
                            className="bg-blue-500 text-white px-4 py-2 rounded-lg ml-2 hover:bg-blue-600"
                        >
                            Reset
                        </button>
                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg ml-2 hover:bg-gray-400"
                        >
                            Close
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Modal;