/* eslint-disable jsx-a11y/label-has-associated-control */
import Downshift from 'downshift';
import React from 'react';

const items = ['apple', 'pear', 'orange', 'grape', 'banana'];

// eslint-disable-next-line react/display-name
// export default ({ value, onChange }) => (

function Dishsearch({ value, onChange }) {
  const stateReducer = (state, changes) => {
    // this prevents the menu from being closed when the user
    // selects an item with a keyboard or mouse
    console.table(state);
    console.table(changes);
    // setdishSelected(state.selectedItem);
    console.log(changes.type);
    // let val = changes.inputValue;
    // changes.inputValue = val;
    switch (changes.type) {
      // Preventing from clearing value once ESC is pressed
      case Downshift.stateChangeTypes.mouseUp:
        return { isOpen: false };
      default:
        return changes;
    }
  };
  return (
    <Downshift
      stateReducer={stateReducer}
      selectedItem={value}
      onStateChange={(e) => onChange(e.inputValue || '')}
      inputValue={value}
      itemToString={(item) => (item ? item : '')}>
      {({
        getInputProps,
        getItemProps,
        getLabelProps,
        getMenuProps,
        isOpen,
        inputValue,
        highlightedIndex,
        selectedItem
      }) => (
        <div>
          <label {...getLabelProps()} className="form-label visually-hidden">
            Maträtt
          </label>
          <input
            {...getInputProps()}
            className="form-control text-dark"
            placeholder="Enter a fruit"
          />
          <ul {...getMenuProps()}>
            {isOpen
              ? items
                  .filter((item) => !inputValue || item.includes(inputValue))
                  .map((item, index) => (
                    <li
                      key={index}
                      {...getItemProps({
                        key: item,
                        index,
                        item,
                        style: {
                          backgroundColor:
                            highlightedIndex === index ? 'lightgray' : null,
                          fontWeight: selectedItem === item ? 'bold' : 'normal'
                        }
                      })}>
                      {item}
                    </li>
                  ))
              : null}
          </ul>
        </div>
      )}
    </Downshift>
  );
}
export default Dishsearch;
