import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './CategoryTree.css'; // Import CSS

const CategoryTree = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            const response = await axios.get('http://localhost:5000/api/categories');
            setCategories(response.data);
        };
        fetchCategories();
    }, []);

    const toggleChildren = (category) => {
        category.showChildren = !category.showChildren;
        setCategories([...categories]);
    };

    const renderTree = (nodes) => {
        return (
            <ul>
                {nodes.map(node => (
                    <li key={node._id}>
                        <span className="category-name" onClick={() => toggleChildren(node)}>
                            {node.name}
                        </span>
                        {node.showChildren && node.children && node.children.length > 0 ? renderTree(node.children) : null}
                    </li>
                ))}
            </ul>
        );
    };

    return (
        <div className="category-tree">
            <h1>Category Tree</h1>
            {renderTree(categories)}
        </div>
    );
};

export default CategoryTree;