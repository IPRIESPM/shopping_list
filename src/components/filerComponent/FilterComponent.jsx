import React, { useContext } from 'react';
import {
  FunnelFill, PlusCircle, SortDown, SortUp,
} from 'react-bootstrap-icons';
import './filterComponent.css';
import { Link } from 'react-router-dom';
import { ProductsContext } from '../../context/productsContext';

function FilterComponent() {
  // Preparamos los estados
  const {
    changeListOrder, order, changeFilterListOrder, filterAscending,
    changeFilterList, filter, changeListSearch, search, getProducts,
  } = useContext(ProductsContext);

  const handleChangeListOrder = (event) => {
    changeListOrder(event);
    getProducts();
  };

  const handleChangeFilterListOrder = () => {
    changeFilterListOrder();
    getProducts();
  };

  const handleChangeFilterList = (event) => {
    changeFilterList(event);
    getProducts();
  };

  const handleChangeListSearch = (event) => {
    changeListSearch(event);
    getProducts();
  };

  return (
    <form onSubmit={(event) => event.preventDefault()} className="filter-component">
      <fieldset>
        <p>Ordenar por</p>
        <select name="order" id="order" onChange={handleChangeListOrder} value={order}>
          <option value="name">Nombre</option>
          <option value="weight">Peso</option>
          <option value="price">Precio</option>
        </select>
        <button type="button" onClick={handleChangeFilterListOrder}>
          {filterAscending ? <SortUp /> : <SortDown />}
        </button>
      </fieldset>
      <Link to="/products/new" className="add">
        Añadir producto
        <PlusCircle />
      </Link>
      <fieldset>
        <p>
          <FunnelFill />
          Filtrar:
        </p>
        <select name="filter" id="filter" onChange={handleChangeFilterList} value={filter}>
          <option value="name">Nombre</option>
          <option value="weight">Peso</option>
          <option value="price">Precio</option>
        </select>
        <input
          type="search"
          name="filtrar"
          id="filter"
          onChange={handleChangeListSearch}
          value={search}
          placeholder="Tomate🍅"
        />
      </fieldset>
    </form>
  );
}

export default FilterComponent;
