import { FC, ReactElement } from 'react';

import CategoryComponent from '../Category/Category';
import { Category } from '../../../models/category';

interface ListCategoriesProps {
  categories: Category[];
}

const ListCategories: FC<ListCategoriesProps> = ({ categories }): ReactElement => {
  return (
    <div className="table-responsive">
      <table className="table table-sm table-bordered table-hover">
        <thead className="thead-light">
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Type</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category: Category) => (
            <CategoryComponent key={category.id} category={category} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListCategories;
