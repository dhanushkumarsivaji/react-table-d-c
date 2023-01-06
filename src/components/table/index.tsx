// @ts-nocheck
import React, { useEffect, useRef } from "react";
import * as XLSX from "xlsx";
import { CSVLink } from 'react-csv'
import Switch from "@mui/material/Switch";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import TableCompo from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableFooter from "@mui/material/TableFooter";
import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";
import Grid from "@mui/material/Grid";
import { getValue, Stack } from "@mui/system";
import Box from "@mui/material/Box";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Popover from "@mui/material/Popover";
import IconButton from "@mui/material/IconButton";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import Checkbox from "@mui/material/Checkbox";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { useNavigate } from 'react-router-dom';

import {
  StyledTableCell,
  StyledTableRow,
  TableHeaderRowContainer,
  TableSortingUpAndDownIconContainer,
  TableSortingIcon,
  FilterContainer,
  PaginationLayout,
  SearchLayout,
  AlignTableCell
} from "./styles";
import DebouncedInputComp from "./debouncedInput";

import { ReactComponent as ArrowUp } from "./assets/arrow-up.svg";
import { ReactComponent as ArrowDown } from "./assets/arrow-down.svg";
import PaginationWithRowSelection from "./pagination";
import { calculatePaginationEntries } from "./utils";

import {
  Column,
  Table,
  useReactTable,
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFacetedMinMaxValues,
  getPaginationRowModel,
  getSortedRowModel,
  FilterFn,
  ColumnDef,
  flexRender,
  PaginationState,
} from "@tanstack/react-table";

import { RankingInfo, rankItem } from "@tanstack/match-sorter-utils";

import { makeData, AccountDataType } from "./makeData";

declare module "@tanstack/table-core" {
  interface FilterFns {
    fuzzy: FilterFn<unknown>;
  }
  interface FilterMeta {
    itemRank: RankingInfo;
  }
}

var Heading = [
  ["Account Id", "Account Name", "Account Status", "Product Type", 'Date'],
];

const downloadExcel = (data: any) => {
  const wb = XLSX.utils.book_new();
  const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet([]);
  XLSX.utils.sheet_add_aoa(ws, Heading);

  //Starting in the second row to avoid overriding and skipping headers
  XLSX.utils.sheet_add_json(ws, data, { origin: "A2", skipHeader: true });

  XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

  XLSX.writeFile(wb, "filename.xlsx");
};




const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  // Rank the item
  const itemRank = rankItem(row.getValue(columnId), value);

  // Store the itemRank info
  addMeta({
    itemRank,
  });

  // Return if the item should be filtered in/out
  return itemRank.passed;
};

