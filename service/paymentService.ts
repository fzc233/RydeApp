import { fetchAPI } from "@/lib/fetch";

export const createPaymentIntent = async (
  fullName: string,
  email: string,
  amount: string,
  paymentMethodId: string,
) => {
  return await fetchAPI("/(api)/(stripe)/create", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: fullName || email.split("@")[0],
      email: email,
      amount: amount,
      paymentMethodId: paymentMethodId,
    }),
  });
};

export const processPayment = async (
  paymentMethodId: string,
  paymentIntentId: string,
  customerId: string,
  clientSecret: string,
) => {
  return await fetchAPI("/(api)/(stripe)/pay", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      payment_method_id: paymentMethodId,
      payment_intent_id: paymentIntentId,
      customer_id: customerId,
      client_secret: clientSecret,
    }),
  });
};

export const createRideBooking = async (
  userAddress: string,
  destinationAddress: string,
  userLatitude: number,
  userLongitude: number,
  destinationLatitude: number,
  destinationLongitude: number,
  rideTime: number,
  amount: string,
  driverId: number,
  userId: string,
) => {
  return await fetchAPI("/(api)/ride/create", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      origin_address: userAddress,
      destination_address: destinationAddress,
      origin_latitude: userLatitude,
      origin_longitude: userLongitude,
      destination_latitude: destinationLatitude,
      destination_longitude: destinationLongitude,
      ride_time: rideTime.toFixed(0),
      fare_price: parseInt(amount) * 100,
      payment_status: "paid",
      driver_id: driverId,
      user_id: userId,
    }),
  });
};
