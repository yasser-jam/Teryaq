'use client';

import BaseTitle from '@/components/base/title';
import { Button } from '@/components/ui/button';
import BaseTable from '@/components/base/table';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import ActionMenu from '@/components/base/action-menu';
import type { Category } from '@/types';
import { MoreVert } from 'iconoir-react';
import { ColumnDef } from '@tanstack/react-table';
import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { successToast } from '@/lib/toast';

export default function CategoriesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const columns: ColumnDef<Category>[] = [
    {
      header: 'Category',
      accessorKey: 'name',
      cell: ({ row }) => {
        const category = row.original;
        return (
          <div className='flex items-center gap-3 w-[50vw]'>
            <Avatar>
              <AvatarFallback>
                {category.name.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className='font-medium'>{category.name}</div>
            </div>
          </div>
        );
      },
    },
    {
      header: 'Actions',
      id: 'actions',
      cell: ({ row }) => (
        <div className='flex'>
          <ActionMenu
            toggler={
              <Button variant='ghost' size='icon'>
                <MoreVert />
              </Button>
            }
            editAction
            deleteAction
            onDelete={() => deleteCategory(row.original.id.toString())}
            onEdit={() => router.push(`/categories/${row.original.id}`)}
          />
        </div>
      ),
    },
  ];

  const { data: categories } = useQuery({
    queryKey: ['categories-list'],
    queryFn: () => api('/categories'),
  });

  const queryClient = useQueryClient();
  const { mutate: deleteCategory } = useMutation({
    mutationFn: (id: string) => api(`/categories/${id}`, { method: 'DELETE' }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories-list'] });
      successToast('Category deleted successfully');
    },
  });
  
  return (
    <>
      <div className='space-y-6'>
        <div className='flex items-center justify-between'>
          <BaseTitle>Categories</BaseTitle>

          <Button
            className='ml-auto'
            onClick={() => router.replace('/categories/create')}
          >
            Add New Category
          </Button>
        </div>

        <BaseTable columns={columns} data={categories || []} />
      </div>

      {children}
    </>
  );
}
