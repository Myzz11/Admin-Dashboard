"use client";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { User } from "@/mock/UserData";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowUpDown, Router } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useMockData } from "@/components/Providers";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SelectContent, SelectItem } from "@radix-ui/react-select";

const createColumns = (
  data: User[],
  setData: React.Dispatch<React.SetStateAction<User[]>>
): ColumnDef<User>[] => [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      ></Checkbox>
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      ></Checkbox>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => <span>{row.getValue("id")}</span>,
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: "username",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        用户名 <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) => <span>{row.getValue("username")}</span>,
  },
  {
    accessorKey: "nickname",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        昵称 <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) => <span>{row.getValue("nickname")}</span>,
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        邮箱 <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) => <span>{row.getValue("email")}</span>,
  },
  {
    accessorKey: "role",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        角色 <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) => <span>{row.getValue("role")}</span>,
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        状态 <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) => <span>{row.getValue("status")}</span>,
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const router = useRouter();
      const id = row.getValue("id");
      return (
        <div className="flex gap-4">
          <Button onClick={() => router.push(`/user/${id}`)}>编辑</Button>
          <Button
            variant="secondary"
            onClick={() => setData(data.filter((user) => user.id !== id))}
          >
            删除
          </Button>
        </div>
      );
    },
  },
];

const UsersPage = () => {
  const router = useRouter();
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [rowSelection, setRowSelection] = useState<Record<number, boolean>>({});
  const [data, setData] = useMockData();

  const columns = createColumns(data, setData);

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      rowSelection,
    },
    initialState: {
      pagination: {
        pageSize: 14,
      },
    },
  });

  const handleDelete = () => {
    console.log(Object.keys(rowSelection));
    const selectIndex = Object.keys(rowSelection).map(Number);
    setData(data.filter((_, index) => !selectIndex.includes(index)));
  };

  return (
    <div className="flex-1 flex flex-col w-full gap-4">
      <div className="h-12 flex items-center justify-between">
        <div className="flex items-center justify-start gap-4">
          <Button onClick={() => router.push("/user")}>添加</Button>
          <Button variant="secondary" onClick={handleDelete}>
            删除
          </Button>
        </div>
        <Input
          placeholder="搜索"
          value={
            (table.getColumn("nickname")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn("nickname")?.setFilterValue(event.target.value)
          }
          className="w-[300px]"
        ></Input>
      </div>

      <div className="border rounded-md flex-1">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="text-center">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="text-center">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length}>No results</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex justify-end gap-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default UsersPage;
