from django.urls import path
from .views import (
    ProductListCreateView,
    CategoryListCreateView,
    CategoryDetailView,
    CategoryProductsView
)

urlpatterns = [
    path('', ProductListCreateView.as_view(), name='product_list_create'),
    path('categories/', CategoryListCreateView.as_view(), name='category_list_create'),
    path('categories/<str:pk>/', CategoryDetailView.as_view(), name='category_detail'),
    path('categories/<str:pk>/products/', CategoryProductsView.as_view(), name='category_products'),
]
