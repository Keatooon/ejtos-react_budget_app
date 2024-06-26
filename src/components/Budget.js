import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';

const Budget = () => {
    const { budget, setBudget, expenses } = useContext(AppContext); // Assuming expenses is also provided by AppContext
    const [newBudget, setNewBudget] = useState(budget);
    const [error, setError] = useState('');

    const handleBudgetChange = (event) => {
        const value = parseInt(event.target.value, 10);
        const upperLimitBudget = 20000; // Cannot exceed 20000 pounds

        const totalExpenses = expenses.reduce((total, item) => {
            return (total += item.cost);
        }, 0);

        if (!isNaN(value)) {
            if (value > upperLimitBudget) {
                // Show alert when value exceeds upper limit
                alert(`The value cannot exceed £${upperLimitBudget}`);
                setNewBudget(newBudget); // Reset input value to current newBudget
            } else if (value < totalExpenses) {
                // Show alert when value is lower than totalExpenses
                alert('You cannot reduce the budget value lower than the expenses');
                setNewBudget(newBudget); // Reset input value to current newBudget
            } else {
                setNewBudget(value);
                setBudget(value); // Update context with new budget
                setError(''); // Clear error if within limit
            }
        } else {
            setError('Please enter a valid number');
        }
    }

    return (
        <div className='alert alert-secondary'>
            <span>Budget: £{budget}</span>
            <input
                type="number"
                step="10"
                value={newBudget}
                onChange={handleBudgetChange}
                style={{ marginLeft: '1rem', width: '6rem' }}
            />
            {error && <div className="text-danger">{error}</div>}
        </div>
    );
};

export default Budget;
