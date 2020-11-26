import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';

const CategorySelect = ({ categories = [], label, handleChange }) => {
  return !!categories.length ? (
    <>
      <Form inline>
        {label}
        <FormControl as="select" onChange={handleChange}>
          <option value="">---</option>
          {categories.map((category) => (
            <option value={category.id} key={category.id}>
              {category.name}
            </option>
          ))}
        </FormControl>
      </Form>
    </>
  ) : (
    <Card body>No Category found. Create Some Category.</Card>
  );
};

CategorySelect.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }),
  ),
  label: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default CategorySelect;
