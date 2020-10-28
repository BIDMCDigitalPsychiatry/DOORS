import React from 'react';
import MaskedInput from 'react-text-mask';
import Text from './Text';

function TextMaskCustom({ inputRef, ...other }) {
  return (
    <MaskedInput
      {...other}
      ref={ref => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
      placeholderChar={'\u2000'}
      showMask
    />
  );
}

export default function PhoneNumber({ InputProps, ...other }) {
  return (
    <Text
      InputProps={{
        ...InputProps,
        inputComponent: TextMaskCustom
      }}
      {...other}      
    />
  );
}
