import { AddOutlined, CategoryOutlined,  } from '@mui/icons-material'
import { Box, Button, CardMedia, Grid, Link } from '@mui/material'
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid'
import React from 'react'
import useSWR from 'swr'
import { AdminLayout } from '../../components/layouts'
import {  IProduct } from '../../interfaces'
import NextLink from 'next/link'


const columns:GridColDef[]= [
    {field: 'img' ,
     headerName: 'fotos',
     renderCell:({row}:GridValueGetterParams) =>{
        return (
            <a href={`/product/${row.slug}`} target='_blank' rel ='noreferrer'>
                <CardMedia
                    component='img'
                    className='fadeIn'
                    alt = {`${row.title}`}
                    image = {`${ row.img }`}

                />
            </a>
        )
     }
    },
    {
        field: 'title' ,
        headerName: 'titulo del producto',
        renderCell:({row}:GridValueGetterParams) =>{
            return (
                <NextLink href={`/admin/products/${row.slug}`} passHref>
                    <Link underline='always'>
                    {row.title}
                    </Link>
                </NextLink>
            )
        },
        width: 250},
    {field: 'gender' , headerName: 'Genero', width: 150},
    {field: 'type' , headerName: 'Tipo'},
    {field: 'inStock' , headerName: 'Inventario'},
    {field: 'price' , headerName: 'Precio', width: 250},
    {field: 'sizes' , headerName: 'tallas', width: 250},



]


const ProductsPage = () => {

    const {data, error} = useSWR<IProduct[]>('/api/admin/products')

    if(!data && !error ){
        return (<></>)
    }

    const rows = data!.map( product => ({
        id: product._id,
        img : product.images[0],
        title : product.title,
        gender : product.gender,
        type : product.type,
        inStock : product.inStock,
        price : `$ ${product.price}` ,
        sizes : product.sizes.join(', '),
        slug: product.slug
    }))

  return (
    <AdminLayout
    title={`Productos ( ${data?.length} )`}
    subTitle={'Mantenimineto de productos'}
    icon ={<CategoryOutlined/>}
    >
        <Box display='flex' justifyContent='end' sx={{mb:2}}>
            <Button
                startIcon={<AddOutlined/>}
                color = 'secondary'
                href = '/admin/products/new'

                    >
                crear nuevo producto

            </Button>

        </Box>

        <Grid container className='fadeIn'>
            <Grid item xs={12} sx={{ height:650, width: '100%' }}>
                <DataGrid
                    rows={ rows }
                    columns={ columns }
                    pageSize={ 10 }
                    rowsPerPageOptions={ [10] }
                />

            </Grid>
        </Grid>
    </AdminLayout>
  )
}



export default ProductsPage;