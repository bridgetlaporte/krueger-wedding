-- -----------------------------------------------------------
-- The Kruegers Wedding Website
-- Senior Project GIT480
-- RSVP Queries
-- -----------------------------------------------------------

USE kruegers_wedding;


-- View all invited ----------------------------------
SELECT *
FROM invited_parties;


-- View responses ---------------------------------------
SELECT *
FROM rsvp_responses;


-- View individual attending --------------------------
SELECT *
FROM rsvp_guests;


-- Find an invitation by code -------------------------
SELECT party_id, party_name, max_guests
FROM invited_parties
WHERE invitation_code = 'TEST-AMY-002';


-- Show each party's RSVP status and guest num --------------
SELECT
    p.party_name,
    p.max_guests,
    CASE
        WHEN r.response_id IS NULL THEN 'Not yet responded'
        ELSE r.attendance
    END AS rsvp_status,
    COUNT(g.guest_id) AS attending_guests

FROM invited_parties AS p

LEFT JOIN rsvp_responses AS r
    ON p.party_id = r.party_id

LEFT JOIN rsvp_guests AS g
    ON r.response_id = g.response_id

GROUP BY
    p.party_id,
    p.party_name,
    p.max_guests,
    r.response_id,
    r.attendance

ORDER BY p.party_name;


-- Mailing addresses stored for us for thank you cards ---------------------
SELECT
    first_name,
    last_name,
    street_address,
    address_line_2,
    city,
    state_region,
    postal_code,
    country

FROM rsvp_responses

ORDER BY last_name;
