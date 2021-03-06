import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup';

import { ToastContainer, toast } from 'react-toastify';

import { doUpdateCategories } from 'actions';
import { TOASTR_OPTIONS } from 'constants/utils';
import { getCategories } from 'selectors';

const initialCategory = {
  name: '',
  errors: {},
};

const CategoryPage = () => {
  /*
    Component for Creating & Listing Image Category.
  */
  const [category, setCategory] = useState(initialCategory);

  const categories = useSelector((state) => getCategories(state));
  const dispatch = useDispatch();

  const SERVER_BASE_URL = process.env.REACT_APP_SERVER_DOMAIN;

  const handleSubmit = (e) => {
    e.preventDefault();

    (async () => {
      const res = await axios
        .post(`${SERVER_BASE_URL}image-category/`, {
          name: category.name,
        })
        .catch(({ response }) => response);

      if (res?.status === 201) {
        setCategory(initialCategory);
        dispatch(doUpdateCategories(res.data));
        toast.dark(
          '🚀 Category Created Successfully',
          TOASTR_OPTIONS,
        );
      } else {
        setCategory({ ...category, errors: res.data });
        toast.error('💩 Oops! Error Occured.', TOASTR_OPTIONS);
      }
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
            type="text"
            name="category"
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
          <Button
            variant="primary"
            type="submit"
            disabled={isInvalid}
          >
            Submit
          </Button>
        </Form.Group>
      </Form>

      <ListGroup>
        {categories.map((category, index) => (
          <ListGroup.Item key={index}>{category.name}</ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
};

export default CategoryPage;
