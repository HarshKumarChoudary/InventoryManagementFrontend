import {useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchInventory, createNewInventory, deleteSelectedInventory } from './redux/actions';
import Modal from './components/Modal';
import InventoryTable from './components/Table';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const inventory = useSelector((state) => state.inventory);
  const [selectedItems, setSelectedItems] = useState([]);

  const dispatch = useDispatch();

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleDeleteSelected = () => {
    dispatch(deleteSelectedInventory(selectedItems));
  };
  return (
    <div>
      <nav className="bg-blue-500 py-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-white text-xl font-bold">Inventory Management</h1>
        </div>
      </nav>

      <header className="bg-gray-200 py-6">
        <div className="container mx-auto flex justify-between items-center">
          <h2 className="text-xl font-bold">Inventory List</h2>
          <div>
            <button
              onClick={handleOpenModal}
              className="bg-white text-blue-500 px-4 py-2 rounded-lg shadow hover:bg-blue-100 mr-4"
            >
              Add Inventory
            </button>
            <button
              onClick={handleDeleteSelected}
              className="bg-red-500 text-white px-4 py-2 rounded-lg shadow hover:bg-red-600"
            >
              Delete Selected
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto mt-8">
        <InventoryTable setSelectedItems={setSelectedItems} selectedItems={selectedItems}  />
        
      </main>

      {isModalOpen && <Modal isOpen={isModalOpen} onClose={handleCloseModal} />}
    </div>
  );
}

export default App;
