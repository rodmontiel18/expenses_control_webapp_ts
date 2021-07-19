import { Action } from '@reduxjs/toolkit';
import {
  ChangeEvent,
  Dispatch,
  FC,
  FormEvent,
  MouseEvent,
  ReactElement,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import { ThunkDispatch } from 'redux-thunk';
import DatePicker from 'react-datepicker';
import { History } from 'history';

import { Category } from '../../../models/category';
import { Income } from '../../../models/income';
import { addIncome, editIncome } from '../../../actions/incomeActions';
import { resetIncomeError } from '../../../reducers/incomeSlice';
import { RootState, useAppDispatch } from '../../../store';

import { SimpleError } from '../../Common/Errors';
import NoCategoriesMsg from '../../Categories/NoCategoriesMsg/NoCategoriesMsg';

interface IncomeFormProps {
  actionForm: string;
  categories: Category[];
  history: History;
  income?: Income;
  incomeErrors?: string[];
  userToken: string;
}

const IncomeForm: FC<IncomeFormProps> = ({
  actionForm,
  categories,
  history,
  income,
  incomeErrors,
  userToken,
}): ReactElement => {
  const dispatch: ThunkDispatch<RootState, null, Action> = useAppDispatch();

  const [amount, setAmount] = useState<string>('');
  const [amountError, setAmountError] = useState<boolean>(false);
  const [category, setCategory] = useState<string>('');
  const [categoryError, setCategoryError] = useState<boolean>(false);
  const [description, setDescription] = useState<string>('');
  const [descriptionError, setDescriptionError] = useState<boolean>(false);
  const [formError, setFormError] = useState<string[] | undefined>(undefined);
  const [hasFormError, setHasFormError] = useState<boolean>(false);
  const [incomeDate, setIncomeDate] = useState<Date>(new Date());
  const [incomeDateError, setIncomeDateError] = useState<boolean>(false);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const stateSetters: Map<string, Dispatch<SetStateAction<any>>> = new Map<
    string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Dispatch<SetStateAction<any>>
  >([
    ['amount', setAmount],
    ['amountError', setAmountError],
    ['category', setCategory],
    ['categoryError', setCategoryError],
    ['description', setDescription],
    ['descriptionError', setDescriptionError],
    ['incomeDate', setIncomeDate],
    ['incomeDateError', setIncomeDateError],
  ]);

  useEffect(() => {
    if (income && income.id) {
      setAmount(income.amount.toString());
      setCategory(income.categoryId.toString());
      setDescription(income.description);
      setIncomeDate(new Date(income.incomeDate));
    }
  }, [income]);

  if (!categories || categories.length < 1) return <NoCategoriesMsg />;

  const cancelAction = (e: MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    history.push('/incomes');
  };

  const changedInputValue = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
    const { name, value } = e.target;

    // eslint-disable-next-line
    const valSetter: Dispatch<any> | undefined = stateSetters.get(name);
    // eslint-disable-next-line
    const errorSetter: Dispatch<any> | undefined = stateSetters.get(name + 'Error');

    if (valSetter && errorSetter) {
      if (!value || (name === 'amount' && validateAmount(value))) {
        valSetter(value);
        errorSetter(true);
      } else {
        valSetter(value);
        errorSetter(false);
      }
    }
  };

  const handleChangeDate = (date: Date): void => {
    setIncomeDate(date);
  };

  const getIncome = (): Income => {
    const inc: Income = {
      amount: parseInt(amount),
      categoryId: parseInt(category),
      description,
      incomeDate,
      id: 0,
      userId: 0,
    };
    return inc;
  };

  const renderCategories = (): JSX.Element => {
    const categoryId = category;

    if (!categories || categories.length < 1) return <></>;

    return (
      <div className="form-group">
        <label htmlFor="category">Category</label>
        {/* eslint-disable-next-line jsx-a11y/no-onchange */}
        <select
          name="category"
          className={'form-control' + (categoryError ? ' input-error' : '')}
          onChange={changedInputValue}
          value={categoryId}
        >
          <option key="-1" value="">
            Select an option
          </option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
    );
  };

  const renderErrors = () => {
    if (hasFormError || (incomeErrors && incomeErrors.length > 0)) {
      const errors = hasFormError ? formError : incomeErrors;
      const resetError = hasFormError ? () => setFormError(undefined) : resetIncomeError;
      return <SimpleError callbackFn={resetError} errors={errors || []} timeout={5000} />;
    }
    return <></>;
  };

  const sendAction = (e: FormEvent) => {
    e.preventDefault();
    const lIncome = getIncome();

    if (!validateForm()) return false;

    if (actionForm === 'add') {
      dispatch(addIncome(lIncome, history, userToken));
    } else if (income) {
      lIncome.id = income.id;
      dispatch(editIncome(lIncome, history, userToken));
    }
  };

  const validateAmount = (amount: string) => {
    amount = '' + amount;
    if (amount.charAt(amount.length - 1) === '.' || !/^\d+\.?(\d{0,2})$/.test(amount)) return true;
    return false;
  };

  const validateForm = (): boolean => {
    let lAmountError = false,
      lCategoryError = false,
      lDescriptionError = false,
      lIncomeDateError = false;

    if (!amount || validateAmount(amount)) lAmountError = true;
    if (!category) lCategoryError = true;
    if (!description) lDescriptionError = true;
    if (!incomeDate) lIncomeDateError = true;

    setAmountError(lAmountError);
    setCategoryError(lCategoryError);
    setDescriptionError(lDescriptionError);
    setIncomeDateError(lIncomeDateError);

    if (lAmountError || lCategoryError || lDescriptionError || lIncomeDateError) {
      setHasFormError(true);
      setFormError(['Red marked fields are mandatory']);
      return false;
    }

    setHasFormError(false);
    setFormError(undefined);

    return true;
  };

  return (
    <form autoComplete="off" className="pt-3" onSubmit={sendAction}>
      {renderErrors()}
      {renderCategories()}
      <div className="form-gorup">
        <label htmlFor="description">Description</label>
        <input
          className={'form-control' + (descriptionError ? ' input-error' : '')}
          defaultValue={description}
          name="description"
          onChange={changedInputValue}
          placeholder="Quincena"
          type="text"
        />
      </div>
      <div className="form-gorup">
        <label htmlFor="amount">Amount</label>
        <input
          className={'form-control' + (amountError ? ' input-error' : '')}
          defaultValue={amount}
          name="amount"
          onChange={changedInputValue}
          placeholder="0.00"
          type="text"
        />
      </div>
      <div className="form-gorup">
        <label htmlFor="date">Date</label>
        <br />
        <DatePicker
          className={'form-control' + (incomeDateError ? ' input-error' : '')}
          dateFormat="yyyy/MM/dd"
          name="date"
          onChange={handleChangeDate}
          placeholderText="yyyy/mm/dd"
          selected={incomeDate}
          showYearDropdown
        />
      </div>

      <div className="add-action-buttons">
        <button className="btn btn-dark cancel-add" onClick={cancelAction} type="button">
          Cancel
        </button>
        <button className="btn btn-primary add-button" type="submit">
          {actionForm === 'add' ? 'Add' : 'Save'}
        </button>
      </div>
    </form>
  );
};

export default IncomeForm;
