import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  CheckCircle, 
  Package, 
  Truck, 
  Mail, 
  Phone,
  MapPin,
  CreditCard,
  Download,
  ArrowLeft,
  Home
} from "lucide-react";
import { useNavigate } from 'react-router-dom';

interface OrderItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
  brand: string;
  category: string;
}

interface OrderData {
  id: string;
  items: OrderItem[];
  total: number;
  shippingAddress: {
    name: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  paymentMethod: string;
  email: string;
  phone: string;
  notes: string;
  date: string;
}

interface OrderConfirmationProps {
  orderData: OrderData;
  onContinueShopping: () => void;
}

const OrderConfirmation: React.FC<OrderConfirmationProps> = ({ orderData, onContinueShopping }) => {
  const navigate = useNavigate();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getEstimatedDelivery = () => {
    const orderDate = new Date(orderData.date);
    const deliveryDate = new Date(orderDate);
    deliveryDate.setDate(deliveryDate.getDate() + 3); // 3 business days
    return deliveryDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleDownloadReceipt = () => {
    // In a real app, this would generate and download a PDF receipt
    console.log('Downloading receipt for order:', orderData.id);
    // For now, just show an alert
    alert('Receipt download would start here');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-3xl font-md text-gray-900 mb-2">Order Confirmed!</h1>
          <p className="text-gray-600 mb-4">
            Thank you for your purchase. Your order has been successfully placed.
          </p>
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-lg">
            <Package className="w-4 h-4" />
            <span className="font-medium">Order #{orderData.id}</span>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Order Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Items */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="w-5 h-5" />
                  Order Items
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {orderData.items.map((item) => (
                    <div key={item.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                      <div className="w-16 h-16 rounded-lg overflow-hidden">
                        <img 
                          src={item.image} 
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 mb-1">{item.name}</h3>
                        <p className="text-sm text-gray-600 mb-2">{item.brand}</p>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">
                            {item.category.replace('-', ' ')}
                          </Badge>
                          <span className="text-sm text-gray-600">Qty: {item.quantity}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-gray-900">
                          ${(item.price * item.quantity).toFixed(2)}
                        </div>
                        <div className="text-sm text-gray-600">
                          ${item.price.toFixed(2)} each
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Shipping Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Truck className="w-5 h-5" />
                  Shipping Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                    <div>
                      <div className="font-medium text-gray-900">{orderData.shippingAddress.name}</div>
                      <div className="text-gray-600">
                        {orderData.shippingAddress.address}
                        {orderData.shippingAddress.apartment && `, ${orderData.shippingAddress.apartment}`}
                      </div>
                      <div className="text-gray-600">
                        {orderData.shippingAddress.city}, {orderData.shippingAddress.state} {orderData.shippingAddress.zipCode}
                      </div>
                      <div className="text-gray-600">{orderData.shippingAddress.country}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Truck className="w-5 h-5 text-gray-400" />
                    <div>
                      <div className="font-medium text-gray-900">Estimated Delivery</div>
                      <div className="text-gray-600">{getEstimatedDelivery()}</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="w-5 h-5" />
                  Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-gray-400" />
                    <div>
                      <div className="font-medium text-gray-900">Email</div>
                      <div className="text-gray-600">{orderData.email}</div>
                    </div>
                  </div>
                  {orderData.phone && (
                    <div className="flex items-center gap-3">
                      <Phone className="w-5 h-5 text-gray-400" />
                      <div>
                        <div className="font-medium text-gray-900">Phone</div>
                        <div className="text-gray-600">{orderData.phone}</div>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary & Actions */}
          <div className="lg:col-span-1 space-y-6">
            {/* Order Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Order Date</span>
                    <span>{formatDate(orderData.date)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Order Number</span>
                    <span className="font-mono">{orderData.id}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Payment Method</span>
                    <span className="capitalize">{orderData.paymentMethod}</span>
                  </div>
                  <div className="border-t pt-2">
                    <div className="flex justify-between font-semibold text-lg">
                      <span>Total</span>
                      <span>${orderData.total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <Card>
              <CardContent className="p-6 space-y-4">
                <Button 
                  onClick={handleDownloadReceipt}
                  variant="outline" 
                  className="w-full"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download Receipt
                </Button>
                
                <Button 
                  onClick={onContinueShopping}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                >
                  Continue Shopping
                </Button>
                
                <Button 
                  onClick={() => navigate('/')}
                  variant="outline" 
                  className="w-full"
                >
                  <Home className="w-4 h-4 mr-2" />
                  Back to Home
                </Button>
              </CardContent>
            </Card>

            {/* Next Steps */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">What's Next?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-semibold text-blue-600">1</span>
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">Order Processing</div>
                    <div className="text-sm text-gray-600">We'll prepare your order for shipment</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-semibold text-blue-600">2</span>
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">Shipping Notification</div>
                    <div className="text-sm text-gray-600">You'll receive tracking information via email</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-semibold text-blue-600">3</span>
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">Delivery</div>
                    <div className="text-sm text-gray-600">Your order will arrive within 3-5 business days</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
