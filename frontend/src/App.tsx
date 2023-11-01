import { Box, Button, ButtonGroup, Card, CardBody, CardFooter, Divider, Grid, GridItem, Heading, Image, Input, Stack, Text } from '@chakra-ui/react';
import axios from 'axios';
import { useEffect, useState } from 'react'
import { io } from 'socket.io-client';

interface IProduct {
  id: number,
  name: string,
  description: string,
  price: number,
  category: string
}

interface IOrder {
  id: number,
  quantity: number,
  subtotal: number,
  productId: number
  product: IProduct
}

function App() {
  const [product, setProduct] = useState<IProduct[]>([])
  const [order, setOrder] = useState<IOrder[]>([])

  const orderToken = localStorage.getItem('order-token')

  async function fetchData() {
    try {
      if (orderToken) {
        await fetch(`http://localhost:3000/products/cache/ddddddddd/${orderToken}`);
      } else {
        await fetch(`http://localhost:3000/products/cache/ddddddddd`);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  async function setOrderItem(productId: number, subtotal: number) {
    try {
      if(!orderToken) {
        const order = await axios.post('http://localhost:3000/orders', {
          date: new Date()
        })
        localStorage.setItem('order-token', `${order.data.id}`)
        await axios.post(`http://localhost:3000/orderItems/cache/ddddddddd/${order.data.id}`, {
          quantity: 1,
          subtotal: subtotal,
          productId: productId,
          order: order,
        })
      } else {
        console.log("this is order token: ",orderToken);
        
        await axios.post(`http://localhost:3000/orderItems/cache/ddddddddd/${orderToken}`, {
          quantity: 1,
          subtotal: subtotal,
          productId: productId,
          order: orderToken
        })
      }
    } catch (error) {
      console.error('Error setting order item:', error);
    }
    
  }


  useEffect(() => {
    const socket = io('http://localhost:30333')
    fetchData()

    socket.on('message', (data: any) => {
      console.log(data)
      setProduct(data.product); // Handle incoming WebSocket messages
      if(orderToken) {
        setOrder(data.order)
      }
    });

    return () => {
      socket.disconnect(); // Clean up the WebSocket connection on unmount
    };

  }, [])

  return (
    <Box display={'flex'}>
      <Grid templateColumns='repeat(3, 1fr)' w={'75%'} gap={6} left={0}>
      {product && product.length > 0 ? (
      product.map((data) => (
        <GridItem key={data.id} m={4} >
        <Card maxW='sm'>
          <CardBody>
            <Image
              src='https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
              alt='Green double couch with wooden legs'
              borderRadius='lg'
            />
            <Stack mt='6' spacing='3'>
              <Heading size='md'>{data.name}</Heading>
              <Text>
                {data.description}
              </Text>
              <Text color='blue.600' fontSize='2xl'>
                Rp. {data.price}
              </Text>
            </Stack>
          </CardBody>
          <Divider />
          <CardFooter>
              <Button variant='ghost' colorScheme='blue' onClick={() => 
                {
                setOrderItem(data.id, data.price)
                }
                }>
                Add to cart
              </Button>
          </CardFooter>
        </Card>
        </GridItem>
        ))
      ) : (
        <p>No real-time data available.</p>
      )}
      </Grid>


      <Box position={'fixed'} h={'82%'} right={0} bottom={0} top={0} w={'28%'} overflowY={'scroll'} overscrollY={'none'} overflowX={'hidden'} css={{
        '&::-webkit-scrollbar': {
          width: '4px',
        },
        '&::-webkit-scrollbar-track': {
          width: '6px',
        },
        '&::-webkit-scrollbar-thumb': {
          borderRadius: '24px',
        },
      }}
      >
      {order && order.length > 0 ? (
      order.map((data) => (
        <Card m={2} key={data.id} position={'sticky'}>
          <CardBody display={'flex'} justifyContent={'space-between'}>
            <Box>
            <Text>{data.product.name ? data.product.name : "no product"}</Text>
            <Text>{data.quantity} pcs</Text>
            <Text>Rp. {data.subtotal}</Text>
            </Box>
            <Image
              src='https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
              alt='Green double couch with wooden legs'
              borderRadius='lg'
              w={'5em'}
              objectFit={'cover'}
            />
          </CardBody>
        </Card>
        ))
      ) : (
        <p>No real-time data available.</p>
      )}
      </Box>
      <Box position={'fixed'} right={0} bottom={0} w={'28%'}>
        <Card m={2} >
          <CardBody>
            <Text>Total: Rp. 10000.</Text>
          </CardBody>
            <Button>Confirm</Button>
        </Card>
      </Box>
    </Box>
  )
}

export default App
