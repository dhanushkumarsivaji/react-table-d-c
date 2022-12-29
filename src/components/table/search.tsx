// import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import { SEARCH_LABEL } from './constants';

const Search = styled('div')(({ theme }) => ({
  display: 'flex',
  position: 'relative',
  borderRadius: 4,
  backgroundColor: theme.palette.common.white,
  border: `1px solid ${theme.palette.grey[700]}`,
  flexGrow: 1,
  width: '100%',
  '& :first-of-type': {
    flexGrow: 1
  },
  '.MuiInputBase-root': {
    width: '100%'
  },
  '& label': {
    display: 'none'
  }
}));

const SearchIconWrapper = styled('div')(() => ({
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end'
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(0)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    '&::placeholder': {
      color: 'black',
      fontStyle: 'italic',
      fontSize: 16
    }
  }
}));

function SearchBar(props: any) {
  const { placeholder, label } = props;
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Search>
        <label htmlFor={SEARCH_LABEL}>{SEARCH_LABEL}</label>
        <StyledInputBase
          placeholder={placeholder}
          inputProps={{ 'aria-label': SEARCH_LABEL }}
          type="text"
          id={SEARCH_LABEL}
          data-testid="table-search-bar"
          // autoFocus
          {...props}
        />
        <SearchIconWrapper>
          <IconButton aria-label={label} tabIndex={-1}>
            <SearchIcon sx={{ color: 'grey.600' }} />
          </IconButton>
        </SearchIconWrapper>
      </Search>
    </Box>
  );
}

export default SearchBar;
