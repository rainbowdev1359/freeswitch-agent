import {
  PaginationState,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useState, useRef, useEffect } from "react";
import { useDrag, useDrop, DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import "./table.css";
import styled from "styled-components";
import { RowSelection } from "../../types/types";
import { make_call, make_call_es } from '../../utils/make_call';
import { useTranslation } from 'react-i18next';
import { DateButton } from "../StyleComponents";

const Th = styled.th<{ $width?: number; theme: string, color?: string }>`
  width: ${(props) => (props.$width ? `${props.$width}%` : "fit-content")};
  min-width: 100px;
  background-color: ${(props) => (props.theme === "light" ? "#E5ECEE" : `${props.color}`)};
  color: ${(props) => (props.theme === "light" ? "#27798b" : "")};
`;

const PaginationButton = styled.button<{ $active?: boolean, theme: string }>`
  padding: 8px;
  background-color: ${(props) => (props.$active ? (props.theme == "light" ? "#C9D5D8" : "#1f6b7a") : "transparent")};
  border: none;
  width: 40px;
  min-width: fit-content;
  color: ${(props) => (props.theme === "light" ? "#27798b" : " #c9d5d8")};
  border-radius: 12px;
  gap: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  gap: 10px;
  margin-top: 16px;
`;

const TableContainer = styled.div<{ $maxwidth?: number }>`
  width: 100%;
  flex-grow: 1;
  height: 100%;
  min-width: ${(props) => (props.$maxwidth ? `${props.$maxwidth}px` : "800px")};
`;

const Td = styled.tr<{ theme: string }>`
  color: ${(props) => (props.theme === "light" ? "#27798b" : "white")};
`;

const DraggableRow = ({ row, index, moveRow }: any) => {
  const dragRef = useRef(null)

  const [, drop] = useDrop({
    accept: "row",
    hover(item: any) {
      if (!dragRef.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      moveRow(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag, preview] = useDrag({
    type: "row",
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  preview(drop(dragRef))
  drag(dragRef)

  return (
    <Td
      ref={dragRef}
      style={{ opacity: isDragging ? 0.2 : 1 }}
      key={row.id}
      theme={row.original.theme}
    >
      {row.getVisibleCells().map((cell: any) => (
        <td style={{ backgroundColor: row.original.backgroundColor }} className="py-2" key={cell.id}>
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </td>
      ))}
    </Td>
  );
};

function DraggableTable({
  backgroundColor,
  headerColor,
  radius,
  columns,
  data,
  maxWidth,
  pageSize = 10,
  hidePagination,
  hideCheckbox,
  theme,
}: {
  headerColor?: string;
  backgroundColor?: string;
  radius?: string;
  columns: any;
  hideCheckbox?: boolean,
  data: any;
  maxWidth?: number;
  pageSize?: number;
  hidePagination?: boolean;
  theme: string;
}) {
  const { t } = useTranslation();
  const [pagination, setPagination] = useState<PaginationState>({ pageIndex: 0, pageSize: pageSize, });
  const [rowSelection, setRowSelection] = useState<RowSelection>({});
  const [rowEsSelection, setRowEsSelection] = useState<RowSelection>({});
  const [tableData, setTableData] = useState(data);

  // @ts-ignore
  const handleRowSelection = async (row) => {
    const rowId = row.id
    const name = row.original.contact
    const phone = row.original.Number
    const updatedRowSelection = { ...rowSelection };
    updatedRowSelection[rowId] = !updatedRowSelection[rowId];
    setRowSelection(updatedRowSelection);
    if (updatedRowSelection[rowId]) {
      const response = await make_call(phone, name)
      console.log(response)
    }
  };

  // @ts-ignore
  const handleESRowSelection = async (row) => {
    const rowId = row.id
    const name = row.original.contact
    const phone = row.original.Number
    const updatedRowEsSelection = { ...rowEsSelection };
    updatedRowEsSelection[rowId] = !updatedRowEsSelection[rowId];
    setRowEsSelection(updatedRowEsSelection);
    if (updatedRowEsSelection[rowId]) {
      const response = await make_call_es(phone, name)
      console.log(response)
    }
  };

  const toggleAllRows = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedRowSelection: RowSelection = {};
    table.getRowModel().rows.forEach((row) => { updatedRowSelection[row.id] = e.target.checked; });
    setRowSelection(updatedRowSelection);
  };

  const moveRow = (dragIndex: number, hoverIndex: number) => {
    setTableData((prevTableData: any) => {
      const newData = [...prevTableData];
      const [removed] = newData.splice(dragIndex, 1);
      newData.splice(hoverIndex, 0, removed);
      console.log("dragIndex======", dragIndex);
      console.log("hoverIndex======", hoverIndex);
      return newData;
    });
  };

  useEffect(() => {
    console.log("Updated tableData======", tableData);
  }, [tableData]);

  const table = useReactTable({
    data: tableData,
    columns,
    onPaginationChange: setPagination,
    getPaginationRowModel: getPaginationRowModel(),
    rowCount: data?.length,
    enableRowSelection: true,
    onRowSelectionChange: () => { console.log("row selected") },
    state: {
      rowSelection,
      pagination,
    },
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <DndProvider backend={HTML5Backend}>
      <TableContainer style={
        {
          backgroundColor: backgroundColor,
          borderRadius: radius,
        }
      } $maxwidth={maxWidth} className="p-2  ">
        <table>
          <thead >
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {!hideCheckbox && <Th theme={theme} className="first-thead">
                  <input
                    type="checkbox"
                    onChange={toggleAllRows}
                  />
                </Th>}
                {headerGroup.headers.map((header, index) => (
                  <Th
                    color={headerColor}
                    theme={theme}
                    $width={100 / headerGroup.headers.length + 1}
                    className={`${hideCheckbox && index == 0 ? "first-thead" : ""}  ${index == headerGroup.headers.length - 1 ? "last-thead" : ""
                      }`}
                    key={header.id}
                  >
                    {header.isPlaceholder
                      ? null
                      : (
                        <>

                          {flexRender(header.column.columnDef.header, header.getContext())}
                        </>
                      )
                    }
                  </Th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row, index) => (
              <DraggableRow key={row.id} row={row} index={index} moveRow={moveRow} />
            ))}

            <Td>
              <td></td>
              <td>
                <div className="d-flex align-items-center justify-content-center">
                  <DateButton textcolor='#000000' color='#A1D9FC'>Choose</DateButton>
                </div>
              </td>
              <td>
                <div className="d-flex align-items-center justify-content-center">
                  <DateButton textcolor='#FAFAFA' color='#4094D2'>Choose</DateButton>
                </div>
              </td>
              <td>
                <div className="d-flex align-items-center justify-content-center">
                  <DateButton textcolor='#FAFAFA' color='#0673DC'>Choose</DateButton>
                </div>
              </td>
              <td>
                <div className="d-flex align-items-center justify-content-center">
                  <DateButton textcolor='#FAFAFA' color='#27798b'>Choose</DateButton>
                </div>
              </td>
            </Td>
          </tbody>
        </table>
        {!hidePagination && (
          <PaginationContainer>
            <PaginationButton theme={theme}
              $active
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <img src="/prev.svg" alt="" />
              {t("Previous")}
            </PaginationButton>

            {Array.from({ length: table.getPageCount() }, (_, index) => (
              <PaginationButton
                theme={theme}
                key={index}
                $active={
                  table.getState().pagination.pageIndex != 0
                    ? table.getState().pagination.pageIndex == index
                    : index == 0
                }
                onClick={() => table.setPageIndex(index)}
              >
                <p className="m-0 text-center">{index + 1}</p>
              </PaginationButton>
            ))}
            <PaginationButton
              theme={theme}
              $active
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              {t("Next")}
              <img src="/next.svg" alt="" />
            </PaginationButton>
          </PaginationContainer>
        )}
      </TableContainer>
    </DndProvider>
  );
}

export default DraggableTable;
