import './DownshiftInput.scss';

import Downshift from 'downshift';
import { matchSorter } from 'match-sorter';
import React from 'react';
import { useEffect, useState } from 'react';

import DishService from '../../services/dish';

const itemToString = (item) => (item ? item : '');

// eslint-disable-next-line no-unused-vars
function DownshiftInput({ input, meta, placeholder, items, ...rest }) {
  const [dishes, setDishes] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        DishService.index().then(
          (res) => {
            if (res.dishes) {
              setDishes(res.dishes);
            }
          },
          (error) => {
            console.log(error);
          }
        );
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const filterItems = (inputValue) => {
    // console.log(dishes);
    setFilteredItems(
      matchSorter(dishes, inputValue, {
        keys: ['name'],
        maxRanking: matchSorter.rankings.STARTS_WITH
      })
    );
  };

  return (
    <Downshift
      {...input}
      onInputValueChange={(inputValue) => {
        filterItems(inputValue);
        input.onChange(inputValue);
      }}
      itemToString={itemToString}
      selectedItem={input.value}>
      {({
        getInputProps,
        getItemProps,
        isOpen,

        highlightedIndex,
        selectedItem
      }) => (
        <div className="downshift text-dark">
          <input
            className="form-control text-dark w-100"
            {...getInputProps({
              name: input.name,
              placeholder
            })}
          />
          {isOpen && !!filteredItems.length && (
            <div className="downshift-options">
              {filteredItems.map(({ id, name }, index) => (
                <div
                  key={name}
                  {...getItemProps({
                    key: id,
                    index,
                    item: name,
                    className: 'downshift-option',
                    //  && selectedItem === name
                    // ? 'active'
                    // : 'normal'
                    style: {
                      color: highlightedIndex === index ? 'var(--bs-dark)' : '',
                      fontWeight: selectedItem === name ? 'bold' : 'normal'
                    }
                  })}>
                  {name}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </Downshift>
  );
}

export default DownshiftInput;
