from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Order

class OrderListView(APIView):
    def get(self, request):
        orders = Order.objects.all()
        data = [
            {
                'id': str(o.id),
                'order_number': o.order_number,
                'customer_name': o.customer_name,
                'customer_email': o.customer_email,
                'status': o.status,
                'grand_total': float(o.grand_total),
                'created_at': o.created_at.isoformat(),
            }
            for o in orders
        ]
        return Response(data, status=status.HTTP_200_OK)

    def post(self, request):
        data = request.data
        order = Order.objects.create(
            order_number=f"EC-2026-{Order.objects.count() + 1001}",
            customer_name=data.get('customer_name', 'Guest Collector'),
            customer_email=data.get('customer_email', 'guest@earcraft.com'),
            customer_phone=data.get('customer_phone', '+91 9876543210'),
            subtotal=data.get('subtotal', 10000),
            tax_total=data.get('tax_total', 300),
            shipping_fee=data.get('shipping_fee', 0),
            grand_total=data.get('grand_total', 10300),
            payment_method=data.get('payment_method', 'RAZORPAY'),
            is_paid=True
        )
        return Response({'id': str(order.id), 'order_number': order.order_number}, status=status.HTTP_210_CREATED if hasattr(status, 'HTTP_210_CREATED') else status.HTTP_201_CREATED)
