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
        viewBox="0 0 20 20"
        preserveAspectRatio="none"
        width={16}
        fill="transparent"
        stroke="#979797"
        strokeWidth="1.1px"
        transform={isOpen.isOpen ? 'rotate(180)' : undefined}>
        <path d="M1,6 L10,15 L19,6" />
      </svg>
    );
  };

  const XIcon = () => {
    return (
      <svg
        viewBox="0 0 20 20"
        preserveAspectRatio="none"
        width={12}
        fill="transparent"
        stroke="#979797"
        strokeWidth="1.1px">
        <path d="M1,1 L19,19" />
        <path d="M19,1 L1,19" />
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
