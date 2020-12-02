import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import ImageUploader from 'react-images-upload';
import { ToastContainer, toast } from 'react-toastify';

import { doUpdateImages } from 'actions';
import { TOASTR_OPTIONS, IMG_SUPPORTED_EXT } from 'constants/utils';
import { CategorySelect } from 'components/Category';
import { getCategories } from 'selectors';

const initialState = {
  // image: null,
  category: '',
};

const UploadPage = () => {
  /*
    Component for Uploading Images.
  */
  const categories = useSelector((state) => getCategories(state));
  const dispatch = useDispatch();

  const [state, setState] = useState(initialState);
  const SERVER_BASE_URL = process.env.REACT_APP_SERVER_DOMAIN;

  const onDrop = (files) => {
    if (files.length) {
      (async () => {
        // FormData is needed for file handling
        const data = new FormData();
        data.append('category', state.category);
        data.append('image', files[0]);

        // Sending image to server
        const res = await axios
          .post(`${SERVER_BASE_URL}image-gallery/`, data)
          .catch((err) => err.response);

        // Status 201 means item created successfully
        res?.status === 201 && dispatch(doUpdateImages(res.data));

        res?.status == 201
          ? toast.dark(
              '🚀 Image Uploaded! Go to Gallery to view the image',
              TOASTR_OPTIONS,
            )
          : toast.error(
              '💩 Oops something goes wrong. Uploading failed. Try again!',
              TOASTR_OPTIONS,
            );
      })();
    }
  };

  const handleChange = ({ target: { value } }) => {
    setState({ ...state, category: value });
  };

  return (
    <Container>
      <ToastContainer />

      <CategorySelect
        categories={categories}
        label="Choose a Category&nbsp;"
        handleChange={handleChange}
      />
      <hr />
      <ImageUploader
        withIcon={true}
        buttonText="Choose image"
        name="imageInput"
        onChange={onDrop}
        imgExtension={IMG_SUPPORTED_EXT}
        maxFileSize={5242880}
        singleImage={true}
      />
    </Container>
  );
};

export default UploadPage;
