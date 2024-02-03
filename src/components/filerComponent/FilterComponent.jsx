import React, { useContext } from 'react';
import {
  Funnel, PlusCircle, SortDown, SortUp,
} from 'react-bootstrap-icons';
import './filterComponent.css';
import { Link } from 'react-router-dom';
import { ProductsContext } from '../../context/productsContext';
import { getFormData } from '../../utils/utils';
import { UserContext } from '../../context/userContext';

function FilterComponent() {
  const {
    changeListOrder, orderContext, changeFilterListOrder, filterAscending,
    changeFilterList, filterContext, changeListSearch, searchContext, getProductsFilter,
  } = useContext(ProductsContext);

  const { isEditor } = useContext(UserContext);

  const handleForm = (event) => {
    event.preventDefault();
    const data = getFormData(event.currentTarget);
    const { order, filter, search } = data;
    const orderNumeric = filter !== 'name';
    getProductsFilter(filter, order, search, orderNumeric);
  };
  return (
    <form onSubmit={handleForm} onChange={handleForm} className="filter-component">
      <section className="filters">
        <fieldset>
          <p>
            <Funnel />
            Filtrar:
          </p>
          <select name="filter" onChange={changeFilterList} value={filterContext}>
            <option value="name">Nombre</option>
            <option value="weight">Peso</option>
            <option value="price">Precio</option>
          </select>
          <input
            type="search"
            name="search"
            onChange={changeListSearch}
            value={searchContext}
            placeholder="Tomate"
          />
        </fieldset>
        <fieldset>
          <p>Ordenar por</p>
          <select name="order" onChange={changeListOrder} value={orderContext}>
            <option value="name">Nombre</option>
            <option value="weight">Peso</option>
            <option value="price">Precio</option>
          </select>
          <button type="button" onClick={changeFilterListOrder}>
            {filterAscending ? <SortDown /> : <SortUp />}
          </button>
        </fieldset>

      </section>
      {isEditor() && (
        <Link to="/products/new" className="add">
          Añadir producto
          <PlusCircle />
        </Link>
      )}
    </form>
  );
}

export default FilterComponent;
