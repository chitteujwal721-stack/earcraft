import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'earcraft.settings')
django.setup()

from apps.authentication.models import User
from apps.products.models import Category, Collection, Product, ProductImage, ProductVariant
from apps.cms.models import MediaAsset

def seed():
    print("Seeding EARCRAFT database...")

    # 1. Super Admin User
    admin, created = User.objects.get_or_create(
        email='admin@earcraft.com',
        defaults={
            'username': 'admin@earcraft.com',
            'first_name': 'Super',
            'last_name': 'Admin',
            'role': User.Role.SUPER_ADMIN,
            'is_staff': True,
            'is_superuser': True,
            'is_email_verified': True,
            'avatar': 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
        }
    )
    if created:
        admin.set_password('admin123456')
        admin.save()
        print("Created Super Admin user: admin@earcraft.com")
    else:
        print("Super Admin user already exists.")

    # 2. Categories (Requirement: 1. Crafted Series, 2. Unisex Series)
    cat_crafted, _ = Category.objects.get_or_create(
        slug='crafted-series',
        defaults={
            'name': 'Crafted Series',
            'description': 'Signature acoustic monitors, graphene driver architecture, and bespoke materials.',
            'image_url': 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=800&q=80',
            'status': 'ACTIVE',
            'display_order': 1,
            'seo_title': 'Crafted Series - Signature Acoustic Earbuds',
            'seo_description': 'Crafted Series wireless earbuds engineered with hybrid ANC and graphene drivers.',
        }
    )

    cat_unisex, _ = Category.objects.get_or_create(
        slug='unisex-series',
        defaults={
            'name': 'Unisex Series',
            'description': 'Everyday universal audio, ultra-light ergonomics, transparent shells, and effortless style.',
            'image_url': 'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?auto=format&fit=crop&w=800&q=80',
            'status': 'ACTIVE',
            'display_order': 2,
            'seo_title': 'Unisex Series - Universal Everyday Audio',
            'seo_description': 'Universal fit wireless earcraft earbuds designed for daily style and comfort.',
        }
    )

    print(f"Categories seeded: '{cat_crafted.name}' (ID: {cat_crafted.id}), '{cat_unisex.name}' (ID: {cat_unisex.id})")

    # 3. Collections
    col_crafted, _ = Collection.objects.get_or_create(
        slug='crafted-series',
        defaults={
            'title': 'Crafted Series',
            'tagline': 'Crafted to Shine. Signature Acoustic Precision.',
            'hero_image': 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=1600&q=80',
            'is_featured': True
        }
    )

    col_unisex, _ = Collection.objects.get_or_create(
        slug='unisex-series',
        defaults={
            'title': 'Unisex Series',
            'tagline': 'Designed for Everyday Style. Engineered for Exceptional Sound.',
            'hero_image': 'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?auto=format&fit=crop&w=1600&q=80',
            'is_featured': True
        }
    )

    # 4. Products
    p1, p1_created = Product.objects.get_or_create(
        slug='earcraft-apex-pro-wireless-earbuds',
        defaults={
            'category': cat_crafted,
            'collection': col_crafted,
            'title': 'EarCraft Apex Pro (Crafted Series)',
            'subtitle': '45dB Hybrid Active Noise Cancellation & 10mm Graphene Drivers',
            'description': 'The flagship of the Crafted Series fuses bespoke acoustic architecture with 45dB Active Noise Cancellation.',
            'base_price': 19900.00,
            'compare_at_price': 24900.00,
            'hsn_code': '85183000',
            'gst_percentage': 18.00,
            'barcode': '8901234567800',
            'status': 'ACTIVE',
            'is_featured': True,
            'is_new_arrival': True,
            'is_best_seller': True,
            'is_trending': True,
            'avg_rating': 4.90,
            'review_count': 142,
        }
    )
    if p1_created:
        ProductImage.objects.create(product=p1, url='https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=1200&q=80', alt_text='EarCraft Apex Pro Obsidian Black', is_primary=True, order=1)
        ProductImage.objects.create(product=p1, url='https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?auto=format&fit=crop&w=1200&q=80', alt_text='EarCraft Apex Pro Translucent Glass', is_primary=False, order=2)
        ProductVariant.objects.create(product=p1, sku='EC-CRF-APX-BLK', name='Obsidian Black', material='Space-grade Aluminum & Graphene', color='#111111', price=19900.00, stock_quantity=45)
        ProductVariant.objects.create(product=p1, sku='EC-CRF-APX-WHT', name='Porcelain White', material='Ceramic Composite & Graphene', color='#FFFFFF', price=19900.00, stock_quantity=28)

    p2, p2_created = Product.objects.get_or_create(
        slug='earcraft-soundmaster-studio',
        defaults={
            'category': cat_crafted,
            'collection': col_crafted,
            'title': 'EarCraft Soundmaster Studio (Crafted Series)',
            'subtitle': '96kHz/24bit LDAC Lossless Audio & Zirconia Ceramic Chambers',
            'description': 'Precision acoustic tuning for purists seeking uncompressed studio reference playback.',
            'base_price': 24900.00,
            'compare_at_price': 29900.00,
            'hsn_code': '85183000',
            'gst_percentage': 18.00,
            'barcode': '8901234567802',
            'status': 'ACTIVE',
            'is_featured': True,
            'is_best_seller': True,
            'avg_rating': 5.00,
            'review_count': 64,
        }
    )
    if p2_created:
        ProductImage.objects.create(product=p2, url='https://images.unsplash.com/photo-1572536147248-ac59a8abfa4b?auto=format&fit=crop&w=1200&q=80', alt_text='EarCraft Soundmaster Studio Ceramic', is_primary=True, order=1)
        ProductVariant.objects.create(product=p2, sku='EC-CRF-STD-CRM', name='Zirconia Matte White', material='Zirconia Ceramic', color='#F6F7F9', price=24900.00, stock_quantity=18)

    p3, p3_created = Product.objects.get_or_create(
        slug='earcraft-translucent-edition',
        defaults={
            'category': cat_unisex,
            'collection': col_unisex,
            'title': 'EarCraft Translucent Edition (Unisex Series)',
            'subtitle': 'Transparent Cybernetic Acoustic Shell & Universal Fit',
            'description': 'Showcasing internal acoustic circuitry and driver magnets through a scratch-resistant polycarbonate glass chassis.',
            'base_price': 14900.00,
            'compare_at_price': 18900.00,
            'hsn_code': '85183000',
            'gst_percentage': 18.00,
            'barcode': '8901234567801',
            'status': 'ACTIVE',
            'is_featured': True,
            'is_new_arrival': True,
            'is_trending': True,
            'avg_rating': 4.80,
            'review_count': 88,
        }
    )
    if p3_created:
        ProductImage.objects.create(product=p3, url='https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?auto=format&fit=crop&w=1200&q=80', alt_text='EarCraft Translucent Edition', is_primary=True, order=1)
        ProductVariant.objects.create(product=p3, sku='EC-UNI-TRN-CLR', name='Ghost Clear Glass', material='Polycarbonate Glass', color='#E5E7EB', price=14900.00, stock_quantity=20)

    p4, p4_created = Product.objects.get_or_create(
        slug='earcraft-urban-air-wireless',
        defaults={
            'category': cat_unisex,
            'collection': col_unisex,
            'title': 'EarCraft Urban Air (Unisex Series)',
            'subtitle': 'Ultra-Light 3.8g Ergonomic Fit & 36-Hour Battery Playback',
            'description': 'Featherlight wireless acoustic earpieces designed for effortless daily wear.',
            'base_price': 12900.00,
            'compare_at_price': 15900.00,
            'hsn_code': '85183000',
            'gst_percentage': 18.00,
            'barcode': '8901234567803',
            'status': 'ACTIVE',
            'is_featured': True,
            'is_best_seller': True,
            'avg_rating': 4.70,
            'review_count': 53,
        }
    )
    if p4_created:
        ProductImage.objects.create(product=p4, url='https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=1200&q=80', alt_text='EarCraft Urban Air', is_primary=True, order=1)
        ProductVariant.objects.create(product=p4, sku='EC-UNI-AIR-SLV', name='Pure White', material='Matte Polymer', color='#FFFFFF', price=12900.00, stock_quantity=30)

    p5, p5_created = Product.objects.get_or_create(
        slug='golden-crafted-diamond',
        defaults={
            'category': cat_crafted,
            'collection': col_crafted,
            'title': 'Golden Crafted Diamond',
            'subtitle': 'Bespoke 24K Gold Diamond Facet Edition with Graphene Drivers',
            'description': 'Featuring precision 24K gold-plated diamond-cut acoustic casing and high-fidelity sound stage output.',
            'base_price': 1599.00,
            'compare_at_price': 1999.00,
            'hsn_code': '85183000',
            'gst_percentage': 18.00,
            'barcode': '8901234567806',
            'status': 'ACTIVE',
            'is_featured': True,
            'is_new_arrival': True,
            'is_best_seller': True,
            'avg_rating': 5.00,
            'review_count': 78,
        }
    )
    if p5_created:
        ProductImage.objects.create(product=p5, url='/goldencolor/golden_crafted_diamond.png', alt_text='Golden Crafted Diamond', is_primary=True, order=1)
        ProductVariant.objects.create(product=p5, sku='EC-CRF-GLD-DMND', name='24K Golden Diamond', material='24K Gold Plated Alloy', color='#D4AF37', price=1599.00, stock_quantity=15)

    p6, p6_created = Product.objects.get_or_create(
        slug='golden-crafted-drop',
        defaults={
            'category': cat_crafted,
            'collection': col_crafted,
            'title': 'Golden Crafted Drop',
            'subtitle': 'Signature Golden Acoustic Drop Edition with 45dB Hybrid ANC',
            'description': 'The Golden Crafted Drop features bespoke acoustic architecture in a radiant 24K gold finish.',
            'base_price': 1599.00,
            'compare_at_price': 1999.00,
            'hsn_code': '85183000',
            'gst_percentage': 18.00,
            'barcode': '8901234567807',
            'status': 'ACTIVE',
            'is_featured': True,
            'is_new_arrival': True,
            'is_best_seller': True,
            'avg_rating': 4.90,
            'review_count': 65,
        }
    )
    if p6_created:
        ProductImage.objects.create(product=p6, url='/goldencolor/golden_crafted_draft.png', alt_text='Golden Crafted Drop', is_primary=True, order=1)
        ProductVariant.objects.create(product=p6, sku='EC-CRF-GLD-DROP', name='24K Golden Drop', material='24K Gold Plated Alloy', color='#FFD700', price=1599.00, stock_quantity=20)

    p7, p7_created = Product.objects.get_or_create(
        slug='golden-crafted-florat',
        defaults={
            'category': cat_crafted,
            'collection': col_crafted,
            'title': 'Golden Crafted Florat',
            'subtitle': 'Botanical Floral Inspired Golden Acoustic Earbuds',
            'description': 'An elegant gold-adorned floral motif meets studio reference audio tuning.',
            'base_price': 1599.00,
            'compare_at_price': 1999.00,
            'hsn_code': '85183000',
            'gst_percentage': 18.00,
            'barcode': '8901234567808',
            'status': 'ACTIVE',
            'is_featured': True,
            'is_new_arrival': True,
            'avg_rating': 4.90,
            'review_count': 52,
        }
    )
    if p7_created:
        ProductImage.objects.create(product=p7, url='/goldencolor/golden_crafted_florat.png', alt_text='Golden Crafted Florat', is_primary=True, order=1)
        ProductVariant.objects.create(product=p7, sku='EC-CRF-GLD-FLRT', name='24K Golden Floral', material='24K Gold Anodized Alloy', color='#E6CA65', price=1599.00, stock_quantity=18)

    print(f"Products seeded: '{p1.title}', '{p2.title}', '{p3.title}', '{p4.title}', '{p5.title}', '{p6.title}', '{p7.title}'")
    print(f"Crafted Series product count: {cat_crafted.product_count}")
    print(f"Unisex Series product count: {cat_unisex.product_count}")

    # 5. Initial Media Assets
    initial_media = [
        ('aurelia-gold-cuff-18k.jpg', 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80', 1258291, 1200, 800, 'Products'),
        ('celeste-diamond-drops.jpg', 'https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=800&q=80', 2516582, 1200, 800, 'Products'),
        ('obsidian-helix-clicker.jpg', 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80', 1003520, 1200, 800, 'Products'),
        ('hero-solstice-banner.jpg', 'https://images.unsplash.com/photo-1611591475143-be232935f428?auto=format&fit=crop&w=800&q=80', 3250580, 1600, 900, 'Hero Banners'),
    ]

    for fname, url, size, w, h, fldr in initial_media:
        MediaAsset.objects.get_or_create(
            filename=fname,
            defaults={
                'url': url,
                'file_type': 'image',
                'mime_type': 'image/jpeg',
                'size_bytes': size,
                'width': w,
                'height': h,
                'source': 'UPLOADED',
                'folder': fldr,
                'alt_text': fname,
            }
        )

    print("Database seeding completed successfully!")

if __name__ == '__main__':
    seed()
