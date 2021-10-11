import {
  ChangeEvent,
  FC,
  FocusEvent,
  FormEvent,
  MouseEvent,
  ReactElement,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
} from 'react';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from '@reduxjs/toolkit';
import { HuePicker, ColorResult } from 'react-color';
import * as CSS from 'csstype';
import { History } from 'history';

import { resetCategoryErrors } from '../../../reducers/categorySlice';
import { addCategory, editCategory } from '../../../actions/categoryActions';
import { RootState, useAppDispatch } from '../../../store';
import { Category } from '../../../models/category';

import { SimpleError } from '../../Common/Errors';

interface CategooryFormProps {
  actionForm: string;
  category?: Category;
  categoryErrors?: string[];
  history: History;
}

const CategoryForm: FC<CategooryFormProps> = ({ actionForm, category, categoryErrors, history }): ReactElement => {
  const dispatch: ThunkDispatch<RootState, null, Action> = useAppDispatch();

  const [color, setColor] = useState<string>('#fff');
  const [colorError, setColorError] = useState<boolean>(false);
  const [description, setDescription] = useState<string>('');
  const [descriptionError, setDescriptionError] = useState<boolean>(false);
  const [formError, setFormError] = useState<string[]>([]);
  const [hasFormError, setHasFormError] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [nameError, setNameError] = useState<boolean>(false);
  const [type, setType] = useState<number>(0);
  const [typeError, setTypeError] = useState<boolean>(false);
  // const [showPopup, setShowPopup] = useState<boolean>(false);

  // eslint-disable-next-line
  const stateSetters: Map<string, Dispatch<SetStateAction<any>>> = new Map<
    string,
    // eslint-disable-next-line
    Dispatch<SetStateAction<any>>
  >([
    ['color', setColor],
    ['description', setDescription],
    ['descriptionError', setDescriptionError],
    ['name', setName],
    ['nameError', setNameError],
    ['type', setType],
    ['typeError', setTypeError],
  ]);

  useEffect(() => {
    if (category && category.id) {
      let tempColor = '#fff';
      if (category.color && category.color.startsWith('#')) tempColor = category.color;

      setColor(tempColor);
      setDescription(category.description);
      setName(category.name);
      setType(category.type);
    }
  }, [category]);

  const handleAddCategory = (category: Category): void => {
    dispatch(addCategory(category, history));
  };

  const cancelAdd = (e: MouseEvent): void => {
    e.preventDefault();
    history.push('/categories');
  };

  const changedInputValue = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement> | FocusEvent<HTMLInputElement>,
  ): void => {
    e.preventDefault();

    const { name, value } = e.target;

    // eslint-disable-next-line
    const valSetter: Dispatch<any> | undefined = stateSetters.get(name);
    // eslint-disable-next-line
    const errorSetter: Dispatch<any> | undefined = stateSetters.get(name + 'Error');
    if (valSetter) valSetter(value);

    if (!value) {
      if (errorSetter) errorSetter(true);
    } else {
      if (errorSetter) errorSetter(false);
    }
  };

  const handleEditCategory = (category: Category): void => {
    dispatch(editCategory(category, history));
  };

  const getCategoryData = (): Category => {
    const lCategory: Category = {
      color,
      description,
      id: 0,
      name,
      type,
      userId: 0,
    };
    if (category && category.id) lCategory['id'] = category.id;

    return lCategory;
  };

  const handleChangeColor = (newColor: ColorResult): void => {
    if (newColor && newColor.hex) setColor(newColor.hex);
  };

  const getStyles = (): CSS.Properties => {
    const styles: CSS.Properties = {
      backgroundColor: 'white',
      borderColor: color,
      borderWidth: '3px',
      marginTop: '15px',
      textAlign: 'center',
    };
    return styles;
  };

  const renderErrors = (): JSX.Element => {
    if (hasFormError || (categoryErrors && categoryErrors.length > 0)) {
      const errors = hasFormError ? formError : categoryErrors;
      const resetError = hasFormError ? () => setFormError([]) : resetCategoryErrors;
      return <SimpleError callbackFn={resetError} errors={errors || []} timeout={5000} />;
    }
    return <></>;
  };

  const sendAction = (e: FormEvent): boolean => {
    e.preventDefault();
    if (!validateForm()) return false;

    const category = getCategoryData();

    if (actionForm === 'add') handleAddCategory(category);
    else handleEditCategory(category);
    return true;
  };

  const validateForm = (): boolean => {
    let lColorError = false,
      lDescriptionError = false,
      lNameError = false,
      lTypeError = false;

    if (!color) lColorError = true;
    if (!description) lDescriptionError = true;
    if (!name) lNameError = true;
    if (!type) lTypeError = true;

    setColorError(lColorError);
    setDescriptionError(lDescriptionError);
    setNameError(lNameError);
    setTypeError(lTypeError);

    if (lDescriptionError || lNameError || lTypeError) {
      setHasFormError(true);
      setFormError(['Red marked fields are mandatory']);
      return false;
    }

    setHasFormError(false);
    setFormError([]);
    return true;
  };

  return (
    <form className="pt-3" autoComplete="off" onSubmit={sendAction}>
      {renderErrors()}
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input
          className={'form-control ' + (nameError ? ' input-error' : '')}
          defaultValue={name}
          id="name"
          name="name"
          onBlur={changedInputValue}
          onChange={changedInputValue}
          placeholder="Ex. Food"
          type="text"
        />
      </div>
      <div className="form-group">
        <label htmlFor="description">Description</label>
        <input
          className={'form-control ' + (descriptionError ? ' input-error' : '')}
          defaultValue={description}
          name="description"
          onBlur={changedInputValue}
          onChange={changedInputValue}
          placeholder="Ex. Expenses related with food"
          type="text"
        />
      </div>
      <div className="form-row">
        <div className="form-group col-md-8">
          <label htmlFor="type">Category type</label>
          {/* eslint-disable-next-line jsx-a11y/no-onchange */}
          <select
            className={'form-control ' + (typeError ? ' input-error' : '')}
            name="type"
            onChange={changedInputValue}
            value={type}
          >
            <option value="">Select an option</option>
            <option value="1">Expense</option>
            <option value="2">Income</option>
          </select>
        </div>
        <div className="form-group col-md-4">
          <label htmlFor="color">Color</label>
          <HuePicker color={color} onChange={handleChangeColor} />
          <input
            className={'form-control ' + (colorError ? 'input-error' : '')}
            disabled
            name="color"
            style={getStyles()}
            type="text"
            value={color}
          />
        </div>
      </div>
      <div className="add-action-buttons">
        <button className="btn btn-dark cancel-button" onClick={cancelAdd}>
          Cancel
        </button>
        <button type="submit" className="btn btn-primary add-button">
          {actionForm === 'add' ? 'Add' : 'Save'}
        </button>
      </div>
    </form>
  );
};

export default CategoryForm;
