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
import { History } from 'history';
import DatePicker from 'react-datepicker';
import { ThunkDispatch } from 'redux-thunk';

import { Category } from '../../../models/category';
import { Expense } from '../../../models/expense';
import { addExpense, editExpense } from '../../../actions/expenseActions';
import { resetExpenseErrors } from '../../../reducers/expensesSlice';
import { RootState, useAppDispatch } from '../../../store';

import NoCategoriesMsg from '../../Categories/NoCategoriesMsg/NoCategoriesMsg';
import { SimpleError } from '../../Common/Errors';

interface ExpenseFormProps {
  actionForm: string;
  categories: Category[];
  expense?: Expense;
  expenseErrors: string[];
  history: History;
  userToken: string;
}

const ExpenseForm: FC<ExpenseFormProps> = ({
  actionForm,
  categories,
  expense,
  expenseErrors,
  history,
  userToken,
}): ReactElement => {
  const dispatch: ThunkDispatch<RootState, null, Action> = useAppDispatch();

  const [amount, setAmount] = useState<string>('');
  const [amountError, setAmountError] = useState<boolean>(false);
  const [category, setCategory] = useState<string>('');
  const [categoryError, setCategoryError] = useState<boolean>(false);
  const [description, setDescription] = useState<string>('');
  const [descriptionError, setDescriptionError] = useState<boolean>(false);
  const [expenseDate, setExpenseDate] = useState<Date>(new Date());
  const [expenseDateError, setExpenseDateError] = useState<boolean>(false);
  const [formError, setFormError] = useState<string[] | undefined>(undefined);
  const [hasFormError, setHasFormError] = useState<boolean>(false);
  const [id, setId] = useState<string>('');

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
    ['expenseDate', setExpenseDate],
    ['expenseDateError', setExpenseDateError],
    ['id', setId],
  ]);

  useEffect(() => {
    if (expense && expense.id) {
      setAmount(expense.amount.toString());
      setCategory(expense.categoryId.toString());
      setDescription(expense.description);
      setExpenseDate(new Date(expense.expenseDate));
      setId(expense.id.toString());
    }
  }, [expense]);

  if (!categories || categories.length < 1) return <NoCategoriesMsg />;

  const handleAddExpense = (): void => {
    const lExpense = getExpenseData();
    dispatch(addExpense(lExpense, history, userToken));
  };

  const cancelAction = (e: MouseEvent): void => {
    e.preventDefault();
    history.push('/expenses');
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

  const handleEditExpense = () => {
    const lExpense = getExpenseData();
    lExpense.id = parseInt(id);

    dispatch(editExpense(lExpense, history, userToken));
  };

  const getExpenseData = (): Expense => {
    const lExpense: Expense = {
      amount: parseInt(amount || '0'),
      categoryId: parseInt(category || '0'),
      description,
      expenseDate: expenseDate.getTime(),
      id: 0,
      userId: 0,
    };

    return lExpense;
  };

  const handleChangeDate = (date: Date): void => {
    setExpenseDate(new Date(date.setHours(0, 0, 0, 0)));
  };

  const renderErrors = (): JSX.Element => {
    if (hasFormError || (expenseErrors && expenseErrors.length > 0)) {
      const errors = hasFormError ? formError : expenseErrors;
      const resetError = hasFormError ? () => setFormError(undefined) : resetExpenseErrors;
      return <SimpleError callbackFn={resetError} errors={errors || []} timeout={5000} />;
    }
    return <></>;
  };

  const sendAction = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) return false;

    if (actionForm === 'add') handleAddExpense();
    else handleEditExpense();
  };

  const validateAmount = (amount: string): boolean => {
    amount = '' + amount;
    if (amount.charAt(amount.length - 1) === '.' || !/^\d+\.?(\d{0,2})$/.test(amount)) return true;
    return false;
  };

  const validateForm = (): boolean => {
    let lAmountError = false,
      lCategoryError = false,
      lDescriptionError = false,
      lExpenseDateError = false;

    if (!amount || validateAmount(amount)) lAmountError = true;
    if (!category) lCategoryError = true;
    if (!description) lDescriptionError = true;
    if (!expenseDate) lExpenseDateError = true;

    setAmountError(lAmountError);
    setCategoryError(lCategoryError);
    setDescriptionError(lDescriptionError);
    setExpenseDateError(lExpenseDateError);

    if (lAmountError || lCategoryError || lDescriptionError || lExpenseDateError) {
      setHasFormError(true);
      setFormError(['Los campos marcados en rojo son obligatorios']);
      return false;
    }

    setHasFormError(false);
    setFormError(undefined);
    return true;
  };

  return (
    <form autoComplete="off" className="pt-3" onSubmit={sendAction}>
      {renderErrors()}
      <div className="form-group">
        <label htmlFor="category">Category</label>
        {/* eslint-disable-next-line jsx-a11y/no-onchange */}
        <select
          name="category"
          className={'form-control' + (categoryError ? ' input-error' : '')}
          onChange={changedInputValue}
          value={category}
        >
          <option key="-1" value="">
            Selecciona una opci&oacute;n
          </option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="description">Description</label>
        <input
          className={'form-control' + (descriptionError ? ' input-error' : '')}
          defaultValue={description}
          name="description"
          onChange={changedInputValue}
          placeholder="Descripcion"
          type="text"
        />
      </div>
      <div className="form-group">
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
      <div className="form-group">
        <label htmlFor="date">Date</label>
        <br />
        <DatePicker
          className={'form-control' + (expenseDateError ? ' input-error' : '')}
          dateFormat="yyyy/MM/dd"
          name="date"
          onChange={handleChangeDate}
          placeholderText="yyyy/mm/dd"
          selected={expenseDate}
          showYearDropdown
        />
      </div>
      <div className="add-action-buttons">
        <button className="btn btn-dark cancel-add" onClick={cancelAction} type="button">
          Cancel
        </button>
        <button className="add-button btn btn-primary" type="submit">
          {actionForm === 'add' ? 'Agregar' : 'Guardar'}
        </button>
      </div>
    </form>
  );
};

export default ExpenseForm;
