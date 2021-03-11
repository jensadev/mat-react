/* eslint-disable no-prototype-builtins */
/* eslint-disable jsx-a11y/label-has-associated-control */

// import 'moment/locale/sv';
import './MealForm.scss';
import 'react-datepicker/dist/react-datepicker.css';

// import { format } from 'date-fns';
import sv from 'date-fns/locale/sv'; // the locale you want
// import Downshift from 'downshift';
import { useEffect, useState } from 'react';
import ReactDatePicker, { registerLocale } from 'react-datepicker';
import { Controller, useForm } from 'react-hook-form';

import Dishsearch from './Dishsearch';
registerLocale('sv', sv); // register it with the name you want
// import { formatISO } from 'date-fns';

// import MealsDataService from '../services/meals.service';
import UserDataService from '../services/user.service';

function MealForm(props) {
  const [dishes, setDishes] = useState([]);
  // const [mealDate] = useState(new Date());
  // const [dish, setDish] = useState();

  // function stateReducer(state, changes) {
  //   // this prevents the menu from being closed when the user
  //   // selects an item with a keyboard or mouse
  //   console.log(state.inputValue);
  //   console.log(state.selectedItem);
  //   switch (changes.type) {
  //     case Downshift.stateChangeTypes.keyDownEnter:
  //     case Downshift.stateChangeTypes.clickItem:
  //       return {
  //         ...changes,
  //         isOpen: state.isOpen
  //         // highlightedIndex: state.highlightedIndex
  //       };
  //     default:
  //       return changes;
  //   }
  // }

  // const stateReducer = (state, changes) => {
  //   // this prevents the menu from being closed when the user
  //   // selects an item with a keyboard or mouse
  //   console.log(state);
  //   setdishInput(state.inputValue);
  //   // setdishSelected(state.selectedItem);
  //   console.log(changes.type);
  //   // let val = changes.inputValue;
  //   // changes.inputValue = val;
  //   switch (changes.type) {
  //     // Preventing from clearing value once ESC is pressed
  //     case Downshift.stateChangeTypes.mouseUp:
  //       return { isOpen: false };
  //     default:
  //       return changes;
  //   }
  // };
  // // const [submitted, setSubmitted] = useState(false);
  const { handleSubmit, errors, control, register } = useForm();
  // const [data, setData] = useState(null);
  // const handleError = (errors) => {
  //   console.log(errors);
  // };
  // const mealOptions = {
  //   mealDish: { required: 'Dish is required' }
  // };
  useEffect(() => {
    UserDataService.getAllDishes(props.userId).then(
      (response) => {
        setDishes(response.data);
        // console.log(dishes);
      },
      (error) => {
        const _content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();

        setDishes(_content);
      }
    );
  }, [props.userId]);

  const onSubmit = async (data) => {
    // console.log({ dishInput });
    // console.log({ dishSelected });
    console.table(data);
    console.error(errors);

    console.log(dishes);
    // let meal = {
    //   dish: data.mealDish,
    //   type_id: 3,
    //   user_id: props.userId,
    //   date: formatISO(data.mealDate)
    // };
    // MealsDataService.create(meal)
    //   .then((response) => {
    //     // console.log(response.data);
    //     props.parentCallback(response);
    //   })
    //   .catch((e) => {
    //     console.error(e);
    //   });
  };
  return (
    <div>
      {/* <form onSubmit={handleSubmit((data) => setData(data))}> */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className=" row ">
          <div className="col-sm-2">
            <p>Till</p>
          </div>
          <div className="col-sm-4">
            <select
              ref={register({ required: true })}
              defaultValue="3"
              name="type"
              className="form-select text-dark w-100"
              aria-label="Måltidstyp">
              <option value="1">Frukost</option>
              <option value="2">Lunch</option>
              <option value="3">Middag</option>
            </select>
            {errors.type && (
              <div className="invalid-feedback">
                <p>Fel</p>
              </div>
            )}
          </div>
          <div className="col-sm-2">
            <p>den</p>
          </div>
          <div className="col-sm-3">
            <label htmlFor="mealDate" className="form-label visually-hidden">
              Välj ett datum
            </label>
            <Controller
              // ref={register({ required: true })}
              control={control}
              name="date"
              defaultValue={new Date()}
              render={(props) => (
                <ReactDatePicker
                  autoComplete="off"
                  className="form-control text-dark w-100 mb-3"
                  locale={sv}
                  dateFormat="PPP"
                  onChange={(e) => props.onChange(e)}
                  selected={props.value}
                  closeOnScroll={true}
                />
              )}
            />
            {errors.date && (
              <div className="invalid-feedback">
                <p>Datum</p>
              </div>
            )}
          </div>
        </div>
        <div className=" row ">
          <div className="col-sm-2">
            <p>har jag ätit</p>
          </div>
          <div className="col-sm-7">
            <Controller
              control={control}
              defaultValue=""
              name="dish"
              // eslint-disable-next-line no-unused-vars
              render={({ ref, ...rest }) => <Dishsearch {...rest} />}
            />
            {errors.type && (
              <div className="invalid-feedback">
                <p>rätt</p>
              </div>
            )}
          </div>
          <div className="col-sm-2">
            <button
              className="btn btn-dark w-100 text-nowrap overflow-hidden mb-3"
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

// ? dishes
//     .filter(
//       (item) =>
//         !inputValue || item.name.includes(inputValue)
//     )
//     .map((item, index) => (
//       <li
//         key={item.id}
//         {...getItemProps({
//           index,
//           item,
//           style: {
//             backgroundColor:
//               highlightedIndex === index
//                 ? 'cyan'
//                 : 'white',
//             fontWeight:
//               selectedItem === item
//                 ? 'bold'
//                 : 'normal'
//           }
//         })}>
//         {item.value}
//       </li>
//     ))
// : null}

// <Controller
// name="mealDish"
// control={control}
// render={(onChange, value, ref) => (
//   <Downshift
//     stateReducer={stateReducer}
//     onChange={onChange}
//     selected={value}
//     inputRef={ref}
//     itemToString={(item) => (item ? item.value : '')}>
//     {({
//       inputValue,
//       getInputProps,
//       getLabelProps,
//       getMenuProps,
//       getItemProps,
//       getToggleButtonProps,
//       isOpen
//     }) => (
//       <div className="dish-search">
//         <label
//           {...getLabelProps()}
//           className="form-label visually-hidden">
//           Skapa en rätt
//         </label>
//         <div className="input-group">
//           <input
//             className="form-control text-dark "
//             {...getInputProps()}
//           />
//           <button
//             className="btn btn-dark"
//             {...getToggleButtonProps()}
//             aria-label={'toggle menu'}>
//             &#8595;
//           </button>
//         </div>
//         <ul className="list-unstyled" {...getMenuProps()}>
//           {isOpen &&
//             dishes
//               .filter(
//                 (item) =>
//                   !inputValue ||
//                   item.name
//                     .toLowerCase()
//                     .includes(inputValue.toLowerCase())
//               )
//               .map((item, index) => (
//                 <li
//                   key={index}
//                   {...getItemProps({
//                     item,
//                     index
//                   })}>
//                   {item.name}
//                 </li>
//               ))}
//         </ul>
//       </div>
//     )}
//   </Downshift>
// )}
// />
// </div>
