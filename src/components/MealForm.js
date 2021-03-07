/* eslint-disable jsx-a11y/label-has-associated-control */
import 'react-datepicker/dist/react-datepicker.css';

import sv from 'date-fns/locale/sv';
import Downshift from 'downshift';
import React from 'react';
// import DatePicker from 'react-datepicker';
import { registerLocale } from 'react-datepicker';
registerLocale('sv', sv);
import Axios from '../libs/axios';
registerLocale('sv', sv);

function MealForm() {
  const baseEndpoint = 'http://localhost:8080/api/dish';
  // const [startDate, setStartDate] = useState(new Date());
  return (
    <div className="mb-3">
      <Downshift>
        {({ inputValue, getLabelProps, getItemProps, isOpen }) => {
          return (
            <div>
              <label
                {...getLabelProps()}
                className="form-label visually-hidden">
                Select a dish or enter a new one:
              </label>
              <div className="input-group">
                <input
                  className="form-control  text-dark"
                  list="dishlist"
                  placeholder="Type to search..."
                />
              </div>
              <datalist id="dishlist">
                {(() => {
                  console.log(isOpen);
                  if (!isOpen) {
                    return null;
                  }
                  return (
                    <Axios url={baseEndpoint} params={{ search: inputValue }}>
                      {({ loading, error, data: { dishes = [] } = {} }) => {
                        console.table(dishes);
                        if (loading) {
                          return <option value="Loading..." />;
                        }

                        if (error) {
                          console.error('Error! ${error}');
                          return null;
                        }

                        if (!dishes.length) {
                          return null;
                        }

                        return dishes.map(
                          ({ id, name: item }, index) =>
                            (
                              <option
                                key={id}
                                value={item}
                                {...getItemProps({
                                  index,
                                  item
                                })}
                              />
                            ) ?? null
                        );
                      }}
                    </Axios>
                  );
                })()}
                );
              </datalist>
            </div>
          );
        }}
      </Downshift>
    </div>
  );
  // <DatePicker
  //   locale="sv"
  //   selected={startDate}
  //   onChange={(date) => setStartDate(date)}
  // />
}

export default MealForm;

/*
    //   <svg
    //     xmlns="http://www.w3.org/2000/svg"
    //     width="16"
    //     height="16"
    //     fill="currentColor"
    //     className="bi bi-search form-control-feedback"
    //     viewBox="0 0 16 16">
    //     <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
    //   </svg>
    //   <input
    //     type="text"
    //     className="form-control form-control-lg"
    //     placeholder="Search"
    //     aria-label="Recipient's username"
    //     aria-describedby="button-addon2"
    //   />
    */
