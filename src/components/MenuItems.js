import { useState } from "react";
import MenuItem from "./MenuItem";

const MenuItems = ({ menuOptions }) => {
  const [searchInput, setSearchInput] = useState("");
  const [sortCategory, setSortCategory] = useState("");
  const [sortByPrice, setSortByPrice] = useState(false);
  const [toggle, setToggle] = useState(true);

  const handleChange = (e) => {
    setSearchInput(e.target.value.toLowerCase());
  };

  const handleSortKeyChange = (e) => {
    setSortCategory(e.target.value);
  };

  const toggleIsActive = (e) => {
    setToggle(!toggle);
  };

  const toggleSortByPrice = () => {
    setSortByPrice(!sortByPrice);
  };
  const matchesSearchInput = (item_name) => {
    return item_name.toLowerCase().includes(searchInput);
  };

  const matchesSortCategory = (category) => {
    return sortCategory === "" || category === sortCategory;
  };

  const filterOptions = () => {
    return menuOptions.filter((option) => {
      const { item_name, category } = option;
      return matchesSearchInput(item_name) && matchesSortCategory(category);
    });
  };

  const sortOptions = (options) => {
    return options.sort((a, b) => {
      let aVal, bVal;
      if (sortByPrice) {
        aVal = Number(a.price);
        bVal = Number(b.price);
      } else {
        aVal = a.category;
        bVal = b.category;
      }

      if (aVal < bVal) {
        return toggle ? -1 : 1;
      } else if (aVal > bVal) {
        return toggle ? 1 : -1;
      } else {
        return 0;
      }
    });
  };

  const filteredOptions = filterOptions();
  const sortedOptions = sortOptions(filteredOptions);
  const renderContent = () => {
    if (!sortedOptions.length) {
      return (
        <div className='NoContent'>
          No menu options to display for {searchInput}
        </div>
      );
    } else {
      return sortedOptions.map((option) => (
        <MenuItem key={option.id} option={option} />
      ));
    }
  };

  return (
    <section className='MenuItems'>
      <div className='MenuItems_controls'>
        <input
          type='text'
          value={searchInput}
          onChange={handleChange}
          placeholder='Search by item name'
        />
        <label>Sort By:</label>
        <select value={sortCategory} onChange={handleSortKeyChange}>
          <option value='id'>All</option>
          <option value='Appetizer'>Appetizer</option>
          <option value='Main Course'>Main Course</option>
          <option value='Loaded Side'>Loaded Side</option>
          <option value='Side'>Side</option>
          <option value='Burger'>Burger</option>
          <option value='Dessert'>Dessert</option>
          <option value='Drink'>Drink</option>
        </select>
      </div>
      <div>
        <button className='toggle' onClick={toggleIsActive}>
          {toggle ? "Ascending ⬆️" : "Decending ⬇️"}
        </button>
        <button className="toggle" onClick={toggleSortByPrice}>
            {sortByPrice ? "Sort by Category" : "Sort by Price"}
        </button>
      </div>
      <div className='MenuItem_content'>{renderContent()}</div>
    </section>
  );
};

export default MenuItems;
