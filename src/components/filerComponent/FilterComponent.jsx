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
    changeFilterList, filter, changeListSearch, search,
  } = useContext(ProductsContext);

  return (
    <form onSubmit={(event) => event.preventDefault()} className="filter-component">
      <fieldset>
        <p>Ordenar por</p>
        <select name="order" id="order" onChange={changeListOrder} value={order}>
          <option value="name">Nombre</option>
          <option value="weight">Peso</option>
          <option value="price">Precio</option>
        </select>
        <button type="button" onClick={changeFilterListOrder}>
          {filterAscending ? <SortDown /> : <SortUp />}
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
        <select name="filter" id="filter" onChange={changeFilterList} value={filter}>
          <option value="name">Nombre</option>
          <option value="weight">Peso</option>
          <option value="price">Precio</option>
        </select>
        <input
          type="search"
          name="filtrar"
          id="filter"
          onChange={changeListSearch}
          value={search}
          placeholder="Tomate🍅"
        />
      </fieldset>
    </form>
  );
}

export default FilterComponent;
