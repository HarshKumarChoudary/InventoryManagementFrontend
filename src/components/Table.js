import { useSelector, useDispatch } from 'react-redux';
import { updateInventory, fetchInventory } from '../redux/actions';
import { useEffect, useState } from 'react';
import { AiOutlineEdit, AiOutlineExclamationCircle } from 'react-icons/ai';
import EditModal from './EditModal';

function InventoryTable(props) {
    const dispatch = useDispatch();
    const [selectAll, setSelectAll] = useState(false);
    const [showLowStockOnly, setShowLowStockOnly] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);


    const inventory = useSelector((state) => {
        if (showLowStockOnly) {
            return state.inventory.filter(item => (item.lowStockWarning && item.openingStock < item.lowStock));
        } else {
            return state.inventory;
        }
    });

    const handleEditItem = (item) => {
        setSelectedItem(item);
        setIsModalOpen(true);
    };

    const handleSaveItem = (item) => {
        console.log(item)
        dispatch(updateInventory(item.id, item));
        setIsModalOpen(false);
    };


    const toggleSelectAll = () => {
        setSelectAll(!selectAll);
        props.setSelectedItems(selectAll ? [] : inventory.map(item => item.id));
    };

    const handleToggleShowLowStock = () => {
        setShowLowStockOnly(!showLowStockOnly);
    };


    const toggleSelectItem = (itemId) => {
        if (props.selectedItems.includes(itemId)) {
            props.setSelectedItems(props.selectedItems.filter(id => id !== itemId));
        } else {
            props.setSelectedItems([...props.selectedItems, itemId]);
        }
    };

    const handleAdjustStock = (itemId) => {
        // Handle adjusting stock for the item
        console.log(`Adjust stock for item with ID: ${itemId}`);
    };

    useEffect(() => {
        dispatch(fetchInventory());
    }, [dispatch, handleSaveItem]);

    return (
        <>
        <table className="w-full border-collapse">
            <thead>
                <tr>
                    <th>
                        <input
                            type="checkbox"
                            checked={selectAll}
                            onChange={toggleSelectAll}
                        />
                    </th>
                    <th>Item name</th>
                    <th>Item code</th>
                    <th>Category</th>
                    <th>Stock Quantity</th>
                    <th>Stock On Hold</th>
                    <th>Stock Value</th>
                    <th>Purchase Price</th>
                    <th></th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {inventory.map((item) => (
                    <tr key={item.id}>
                        <td className="border">
                            <input type="checkbox"
                                checked={props.selectedItems.includes(item.id)}
                                onChange={() => toggleSelectItem(item.id)}
                            />
                        </td>
                        <td className="border">{item.name}</td>
                        <td className="border">{item.code}</td>
                        <td className="border">{item.category}</td>
                        <td className="border">{String(item.openingStock) + " " + item.unit}</td>
                        <td className="border">{"0 " + item.unit }</td>
                        <td className="border">{item.openingStock * item.price}</td>
                        <td className="border">{item.inclusiveTax? item.price : item.price + (item.price * item.taxRate) / 100}</td>

                        <td>
                            {item.lowStockWarning && item.openingStock < item.lowStock && <AiOutlineExclamationCircle className="text-red-500" />}
                        </td>
                        <td>
                            <button
                                onClick={() => handleEditItem(item)}
                                className="text-blue-500"
                            >
                                <AiOutlineEdit />
                            </button>

                        </td>
                        <td>
                            <button
                                onClick={() => handleAdjustStock(item.id)}
                                className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600"
                            >
                                Adjust Stock
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
            <br></br>
            <tfoot>
                <tr>
                    <td colSpan="10" className="text-right">
                        <button
                            onClick={handleToggleShowLowStock}
                            className={`bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 ${showLowStockOnly ? 'bg-opacity-100' : 'bg-opacity-50'}`}
                        >
                            Show Low Stock Only
                        </button>
                    </td>
                </tr>
            </tfoot>
        </table>
        {
        isModalOpen && (
            <EditModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                item={selectedItem}
                onSave={handleSaveItem}
            />
        )
    }
    </>
    );
}

export default InventoryTable;
