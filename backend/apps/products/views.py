from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.utils.text import slugify
from django.db.models import Count
from .models import Product, Category, Collection, ProductImage, ProductVariant

def serialize_category(c):
    return {
        'id': str(c.id),
        'name': c.name,
        'slug': c.slug,
        'description': c.description or '',
        'image': c.image_url or '',
        'image_url': c.image_url or '',
        'status': c.status,
        'display_order': c.display_order,
        'seo_title': c.seo_title or '',
        'seo_description': c.seo_description or '',
        'created_at': c.created_at.isoformat() if c.created_at else None,
        'updated_at': c.updated_at.isoformat() if c.updated_at else None,
        'product_count': c.product_count,
    }

def serialize_product(p):
    return {
        'id': str(p.id),
        'title': p.title,
        'slug': p.slug,
        'subtitle': p.subtitle or '',
        'description': p.description,
        'base_price': float(p.base_price),
        'compare_at_price': float(p.compare_at_price) if p.compare_at_price else None,
        'hsn_code': p.hsn_code,
        'gst_percentage': float(p.gst_percentage),
        'barcode': p.barcode or '',
        'status': p.status,
        'category': serialize_category(p.category) if p.category else None,
        'collection': {'id': str(p.collection.id), 'title': p.collection.title, 'slug': p.collection.slug} if p.collection else None,
        'is_featured': p.is_featured,
        'is_new_arrival': p.is_new_arrival,
        'is_best_seller': p.is_best_seller,
        'is_trending': p.is_trending,
        'video_url': p.video_url or '',
        'images': [
            {'id': str(img.id), 'url': img.url, 'alt_text': img.alt_text or p.title, 'is_primary': img.is_primary, 'order': img.order}
            for img in p.images.all()
        ],
        'variants': [
            {
                'id': str(v.id),
                'sku': v.sku,
                'name': v.name,
                'material': v.material,
                'color': v.color,
                'price': float(v.price),
                'stock_quantity': v.stock_quantity,
                'is_available': v.is_available,
            }
            for v in p.variants.all()
        ],
        'avg_rating': float(p.avg_rating),
        'review_count': p.review_count,
        'created_at': p.created_at.isoformat() if p.created_at else None,
    }

class CategoryListCreateView(APIView):
    def get(self, request):
        categories = Category.objects.all()
        data = [serialize_category(c) for c in categories]
        return Response(data, status=status.HTTP_200_OK)

    def post(self, request):
        data = request.data
        name = data.get('name', '').strip()
        if not name:
            return Response({'error': 'Category name is required'}, status=status.HTTP_400_BAD_REQUEST)

        raw_slug = data.get('slug', '').strip() or name
        slug = slugify(raw_slug)
        
        # Ensure unique slug
        orig_slug = slug
        count = 1
        while Category.objects.filter(slug=slug).exists():
            slug = f"{orig_slug}-{count}"
            count += 1

        category = Category.objects.create(
            name=name,
            slug=slug,
            description=data.get('description', ''),
            image_url=data.get('image', data.get('image_url', '')),
            status=data.get('status', 'ACTIVE'),
            display_order=int(data.get('display_order', 1)),
            seo_title=data.get('seo_title', ''),
            seo_description=data.get('seo_description', ''),
        )
        return Response(serialize_category(category), status=status.HTTP_201_CREATED)

class CategoryDetailView(APIView):
    def get_object(self, pk):
        try:
            return Category.objects.get(pk=pk)
        except (Category.DoesNotExist, ValueError):
            try:
                return Category.objects.get(slug=pk)
            except Category.DoesNotExist:
                return None

    def get(self, request, pk):
        category = self.get_object(pk)
        if not category:
            return Response({'error': 'Category not found'}, status=status.HTTP_404_NOT_FOUND)
        return Response(serialize_category(category), status=status.HTTP_200_OK)

    def put(self, request, pk):
        return self.patch(request, pk)

    def patch(self, request, pk):
        category = self.get_object(pk)
        if not category:
            return Response({'error': 'Category not found'}, status=status.HTTP_404_NOT_FOUND)

        data = request.data
        if 'name' in data:
            category.name = data['name'].strip()
        if 'slug' in data and data['slug'].strip():
            new_slug = slugify(data['slug'].strip())
            if Category.objects.filter(slug=new_slug).exclude(pk=category.pk).exists():
                return Response({'error': 'Slug already in use'}, status=status.HTTP_400_BAD_REQUEST)
            category.slug = new_slug
        if 'description' in data:
            category.description = data['description']
        if 'image' in data or 'image_url' in data:
            category.image_url = data.get('image', data.get('image_url'))
        if 'status' in data:
            category.status = data['status']
        if 'display_order' in data:
            category.display_order = int(data['display_order'])
        if 'seo_title' in data:
            category.seo_title = data['seo_title']
        if 'seo_description' in data:
            category.seo_description = data['seo_description']

        category.save()
        return Response(serialize_category(category), status=status.HTTP_200_OK)

    def delete(self, request, pk):
        category = self.get_object(pk)
        if not category:
            return Response({'error': 'Category not found'}, status=status.HTTP_404_NOT_FOUND)

        product_count = category.products.count()
        action = request.data.get('action') or request.query_params.get('action')
        target_id = request.data.get('target_category_id') or request.query_params.get('target_category_id')

        if product_count > 0 and not action:
            return Response({
                'requires_action': True,
                'message': f'This category contains {product_count} products. Choose what to do with them.',
                'product_count': product_count
            }, status=status.HTTP_400_BAD_REQUEST)

        if action == 'move_products':
            if not target_id:
                return Response({'error': 'Target category ID is required to move products'}, status=status.HTTP_400_BAD_REQUEST)
            try:
                target_cat = Category.objects.get(pk=target_id)
                category.products.update(category=target_cat)
            except Category.DoesNotExist:
                return Response({'error': 'Target category not found'}, status=status.HTTP_404_NOT_FOUND)
        elif action == 'unassign':
            category.products.update(category=None)
        elif action == 'cancel':
            return Response({'message': 'Deletion cancelled'}, status=status.HTTP_200_OK)

        category.delete()
        return Response({'message': 'Category deleted successfully'}, status=status.HTTP_200_OK)

