import React, { useState } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { ToastContainer, toast } from 'react-toastify';

import { toastrOptions } from 'constants/toastr';

const initialCategory = {
  name: '',
  errors: {},
};

const CategoryPage = () => {
  /*
    Component for Creating Image Category.
  */
  const [category, setCategory] = useState(initialCategory);
  const SERVER_BASE_URL = process.env.REACT_APP_SERVER_DOMAIN;

  const handleSubmit = (e) => {
    e.preventDefault();

    (async () => {
      const res = await axios
        .post(`${SERVER_BASE_URL}image-category/`, {
          name: category.name,
        })
        .catch(({ response }) => response);

      res?.status === 201
        ? setCategory(initialCategory)
        : setCategory({ ...category, errors: res.data });

      res?.status === 201
        ? toast.dark(
            '🚀 Category Created Successfully',
            toastrOptions,
          )
        : toast.error('💩 Oops! Error Occured.', toastrOptions);
    })();
  };

  const isInvalid = category.name === '';
  const { name, errors } = category;

  return (
    <Container>
      <ToastContainer />

      <Form noValidate onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Category</Form.Label>
          <Form.Control
            type="category"
            placeholder="Enter a Category"
            value={name}
            onChange={({ target: { value } }) =>
              setCategory({ ...category, name: value, errors: {} })
            }
          />
          <Form.Text className="text-muted">
            Category must be a unique value.
          </Form.Text>
          {errors.name?.map((err, index) => (
            <div className="text-danger" key={index}>
              {err}
            </div>
          ))}
        </Form.Group>

        <Button variant="primary" type="submit" disabled={isInvalid}>
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default CategoryPage;
