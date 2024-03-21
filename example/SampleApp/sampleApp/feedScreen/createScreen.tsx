import React from 'react';
import { CreatePost, useCreatePostContext } from '@likeminds.community/feed-rn-core';

const CreateScreen = ({navigation}) => {
  const {handleDocument, handleGallery} = useCreatePostContext();

  const customHandleDocumentProp = () => {
    console.log('before document handle');
    handleDocument();
    console.log('after document handle');
  };
  const customHandleGalleryProp = (type) => {
    console.log('before gallery handle');
    handleGallery(type);
    console.log('after gallery handle');
  };
  return (
   <CreatePost
   handleDocumentProp={() => customHandleDocumentProp()}
   handleGalleryProp={(type) => customHandleGalleryProp(type)} />
  );
};

export default CreateScreen;
