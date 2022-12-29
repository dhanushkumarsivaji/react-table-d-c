import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Grid, { GridProps } from '@mui/material/Grid';
import { TableSortingIconProps } from './types';
// import { range } from '../../../utils';

export const StyledTableContainer = styled('div')`
  .table-expanded-depth-0 + .table-expanded-depth-1 {
    box-shadow: inset 0px 3px 3px -3px rgba(50, 50, 50, 0.75);
  }

  .table-expanded-depth-1 + .table-expanded-depth-0 {
    box-shadow: inset 0px 3px 3px -3px rgba(50, 50, 50, 0.75);
  }
  .table-expanded-depth-1:last-child {
    box-shadow: inset 0px -3px 3px -3px rgb(50 50 50 / 75%);
  }

  .table-expanded-depth-1 + .table-expanded-depth-2 {
    box-shadow: inset 0px 3px 3px -3px rgba(50, 50, 50, 0.75);
  }

  .table-expanded-depth-2 + .table-expanded-depth-1 {
    box-shadow: inset 0px 3px 3px -3px rgba(50, 50, 50, 0.75);
  }

  .table-expanded-depth-2 + .table-expanded-depth-0 {
    box-shadow: inset 0px 3px 3px -3px rgba(50, 50, 50, 0.75);
  }
  .table-expanded-depth-2:last-child {
    box-shadow: inset 0px -3px 3px -3px rgb(50 50 50 / 75%);
  }

  .table-expanded-depth-2 + .table-expanded-depth-3 {
    box-shadow: inset 0px 3px 3px -3px rgba(50, 50, 50, 0.75);
  }

  .table-expanded-depth-3 + .table-expanded-depth-2 {
    box-shadow: inset 0px 3px 3px -3px rgba(50, 50, 50, 0.75);
  }

  .table-expanded-depth-3 + .table-expanded-depth-1 {
    box-shadow: inset 0px 3px 3px -3px rgba(50, 50, 50, 0.75);
  }

  .table-expanded-depth-3 + .table-expanded-depth-0 {
    box-shadow: inset 0px 3px 3px -3px rgba(50, 50, 50, 0.75);
  }
  .table-expanded-depth-3:last-child {
    box-shadow: inset 0px -3px 3px -3px rgb(50 50 50 / 75%);
  }

  ///other css setting here that will apply on StyledContainer component.
`;

export const ExpandableIconContainer = styled('span')(() => ({
  display: 'flex',
  justifyContent: 'center'
}));

export const ExpandableIcon = styled('span')(() => ({
  cursor: 'pointer'
}));

export const CellSpacing = styled('span')(() => ({
  paddingLeft: '16px'
}));

export const DataTableHeaderContainer = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: '12px',
  '@media (max-width: 480px)': {
    flexDirection: 'column'
  }
}));
export const DataTableCTAContainer = styled('div')(() => ({
  display: 'inline-flex',
  '@media (max-width: 480px)': {
    justifyContent: 'center'
  }
}));

export const SearchContainer = styled('div')(() => ({
  width: '50%'
}));

export const StyledExpandableKeyboardArrow = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  borderRadius: '50%',
  color: theme.palette.common.white,
  fontSize: '1rem'
}));

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#ddeaff',
    borderRight: `2px solid ${theme.palette.common.white}`,
    fontSize: '16px',
    fontWeight: '700'
  },
  [`&:last-child.${tableCellClasses.head}`]: {
    borderRight: 0
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 16,
    padding: '10px 16px'
  }
}));


export const AlignTableCellCenter = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'center'
}));

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(even)': {
    backgroundColor: '#fafafa'
  },
  '&:nth-of-type(odd)': {
    backgroundColor: '#fefefe'
  },
  '&:last-child td, &:last-child th': {
    border: 0
  }
}));

export const TableHeaderRowContainer = styled('div')(
  ({ center }: { center: boolean | number }) => ({
    cursor: 'pointer',
    display: 'flex',
    justifyContent: !center ? 'start' : 'space-between',
    alignItems: 'center',
    '& .MuiSvgIcon-root': {
      fontSize: '1rem'
    }
  })
);

export const PointerCursor = styled('span')(() => ({
  cursor: 'pointer'
  // paddingRight: 10
}));

export const TableSortingUpAndDownIconContainer = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center'
}));

export const TableSortingIcon = styled('span')(
  ({ paddingtop, paddingbottom }: TableSortingIconProps) => ({
    height: '8px',
    width: '8px',
    paddingTop: paddingtop ? '1px' : '',
    paddingBottom: paddingbottom ? '1px' : ''
  })
);

export const FilterContainer = styled(Grid)<GridProps>(() => ({
  marginBottom: 10
}));

export const PaginationLayout = styled(Grid)<GridProps>(() => ({
  margin: '20px 0px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'end',
  '@media (max-width: 991px)': {
    justifyContent: 'unset'
  }
}));

export const SearchLayout = styled(Grid)<GridProps>(() => ({}));



export const NoResultsFoundContainer = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  height: '30vh'
}));

export const AlignTableCell = styled('div')(({ position }: { position: string }) => ({
  display: 'flex',
  justifyContent: position
}));

export const LoaderContainer = styled('div')(() => ({
  position: 'absolute',
  top: '0',
  width: '100%',
  height: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
}));

export const Container = styled('div')(() => ({
  position: 'relative'
}));
