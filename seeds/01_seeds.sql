INSERT INTO users (id, name, email, password)
VALUES (1, 'John Doe', 'johndoe@example.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
(2, 'Jane Smith', 'janesmith@example.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
(3, 'Mike Johnson', 'mikejohnson@example.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');

INSERT INTO properties (id, owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code, active)
VALUES (1, 1001, 'Cozy Cottage', 'description', 'https://example.com/thumbnail1.jpg', 'https://example.com/cover1.jpg', 100, 2, 1, 2, 'United States', '123 Main St', 'New York', 'NY', '12345', true),
(2, 1002, 'Modern Apartment', 'description', 'https://example.com/thumbnail2.jpg', 'https://example.com/cover2.jpg', 150, 1, 2, 1, 'Canada', '456 Elm St', 'Toronto', 'ON', 'M1A 1A1', true),
(3, 1003, 'Beach House Retreat', 'description', 'https://example.com/thumbnail3.jpg', 'https://example.com/cover3.jpg', 200, 3, 2, 3, 'Australia', '789 Beach Rd', 'Sydney', 'NSW', '2000', true);

INSERT INTO reservations (id, start_date, end_date, property_id, guest_id)
VALUES (1, '2023-05-21', '2023-05-28', 1, 1001),
(2, '2023-06-10', '2023-06-15', 2, 1002),
(3, '2023-07-01', '2023-07-10', 3, 1003);

INSERT INTO property_reviews (id, guest_id, reservation_id, property_id, rating, message)
VALUES (1, 1001, 1, 1, 5, 'messages'),
(2, 1002, 2, 2, 4, 'messages'),
(3, 1003, 3, 3, 5, 'messages');