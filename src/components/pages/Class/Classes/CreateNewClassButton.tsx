import * as React from 'react';
import { useHandleChangeRoute } from '../../../layout/hooks';
import StyledButton from '../../../general/StyledButton';

export default function CreateNewClassButton() {
  const changeRoute = useHandleChangeRoute();
  return <StyledButton onClick={changeRoute('/CreateClass')}>Create New Class</StyledButton>;
}
