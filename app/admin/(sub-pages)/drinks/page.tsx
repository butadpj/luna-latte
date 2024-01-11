import { TabsContent } from "@/shared_components/ui/tabs";
// import { getAllUsers } from "@utils/users";
// import { DataTable as UsersTable } from "(pages)/admin/components/ui/data-table";
// import { columns } from "./components/Columns";

export const dynamic = "force-dynamic";

export default async function AdminDrinks() {
  // const users = await getAllUsers();

  return (
    <TabsContent value="drinks" className="pt-8">
      <div className="space-y-8">
        <h2>Drinks</h2>
        {/* <UsersTable columns={columns} data={users} /> */}
      </div>
    </TabsContent>
  );
}