export default function TableComponent({
  enableColumnFilters,
  handleChange,
}: {
  enableColumnFilters: boolean;
  handleChange: any;
}) {
  const csvLink = useRef()
  const rerender = React.useReducer(() => ({}), {})[1];
  const [columnVisibility, setColumnVisibility] = React.useState({});
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [globalFilter, setGlobalFilter] = React.useState("");

  const navigate = useNavigate()

  const handleEditClick = (row: any) => {
    sessionStorage.setItem('row', JSON.stringify(row))
    navigate('/edit')
  }

  const getTransactionData = () => {
    csvLink.current.link.click()
  }

  const columns = React.useMemo<ColumnDef<AccountDataType, any>[]>(
    () => [
      {
        accessorKey: "accountId",
        header: () => <span>Account Id</span>,
        footer: ({ table }) => <h2>Total: {table.getFilteredRowModel().rows.reduce((total, row) => total + row.getValue('accountId'), 0)}</h2>,
      },
      {
        accessorKey: "accountName",
        cell: (info) => info.getValue(),
        header: () => <span>Account Name</span>,
        // footer: (props) => props.column.id,
      },
      {
        accessorKey: "accountStatus",
        header: "Account Status",
        // footer: (props) => props.column.id,
      },
      {
        accessorKey: "productType",
        header: "Product Type",
        // footer: (props) => props.column.id,
      },
      {
        accessorKey: "date",
        header: "Date",
        cell: ({getValue}) => getValue()
      },
      {
        accessorKey: "edit",
        header: () => <AlignTableCell position="center">Edit</AlignTableCell>,
        enableColumnFilter: false,
        enableSorting: false,
        cell: ({ row, getValue }) => <AlignTableCell position="left"><EditOutlinedIcon sx={{ cursor: 'pointer' }} onClick={() => handleEditClick(row.original)}></EditOutlinedIcon></AlignTableCell>,

        // footer: (props) => props.column.id,
      },
    ],
    []
  );

  const [data, setData] = React.useState<AccountDataType[]>(() => makeData(200));

  
  const refreshData = () => setData((old) => makeData(200));

  const [filteredData, setFilteredData] = React.useState<any>([]);

  const [{ pageIndex, pageSize }, setPagination] =
    React.useState<PaginationState>({
      pageIndex: 0,
      pageSize: 10,
    });

  const [paginationEntries, setPaginationEntries] = React.useState<{
    from?: number;
    to?: number;
    lastPage?: number;
  }>({});

  const pagination = React.useMemo(
    () => ({
      pageIndex,
      pageSize,
    }),
    [pageIndex, pageSize]
  );

  useEffect(() => {
    const result: any = calculatePaginationEntries(
      data?.length,
      table.getState().pagination.pageIndex + 1,
      pageSize
    );
    setPaginationEntries(result);
  }, [pageIndex, data, pageSize]);

  const table = useReactTable({
    data,
    columns,
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    state: {
      columnVisibility,
      columnFilters,
      globalFilter,
      pagination,
    },
    onPaginationChange: setPagination,
    onColumnVisibilityChange: setColumnVisibility,
    enableColumnFilters,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: fuzzyFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    debugTable: true,
    debugHeaders: true,
    debugColumns: false,
  });

  const paginationProps = {
    totalCount: data?.length,
    pageEntries: `${paginationEntries.from} - ${paginationEntries.to} of `,
    nextPage: () => table.nextPage(),
    previousPage: () => table.previousPage(),
    canPreviousPage: !table.getCanPreviousPage(),
    canNextPage: !table.getCanNextPage(),
  };

  useEffect(() => {
    let fdata = table.getRowModel().rows.map((row) => row.original);
    // console.log(JSON.stringify(fdata,null,2))
    setFilteredData(fdata);
  }, [table.getRowModel().rows]);


  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "60px",
        }}
      >
        <FormGroup>
          <FormControlLabel
            control={
              <Switch
                checked={enableColumnFilters}
                onChange={handleChange}
                inputProps={{ "aria-label": "controlled" }}
                size="small"
              />
            }
            label="Enable Column Filter"
          />
        </FormGroup>
        <BasicPopover table={table} />
      </div>
      <div>
        <div>
          <FilterContainer container>
            <Grid
              item
              xs={12}
              sm={12}
              md={12}
              lg={12}
              display="flex"
              justifyContent={"space-between"}
            >
              <SearchLayout item xs={12} sm={12} md={4} lg={4} mb={1}>
                <DebouncedInputComp
                  value={globalFilter ?? ""}
                  onChange={(value) => setGlobalFilter(String(value))}
                  placeholder={"Search..."}
                />
              </SearchLayout>
              <Grid
                item
                xs={12}
                sm={12}
                md={4}
                lg={4}
                mb={1}
                display="flex"
                justifyContent="end"
              >
                <ButtonGroup
                  variant="outlined"
                  size="small"
                  aria-label="outlined primary button group"
                >
                  <Button onClick={() => downloadExcel(data)}>xlsx</Button>
                  <Button onClick={() => getTransactionData()}>CSV</Button>
                  <Button onClick={() => getTransactionData()}>PDF</Button>

                </ButtonGroup>
                <CSVLink
                  data={data}
                  filename='transactions.csv'
                  className='hidden'
                  ref={csvLink}
                  target='_blank'
                />
              </Grid>
            </Grid>
          </FilterContainer>

          <div className="h-2" />
          <TableContainer component={Paper}>
            <TableCompo
              sx={{
                "& .MuiTableRow-root:hover": {
                  backgroundColor: "#eff5ff",
                },
                minWidth: 1200
              }}
              stickyHeader
              aria-label="caption table"
              data-testid="table"
            >
              <TableHead sx={{ display: "table-header-group" }}>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      return (
                        <>
                          <StyledTableCell
                            key={header.id}
                            colSpan={header.colSpan}
                          >
                            {header.isPlaceholder ? null : header.column.getCanSort() ? (
                              <TableHeaderRowContainer
                                center={+header.column.getCanSort()}
                                {...{
                                  onClick:
                                    header.column.getToggleSortingHandler(),
                                }}
                              >
                                {flexRender(
                                  header.column.columnDef.header,
                                  header.getContext()
                                )}
                                {{
                                  asc: <TableSortingIcon as={ArrowUp} />,
                                  desc: <TableSortingIcon as={ArrowDown} />,
                                }[
                                  header.column.getIsSorted() as string
                                ] ?? (
                                    <TableSortingUpAndDownIconContainer>
                                      <TableSortingIcon as={ArrowUp} />
                                      <TableSortingIcon as={ArrowDown} />
                                    </TableSortingUpAndDownIconContainer>
                                  )}
                              </TableHeaderRowContainer>
                            ) : (
                              <TableHeaderRowContainer
                                center={+header.column.getCanSort()}
                              >
                                {" "}
                                {flexRender(
                                  header.column.columnDef.header,
                                  header.getContext()
                                )}
                              </TableHeaderRowContainer>
                            )}
                            {header.column.getCanFilter() ? (
                              <div>
                                <Filter
                                  column={header.column}
                                  table={table}
                                />
                              </div>
                            ) : null}
                          </StyledTableCell>
                        </>
                      );
                    })}
                  </TableRow>
                ))}
              </TableHead>
              <TableBody>
                {table.getRowModel().rows.map((row) => {
                  return (
                    <StyledTableRow
                      key={row.id}
                      className={`table-expanded-depth-${row.depth}`}
                    >
                      {row.getVisibleCells().map((cell) => {
                        return (
                          <StyledTableCell key={cell.id}>
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </StyledTableCell>
                        );
                      })}
                    </StyledTableRow>
                  );
                })}
              </TableBody>
              <TableFooter>
                {table.getFooterGroups().map((footerGroup) => (
                  <StyledTableRow key={footerGroup.id}>
                    {footerGroup.headers.map((header) => (
                      <StyledTableCell key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                            header.column.columnDef.footer,
                            header.getContext()
                          )}
                      </StyledTableCell>
                    ))}
                  </StyledTableRow>
                ))}
              </TableFooter>
            </TableCompo>
            <>
              <Stack sx={{ display: "flex", justifyContent: "flex-end" }}>
                <PaginationLayout>
                  <PaginationWithRowSelection
                    paginationProps={paginationProps}
                    table={table}
                  />
                </PaginationLayout>
              </Stack>
            </>
          </TableContainer>

          {/* <div>{table.getPrePaginationRowModel().rows.length} Rows</div>
      <div>
        <button onClick={() => rerender()}>Force Rerender</button>
      </div>
      <div>
        <button onClick={() => refreshData()}>Refresh Data</button>
      </div>
      <pre>{JSON.stringify(table.getState(), null, 2)}</pre> */}
        </div>
      </div>
    </div>
  );
}

