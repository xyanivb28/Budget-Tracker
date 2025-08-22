export default function data-table-toolbar() {
    return (
        <div className="flex flex-col md:flex-row items-start md:items-center md:justify-between py-4 gap-2">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-2">
          <Input
            placeholder="Filter transactions..."
            value={
              (table.getColumn("description")?.getFilterValue() as string) ?? ""
            }
            onChange={(event) =>
              table.getColumn("description")?.setFilterValue(event.target.value)
            }
            className="w-64"
          />
          {table.getColumn("type") && (
            <DataTableFacetedFilter
              column={table.getColumn("type")}
              title="Type"
              options={TransactionTypes}
            />
          )}
        </div>
        <div className="flex flex-col md:flex-row justify-center gap-2">
          <DataTableViewOptions table={table} />
          <CreateTransactionDialog
            trigger={
              <Button
                size={"sm"}
                className="border border-emerald-500 bg-emerald-950 text-white hover:bg-emerald-700 cursor-pointer"
              >
                Add Income
              </Button>
            }
            type={"income"}
          />
          <CreateTransactionDialog
            trigger={
              <Button
                size={"sm"}
                className="border border-rose-500 bg-rose-950 text-white hover:bg-rose-700 cursor-pointer"
              >
                Add Expense
              </Button>
            }
            type={"expense"}
          />
        </div>
      </div>
    )
}