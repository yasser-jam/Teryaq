'use client';
import BasePageDialog from '@/components/base/page-dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { BaseMultipleSelect } from '@/components/base/multiple-select';
import { BaseSelect } from '@/components/base/select';
import TypeSelect from '@/components/sys/type-select';
import FormSelect from '@/components/sys/form-select';
import ProductTypeSelect from '@/components/sys/product-type-select';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, use } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { MASTER_PRODUCT_SCHEMA } from '@/lib/schema';
import { masterProductDefaultValues } from '@/lib/init';
import ManufacturerSelect from '@/components/sys/manufacturer-select';
import CategoriesMultiSelect from '@/components/sys/categories-multi-select';
import { Textarea } from '@/components/ui/textarea';

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();

  type FormData = z.infer<typeof MASTER_PRODUCT_SCHEMA>;

  const form = useForm<FormData>({
    resolver: zodResolver(MASTER_PRODUCT_SCHEMA),
  });

  const { data: masterProduct } = useQuery({
    queryKey: ['master-product', id],
    queryFn: () => api(`/master_products/${id}`),
    enabled: id !== 'create',    
  });


  const queryClient = useQueryClient()

  const { mutate: create, isPending } = useMutation({
    mutationKey: ['master-product-create'],
    mutationFn: (data: any) => api('/master_products', {
      body: {
        ...data,
        formId: Number(data.formId),
        manufacturerId: Number(data.manufacturerId),
        refPurchasePrice: Number(data.refPurchasePrice),
        refSellingPrice: Number(data.refSellingPrice),
        typeId: Number(data.typeId),
        categories: undefined,
        categoryIds: data.categories,
        notes: data.notes,
        barcode: data.barcode,
        translations: {
          tradeName: data.tradeName,
          scientificName: data.scientificName,
          lang: 'ar'
        }
      },
      method: 'POST'
    }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['master-products-list'] })

      goBack()

    }
  })


  // Select data now handled in sys components

  useEffect(() => {
    if (masterProduct) {
      form.reset(masterProduct);
    }
  }, [masterProduct, form]);

  const goBack = () => {
    router.replace('/master-products');
  };

  const actions = <></>;

  const onSubmit = (data: FormData) => {
    create(data)
  };

  return (
    <>
      <BasePageDialog
        title='Master Product Details'
        subtitle='Fill Master Product Data'
        className='w-[1200px]'
        footer={actions}
        onOpenChange={goBack}
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className='grid grid-cols-2 items-center gap-4'>
              {/* Basic Product Information */}
              <div className='col-span-2'>
                <FormField
                  control={form.control}
                  name='tradeName'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Trade Name</FormLabel>
                      <FormControl>
                        <Input placeholder='Trade Name' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className='col-span-2'>
                <FormField
                  control={form.control}
                  name='scientificName'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Scientific Name</FormLabel>
                      <FormControl>
                        <Input placeholder='Scientific Name' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div>
                <FormField
                  control={form.control}
                  name='concentration'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Concentration</FormLabel>
                      <FormControl>
                        <Input placeholder='e.g. 500 mg' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div>
                <FormField
                  control={form.control}
                  name='size'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Size</FormLabel>
                      <FormControl>
                        <Input placeholder='e.g. 30 tablets' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className='col-span-2'>
                <FormField
                  control={form.control}
                  name='manufacturerId'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Manufacturer</FormLabel>
                      <FormControl>
                        <ManufacturerSelect second-value {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                ></FormField>
              </div>

              <div className=''>
                <FormField
                  control={form.control}
                  name='refPurchasePrice'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Reference Purchase Price</FormLabel>
                      <FormControl>
                        <Input
                          type='number'
                          step='0.01'
                          placeholder='0.00'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className=''>
                <FormField
                  control={form.control}
                  name='refSellingPrice'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Reference Selling Price</FormLabel>
                      <FormControl>
                        <Input
                          type='number'
                          step='0.01'
                          placeholder='0.00'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Categories */}
              <div className='col-span-2'>
                <FormField
                  control={form.control}
                  name='categories'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Categories</FormLabel>
                      <FormControl>
                        <CategoriesMultiSelect {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div>
                <FormField
                  control={form.control}
                  name='typeId'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Type</FormLabel>
                      <FormControl>
                        <TypeSelect {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div>
                <FormField
                  control={form.control}
                  name='formId'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Form</FormLabel>
                      <FormControl>
                        <FormSelect {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className='col-span-2'>
                <FormField
                  control={form.control}
                  name='tax'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tax</FormLabel>
                      <FormControl>
                        <Input
                          type='number'
                          step='0.01'
                          placeholder='0.00'
                          value={
                            Number.isFinite(field.value as any)
                              ? field.value
                              : 0
                          }
                          onChange={(e) =>
                            field.onChange(parseFloat(e) || 0)
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div>
                <FormField
                  control={form.control}
                  name='barcode'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Barcode</FormLabel>
                      <FormControl>
                        <Input placeholder='Barcode' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className='col-span-2'>
                <FormField
                  control={form.control}
                  name='notes'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Notes</FormLabel>
                      <FormControl>
                        <Textarea placeholder='Notes' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Prescription Required */}
              <div className='col-span-2'>
                <FormField
                  control={form.control}
                  name='requiresPrescription'
                  render={({ field }) => (
                    <FormItem className='flex flex-row items-start space-x-3 space-y-0'>
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className='space-y-1 leading-none'>
                        <FormLabel>Requires Prescription</FormLabel>
                      </div>
                    </FormItem>
                  )}
                />
              </div>

              <div className='col-span-2 flex items-center justify-end gap-2 mt-4'>
                <Button variant='ghost' onClick={goBack}>
                  Cancel
                </Button>
                <Button loading={isPending}>Save</Button>
              </div>
            </div>
          </form>
        </Form>
      </BasePageDialog>
    </>
  );
}
