import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import ImageUploader from 'react-images-upload';
import { ToastContainer, toast } from 'react-toastify';

import { doSetCategories, doUpdateImages } from 'actions';
import { toastrOptions } from 'constants/toastr';
import { CategorySelect } from 'components/Category';
import { getCategories } from 'selectors';

const initialState = {
  // image: null,
  category: '',
};

const UploadPage = () => {
  /*
    Component for uploading images.
  */
  const categories = useSelector((state) => getCategories(state));
  const dispatch = useDispatch();

  const [state, setState] = useState(initialState);
  const SERVER_BASE_URL = process.env.REACT_APP_SERVER_DOMAIN;

  useEffect(() => {
    (async () => {
      const res = await axios.get(
        `${SERVER_BASE_URL}image-category/`,
      );
      dispatch(doSetCategories(res.data));
    })();
  }, [SERVER_BASE_URL]);

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

        if (res.status == 201) {
          // status 201 - item created successfully
          dispatch(doUpdateImages(res.data));

          toast.dark(
            '🚀 Image Uploaded! Go to Gallery to view the image',
            toastrOptions,
          );
        } else {
          // failed to upload image
          toast.error(
            '💩 Oops something goes wrong. Uploading failed. Try again!',
            toastrOptions,
          );
        }
      })();
    }
  };

  const handleChange = ({ target: { value } }) => {
    setState({ ...state, category: value });
  };

  return (
    <>
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
        onChange={onDrop}
        imgExtension={['.jpg', '.jpeg', '.gif', '.png', '.gif']}
        maxFileSize={5242880}
        singleImage={true}
      />
    </>
  );
};

export default UploadPage;