class CategoryProductsView(APIView):
    def get(self, request, pk):
        try:
            category = Category.objects.get(pk=pk)
        except (Category.DoesNotExist, ValueError):
            try:
                category = Category.objects.get(slug=pk)
            except Category.DoesNotExist:
                return Response({'error': 'Category not found'}, status=status.HTTP_404_NOT_FOUND)

        products = category.products.all()
        return Response({
            'category': serialize_category(category),
            'product_count': products.count(),
            'products': [serialize_product(p) for p in products]
        }, status=status.HTTP_200_OK)

class ProductListCreateView(APIView):
    def get(self, request):
        category_id = request.query_params.get('category')
        products = Product.objects.all()
        if category_id:
            products = products.filter(category_id=category_id)
        data = [serialize_product(p) for p in products]
        return Response(data, status=status.HTTP_200_OK)

    def post(self, request):
        data = request.data
        title = data.get('title', '').strip()
        if not title:
            return Response({'error': 'Product title is required'}, status=status.HTTP_400_BAD_REQUEST)

        category_id = data.get('category_id') or data.get('category')
        cat_obj = None
        if category_id:
            if isinstance(category_id, dict):
                category_id = category_id.get('id')
            try:
                cat_obj = Category.objects.get(pk=category_id)
            except (Category.DoesNotExist, ValueError):
                pass

        if not cat_obj:
            cat_obj = Category.objects.first()

        slug = slugify(data.get('slug', '').strip() or title)
        orig_slug = slug
        count = 1
        while Product.objects.filter(slug=slug).exists():
            slug = f"{orig_slug}-{count}"
            count += 1

        product = Product.objects.create(
            title=title,
            slug=slug,
            subtitle=data.get('subtitle', ''),
            description=data.get('description', ''),
            base_price=float(data.get('base_price', 10000)),
            compare_at_price=float(data.get('compare_at_price')) if data.get('compare_at_price') else None,
            hsn_code=data.get('hsn_code', '71131910'),
            gst_percentage=float(data.get('gst_percentage', 3)),
            barcode=data.get('barcode', ''),
            category=cat_obj,
            video_url=data.get('video_url', ''),
            status=data.get('status', 'ACTIVE'),
            is_featured=data.get('is_featured', False),
            is_new_arrival=data.get('is_new_arrival', True),
            is_best_seller=data.get('is_best_seller', False),
            is_trending=data.get('is_trending', False),
        )

        # Handle primary image or images array
        image_url = data.get('image_url') or data.get('image')
        if image_url:
            ProductImage.objects.create(product=product, url=image_url, alt_text=title, is_primary=True, order=1)

        images = data.get('images', [])
        if isinstance(images, list):
            for idx, img in enumerate(images):
                if isinstance(img, dict) and img.get('url'):
                    ProductImage.objects.create(
                        product=product,
                        url=img['url'],
                        alt_text=img.get('alt_text', title),
                        is_primary=img.get('is_primary', idx == 0),
                        order=idx + 1
                    )

        # Handle variant creation
        sku = data.get('sku') or f"SKU-{slugify(title)[:10].upper()}-{ProductVariant.objects.count() + 1}"
        ProductVariant.objects.create(
            product=product,
            sku=sku,
            name=data.get('variant_name', 'Standard 18K'),
            material=data.get('material', 'Solid Gold 18K'),
            color=data.get('color', '#D4AF37'),
            price=product.base_price,
            stock_quantity=int(data.get('stock_quantity', 10)),
            is_available=True
        )

        return Response(serialize_product(product), status=status.HTTP_201_CREATED)

