import React, { ChangeEvent, FC, useRef, useState } from 'react'
import { GetServerSideProps } from 'next'
import { AdminLayout } from '../../../components/layouts'
import { IProduct, ISize, IType } from '../../../interfaces';
import { DriveFileRenameOutline, SaveOutlined, UploadOutlined } from '@mui/icons-material';
import { dbProducts } from '../../../database';
import { Box, Button, capitalize, Card, CardActions, CardMedia, Checkbox, Chip, Divider, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, ListItem, Paper, Radio, RadioGroup, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { tesloApi } from '../../../api';
import { Product } from '../../../models';
import { useRouter } from 'next/router';



const validTypes  = ['shirts','pants','hoodies','hats']
const validGender = ['men','women','kid','unisex']
const validSizes = ['XS','S','M','L','XL','XXL','XXXL']




interface FormData {
    _id?       : string;
    description: string;
    images     : string[];
    inStock    : number;
    price      : number;
    sizes      : string[];
    slug       : string;
    tags       : string[];
    title      : string;
    type       : string;
    gender     : string;
}

interface Props {
    product: IProduct;
}

const ProductAdminPage:FC<Props> = ({ product }) => {

    const router = useRouter()
    const fileInputRef = useRef<HTMLInputElement>(null)
    const [newTagValue, setNewTagValue] = useState('')
    const [isSaving, setIsSaving] = useState(false)
    const { register, handleSubmit, formState:{errors}, getValues, setValue, watch} = useForm<FormData>({
        defaultValues:product
    })


    useEffect(() => {
       const subcription =  watch((value, { name, type }) => {

            if (name === 'title'){
                const newSlug  = value.title?.trim()
                                .replaceAll(' ','_')
                                .replaceAll("'",'')
                                .toLocaleLowerCase() || '';


                setValue('slug',newSlug)}

        })

      return () =>
         subcription.unsubscribe()


    }, [watch,setValue])

    const createNewtag = () =>{
        const newTags = newTagValue.trim().toLocaleLowerCase()
        setNewTagValue('')
        const currentTags = getValues('tags')
        if (currentTags.includes(newTags)){
            return undefined
        }
        currentTags.push(newTags) // push muta el objeto

        // setValue('tags',[...getValues('tags'),newTags], {shouldValidate:true})


    }

    const onDeleteTag = (tag : string ) => {
        setValue('tags',getValues('tags').filter(t=> t !==tag ), {shouldValidate:true})

    }

    const onFileSelectd =async({target}:ChangeEvent<HTMLInputElement>)=>{

        if(!target.files || target.files?.length === 0){
            return
        }

        try {

            for( const file of target.files){
                const formData = new FormData()
                formData.append('file', file)

                const { data } = await tesloApi.post<{message: string}>( '/admin/upload',formData)

                setValue('images',[...getValues('images'), data.message], {shouldValidate:true})
            }

        } catch (error) {
            console.log(error)

        }


    }

    const onDeleteImage = (image:string) =>{
        setValue('images', getValues('images').filter(img => img !== image), {shouldValidate:true})
    }

    const onSubmit = async(form: FormData ) => {
        if (form.images.length < 2) return alert('minimo 2 imagenes')
        setIsSaving(true)

        try {

            const {data} = await tesloApi({
                url:'/admin/products',
                method: form._id ?'PUT':'POST',// si tenemos un id actuliazar, sino crear
                data: form
            })

            console.log({data})
            if(!form._id){
                router.replace(`/admin/products/${form.slug}`)
                setIsSaving(false)
            }else {
                setIsSaving(false)
            }

        } catch (error) {
            console.log(error)
            setIsSaving(false)

        }
    }

    const onChangeSize = (size:string) =>{

        const currentSizes = getValues('sizes')
        currentSizes.includes(size)
        ? setValue('sizes', currentSizes.filter(s =>s !== size ), {shouldValidate:true})
        : setValue('sizes',[...currentSizes, size], {shouldValidate:true})
    }

    return (
        <AdminLayout
            title={'Producto'}
            subTitle={`${product._id ? 'Editar :': 'Crear producto'}  ${ product.title }`}
            icon={ <DriveFileRenameOutline /> }
        >
            <form onSubmit={ handleSubmit(onSubmit)}>
                <Box display='flex' justifyContent='end' sx={{ mb: 1 }}>
                    <Button
                        color="secondary"
                        startIcon={ <SaveOutlined /> }
                        sx={{ width: '150px' }}
                        type="submit"
                        disabled = {isSaving}
                        >
                        Guardar
                    </Button>
                </Box>

                <Grid container spacing={2}>
                    {/* Data */}
                    <Grid item xs={12} sm={ 6 }>

                        <TextField
                            label="Título"
                            variant="filled"
                            fullWidth
                            sx={{ mb: 1 }}
                             { ...register('title', {
                                 required: 'Este campo es requerido',
                                 minLength: { value: 2, message: 'Mínimo 2 caracteres' }
                             })}
                             error={ !!errors.title }
                             helperText={ errors.title?.message }
                        />

                        <TextField
                            label="Descripción"
                            variant="filled"
                            fullWidth
                            multiline
                            sx={{ mb: 1 }}
                            { ...register('description', {
                                required: 'Este campo es requerido',
                            })}
                            error={ !!errors.description }
                            helperText={ errors.description?.message }
                        />

                        <TextField
                            label="Inventario"
                            type='number'
                            variant="filled"
                            fullWidth
                            sx={{ mb: 1 }}
                            { ...register('inStock', {
                                required: 'Este campo es requerido',
                                minLength: { value: 0, message: 'Mínimo 0 valor' }
                            })}
                            error={ !!errors.inStock }
                            helperText={ errors.inStock?.message }
                        />

                        <TextField
                            label="Precio"
                            type='number'
                            variant="filled"
                            fullWidth
                            sx={{ mb: 1 }}
                            { ...register('price', {
                                required: 'Este campo es requerido',
                                minLength: { value: 0, message: 'Mínimo 0 valor' }
                            })}
                            error={ !!errors.price }
                            helperText={ errors.price?.message }
                        />

                        <Divider sx={{ my: 1 }} />

                        <FormControl sx={{ mb: 1 }}>
                            <FormLabel>Tipo</FormLabel>
                            <RadioGroup
                                row
                                 value={ getValues('type') }
                                 onChange={ ({target}) => setValue('type',target.value, {shouldValidate:true}) }
                            >
                                {
                                    validTypes.map( option => (
                                        <FormControlLabel
                                            key={ option }
                                            value={ option }
                                            control={ <Radio color='secondary' /> }
                                            label={ capitalize(option) }
                                        />
                                    ))
                                }
                            </RadioGroup>
                        </FormControl>

                        <FormControl sx={{ mb: 1 }}>
                            <FormLabel>Género</FormLabel>
                            <RadioGroup
                                row
                                value={ getValues('gender') }
                                onChange={ ({target}) => setValue('gender',target.value, {shouldValidate:true}) }
                            >
                                {
                                    validGender.map( option => (
                                        <FormControlLabel
                                            key={ option }
                                            value={ option }
                                            control={ <Radio color='secondary' /> }
                                            label={ capitalize(option) }
                                        />
                                    ))
                                }
                            </RadioGroup>
                        </FormControl>

                        <FormGroup>
                            <FormLabel>Tallas</FormLabel>
                            {
                                validSizes.map(size => (
                                    <FormControlLabel
                                    key={size}
                                    control={<Checkbox checked ={getValues('sizes').includes(size)}/>}
                                    label={ size }
                                    onChange ={() => onChangeSize( size)}
                                     />
                                ))
                            }
                        </FormGroup>

                    </Grid>

                    {/* Tags e imagenes */}
                    <Grid item xs={12} sm={ 6 }>
                        <TextField
                            label="Slug - URL"
                            variant="filled"
                            fullWidth
                            sx={{ mb: 1 }}
                            { ...register('slug', {
                                required: 'Este campo es requerido',
                                validate : (val)=> val.trim().includes(' ') ? ' no se puede agregar espacios en blanco' : undefined
                            })}
                            error={ !!errors.slug }
                            helperText={ errors.slug?.message }

                        />

                        <TextField
                            label="Etiquetas"
                            variant="filled"
                            fullWidth
                            onChange={({target})=>setNewTagValue(target.value)}
                            value = {newTagValue}
                            onKeyUp = {({code}) => code ==='Space'?createNewtag():undefined}
                            sx={{ mb: 1 }}
                            helperText="Presiona [spacebar] para agregar"
                        />

                        <Box sx={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            listStyle: 'none',
                            p: 0,
                            m: 0,
                        }}
                        component="ul">
                            {
                                getValues('tags').map((tag) => {

                                return (
                                    <Chip
                                        key={tag}
                                        label={tag}
                                        onDelete={() => onDeleteTag(tag)}
                                        color="primary"
                                        size='small'
                                        sx={{ ml: 1, mt: 1}}
                                    />
                                );
                            })}
                        </Box>

                        <Divider sx={{ my: 2  }}/>

                        <Box display='flex' flexDirection="column">
                            <FormLabel sx={{ mb:1}}>Imágenes</FormLabel>
                            <Button
                                color="secondary"
                                fullWidth
                                startIcon={ <UploadOutlined /> }
                                sx={{ mb: 3 }}
                                onClick = {()=> fileInputRef.current?.click()}
                            >
                                Cargar imagen
                            </Button>
                            <input
                            ref = {fileInputRef}
                            type='file'
                            multiple
                            accept='image/png, image/gif, image/jpg'
                            style={{display:'none'}}
                            onChange={onFileSelectd}

                            />


                            <Chip
                                label="Es necesario al 2 imagenes"
                                color='error'
                                variant='outlined'
                                sx ={{ display: getValues('images').length < 2 ? 'flex' : 'none'}}
                            />

                            <Grid container spacing={2}>
                                {
                                    getValues('images').map( img => (
                                        <Grid item xs={4} sm={3} key={img}>
                                            <Card>
                                                <CardMedia
                                                    component='img'
                                                    className='fadeIn'
                                                    image={ `${ img }` }
                                                    alt={ img }
                                                />
                                                <CardActions>
                                                    <Button
                                                      fullWidth
                                                      color="error"
                                                      onClick={()=>onDeleteImage(img)}
                                                      >
                                                        Borrar
                                                    </Button>
                                                </CardActions>
                                            </Card>
                                        </Grid>
                                    ))
                                }
                            </Grid>

                        </Box>

                    </Grid>

                </Grid>
            </form>
        </AdminLayout>
    )
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time


export const getServerSideProps: GetServerSideProps = async ({ query }) => {

    const { slug = ''} = query;

    let product :IProduct | null

    if( slug ==='new'){
        //crear producto
        const temProduct = JSON.parse(JSON.stringify(new Product()))
        delete temProduct._id
        temProduct.images = ['image1.jpg', 'image2.jpg']
        product = temProduct

    }else {
        product = await dbProducts.getProductBySlug(slug.toString());
    }



    if ( !product ) {
        return {
            redirect: {
                destination: '/admin/products',
                permanent: false,
            }
        }
    }


    return {
        props: {
            product
        }
    }
}


export default ProductAdminPage