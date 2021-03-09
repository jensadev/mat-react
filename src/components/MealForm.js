/* eslint-disable jsx-a11y/label-has-associated-control */
import 'react-day-picker/lib/style.css';
// import 'moment/locale/sv';
import './MealForm.scss';
import 'react-datepicker/dist/react-datepicker.css';

import sv from 'date-fns/locale/sv'; // the locale you want
import Downshift from 'downshift';
// import { useState } from 'react';
import ReactDatePicker, { registerLocale } from 'react-datepicker';
import { Controller, useForm } from 'react-hook-form';

import Axios from '../libs/axios';
registerLocale('sv', sv); // register it with the name you want

const baseEndpoint = 'http://localhost:8080/api/dish';
// import MealsDataService from '../services/meals.service';
// import DishSearch from './DishSearch';

function stateReducer(state, changes) {
  // this prevents the menu from being closed when the user
  // selects an item with a keyboard or mouse
  console.log(state);
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
}

function MealForm() {
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
  // const initialMealState = {
  //   id: null,
  //   dish: null,
  //   type: null,
  //   date: null
  // };
  // const [meal, setMeal] = useState(initialMealState);
  // const [submitted, setSubmitted] = useState(false);

  // const handleInputChange = (event) => {
  //   const { name, value } = event.target;
  //   setMeal({ ...meal, [name]: value });
  // };

  // const saveMeal = () => {
  //   var data = {
  //     title: meal.title,
  //     description: meal.description
  //   };

  //   MealsDataService.create(data)
  //     .then((response) => {
  //       setMeal({
  //         id: response.data.id,
  //         title: response.data.title,
  //         description: response.data.description,
  //         published: response.data.published
  //       });
  //       setSubmitted(true);
  //       console.log(response.data);
  //     })
  //     .catch((e) => {
  //       console.log(e);
  //     });
  // };

  // const newMeal = () => {
  //   setMeal(initialMealState);
  //   setSubmitted(false);
  // };

  // const [startDate, setStartDate] = useState(new Date());
  const { handleSubmit, errors, control, watch } = useForm(); // initialize the hook
  const mealDate = watch('mealDate', new Date());
  const onSubmit = async (data) => {
    console.table(data);
    console.error(errors);
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className=" row ">
          <div className="col-sm-7">
            <Controller
              as={
                <Downshift stateReducer={stateReducer}>
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
                            id="mealDish"
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
                              return <li disabled>Start typing...</li>;
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
                                        No such dish in our database, create it.
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
              }
              defaultValue=""
              name="mealDish"
              control={control}
              valueName="selected"
              // rules={{
              //   validate: (data) => {
              //     const date = new Date(data);
              //     return date.getDate() !== 13;
              //   }
              // }}
            />
          </div>
          <div className="col-sm-3">
            <label htmlFor="mealDate" className="form-label visually-hidden">
              Pick a date
            </label>
            <Controller
              control={control}
              name="mealDate"
              defaultValue={mealDate}
              render={({ onChange, ref, value }) => (
                <ReactDatePicker
                  autoComplete="off"
                  className="form-control form-control-lg text-dark w-100 mb-3"
                  locale={sv}
                  dateFormat="PPP"
                  onChange={onChange}
                  closeOnScroll={true}
                  inputRef={ref}
                  selected={value}
                />
              )}
            />
          </div>
          <div className="col-sm-2">
            <button
              className="btn btn-lg btn-dark w-100 text-nowrap overflow-hidden mb-3"
              type="submit">
              Add meal
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default MealForm;
