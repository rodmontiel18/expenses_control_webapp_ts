import React from 'react';
import { Link } from 'react-router-dom';

const NoCategoriesMsg = () => {
  return (
    <div className="alert alert-danger" style={{margin: '40px 8% 0 8%'}}>
      To begin we need to add at least one category, you can do it
      <Link
        to="/categories/add"
        style={{ marginLeft: 5, fontSize: 16, color: 'blue' }}
        className="font-weight-bold font-italic"
      >
        right here;
      </Link>
    </div>
  );
};

export default NoCategoriesMsg;
