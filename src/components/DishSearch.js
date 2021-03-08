/* eslint-disable jsx-a11y/label-has-associated-control */
import './DishSearch.scss';

import Downshift from 'downshift';
import React from 'react';

import Axios from '../libs/axios';

const baseEndpoint = 'http://localhost:8080/api/dish';

function DishSearch() {
  const ArrowIcon = (isOpen) => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        fill="currentColor"
        className="bi bi-chevron-down"
        viewBox="0 0 16 16"
        transform={isOpen.isOpen ? 'rotate(180)' : undefined}>
        <path
          fillRule="evenodd"
          d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
        />
      </svg>
    );
  };

  const XIcon = () => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        fill="currentColor"
        className="bi bi-x"
        viewBox="0 0 16 16">
        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
      </svg>
    );
  };

  return (
    <div>
      <Downshift>
        {({
          inputValue,
          getInputProps,
          getLabelProps,
          getMenuProps,
          getItemProps,
          getToggleButtonProps,
          selectedItem,
          isOpen,
          clearSelection
        }) => {
          return (
            <div className="dish-search">
              <label
                className="form-label visually-hidden"
                {...getLabelProps()}>
                Select a Dish
              </label>
              <div className="input-group">
                <input
                  type="text"
                  id="dish-input"
                  name="dish-input"
                  className="form-control form-control-lg text-dark"
                  {...getInputProps({
                    isOpen,
                    placeholder: 'Search dish'
                  })}
                />
                {selectedItem ? (
                  <button
                    className="btn btn-dark"
                    onClick={clearSelection}
                    aria-label="clear selection">
                    <XIcon />
                  </button>
                ) : (
                  <button className="btn btn-dark" {...getToggleButtonProps()}>
                    <ArrowIcon isOpen={isOpen} />
                  </button>
                )}
              </div>
              <ul className="list-unstyled" {...getMenuProps({ isOpen })}>
                {(() => {
                  if (!isOpen) {
                    return null;
                  }

                  if (!inputValue) {
                    return <li disabled>You have to enter a search query</li>;
                  }

                  return (
                    <Axios url={baseEndpoint} params={{ search: inputValue }}>
                      {({ loading, error, data: { dishes = [] } = {} }) => {
                        console.log(dishes);
                        if (loading) {
                          console.log(inputValue);
                          return <li disabled>No dish found...</li>;
                        }

                        if (error) {
                          return <li disabled>Error! ${error}</li>;
                        }

                        if (!dishes.length) {
                          return <li disabled>No repositories found</li>;
                        }

                        return dishes.map(({ id, name: item }, index) => (
                          <li
                            key={id}
                            {...getItemProps({
                              item,
                              index
                            })}>
                            {item}
                          </li>
                        ));
                      }}
                    </Axios>
                  );
                })()}
              </ul>
            </div>
          );
        }}
      </Downshift>
    </div>
  );
}

export default DishSearch;
