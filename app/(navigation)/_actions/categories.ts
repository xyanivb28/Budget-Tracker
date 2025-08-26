"use server";

import prisma from "@/lib/prisma";
import {
  CreateCategorySchema,
  CreateCategorySchemaType,
  DeleteCategorySchema,
  DeleteCategorySchemaType,
} from "@/schema/categories";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export async function CreateCategory(form: CreateCategorySchemaType) {
  const parsedBody = CreateCategorySchema.safeParse(form);
  if (!parsedBody.success) {
    throw new Error("bad request");
  }

  const user = await currentUser();
  if (!user) {
    redirect("/sign-in");
  }

  const { name, icon, type } = parsedBody.data;

  return await prisma.category.create({
    data: {
      userId: user.id,
      name,
      icon,
      type,
    },
  });
}

export async function DeleteCategory(category: DeleteCategorySchemaType) {
  const user = await currentUser();
  if (!user) {
    redirect("/sign-in");
  }

  const parsedBody = DeleteCategorySchema.safeParse(category);
  if (!parsedBody.success) {
    throw new Error("bad request");
  }

  const { name, icon, type } = parsedBody.data;

  return await prisma.category.delete({
    where: {
      name_userId_type_icon: {
        userId: user.id,
        name,
        icon,
        type,
      },
    },
  });
}
