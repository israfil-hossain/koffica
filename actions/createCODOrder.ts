"use server";

import { backendClient } from "@/sanity/lib/backendClient";
import { GroupedCartItems } from "./createCheckoutSession";

export interface CODOrderData {
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  clerkUserId: string;
  items: GroupedCartItems[];
  paymentMethod: 'cod';
  totalAmount: number;
}

export async function createCODOrder(orderData: CODOrderData) {
  try {
    // Validate items have prices
    const itemsWithoutPrice = orderData.items.filter((item) => !item.product.price);
    if (itemsWithoutPrice.length > 0) {
      throw new Error("Some items do not have a price");
    }

    // Create Sanity product references
    const sanityProducts = orderData.items.map((item) => ({
      _key: crypto.randomUUID(),
      product: {
        _type: "reference",
        _ref: item.product._id,
      },
      quantity: item.quantity,
    }));

    // Create order in Sanity
    const order = await backendClient.create({
      _type: "order",
      orderNumber: orderData.orderNumber,
      customerName: orderData.customerName,
      stripeCustomerId: orderData.customerEmail, // Using email as identifier
      clerkUserId: orderData.clerkUserId,
      email: orderData.customerEmail,
      currency: "BDT", // Changed from "USD" to "BDT"
      amountDiscount: 0,
      products: sanityProducts,
      totalPrice: orderData.totalAmount,
      status: "pending", // COD orders start as pending
      orderDate: new Date().toISOString(),
      paymentMethod: "cod",
      stripeCheckoutSessionId: null,
      stripePaymentIntentId: null,
    });

    // Send confirmation email (optional)
    await sendCODConfirmationEmail(orderData);

    return { success: true, order };
  } catch (error) {
    console.error("Error creating COD order:", error);
    return { success: false, error: error || "Something went wrong" };
  }
}

async function sendCODConfirmationEmail(orderData: CODOrderData) {
  // Implement email sending logic here
  // You can use services like Resend, SendGrid, etc.
  console.log("Sending COD confirmation email to:", orderData.customerEmail);
}
