import { ChangeEvent, FC, useEffect, useRef, useState } from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';

import {
   Autocomplete,
   Box,
   Button,
   Card,
   CardActions,
   CardMedia,
   Checkbox,
   Chip,
   Divider,
   FormControlLabel,
   FormGroup,
   FormLabel,
   Grid,
   TextField,
   Typography,
} from '@mui/material';
import { DriveFileRenameOutline, SaveOutlined, UploadOutlined } from '@mui/icons-material';

import { AdminLayout } from '../../../components/layouts';
import { IProduct, IProductInPack, IType } from '../../../interfaces';
import { dbProducts } from '../../../database';
import { viandasApi } from '../../../axiosApi';
import { Product } from '../../../models';

const validTypes: IType[] = [
   'Bajo en calorías',
   'Bajo en carbo',
   'Bajo en sodio',
   'Carne',
   'Empanada',
   'Wrap',
   'Keto',
   'Libre de glúten',
   'Libre de lácteos',
   'Pasta',
   'Pescado',
   'Pollo',
   'Tarta',
   'Vegano',
   'Vegetariano',
   'Waffles',
   'Budines',
   'Packs',
];

interface FormData {
   _id?: string;
   image: string;
   name: string;
   slug: string;
   price: number;
   discountPrice?: number;
   inStock: boolean;
   type: IType[];
   ingredients: string[];
   nutritionalInfo: { [key: string]: string };
   howToHeat: string;
   productsInPack?: IProductInPack[];
}

interface Props {
   product: IProduct;
}

