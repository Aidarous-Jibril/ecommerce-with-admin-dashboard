import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';

import prismadb from '@/lib/prismadb';

//create a billboard
export async function POST(req: Request, { params }: { params: { storeId: string } }) {
  try {
    const { userId } = auth();
    const body = await req.json();

    const { name, billboardId } = body;

    if (!userId) {
      return new NextResponse("Unathenticated", { status: 403 });
    }

    if (!name) {
      return new NextResponse("Category name is required", { status: 400 });
    }
    if (!billboardId) {
      return new NextResponse("Billboard id is required", { status: 400 });
    }

    //Get store by id
    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId
      }
    })
    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    //create billboard
    const category = await prismadb.category.create({
      data: {
        name,
        billboardId,
        storeId: params.storeId
      }
    });

    return NextResponse.json(category);
  } catch (error) {
    console.log('[CATEGORY_POST]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};


//Get all billboards
export async function GET(req: Request, { params }: { params: { storeId: string } }) {
  try {
    //Get all billboards belong to specific store
    const allCategories = await prismadb.category.findMany({
      where: {
        storeId: params.storeId
      }
    });

    return NextResponse.json(allCategories);
  } catch (error) {
    console.log('[CATEGORY_GET]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};