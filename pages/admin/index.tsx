import {  AccessAlarmOutlined, AttachMoneyOutlined, CancelPresentationOutlined, CategoryOutlined, CreditCardOffOutlined, CreditCardOutlined, DashboardOutlined, GroupOutlined, ProductionQuantityLimits, ProductionQuantityLimitsOutlined } from '@mui/icons-material'
import {  Grid, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import useSWR from 'swr'
import { SummaryTile } from '../../components/admin'
import { AdminLayout } from '../../components/layouts'
import { BashboardSummaryResponse } from '../../interfaces'


const DashboardPage = () => {

  const {data, error } = useSWR<BashboardSummaryResponse>('/api/admin/dashboard',{
    refreshInterval: 30 * 1000
  })

  const [refreshIn, setRefreshIn] = useState(30)

  useEffect(() => {
    const interval = setInterval(()=>{
      console.log('Tick')
      setRefreshIn(refreshIn => refreshIn > 0 ? refreshIn -1 : 30)
    },1000)

    return () => clearInterval(interval)
  }, [])


  if (!error && !data){
    return <></>
  }

  if ( error){
    console.log(error)
    return <Typography>Error al cargar la informacion </Typography>
  }

  const {
    numberOfOrders,
    paidOrders,
    notPaidOrders,
    numberOfClients,
    numberOfProducts,
    productWihNoInventory,
    lowInventory}  = data! ;
  return (
    <AdminLayout
        title='Dashboard'
        subTitle='Estadisticas generales'
        icon={ <DashboardOutlined/>}
    >
       <Grid container spacing={2}>

        <SummaryTile
          title={numberOfOrders}
          subTitle={'Ordenes totales'}
          icon={<CreditCardOutlined color='secondary' sx={{fontSize:40}} /> } />
        <SummaryTile
          title={paidOrders}
          subTitle={'Ordenes pagadas'}
          icon={<AttachMoneyOutlined color='success' sx={{fontSize:40}} /> } />
        <SummaryTile
          title={notPaidOrders}
          subTitle={'Ordenes pendienes'}
          icon={<CreditCardOffOutlined color='error' sx={{fontSize:40}} /> } />
        <SummaryTile
          title={numberOfClients}
          subTitle={'Clientes'}
          icon={<GroupOutlined color='primary' sx={{fontSize:40}} /> } />
        <SummaryTile
          title={numberOfProducts}
          subTitle={'Productos'}
          icon={<CategoryOutlined color='success' sx={{fontSize:40}} /> } />
        <SummaryTile
          title={productWihNoInventory}
          subTitle={'Sin existencia'}
          icon={<CancelPresentationOutlined color='error' sx={{fontSize:40}} /> } />
        <SummaryTile
          title={lowInventory}
          subTitle={'Bajo inventario'}
          icon={<ProductionQuantityLimitsOutlined color='warning' sx={{fontSize:40}} /> } />
        <SummaryTile
          title={refreshIn}
          subTitle={'Actualizacion :'}
          icon={<AccessAlarmOutlined color='secondary' sx={{fontSize:40}} /> } />


       </Grid>

    </AdminLayout>
  )
}

export default DashboardPage