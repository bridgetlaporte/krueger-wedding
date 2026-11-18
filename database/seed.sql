-- -----------------------------------------------------------
-- The Kruegers Wedding Website
-- Senior Project GIT480
-- Test Data for RSVP 
-- -----------------------------------------------------------

USE kruegers_wedding;


-- Fictional invitations for project test -------------------------

INSERT INTO invited_parties (party_name, invitation_code, max_guests)
VALUES
    ('Kristin LaPorte', 'TEST-KRISTIN-001', 1),
    ('Amy Jane & Guest', 'TEST-AMY-002', 2),
    ('The Adam Family', 'TEST-ADAM-003', 4);





-- Test Responses --------------------------------

-- Kristin declines invite
INSERT INTO rsvp_responses (
    party_id,
    first_name,
    last_name,
    email,
    phone,
    street_address,
    address_line_2,
    city,
    state_region,
    postal_code,
    country,
    attendance,
    song_request,
    note
)
SELECT
    party_id,
    'Kristin',
    'LaPorte',
    'kristinlap@example.com',
    NULL,
    '12 Example Lane',
    NULL,
    'Sampletown',
    'CA',
    '99999',
    'United States',
    'no',
    NULL,
    'Sorry we cannot make it!'
FROM invited_parties
WHERE invitation_code = 'TEST-KRISTIN-001';


-- Amy accepts invite
INSERT INTO rsvp_responses (
    party_id,
    first_name,
    last_name,
    email,
    phone,
    street_address,
    address_line_2,
    city,
    state_region,
    postal_code,
    country,
    attendance,
    song_request,
    note
)
SELECT
    party_id,
    'Amy',
    'Jane',
    'amyjane@example.com',
    NULL,
    '34 Demo Street',
    NULL,
    'Exampletown',
    'CA',
    '99999',
    'United States',
    'yes',
    'SongName - Artist Name',
    'We cannot wait!'
FROM invited_parties
WHERE invitation_code = 'TEST-AMY-002';




-- Test Attending Guests---------------------------------

-- Amy primary guest
INSERT INTO rsvp_guests (response_id, full_name)
SELECT response_id, 'Amy Jane'
FROM rsvp_responses
WHERE email = 'amyjane@example.com';


-- The additional guest
INSERT INTO rsvp_guests (response_id, full_name)
SELECT response_id, 'Sample Guest'
FROM rsvp_responses
WHERE email = 'amyjane@example.com';
