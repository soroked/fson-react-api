import { RiSaveLine } from 'react-icons/ri';
import { MdOutlineCancel } from 'react-icons/md';

import { SearchFormStyled, FormBtn, InputSearch } from 'components';
import { BtnEdit } from './EditForm.styled';

export const EditForm = ({ currentTodo, onUpdate, onCancel, onChange }) => {
  return (
    <SearchFormStyled onSubmit={onUpdate}>
      <BtnEdit type="button" onClick={onCancel}>
        <MdOutlineCancel size="16px" color="red" />
      </BtnEdit>

      <FormBtn type="submit">
        <RiSaveLine size="16px" color="green" />
      </FormBtn>

      <InputSearch
        placeholder="EDIT TODO"
        name="edit"
        onChange={onChange}
        required
        defaultValue={currentTodo.text}
        autoFocus
      />
    </SearchFormStyled>
  );
};
