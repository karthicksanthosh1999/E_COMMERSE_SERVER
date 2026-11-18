import { prisma } from "../../db/prisma";
import { Prisma } from "../../generated/prisma/client";
import {
  CreateCategoryAttributeDto,
  UpdateCategoryAttributeDto,
} from "./dto/categoryAttribute.dto";

export class CategoryAttributeRepository {

  public create = async (data: CreateCategoryAttributeDto) => {
    return await prisma.categoryAttribute.create({
      data: {
        categoryId: data.categoryId,
        key: data.key,
        label: data.label,
        type: data.type,
        scope: data.scope,
        isRequired: data.isRequired,
        options: data.options === null ? Prisma.DbNull : data.options,
        position: data.position,
        isActive: data.isActive,
      },
    });
  };

  public findByCategoryId = async (categoryId: string) => {
    return await prisma.categoryAttribute.findMany({
      where: { categoryId, isActive: true },
      orderBy: { position: "asc" },
    });
  };

  public findById = async (id: string) => {
    return await prisma.categoryAttribute.findUnique({
      where: { id },
    });
  };

  public update = async ( id: string, data: UpdateCategoryAttributeDto ) => {
    return await prisma.categoryAttribute.update({ where: { id }, data : { ...data, options } });
  };

  public delete = async (id: string) => {
    return await prisma.categoryAttribute.delete({ where: { id }});
  };

  public findCategoryById = async (categoryId: string) => {
    return await prisma.category.findUnique({
        where: {
        id: categoryId,
        },
        select: {
        id: true,
        name: true,
        isActive: true,
        },
    });
    };

    public findByCategoryAndKey = async (
    categoryId: string,
    key: string
    ) => {
    return await prisma.categoryAttribute.findUnique({
        where: {
        categoryId_key: {
            categoryId,
            key,
        },
        },
    });
    };
}