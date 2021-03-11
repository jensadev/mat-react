import './DownshiftInput.scss';

import Downshift from 'downshift';
import { matchSorter } from 'match-sorter';
import React from 'react';

const itemToString = (item) => (item ? item : '');

// eslint-disable-next-line no-unused-vars
const DownshiftInput = ({ input, meta, placeholder, items, ...rest }) => (
  <Downshift
    {...input}
    onInputValueChange={(inputValue) => {
      input.onChange(inputValue);
    }}
    itemToString={itemToString}
    selectedItem={input.value}>
    {({
      getInputProps,
      getItemProps,
      isOpen,
      inputValue,
      highlightedIndex,
      selectedItem
    }) => {
      const filteredItems = matchSorter(items, inputValue, {
        keys: ['name'],
        maxRanking: matchSorter.rankings.STARTS_WITH
      });
      return (
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
      );
    }}
  </Downshift>
);

export default DownshiftInput;
