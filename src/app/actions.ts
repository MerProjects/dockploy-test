'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function getTasks() {
    return await prisma.task.findMany({
        orderBy: { createdAt: 'desc' },
    });
}

export async function createTask(formData: FormData) {
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;

    if (!title) {
        throw new Error('Title is required');
    }

    await prisma.task.create({
        data: {
            title,
            description,
            status: 'TODO',
        },
    });

    revalidatePath('/');
}

export async function updateTask(id: string, formData: FormData) {
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const status = formData.get('status') as string;

    if (!title) {
        throw new Error('Title is required');
    }

    await prisma.task.update({
        where: { id },
        data: {
            title,
            description,
            status,
        },
    });

    revalidatePath('/');
}

export async function updateTaskStatus(id: string, status: string) {
    await prisma.task.update({
        where: { id },
        data: { status },
    });

    revalidatePath('/');
}

export async function deleteTask(id: string) {
    await prisma.task.delete({
        where: { id },
    });

    revalidatePath('/');
}
