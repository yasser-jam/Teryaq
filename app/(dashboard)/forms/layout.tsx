'use client';

import BaseTitle from '@/components/base/title';
import { Button } from '@/components/ui/button';
import BaseTable from '@/components/base/table';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import ActionMenu from '@/components/base/action-menu';
import type { Form } from '@/types';
import { MoreVert } from 'iconoir-react';
import { ColumnDef } from '@tanstack/react-table';
import { useRouter } from 'next/navigation';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { successToast } from '@/lib/toast';

export default function FormsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const columns: ColumnDef<Form>[] = [
    {
      header: 'Form',
      accessorKey: 'name',
      cell: ({ row }) => {
        const form = row.original;
        return (
          <div className='flex items-center gap-3 w-[50vw]'>
            <Avatar>
              <AvatarFallback>
                {form.name.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className='font-medium'>{form.name}</div>
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
            onEdit={() => router.push(`/forms/${row.original.id}`)}
            onDelete={() => deleteForm(row.original.id.toString())}
          />
        </div>
      ),
    },
  ];

  const { data: forms } = useQuery({
    queryKey: ['forms-list'],
    queryFn: () => api('/Forms'),
  });

  const queryClient = useQueryClient();
  const { mutate: deleteForm } = useMutation({
    mutationFn: (id: string) => api(`/forms/${id}`, { method: 'DELETE' }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['forms-list'] });
      successToast('Form deleted successfully');
    },
  });

  return (
    <>
      <div className='space-y-6'>
        <div className='flex items-center justify-between'>
          <BaseTitle>Forms</BaseTitle>

          <Button
            className='ml-auto'
            onClick={() => router.replace('/forms/create')}
          >
            Add New Form
          </Button>
        </div>

        <BaseTable columns={columns} data={forms || []} />
      </div>

      {children}
    </>
  );
} 