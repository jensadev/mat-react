/* eslint-disable jsx-a11y/label-has-associated-control */

// import 'moment/locale/sv';
import './MealForm.scss';
import 'react-datepicker/dist/react-datepicker.css';

import { format } from 'date-fns';
import sv from 'date-fns/locale/sv'; // the locale you want
import Downshift from 'downshift';
import { useState } from 'react';
import ReactDatePicker, { registerLocale } from 'react-datepicker';
import { Controller, useForm } from 'react-hook-form';

import Axios from '../utils/Axios';
registerLocale('sv', sv); // register it with the name you want

const baseEndpoint = 'http://localhost:8080/api/dish';
import MealsDataService from '../services/meals.service';

function MealForm(props) {
  const [dishInput, setdishInput] = useState();
  const [dishSelected, setdishSelected] = useState();
  const stateReducer = (state, changes) => {
    // this prevents the menu from being closed when the user
    // selects an item with a keyboard or mouse
    console.log(state);
    setdishInput(state.inputValue);
    setdishSelected(state.selectedItem);
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

  // const [submitted, setSubmitted] = useState(false);
  const { handleSubmit, errors, control, watch } = useForm();
  const mealDate = watch('mealDate', new Date());
  const handleError = (errors) => {
    console.log(errors);
  };
  // const mealOptions = {
  //   mealDish: { required: 'Dish is required' }
  // };

  const onSubmit = async (data) => {
    console.log({ dishInput });
    console.log({ dishSelected });
    console.table(data);
    console.error(errors);

    let meal = {
      dish: data.mealDish || dishInput,
      type_id: 3,
      user_id: props.userId,
      date: format(data.mealDate, 'yyyy-MM-dd')
    };
    MealsDataService.create(meal)
      .then((response) => {
        // console.log(response.data);
        window.flash('record has been created successfully!', 'success');
        props.parentCallback(response);
      })
      .catch((e) => {
        console.error(e);
      });
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit, handleError)}>
        <div className=" row ">
          <div className="col-sm-7">
            <Controller
              defaultValue=""
              name="mealDish"
              control={control}
              render={({ onChange, value, ref }) => (
                <Downshift
                  // onChange={(onChange, (option) => console.log(option))}
                  onChange={onChange}
                  selected={value}
                  inputRef={ref}
                  stateReducer={stateReducer}>
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
                          Vad har du ätit idag?
                        </label>
                        <div className="input-group">
                          <input
                            type="text"
                            id="mealDish"
                            className="form-control form-control-lg text-dark"
                            {...getInputProps({
                              isOpen,
                              placeholder: 'Vad har du ätit idag?'
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
                            <button
                              className="btn btn-dark"
                              {...getToggleButtonProps()}>
                              <ArrowIcon isOpen={isOpen} />
                            </button>
                          )}
                        </div>
                        <ul
                          className="list-unstyled"
                          {...getMenuProps({ isOpen })}>
                          {(() => {
                            // console.log({ selectedItem });
                            if (!isOpen) {
                              return null;
                            }

                            if (!inputValue) {
                              return (
                                <li disabled>
                                  Skriv för att söka eller lägga till en rätt.
                                </li>
                              );
                              // return null;
                            }

                            return (
                              <Axios
                                url={baseEndpoint}
                                params={{ search: inputValue }}>
                                {({
                                  loading,
                                  error,
                                  data: { dishes = [] } = {}
                                }) => {
                                  // console.log(dishes);
                                  if (loading) {
                                    return (
                                      <li disabled>
                                        Maträtten finns inte, klicka på skapa
                                        för att lägga till.
                                      </li>
                                    );
                                  }

                                  if (error) {
                                    return <li disabled>Error! ${error}</li>;
                                  }

                                  if (!dishes.length) {
                                    console.log({ inputValue });
                                    selectedItem = inputValue;
                                  }

                                  return dishes.map(
                                    ({ id, name: item }, index) => (
                                      <li
                                        key={id}
                                        {...getItemProps({
                                          id,
                                          item,
                                          index
                                        })}>
                                        {item}
                                      </li>
                                    )
                                  );
                                }}
                              </Axios>
                            );
                          })()}
                        </ul>
                      </div>
                    );
                  }}
                </Downshift>
              )}
            />
          </div>
          <div className="col-sm-3">
            <label htmlFor="mealDate" className="form-label visually-hidden">
              Välj ett datum
            </label>
            <Controller
              control={control}
              name="mealDate"
              defaultValue={mealDate}
              render={({ onChange, value }) => (
                <ReactDatePicker
                  autoComplete="off"
                  className="form-control form-control-lg text-dark w-100 mb-3"
                  locale={sv}
                  dateFormat="PPP"
                  onChange={onChange}
                  closeOnScroll={true}
                  selected={value}
                />
              )}
            />
          </div>
          <div className="col-sm-2">
            <button
              className="btn btn-lg btn-dark w-100 text-nowrap overflow-hidden mb-3"
              type="submit">
              Skapa
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default MealForm;
