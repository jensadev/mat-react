import './DownshiftInput.scss';

import { useAuth0 } from '@auth0/auth0-react';
import Downshift from 'downshift';
import { matchSorter } from 'match-sorter';
import React from 'react';
import { useEffect, useState } from 'react';
const itemToString = (item) => (item ? item : '');

// eslint-disable-next-line no-unused-vars
function DownshiftInput({ input, meta, placeholder, items, ...rest }) {
  const [dishes, setDishes] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const apiOrigin = 'http://localhost:8080/api';
  // const [state, setState] = useState({
  //   showResult: false,
  //   apiMessage: '',
  //   error: null
  // });

  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    (async () => {
      try {
        const token = await getAccessTokenSilently();

        const response = await fetch(`${apiOrigin}/users/dishes`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const responseData = await response.json();

        // console.table(responseData);
        if (responseData) {
          setDishes(responseData.dishes);
        }
        // setState({
        //   ...state,
        //   showResult: responseData == false ? false : true,
        //   apiMessage: responseData
        // });
      } catch (error) {
        console.log(error);
        // setState({
        //   ...state,
        //   error: error.error
        // });
      }
    })();
  }, [getAccessTokenSilently]);

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
