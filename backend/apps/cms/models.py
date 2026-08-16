from django.db import models

class AnnouncementBar(models.Model):
    enabled = models.BooleanField(default=True)
    text = models.CharField(max_length=255)
    link = models.CharField(max_length=255, blank=True, null=True)
    background_color = models.CharField(max_length=20, default='#121215')
    text_color = models.CharField(max_length=20, default='#E5C158')

    def __str__(self):
        return self.text

class HeroSlide(models.Model):
    title = models.CharField(max_length=255)
    subtitle = models.TextField()
    cta_text = models.CharField(max_length=100)
    cta_link = models.CharField(max_length=255)
    background_image = models.URLField()
    is_active = models.BooleanField(default=True)
    order = models.IntegerField(default=1)

    def __str__(self):
        return self.title

class MediaAsset(models.Model):
    SOURCE_CHOICES = [
        ('PUBLIC_ASSET', 'Public Asset'),
        ('UPLOADED', 'Uploaded Media'),
    ]

    FILE_TYPE_CHOICES = [
        ('image', 'Image'),
        ('video', 'Video'),
        ('document', 'Document'),
    ]

    filename = models.CharField(max_length=255)
    url = models.CharField(max_length=500)
    file_path = models.CharField(max_length=500, blank=True, null=True)
    file_type = models.CharField(max_length=20, choices=FILE_TYPE_CHOICES, default='image')
    mime_type = models.CharField(max_length=100, default='image/jpeg')
    size_bytes = models.BigIntegerField(default=0)
    width = models.IntegerField(null=True, blank=True)
    height = models.IntegerField(null=True, blank=True)
    source = models.CharField(max_length=20, choices=SOURCE_CHOICES, default='UPLOADED')
    folder = models.CharField(max_length=100, default='General')
    alt_text = models.CharField(max_length=255, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.filename} ({self.source})"
