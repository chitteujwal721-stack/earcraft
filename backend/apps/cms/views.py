import os
from pathlib import Path
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.conf import settings
from django.core.files.storage import FileSystemStorage
from .models import AnnouncementBar, HeroSlide, MediaAsset

def serialize_media(m):
    return {
        'id': str(m.id),
        'filename': m.filename,
        'url': m.url,
        'file_path': m.file_path or '',
        'file_type': m.file_type,
        'mime_type': m.mime_type,
        'size_bytes': m.size_bytes,
        'width': m.width,
        'height': m.height,
        'source': m.source,
        'folder': m.folder,
        'alt_text': m.alt_text or m.filename,
        'created_at': m.created_at.isoformat() if hasattr(m, 'created_at') and m.created_at else None,
    }

def discover_public_assets():
    assets = []
    # Search root public/, frontend/public/images/ and frontend/public/
    public_dirs = [
        settings.BASE_DIR.parent / 'public',
        settings.BASE_DIR.parent / 'public' / 'images',
        settings.BASE_DIR.parent / 'frontend' / 'public' / 'images',
        settings.BASE_DIR.parent / 'frontend' / 'public',
        settings.BASE_DIR / 'staticfiles',
    ]

    seen_files = set()

    for pdir in public_dirs:
        if pdir.exists() and pdir.is_dir():
            for root, _, files in os.walk(pdir):
                for fname in files:
                    ext = fname.split('.')[-1].lower()
                    if ext in ['png', 'jpg', 'jpeg', 'webp', 'svg', 'gif']:
                        rel_path = os.path.relpath(os.path.join(root, fname), settings.BASE_DIR.parent)
                        url_path = f"/images/{fname}" if ('images' in str(root) or 'frontend' in str(root)) else f"/{fname}"
                        if fname not in seen_files:
                            seen_files.add(fname)
                            fpath = os.path.join(root, fname)
                            size = os.path.getsize(fpath) if os.path.exists(fpath) else 102400
                            assets.append({
                                'id': f"public-{fname}",
                                'filename': fname,
                                'url': url_path,
                                'file_path': rel_path,
                                'file_type': 'image',
                                'mime_type': f"image/{ext if ext != 'jpg' else 'jpeg'}",
                                'size_bytes': size,
                                'width': 1200,
                                'height': 800,
                                'source': 'PUBLIC_ASSET',
                                'folder': 'Public Assets',
                                'alt_text': fname,
                                'created_at': None,
                            })
    return assets

class CMSConfigView(APIView):
    def get(self, request):
        announcement = AnnouncementBar.objects.first()
        slides = HeroSlide.objects.filter(is_active=True).order_by('order')

        data = {
            'announcement': {
                'enabled': announcement.enabled if announcement else True,
                'text': announcement.text if announcement else 'COMPLIMENTARY WORLDWIDE INSURED EXPRESS SHIPPING ON ORDERS OVER ₹15,000 — CODE: EARCRAFTLUXE',
                'background_color': announcement.background_color if announcement else '#121215',
                'text_color': announcement.text_color if announcement else '#E5C158',
            },
            'hero_slides': [
                {
                    'id': str(s.id),
                    'title': s.title,
                    'subtitle': s.subtitle,
                    'cta_text': s.cta_text,
                    'cta_link': s.cta_link,
                    'background_image': s.background_image,
                }
                for s in slides
            ]
        }
        return Response(data, status=status.HTTP_200_OK)

class MediaListView(APIView):
    def get(self, request):
        db_media = [serialize_media(m) for m in MediaAsset.objects.all()]
        public_media = discover_public_assets()
        
        # Combine uploaded DB media & discovered public static assets
        combined = db_media + public_media
        source_filter = request.query_params.get('source')
        folder_filter = request.query_params.get('folder')

        if source_filter and source_filter != 'ALL':
            combined = [m for m in combined if m['source'] == source_filter]
        if folder_filter and folder_filter != 'All':
            combined = [m for m in combined if m['folder'] == folder_filter]

        return Response(combined, status=status.HTTP_200_OK)

class MediaUploadView(APIView):
    def post(self, request):
        if 'file' not in request.FILES:
            return Response({'error': 'No file uploaded'}, status=status.HTTP_400_BAD_REQUEST)

        file_obj = request.FILES['file']
        folder = request.data.get('folder', 'Uploaded')
        alt_text = request.data.get('alt_text', file_obj.name)

        ext = file_obj.name.split('.')[-1].lower()
        allowed_exts = ['png', 'jpg', 'jpeg', 'webp', 'svg', 'mp4']
        if ext not in allowed_exts:
            return Response({'error': f'Unsupported file type: .{ext}. Allowed: {", ".join(allowed_exts)}'}, status=status.HTTP_400_BAD_REQUEST)

        max_size = 20 * 1024 * 1024 # 20MB limit
        if file_obj.size > max_size:
            return Response({'error': 'File size exceeds maximum allowed limit of 20MB.'}, status=status.HTTP_400_BAD_REQUEST)

        upload_dir = settings.MEDIA_ROOT / 'uploads'
        os.makedirs(upload_dir, exist_ok=True)

        fs = FileSystemStorage(location=upload_dir, base_url='/media/uploads/')
        filename = fs.save(file_obj.name, file_obj)
        file_url = fs.url(filename)
        file_path = str(upload_dir / filename)

        # Detect dimensions if PIL is available
        width, height = None, None
        try:
            from PIL import Image
            with Image.open(file_path) as img:
                width, height = img.size
        except Exception:
            pass

        media_asset = MediaAsset.objects.create(
            filename=filename,
            url=file_url,
            file_path=file_path,
            file_type='video' if ext == 'mp4' else 'image',
            mime_type=file_obj.content_type or f"image/{ext}",
            size_bytes=file_obj.size,
            width=width,
            height=height,
            source='UPLOADED',
            folder=folder,
            alt_text=alt_text,
        )

        return Response(serialize_media(media_asset), status=status.HTTP_201_CREATED)

class MediaDeleteView(APIView):
    def delete(self, request, pk):
        try:
            asset = MediaAsset.objects.get(pk=pk)
            if asset.file_path and os.path.exists(asset.file_path):
                try:
                    os.remove(asset.file_path)
                except OSError:
                    pass
            asset.delete()
            return Response({'message': 'Media asset deleted successfully'}, status=status.HTTP_200_OK)
        except (MediaAsset.DoesNotExist, ValueError):
            return Response({'message': 'Public or non-database asset cannot be permanently deleted'}, status=status.HTTP_200_OK)

