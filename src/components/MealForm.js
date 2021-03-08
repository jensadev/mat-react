import 'react-day-picker/lib/style.css';
import 'moment/locale/sv';
import './MealForm.scss';

import DayPickerInput from 'react-day-picker/DayPickerInput';
import MomentLocaleUtils, {
  formatDate,
  parseDate
} from 'react-day-picker/moment';

import DishSearch from './DishSearch';

function MealForm() {
  const handleSubmit = (event) => {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className=" row ">
        <div className="col-sm-7">
          <DishSearch />
        </div>
        <div className="col-sm-3">
          <label htmlFor="mealdate" className="form-label visually-hidden">
            Pick a date
          </label>
          <DayPickerInput
            inputProps={{
              id: 'date-input',
              name: 'date-input',
              className: 'form-control form-control-lg text-dark w-100 mb-3'
            }}
            formatDate={formatDate}
            parseDate={parseDate}
            format="LL"
            placeholder={`${formatDate(new Date(), 'LL', 'sv')}`}
            dayPickerProps={{
              className: 'rounded box-shadow text-dark',
              locale: 'sv',
              localeUtils: MomentLocaleUtils
            }}
          />
        </div>
        <div className="col-sm-2">
          <button className="btn btn-lg btn-dark w-100 text-nowrap overflow-hidden mb-3">
            Add meal
          </button>
        </div>
      </div>
    </form>
  );
}

export default MealForm;