function Filter({
  column,
  table,
}: {
  column: Column<any, unknown>;
  table: Table<any>;
}) {
  const firstValue = table
    .getPreFilteredRowModel()
    .flatRows[0]?.getValue(column.id);

  const columnFilterValue = column.getFilterValue();

  const sortedUniqueValues = React.useMemo(
    () =>
      typeof firstValue === "number"
        ? []
        : Array.from(column.getFacetedUniqueValues().keys()).sort(),
    [column.getFacetedUniqueValues()]
  );

  return typeof firstValue === "number" ? (
    <div style={{ marginTop: "10px" }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <DebouncedInput
            type="number"
            min={Number(column.getFacetedMinMaxValues()?.[0] ?? "")}
            max={Number(column.getFacetedMinMaxValues()?.[1] ?? "")}
            value={(columnFilterValue as [number, number])?.[0] ?? ""}
            onChange={(value) =>
              column.setFilterValue((old: [number, number]) => [
                value,
                old?.[1],
              ])
            }
            placeholder={`Min ${column.getFacetedMinMaxValues()?.[0]
              ? `(${column.getFacetedMinMaxValues()?.[0]})`
              : ""
              }`}
            className="w-24 border shadow rounded"
          />
        </div>
        <div style={{ marginLeft: "10px" }}>
          <DebouncedInput
            type="number"
            min={Number(column.getFacetedMinMaxValues()?.[0] ?? "")}
            max={Number(column.getFacetedMinMaxValues()?.[1] ?? "")}
            value={(columnFilterValue as [number, number])?.[1] ?? ""}
            onChange={(value) =>
              column.setFilterValue((old: [number, number]) => [
                old?.[0],
                value,
              ])
            }
            placeholder={`Max ${column.getFacetedMinMaxValues()?.[1]
              ? `(${column.getFacetedMinMaxValues()?.[1]})`
              : ""
              }`}
            className="w-24 border shadow rounded"
          />
        </div>
      </div>
      <div className="h-1" />
    </div>
  ) : (
    <div style={{ marginTop: "10px" }}>
      <datalist id={column.id + "list"}>
        {sortedUniqueValues.slice(0, 5000).map((value: any) => (
          <option value={value} key={value} />
        ))}
      </datalist>
      <DebouncedInput
        type="text"
        value={(columnFilterValue ?? "") as string}
        onChange={(value) => column.setFilterValue(value)}
        placeholder={`Search... (${column.getFacetedUniqueValues().size})`}
        className="w-36 border shadow rounded"
        list={column.id + "list"}
      />
      <div className="h-1" />
    </div>
  );
}

// A debounced input react component
function DebouncedInput({
  value: initialValue,
  onChange,
  debounce = 500,
  ...props
}: {
  value: string | number;
  onChange: (value: string | number) => void;
  debounce?: number;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange">) {
  const [value, setValue] = React.useState(initialValue);

  React.useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
    }, debounce);

    return () => clearTimeout(timeout);
  }, [value]);

  return (
    <input
      {...props}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      style={{ border: "1px solid black", borderRadius: "4px", padding: "8px" }}
    />
  );
}

function ColumnVisibilityComponentV1({ table }: any) {
  return (
    <Box sx={{ display: "flex" }}>
      <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
        <FormLabel component="legend">Columns</FormLabel>
        <FormGroup>
          {table
            .getAllLeafColumns()
            .map(
              (column: {
                id:
                | boolean
                | React.ReactElement<
                  any,
                  string | React.JSXElementConstructor<any>
                >
                | React.ReactFragment
                | React.Key
                | null
                | undefined;
                getIsVisible: () => any;
                getToggleVisibilityHandler: () => any;
              }) => {
                return (
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={column.getIsVisible()}
                        onChange={column.getToggleVisibilityHandler()}
                        name="gilad"
                      />
                    }
                    label={column.id}
                  />
                );
              }
            )}
        </FormGroup>
      </FormControl>
    </Box>
  );
}

function BasicPopover({ table }: any) {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div>
      <IconButton
        color="primary"
        aria-label=" Show/Hide Columns"
        onClick={handleClick}
      >
        <VisibilityOffIcon />
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <ColumnVisibilityComponentV1 table={table} />
      </Popover>
    </div>
  );
}
