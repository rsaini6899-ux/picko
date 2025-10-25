import { NextResponse } from "next/server"
import Stripe from 'stripe'
import User from "../../../../models/user"
import Order from "../../../../models/order"
import { connect } from "../../../../lib/db"
import { authUser } from "../../../../middleware/userAuth"

connect()

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

function getActionFromURL(req) {
    return new URL(req.url).pathname.split("/api/order/").pop()
}

export async function POST(req) {
    const action = getActionFromURL(req)
     
    if(action === 'place') {
        try {

            const frontend_url = 'http://localhost:3000'

            const { user, error, status } = await authUser(req)

            if (error) {
              return NextResponse.json({ error }, { status })
            }

            const userId = user._id

            const {items, amount, address} = await req.json()

            const newOrder = new Order({
                userId,
                items,
                amount,
                address,
            })

            await newOrder.save()
            await User.findByIdAndUpdate(userId,{cartData:{}})

            const line_items = items.map((item) => ({
               price_data:{
                currency: 'inr',
                product_data:{
                    name:item.name
                },
                unit_amount: item.price*100
               },
               quantity: item.quantity
            }))

            line_items.push({
                price_data: {
                    currency:'inr',
                    product_data : {
                        name: 'Delivery charges'
                    },
                    unit_amount: 2*100*80
                },
                quantity: 1
            })

            const session = await stripe.checkout.sessions.create({
                line_items: line_items,
                mode: 'payment',
                success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
                cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
            })

            return NextResponse.json({ session_url: session.url }, { status: 200 })
        } catch (error) {
            console.log(error)
            return NextResponse.json(error.message, { status: 500 })
        }
    }

    if(action === 'verify') {
      try {
        const {orderId, success} = await req.json()

        if(success == 'true') {
          await Order.findByIdAndUpdate(orderId,{payment: true})
          return NextResponse.json({message: 'Paid'}, {status: 200} )
        }else{
          await Order.findByIdAndDelete(orderId)
          return NextResponse.json({message: 'Not Paid'}, {status: 400} )
        }
        
      } catch (error) {
        console.log(error)
        return NextResponse.json(error.message, {status: 500} )
      }
    }

    if(action === 'userOrders') {
      try {
        const { user, error, status } = await authUser(req)

            if (error) {
              return NextResponse.json({ error }, { status })
            }

            const orders = await Order.find({userId : user._id})

            return NextResponse.json(orders, { status: 200 })
      } catch (error) {
        console.log(error)
        return NextResponse.json(error.message, {status: 500} )
      }
    }

    if(action === 'status') {
      try {
        const {orderId, status} = await req.json()

       await Order.findByIdAndUpdate(orderId, {status})

       return NextResponse.json({message: 'status update successfully'}, { status: 200 })

      } catch (error) {
        console.log(error)
        return NextResponse.json(error.message, { status: 500 })
      }
    }
}

export async function GET(req) {
  const action = getActionFromURL(req)

  if (action === "list") {
    try {
      const orders = await Order.find({})
  
      return NextResponse.json(orders ,{ status: 200 })
    } catch (error) {
      console.error(error);
      return NextResponse.json(error.message, { status: 500 });
    }
  }
  return NextResponse.json({ error: "Not Found" }, { status: 404 });
}