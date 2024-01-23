import { getUserById } from "@/lib/queries/users";

export async function GET(req: Request, { params }: any) {
  const user = await getUserById(params.id);

  if (user)
    return Response.json(user, {
      status: 200,
    });

  return Response.json(null, {
    status: 404,
  });
}

// export async function PATCH(req) {
//   const formData = await req.formData();
//   if (formData) {
//     const user_id = formData.get("user_id");
//     const email = formData.get("email");
//     const first_name = formData.get("first_name");
//     const last_name = formData.get("last_name");
//     const mobile_number = formData.get("mobile_number").replace(/\s/g, "");

//     const complete_address = formData.get("complete_address");
//     const city = formData.get("city");
//     const province = formData.get("province");
//     const postal_code = formData.get("postal_code");

//     const newUserInfo = {
//       first_name,
//       last_name,
//       mobile_number,
//       email,
//     };

//     const newDeliveryAddress = {
//       complete_address,
//       city: "Marikina",
//       province: "Rizal",
//       postal_code: "1800",
//     };

//     try {
//       const user = await updateUserInfo(user_id, {
//         ...newUserInfo,
//         ...newDeliveryAddress,
//       });
//       return NextResponse.json(user);
//     } catch (error) {
//       throw error;
//     }
//   }
// }
