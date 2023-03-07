import { ChangeEvent, FC, useEffect, useRef, useState } from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';

import {
   Box,
   Button,
   capitalize,
   Card,
   CardActions,
   CardMedia,
   Checkbox,
   Chip,
   Divider,
   FormControl,
   FormControlLabel,
   FormGroup,
   FormLabel,
   Grid,
   Input,
   ListItem,
   Paper,
   Radio,
   RadioGroup,
   TextField,
} from '@mui/material';
import { DriveFileRenameOutline, SaveOutlined, UploadOutlined } from '@mui/icons-material';

import { AdminLayout } from '../../../components/layouts';
import { IProduct, IType } from '../../../interfaces';
import { dbProducts } from '../../../database';
import { viandasApi } from '../../../axiosApi';
import { Product } from '../../../models';

const validTypes: IType[] = [
   'chicken',
   'dairyfree',
   'glutenfree',
   'keto',
   'lowcalories',
   'lowcarbs',
   'lowsodium',
   'meat',
   'pasta',
   'seafood',
   'vegan',
   'vegetarian',
];

interface FormData {
   _id?: string;
   image: string;
   name: string;
   slug: string;
   price: number;
   inStock: boolean;
   type: IType[];
   ingredients: string[];
   nutritionalInfo: object;
   howToHeat: string;
}

interface Props {
   product: IProduct;
}

const ProductAdminPage: FC<Props> = ({ product }) => {
   const router = useRouter();
   const fileInputRef = useRef<HTMLInputElement>(null);
   const [newIngredientValue, setNewIngredientValue] = useState('');
   const [isSaving, setIsSaving] = useState(false);

   const {
      register,
      handleSubmit,
      formState: { errors },
      getValues,
      setValue,
      watch,
   } = useForm<FormData>({
      defaultValues: product,
   });

   useEffect(() => {
      const subscription = watch((value, { name, type }) => {
         if (name === 'name') {
            const newSlug =
               value.name?.trim().replaceAll(' ', '-').replaceAll("'", '').toLocaleLowerCase() ||
               '';

            setValue('slug', newSlug);
         }
      });

      return () => subscription.unsubscribe();
   }, [watch, setValue]);

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
      const newIngredient = newIngredientValue.trim().toLocaleLowerCase();
      setNewIngredientValue('');
      const currentTags = getValues('ingredients');

      if (currentTags.includes(newIngredient)) {
         return;
      }

      currentTags.push(newIngredient);
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
            setValue('image', [...getValues('image'), data.message], { shouldValidate: true });
         }
      } catch (error) {
         console.log({ error });
      }
   };

   const onDeleteImage = (image: string) => {
      setValue(
         'image',
         getValues('image').filter((img) => img !== image),
         { shouldValidate: true },
      );
   };

   const onSubmit = async (form: FormData) => {
      if (!form.image) return alert('Mínimo 1 imagen');

      setIsSaving(true);

      try {
         const { data } = await viandasApi({
            url: '/admin/products',
            method: form._id ? 'PUT' : 'POST', // si tenemos un _id, entonces actualizar, si no crear
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

   console.log(getValues('image'));
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
                  {/* Name */}
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

                     {/* How to heat? */}
                     <TextField
                        label='¿Cómo calentar?'
                        variant='filled'
                        fullWidth
                        multiline
                        sx={{ mb: 1 }}
                        {...register('howToHeat', {
                           required: 'Este campo es requerido',
                        })}
                        error={!!errors.howToHeat}
                        helperText={errors.howToHeat?.message}
                     />

                     {/* Price */}
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

                     {/* Inventary */}
                     <TextField
                        label='Inventario'
                        type='boolean'
                        variant='filled'
                        fullWidth
                        sx={{ mb: 1 }}
                        {...register('inStock', {
                           required: 'Este campo es requerido',
                        })}
                        error={!!errors.inStock}
                        helperText={errors.inStock?.message}
                     />

                     <Divider sx={{ my: 1 }} />

                     {/* Nutritional Info */}
                     <Grid container>
                        <FormLabel>Información nutricional</FormLabel>
                        {product.nutritionalInfo && (
                           <Grid item display='flex' justifyContent='center' xs={12} sm={12}>
                              {Object.entries(product.nutritionalInfo).map((option, index) => (
                                 <TextField
                                    key={index}
                                    type='text'
                                    variant='filled'
                                    label={option[0]}
                                    value={option[1]}
                                    fullWidth
                                    sx={{ mx: 0.5, mt: 1 }}
                                    //  {...register('nutritionalInfo', {
                                    //     required: 'Este campo es requerido',
                                    //  })}
                                    //  error={!!errors.nutritionalInfo}
                                    //  helperText={errors.nutritionalInfo?.message}
                                 />
                              ))}
                           </Grid>
                        )}
                     </Grid>

                     <Divider sx={{ my: 2 }} />

                     {/* Type */}
                     <FormLabel>Tipo de plato</FormLabel>
                     <FormGroup sx={{ mb: 1, flexDirection: 'row' }}>
                        {validTypes.map((type) => (
                           <FormControlLabel
                              key={type}
                              control={<Checkbox checked={getValues('type').includes(type)} />}
                              label={type}
                              onChange={() => onChangeType(type)}
                              sx={{ minWidth: 130 }}
                           />
                        ))}
                     </FormGroup>
                  </Grid>

                  {/* Slug */}
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

                     {/* Ingredients */}
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
                        sx={{
                           display: 'flex',
                           flexWrap: 'wrap',
                           listStyle: 'none',
                           p: 0,
                           m: 0,
                        }}
                        component='ul'>
                        {getValues('ingredients').map((tag) => {
                           return (
                              <Chip
                                 key={tag}
                                 label={tag}
                                 onDelete={() => onDeleteIngredient(tag)}
                                 color='primary'
                                 size='small'
                                 sx={{ ml: 1, mt: 1 }}
                              />
                           );
                        })}
                     </Box>

                     <Divider sx={{ my: 2 }} />

                     {/* Image */}
                     <Box display='flex' flexDirection='column'>
                        <FormLabel sx={{ mb: 1 }}>Imágenes</FormLabel>
                        <Button
                           color='secondary'
                           fullWidth
                           startIcon={<UploadOutlined />}
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
                           label='Es necesario al 2 imagenes'
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
                                    image={`/products/${getValues('image')}`}
                                    alt={getValues('name')}
                                 />
                                 <CardActions>
                                    <Button
                                       fullWidth
                                       color='error'
                                       // onClick={() => onDeleteImage(img)}
                                    >
                                       Borrar
                                    </Button>
                                 </CardActions>
                              </Card>
                           </Grid>
                        </Grid>

                        {/* <FormControl sx={{ mb: 1 }}>
                        <FormLabel>Tipo de plato</FormLabel>
                        <RadioGroup
                           row
                           value={getValues('type')}
                           onChange={({ target }) =>
                              setValue('type', target.value as IType, { shouldValidate: true })
                           }>
                           {validTypes.map((option) => (
                              <FormControlLabel
                                 key={option}
                                 value={option}
                                 control={<Radio color='secondary' />}
                                 label={capitalize(option)}
                                 sx={{ minWidth: 130 }}
                              />
                           ))}
                        </RadioGroup>
                     </FormControl> */}
                     </Box>
                  </Grid>
               </Grid>
            </Grid>
         </form>
      </AdminLayout>
   );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
   const { slug = '' } = query;

   let product: IProduct | null;

   if (slug === 'new') {
      // crear un producto
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
