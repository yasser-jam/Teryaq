'use client';

import BaseTitle from '@/components/base/title';
import { Button } from '@/components/ui/button';
import BaseTable from '@/components/base/table';
import { Badge } from '@/components/ui/badge';
import { BadgeGroup } from '@/components/ui/badge-group';
import ActionMenu from '@/components/base/action-menu';
import { BaseMultipleSelect } from '@/components/base/multiple-select';
import type { MasterProduct } from '@/types';
import { MoreVert } from 'iconoir-react';

import { ColumnDef } from '@tanstack/react-table';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';

export default function MasterProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const columns: ColumnDef<MasterProduct>[] = [
    {
      header: 'Product',
      accessorKey: 'tradeName',
      cell: ({ row }) => {
        const product = row.original;
        return (
          <div className='flex flex-col gap-1'>
            <div className='font-medium'>{product.tradeName}</div>
            <div className='text-xs text-muted-foreground'>
              {product.scientificName}
            </div>
          </div>
        );
      },
    },
    {
      header: 'Manufacturer',
      accessorKey: 'manufacturer',
    },
    {
      header: 'Price',
      accessorKey: 'refSellingPrice',
      cell: ({ row }) => {
        const price = row.original.refSellingPrice;
        return <span className='font-medium'>${price.toFixed(2)}</span>;
      },
    },
    {
      header: 'Categories',
      accessorKey: 'categories',
      cell: ({ row }) => {
        const categories = row.original.categories;
        return (
          <BadgeGroup 
            items={categories} 
            maxVisible={2}
            emptyText="No categories"
          />
        );
      },
    },
    {
      header: 'Prescription Required',
      accessorKey: 'requiresPrescription',
      cell: ({ row }) => {
        const requiresPrescription = row.original.requiresPrescription;
        return (
          <Badge 
            variant={requiresPrescription ? 'destructive' : 'secondary'}
            className='text-xs'
          >
            {requiresPrescription ? 'Required' : 'Not Required'}
          </Badge>
        );
      },
    },
    {
      header: 'Actions',
      id: 'actions',
      cell: ({ row }) => (
        <ActionMenu
          toggler={
            <Button variant='ghost' size='icon'>
              <MoreVert />
            </Button>
          }
          editAction
          deleteAction
          onEdit={() => router.push(`/master-products/${row.original.id}`)}
        />
      ),
    },
  ];

  const { data: masterProducts } = useQuery({
    queryKey: ['master-products-list'],
    queryFn: () => api('/master_products'),
  });

  return (
    <>
      <div className='space-y-6'>
        <div className='flex items-center justify-between'>
          <BaseTitle>Master Products</BaseTitle>

          <Button
            className='ml-auto'
            onClick={() => router.replace('/master-products/create')}
          >
            Add New Product
          </Button>
        </div>

        <BaseTable columns={columns} data={masterProducts?.content || []} />
      </div>

      {children}
    </>
  );
} 