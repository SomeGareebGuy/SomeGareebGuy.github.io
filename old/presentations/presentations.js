
/* ================================================
   MATHEMATICAL ARCHIVE
   Anubhav Dash

   CENTRAL PRESENTATION DATABASE

   Add new presentations to this file.
================================================ */


const presentations = [

    /* --------------------------------------------
       EXAMPLE 01 — GEOMETRY
    -------------------------------------------- */

    {
        id: "projective-geometry",

        title: "An Introduction to Projective Geometry",

        subject: "Geometry",

        description:
            "Notes exploring projective planes, points, lines and incidence structures.",

        date: "2026-11-11",

        file: "../files/geometry/projective-geometry.pdf",

        thumbnail: "../files/geometry/projective-geometry.jpg",

        featured: true
    },


    /* --------------------------------------------
       EXAMPLE 02 — ALGEBRA
    -------------------------------------------- */

    {
        id: "groups-and-symmetry",

        title: "Groups and Symmetry",

        subject: "Algebra",

        description:
            "Some introductory explorations of abstract algebra and symmetry.",

        date: "2026-11-10",

        file: "../files/algebra/groups-and-symmetry.pdf",

        thumbnail: "../files/algebra/groups-and-symmetry.jpg",

        featured: false
    },


    /* --------------------------------------------
       EXAMPLE 03 — ANALYSIS
    -------------------------------------------- */

    {
        id: "real-analysis",

        title: "Notes on Real Analysis",

        subject: "Analysis",

        description:
            "A collection of handwritten notes on sequences, limits and continuity.",

        date: "2026-11-09",

        file: "../files/miscellaneous/real-analysis.pdf",

        thumbnail: "",

        featured: false
    }

];


/* ================================================
   DATABASE HELPERS
================================================ */


/*
   Find a presentation using its unique ID.
*/

function getPresentationById(id) {

    return presentations.find(
        presentation => presentation.id === id
    );

}


/*
   Return presentations belonging to a subject.
*/

function getPresentationsBySubject(subject) {

    if (!subject || subject === "all") {
        return presentations;
    }

    return presentations.filter(
        presentation => presentation.subject === subject
    );

}


/*
   Return featured presentations.
*/

function getFeaturedPresentations() {

    return presentations.filter(
        presentation => presentation.featured
    );

}


/*
   Return the latest presentations.
*/

function getRecentPresentations(limit = 5) {

    return [...presentations]
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, limit);

}
