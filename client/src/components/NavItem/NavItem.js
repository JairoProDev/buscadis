// NavItem.js
import React from 'react';

function NavItem({ category, setFilter }) {
    return (
        <li>
            <button onClick={() => setFilter(category)}>
                {category}
            </button>
        </li>
    );
}

export default NavItem;