const ProductAdminPage: FC<Props> = ({ product }) => {
   const router = useRouter();
   const fileInputRef = useRef<HTMLInputElement>(null);
   const [newIngredientValue, setNewIngredientValue] = useState('');
   const [isSaving, setIsSaving] = useState(false);
   // This state is used by the Autocomplete selector
   const [selectedProducts, setSelectedProducts] = useState<IProduct[]>([]);

   const {
      register,
      handleSubmit,
      formState: { errors },
      getValues,
      setValue,
      watch,
   } = useForm<FormData>({
      defaultValues: {
         ...product,
         productsInPack: product.productsInPack || [],
      },
   });

   useEffect(() => {
      const subscription = watch((value, { name, type }) => {
         if (name === 'name') {
            const newSlug =
               value.name?.trim().replaceAll(' ', '-').replaceAll("'", '').toLocaleLowerCase() || '';

            setValue('slug', newSlug);
         }
      });

      return () => subscription.unsubscribe();
   }, [watch, setValue]);

   const onChangeNutritionalInfo = (nameToUpdate: string, newValue: string) => {
      const updatedNutritionalInfo = Object.entries(getValues('nutritionalInfo')).reduce(
         (acc: { [key: string]: string }, [name, value]) => {
            if (nameToUpdate === name) {
               acc[nameToUpdate] = newValue;
            } else {
               acc[name] = value;
            }
            return acc;
         },
         {},
      );

      setValue('nutritionalInfo', updatedNutritionalInfo, { shouldValidate: true });
   };

   const onChangeType = (type: IType) => {
      const currentTypes = getValues('type');
      if (currentTypes.includes(type)) {
         return setValue(
            'type',
            currentTypes.filter((t) => t !== type),
            { shouldValidate: true },
         );
      }
      setValue('type', [...currentTypes, type], { shouldValidate: true });
   };

   const onNewIngredient = () => {
      const newIngredient =
         newIngredientValue.trim().charAt(0).toUpperCase() +
         newIngredientValue.slice(1).toLocaleLowerCase();

      setNewIngredientValue('');
      const currentTags = getValues('ingredients');

      if (currentTags.includes(newIngredient)) {
         return;
      }

      currentTags.push(newIngredient);
      currentTags.sort();
   };

   const onDeleteIngredient = (tag: string) => {
      const updatedIngredients = getValues('ingredients').filter((t) => t !== tag);
      setValue('ingredients', updatedIngredients, { shouldValidate: true });
   };

   const onFilesSelected = async ({ target }: ChangeEvent<HTMLInputElement>) => {
      if (!target.files || target.files.length === 0) {
         return;
      }

      try {
         for (const file of target.files) {
            const formData = new FormData();
            formData.append('file', file);
            const { data } = await viandasApi.post<{ message: string }>('/admin/upload', formData);
            setValue('image', data.message, { shouldValidate: true });
         }
      } catch (error) {
         console.log({ error });
      }
   };

   const onDeleteImage = () => {
      setValue('image', '', { shouldValidate: true });
   };

   // Handler to add a product to the pack. If already present, increments the quantity.
   const handleAddProductToPack = (selectedProduct: IProduct) => {
      const currentProducts = (getValues('productsInPack') as IProductInPack[]) || [];
      const existingItem = currentProducts.find((item) => item.product._id === selectedProduct._id);
      if (existingItem) {
         const updatedProducts = currentProducts.map((item) =>
            item.product._id === selectedProduct._id ? { ...item, quantity: item.quantity + 1 } : item,
         );
         setValue('productsInPack', updatedProducts, { shouldValidate: true });
      } else {
         setValue('productsInPack', [...currentProducts, { product: selectedProduct, quantity: 1 }], {
            shouldValidate: true,
         });
      }
   };

   // Handler to remove a product from the pack
   const handleRemoveProduct = (productId: string) => {
      const currentProducts = (getValues('productsInPack') as IProductInPack[]) || [];
      const updatedProducts = currentProducts.filter((item) => item.product._id !== productId);
      setValue('productsInPack', updatedProducts, { shouldValidate: true });
   };

   const onSubmit = async (form: FormData) => {
      if (!form.image) return alert('Mínimo 1 imagen');
      setIsSaving(true);
      try {
         const { data } = await viandasApi({
            url: '/admin/products',
            method: form._id ? 'PUT' : 'POST',
            data: form,
         });
         if (!form._id) {
            router.replace(`/admin/products/${form.slug}`);
         } else {
            setIsSaving(false);
         }
      } catch (error) {
         console.log(error);
         setIsSaving(false);
      }
   };

   return (
      <AdminLayout
         title={'Producto'}
         subTitle={`Editando: ${product.name}`}
         icon={<DriveFileRenameOutline />}>
         <form onSubmit={handleSubmit(onSubmit)}>
            <Grid
               container
               className='fadeIn'
               display='flex'
               justifyContent='end'
               sx={{ width: '90%', margin: 'auto', mt: 5 }}>
               <Box sx={{ mb: 2 }}>
                  <Button
                     color='secondary'
                     startIcon={<SaveOutlined sx={{ color: 'white' }} />}
                     sx={{ width: '150px' }}
                     type='submit'
                     disabled={isSaving}>
                     Guardar
                  </Button>
               </Box>

               <Grid container spacing={2}>
                  {/* Left Column */}
                  <Grid item xs={12} sm={6}>
                     <TextField
                        label='Nombre'
                        variant='filled'
                        fullWidth
                        sx={{ mb: 1 }}
                        {...register('name', {
                           required: 'Este campo es requerido',
                           minLength: { value: 2, message: 'Mínimo 2 caracteres' },
                        })}
                        error={!!errors.name}
                        helperText={errors.name?.message}
                     />

                     <TextField
                        label='¿Cómo calentar?'
                        variant='filled'
                        fullWidth
                        multiline
                        sx={{ mb: 1 }}
                        {...register('howToHeat', { required: 'Este campo es requerido' })}
                        error={!!errors.howToHeat}
                        helperText={errors.howToHeat?.message}
                     />

                     <TextField
                        label='Precio'
                        type='number'
                        variant='filled'
                        fullWidth
                        sx={{ mb: 1 }}
                        {...register('price', {
                           required: 'Este campo es requerido',
                           min: { value: 0, message: 'Mínimo de valor cero' },
                        })}
                        error={!!errors.price}
                        helperText={errors.price?.message}
                     />

                     <TextField
                        label='Precio Descuento'
                        type='number'
                        variant='filled'
                        fullWidth
                        sx={{ mb: 1 }}
                        {...register('discountPrice', {
                           min: { value: 0, message: 'Mínimo de valor cero' },
                        })}
                        error={!!errors.discountPrice}
                        helperText={errors.discountPrice?.message}
                     />

                     <TextField
                        label='Inventario'
                        type='boolean'
                        variant='filled'
                        fullWidth
                        sx={{ mb: 1 }}
                        {...register('inStock', { required: 'Este campo es requerido' })}
                        error={!!errors.inStock}
                        helperText={errors.inStock?.message}
                     />

                     <Divider sx={{ my: 1 }} />

                     <Grid container>
                        <FormLabel>Información nutricional</FormLabel>
                        <Grid item display='flex' justifyContent='center' xs={12} sm={12}>
                           {Object.entries(getValues('nutritionalInfo')).map((option, index) => (
                              <TextField
                                 key={index}
                                 type='text'
                                 variant='filled'
                                 label={option[0]}
                                 value={option[1]}
                                 onChange={(e) => onChangeNutritionalInfo(option[0], e.target.value)}
                                 sx={{ mx: 0.5, mt: 1 }}
                                 fullWidth
                              />
                           ))}
                        </Grid>
                     </Grid>

                     <Divider sx={{ my: 2 }} />

                     <FormLabel>Tipo de plato</FormLabel>
                     <FormGroup sx={{ mb: 1, flexDirection: 'row' }}>
                        {validTypes.map((type) => (
                           <FormControlLabel
                              key={type}
                              control={<Checkbox checked={getValues('type').includes(type)} />}
                              label={type}
                              onChange={() => onChangeType(type)}
                              sx={{ minWidth: 165 }}
                           />
                        ))}
                     </FormGroup>
                  </Grid>

                  {/* Right Column */}
                  <Grid item xs={12} sm={6}>
                     <TextField
                        label='Slug - URL'
                        variant='filled'
                        fullWidth
                        sx={{ mb: 1 }}
                        {...register('slug', {
                           required: 'Este campo es requerido',
                           validate: (val) =>
                              val.trim().includes(' ')
                                 ? 'No puede tener espacios en blanco'
                                 : undefined,
                        })}
                        error={!!errors.slug}
                        helperText={errors.slug?.message}
                     />

                     <TextField
                        label='Ingredientes'
                        variant='filled'
                        fullWidth
                        sx={{ mb: 1 }}
                        helperText='Presioná [Enter] para agregar'
                        value={newIngredientValue}
                        onChange={({ target }) => setNewIngredientValue(target.value)}
                        onKeyUp={({ code }) => (code === 'Enter' ? onNewIngredient() : undefined)}
                     />
                     <Box
                        sx={{ display: 'flex', flexWrap: 'wrap', listStyle: 'none', p: 0, m: 0 }}
                        component='ul'>
                        {getValues('ingredients').map((tag) => (
                           <Chip
                              key={tag}
                              label={tag}
                              onDelete={() => onDeleteIngredient(tag)}
                              color='primary'
                              size='small'
                              sx={{ ml: 1, mt: 1, '& .MuiChip-label': { color: 'white' } }}
                           />
                        ))}
                     </Box>

                     <Divider sx={{ my: 2 }} />

                     <Box display='flex' flexDirection='column'>
                        <FormLabel sx={{ mb: 1 }}>Imágenes</FormLabel>
                        <Button
                           color='secondary'
                           fullWidth
                           startIcon={<UploadOutlined sx={{ color: 'white' }} />}
                           sx={{ mb: 3 }}
                           onClick={() => fileInputRef.current?.click()}>
                           Cargar imagen
                        </Button>
                        <input
                           ref={fileInputRef}
                           type='file'
                           multiple
                           accept='image/png, image/gif, image/jpeg'
                           style={{ display: 'none' }}
                           onChange={onFilesSelected}
                        />

                        <Chip
                           label='Es necesario 1 imágen'
                           color='error'
                           variant='outlined'
                           sx={{ display: getValues('image').length < 1 ? 'flex' : 'none' }}
                        />

                        <Grid container spacing={2}>
                           <Grid item xs={4} sm={3}>
                              <Card>
                                 <CardMedia
                                    component='img'
                                    className='fadeIn'
                                    image={getValues('image')}
                                    alt={getValues('name')}
                                 />
                                 <CardActions>
                                    <Button fullWidth color='error' onClick={() => onDeleteImage()}>
                                       Borrar
                                    </Button>
                                 </CardActions>
                              </Card>
                           </Grid>
                        </Grid>
                     </Box>
                  </Grid>
               </Grid>
            </Grid>

            {/* Selected Products List */}
            <Box sx={{ mt: 4 }}>
               <FormLabel>Productos seleccionados</FormLabel>
               {((getValues('productsInPack') as IProductInPack[]) || []).length === 0 ? (
                  <Typography variant='body1'>No hay productos seleccionados.</Typography>
               ) : (
                  (getValues('productsInPack') as IProductInPack[]).map((item) => (
                     <Box
                        key={item.product._id}
                        sx={{
                           display: 'flex',
                           alignItems: 'center',
                           justifyContent: 'space-between',
                           border: '1px solid #ccc',
                           borderRadius: '4px',
                           p: 1,
                           mb: 1,
                        }}>
                        <Typography variant='body1'>{item.product.name}</Typography>
                        <Typography variant='body1'>Cantidad: {item.quantity}</Typography>
                        <Button
                           variant='contained'
                           color='error'
                           onClick={() => handleRemoveProduct(item.product._id)}>
                           Eliminar
                        </Button>
                     </Box>
                  ))
               )}
            </Box>

            {/* Pack Products Selector */}
            <Box sx={{ mt: 4 }}>
               <FormLabel>Agregar productos al pack</FormLabel>
               <PackProductsSelector
                  selectedProducts={selectedProducts}
                  onChange={handleAddProductToPack}
               />
            </Box>
         </form>
      </AdminLayout>
   );
};

