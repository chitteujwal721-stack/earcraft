-- EARCRAFT INITIAL SEED DATA SCRIPT

INSERT INTO categories (id, name, slug, description, image_url) VALUES
('c1000000-0000-0000-0000-000000000001', 'Artisanal Earrings', 'artisanal-earrings', 'Sculpted solid 18k gold earrings.', 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908'),
('c1000000-0000-0000-0000-000000000002', 'Bespoke Ear Cuffs', 'bespoke-ear-cuffs', 'Non-pierced architectural ear cuffs.', 'https://images.unsplash.com/photo-1630019852942-f89202989a59'),
('c1000000-0000-0000-0000-000000000003', 'Piercing Fine Jewelry', 'piercing-fine-jewelry', 'Solid gold helix clickers & labrets.', 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f');

INSERT INTO products (id, category_id, title, slug, subtitle, description, base_price, is_featured, is_new_arrival, is_best_seller) VALUES
('p1000000-0000-0000-0000-000000000001', 'c1000000-0000-0000-0000-000000000002', 'Aurelia Sculpted 18K Gold Ear Cuff', 'aurelia-sculpted-18k-gold-ear-cuff', 'Hand-hammered 18k Solid Gold', 'No piercing required. Ergonomic architectural curve.', 24900.00, TRUE, TRUE, TRUE),
('p1000000-0000-0000-0000-000000000002', 'c1000000-0000-0000-0000-000000000001', 'Celeste Diamond Cluster Drop Earrings', 'celeste-diamond-cluster-drop-earrings', 'VS1 Lab Diamonds in 14K White Gold', 'Brilliant cascading lab diamonds.', 42500.00, TRUE, TRUE, FALSE);

INSERT INTO product_variants (id, product_id, sku, name, material, color, price, stock_quantity) VALUES
('v1000000-0000-0000-0000-000000000001', 'p1000000-0000-0000-0000-000000000001', 'AUR-EC-18K-YG', '18K Yellow Gold', 'Solid Gold 18K', '#D4AF37', 24900.00, 14),
('v1000000-0000-0000-0000-000000000002', 'p1000000-0000-0000-0000-000000000002', 'CEL-DD-14K-WG', '14K White Gold', '14K Gold & Diamonds', '#F3F4F6', 42500.00, 6);