interface PackProductsSelectorProps {
   selectedProducts: IProduct[];
   onChange: (product: IProduct) => void;
}

const PackProductsSelector: FC<PackProductsSelectorProps> = ({ selectedProducts, onChange }) => {
   const [allProducts, setAllProducts] = useState<IProduct[]>([]);

   useEffect(() => {
      const fetchProducts = async () => {
         try {
            // Endpoint returning all products for selection.
            const { data } = await viandasApi.get<IProduct[]>('/admin/products');
            setAllProducts(data);
         } catch (error) {
            console.error('Error fetching products', error);
         }
      };
      fetchProducts();
   }, []);

   const handleChange = (event: any, newValue: IProduct[]) => {
      // Allow duplicates so that each selection triggers adding the product.
      newValue.forEach((product) => {
         onChange(product);
      });
   };

   const handleDelete = (productId: string) => {
      // Optionally remove a product from selectedProducts (if needed).
      const filtered = selectedProducts.filter((p) => p._id !== productId);
      filtered.forEach((product) => onChange(product));
   };

   return (
      <>
         <Autocomplete
            multiple
            options={allProducts}
            getOptionLabel={(option) => option.name}
            value={selectedProducts}
            onChange={handleChange}
            renderInput={(params) => (
               <TextField {...params} label='Selecciona productos' placeholder='Productos' />
            )}
         />
         <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
            {selectedProducts.map((product) => (
               <Chip
                  key={product._id}
                  label={product.name}
                  onDelete={() => handleDelete(product._id)}
               />
            ))}
         </Box>
      </>
   );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
   const { slug = '' } = query;
   let product: IProduct | null;
   if (slug === 'new') {
      // Crear un nuevo producto
      const tempProduct = JSON.parse(JSON.stringify(new Product()));
      delete tempProduct._id;
      tempProduct.image = 'img-temp.jpg';
      product = tempProduct;
   } else {
      product = await dbProducts.getProductBySlug(slug.toString());
   }
   if (!product) {
      return {
         redirect: {
            destination: '/admin/products',
            permanent: false,
         },
      };
   }
   return {
      props: {
         product,
      },
   };
};

export default ProductAdminPage;
